package controllers

import (
	"net/http"

	u "anon-chat/utils"

	"github.com/satori/go.uuid"
)

// GenerateUUID - a controller for generating and return a UUID.
func GenerateUUID(w http.ResponseWriter, r *http.Request) {
	// Creating UUID Version 4
	id := uuid.Must(uuid.NewV4())
	res := u.Message("success")
	res["username"] = id
	u.Response(w, res)
}
