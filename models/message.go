package models

import (
	"log"

	"github.com/jinzhu/gorm"
)

// Message - a struct for a chat message.
type Message struct {
	gorm.Model
	Username  string `json:"username"`
	Message   string `json:"message"`
	Timestamp int64  `json:"timestamp"`
}

// MessageIn - a struct for a chat message incoming from the WebSocket client.
type MessageIn struct {
	Username string `json:"username"`
	Message  string `json:"message"`
}

// Store - store a message Go object to the Database.
func (message *Message) Store() {
	GetDB().Create(message)
}

// GetAllMessages - get all messages from the database and return it.
func GetAllMessages() []*Message {
	messages := make([]*Message, 0)
	err := GetDB().Table("messages").Find(&messages).Error
	if err != nil {
		log.Fatal(err)
	}
	return messages
}
