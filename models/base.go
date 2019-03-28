package models

import (
	"log"
	"os"

	"github.com/jinzhu/gorm"
	// gorm driver for postgres
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

var db *gorm.DB

func init() {
	e := godotenv.Load()
	if e != nil {
		log.Fatal(e)
	}

	dbURI := os.Getenv("DATABASE_URL")

	conn, err := gorm.Open(os.Getenv("db_type"), dbURI)
	if err != nil {
		log.Fatal(err)
	}

	db = conn
	// Database migration.
	db.Debug().AutoMigrate(Message{})
}

// GetDB - returns a handle to the DB object.
func GetDB() *gorm.DB {
	return db
}
