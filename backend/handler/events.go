package handler

import (
	"net/http"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/model"
)

func (s *Server) GetEvents(e echo.Context) error {
	events, err := s.repo.GetEvents()

	if err != nil {
		e.Logger().Errorf("failed to get events: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var response []Event

	if err := copier.Copy(&response, &events); err != nil {
		e.Logger().Errorf("failed to copy events: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusOK, response)
}

func (s *Server) PostEvent(e echo.Context, params PostEventParams) error {
	var req PostEventJSONRequestBody

	if err := e.Bind(&req); err != nil {
		return e.JSON(http.StatusBadRequest, err)
	}

	var eventModel model.Event

	if err := copier.Copy(&eventModel, &req); err != nil {
		e.Logger().Errorf("failed to copy request to model: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	organizerTraqID := params.XForwardedUser

	if req.CreateAsStaff {
		user, err := s.repo.GetOrCreateUser(organizerTraqID)

		if err != nil {
			e.Logger().Errorf("failed to get or create user: %v", err)

			return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
		}

		if !user.IsStaff {
			return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
		}

		organizerTraqID = "traP"
		eventModel.ByStaff = true
	}

	eventModel.OrganizerTraqID = organizerTraqID

	if err := s.repo.CreateEvent(&eventModel); err != nil {
		e.Logger().Errorf("failed to create event: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var eventResponse Event

	if err := copier.Copy(&eventResponse, &eventModel); err != nil {
		e.Logger().Errorf("failed to copy model to response: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusCreated, &eventResponse)
}

func (s *Server) GetEvent(e echo.Context, eventID EventId) error {
	return nil
}

func (s *Server) PutEvent(e echo.Context, eventID EventId, params PutEventParams) error {
	return nil
}

func (s *Server) GetParticipants(e echo.Context, eventID EventId) error {
	return nil
}

func (s *Server) UnregisterEvent(e echo.Context, eventID EventId, params UnregisterEventParams) error {
	return nil
}

func (s *Server) RegisterEvent(e echo.Context, eventID EventId, params RegisterEventParams) error {
	return nil
}
