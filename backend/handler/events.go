package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *Server) GetEvents(e echo.Context) error {
	events, err := s.repo.GetEvents()

	if err != nil {
		return e.JSON(http.StatusInternalServerError, err)
	}

	response := make([]GetEventsResponse, len(events))

	for k, v := range events {
		response[k] = GetEventsResponse{
			Id:              int(v.ID),
			Name:            v.Name,
			Location:        v.Location,
			TimeStart:       *v.TimeStart,
			TimeEnd:         *v.TimeEnd,
			CampId:          int(v.CampID),
			OrganizerTraqId: v.OrganizerTraqID,
		}
	}

	return e.JSON(http.StatusOK, response)
}
