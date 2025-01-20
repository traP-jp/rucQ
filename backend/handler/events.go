package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *Server) GetEvents(e echo.Context) error {
	return e.JSON(http.StatusOK, Event{})
}
