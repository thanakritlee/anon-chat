package router

import (
	"net/http"

	u "anon-chat/utils"

	"github.com/gorilla/mux"
)

// GetRouter - return a router with registered routes.
func GetRouter() *mux.Router {
	router := mux.NewRouter()

	var HelloWorld = func(w http.ResponseWriter, r *http.Request) {
		u.Response(w, u.Message("Hello world"))
		return
	}

	// Serve static files.
	router.PathPrefix("/static").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./client//build/static"))))

	// Serve index page on root.
	router.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./client/build/index.html")
	}))

	router.HandleFunc("/api/hello", HelloWorld).Methods("GET")

	return router
}
