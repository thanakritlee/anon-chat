package main

import (
	"anon-chat/router"
	"log"

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
	err := http.ListenAndServeTLS(":"+port, "./host.crt", "./host.key", router)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
