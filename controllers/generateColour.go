package controllers

import (
	"math/rand"
	"net/http"
	"time"

	u "anon-chat/utils"
)

// GenerateColour - a controller for generating and return a random colour.
// Credits for generating hex colours goes to: https://github.com/AvraamMavridis/randomcolor.
func GenerateColour(w http.ResponseWriter, r *http.Request) {
	// Generating the randome hex colour.
	rand.Seed(time.Now().Unix())
	hexColour := "#" + u.GetHex(rand.Intn(225)) + u.GetHex(rand.Intn(225)) + u.GetHex(rand.Intn(225))

	// Package the response.
	res := u.Message("success")
	res["colour"] = hexColour
	u.Response(w, res)
}
