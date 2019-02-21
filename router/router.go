package router

import (
	"log"
	"net/http"
	"time"

	"anon-chat/controllers"
	"anon-chat/models"
	u "anon-chat/utils"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

// The connected WebSocket clients.
var clients = make(map[*websocket.Conn]bool)

// A broadcast channel.
var broadcast = make(chan models.Message)

// Configure a WebSocket upgrader.
var upgrader = websocket.Upgrader{}

// GetRouter - return a router with registered routes.
func GetRouter() *mux.Router {
	router := mux.NewRouter()

	// Serve static files.
	router.PathPrefix("/static").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./client//build/static"))))

	// Serve index page on root.
	router.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./client/build/index.html")
	}))

	router.HandleFunc("/api/hello", HelloWorld).Methods("GET")

	router.HandleFunc("/api/username", controllers.GenerateUUID).Methods("GET")

	router.HandleFunc("/api/colour", controllers.GenerateColour).Methods("GET")

	router.HandleFunc("/api/chat-history", controllers.GetChatHistory).Methods("GET")

	router.HandleFunc("/api/ws", HandleWebSocketConnection).Methods("GET")
	go HandleWebSocketMessage()

	return router
}

// HelloWorld - a controller for returning hello world.
func HelloWorld(w http.ResponseWriter, r *http.Request) {
	u.Response(w, u.Message("Hello world"))
	return
}

// HandleWebSocketConnection - a controller to upgrade a HTTP connection
// to a WebSocket connection.
func HandleWebSocketConnection(w http.ResponseWriter, r *http.Request) {
	// Upgrade initial GET request to a WebSocket.
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
	}
	// Close the connection when the function returns.
	// Function returns when there's an error reading the message
	// from the WebSocket client.
	defer ws.Close()

	// Register the new WebSocket client.
	clients[ws] = true

	for {
		var msg models.MessageIn
		// Read in a new message as a JSON and map it to a Message go object.
		err := ws.ReadJSON(&msg)
		if err != nil {
			log.Printf("error: %v\n", err)
			delete(clients, ws)
			// Breaks the for loop and returns the function.
			break
		}

		// Create a Message Go object from incoming message.
		message := models.Message{
			Message:   msg.Message,
			Username:  msg.Username,
			Timestamp: time.Now().Unix(),
		}

		// Store the message to a database.
		message.Store()

		// Send the recieved message to the broadcast channel.
		broadcast <- message
	}
}

// HandleWebSocketMessage - send message from broadcast to every WebSocket clients.
func HandleWebSocketMessage() {
	for {
		// Get the next mesage from the broadcast channel.
		msg := <-broadcast
		// Send the message to every WebSocket client that is currently connected.
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				log.Printf("error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
