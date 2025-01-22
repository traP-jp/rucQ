package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/model"
)

func (s *Server) GetEvents(e echo.Context) error {
	events, err := s.repo.GetEvents()

	if err != nil {
		e.Logger().Errorf("failed to get events: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	response := make([]Event, len(events))

	for k, v := range events {
		response[k] = Event{
			Id:              int(v.ID),
			Name:            v.Name,
			Location:        v.Location,
			TimeStart:       *v.TimeStart,
			TimeEnd:         *v.TimeEnd,
			CampId:          int(v.CampID),
			OrganizerTraqId: v.OrganizerTraqID,
		}
	}

	return e.JSON(http.StatusOK, &response)
}

func (s *Server) PostEvent(e echo.Context, params PostEventParams) error {
	var req PostEventJSONRequestBody

	if err := e.Bind(&req); err != nil {
		return e.JSON(http.StatusBadRequest, err)
	}

	organizerTraqID := params.XForwardedUser

	if req.CreateAsStaff {
		// TODO: 権限を確認し、合宿係ならorganizerTraqIDをtraPにする
	}

	eventID, err := s.repo.CreateEvent(&model.Event{
		Name:            req.Name,
		Location:        req.Location,
		TimeStart:       &req.TimeStart,
		TimeEnd:         &req.TimeEnd,
		CampID:          uint(req.CampId),
		OrganizerTraqID: organizerTraqID,
	})

	if err != nil {
		e.Logger().Errorf("failed to create event: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusCreated, &Event{
		Id:              eventID,
		Name:            req.Name,
		Location:        req.Location,
		TimeStart:       req.TimeStart,
		TimeEnd:         req.TimeEnd,
		CampId:          req.CampId,
		OrganizerTraqId: organizerTraqID,
	})
}
