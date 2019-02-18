package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	// Serve static files.
	router.PathPrefix("/static").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./client/build/static"))))

	// Serve index page on root.
	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./client/build/index.html")
	})

	// router.Handle("/", http.Handler(http.FileServer(http.Dir("./client/build/index.html"))))

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	err := http.ListenAndServe(":"+port, router)
	if err != nil {
		fmt.Print(err)
	}
}
