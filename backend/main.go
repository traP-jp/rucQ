package main

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/traP-jp/rucQ/backend/handler"
	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func main() {
	e := echo.New()

	godotenv.Load()

	user := os.Getenv("NS_MARIADB_USER")
	password := os.Getenv("NS_MARIADB_PASSWORD")
	host := os.Getenv("NS_MARIADB_HOSTNAME")
	database := os.Getenv("NS_MARIADB_DATABASE")
	dsn := fmt.Sprintf("%s:%s@tcp(%s:3306)/%s?charset=utf8mb4&parseTime=True&loc=Asia%%2FTokyo", user, password, host, database)
	db, err := gorm.Open(mysql.Open(dsn))

	if err != nil {
		e.Logger.Fatal(err)
	}

	if err := db.AutoMigrate(model.GetAllModels()...); err != nil {
		e.Logger.Fatal(err)
	}

	// Swagger UIからAPIを利用するための設定
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:8081"},
	}))
	handler.RegisterHandlers(e, handler.NewServer(db))
	e.Logger.Fatal(e.Start("localhost:8080"))
}
