package controllers

import (
	"net/http"

	"anon-chat/models"
	u "anon-chat/utils"
)

// GetChatHistory - a controller for getting the chat history from the database.
func GetChatHistory(w http.ResponseWriter, r *http.Request) {
	messages := models.GetAllMessages()
	res := u.Message("success")
	res["messages"] = messages
	u.Response(w, res)
}
