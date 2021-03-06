package main

import (
	"log"

	"github.com/thanakritlee/anon-chat/router"

	"net/http"
	"os"
)

func main() {
	router := router.GetRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	log.Printf("http server started on :%s\n", port)
	// err := http.ListenAndServeTLS(":"+port, "./host.crt", "./host.key", router)
	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
