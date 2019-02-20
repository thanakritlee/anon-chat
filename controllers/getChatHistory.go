package controllers

import (
	"net/http"

	"anon-chat/models"
	"anon-chat/utils"
)

// GetChatHistory - a controller for getting the chat history from the database.
func GetChatHistory(w http.ResponseWriter, r *http.Request) {
	messages := models.GetAllMessages()
	res := utils.Message("success")
	res["messages"] = messages
	utils.Response(w, res)
}
