package main

import (
	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/handler"
)

func main() {
	e := echo.New()

	handler.InitializeServer(e, "")
	e.Logger.Fatal(e.Start(":8080"))
}
