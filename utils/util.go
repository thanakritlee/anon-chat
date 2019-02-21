package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Message - package a message.
func Message(message string) map[string]interface{} {
	return map[string]interface{}{"message": message}
}

// Response - create a HTTP response.
func Response(w http.ResponseWriter, data map[string]interface{}) {
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

// GetHex - return the hex of an int.
// Credits for generating hex colours goes to: https://github.com/AvraamMavridis/randomcolor.
func GetHex(n int) string {
	hex := fmt.Sprintf("%x", n)
	if len(hex) == 1 {
		hex = "0" + hex
	}
	return hex
}
