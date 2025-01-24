package handler

import (
	"net/http"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/model"
)

func (s *Server) GetCamps(e echo.Context) error {
	return nil
}

func (s *Server) PostCamp(e echo.Context, params PostCampParams) error {
	var req PostCampJSONRequestBody

	if err := e.Bind(&req); err != nil {
		return e.JSON(http.StatusBadRequest, err)
	}

	user, err := s.repo.GetOrCreateUser(params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	if !user.IsStaff {
		return e.JSON(http.StatusForbidden, "Forbidden")
	}

	var campModel model.Camp

	if err := copier.Copy(&campModel, &req); err != nil {
		e.Logger().Errorf("failed to copy request to model: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	if err := s.repo.CreateCamp(&campModel); err != nil {
		e.Logger().Errorf("failed to create camp: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	var response Camp

	if err := copier.Copy(&response, &campModel); err != nil {
		e.Logger().Errorf("failed to copy camp: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusCreated, response)
}

func (s *Server) GetCamp(e echo.Context, campID CampId) error {
	return nil
}

func (s *Server) PutCamp(e echo.Context, campID CampId, params PutCampParams) error {
	return nil
}
