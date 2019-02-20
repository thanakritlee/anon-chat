package models

import (
	"fmt"
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

	username := os.Getenv("db_user")
	password := os.Getenv("db_pass")
	dbName := os.Getenv("db_name")
	dbHost := os.Getenv("db_host")

	dbURI := fmt.Sprintf("host=%s user=%s dbname=%s sslmode=disable password=%s", dbHost, username, dbName, password)
	log.Println(dbURI)

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
