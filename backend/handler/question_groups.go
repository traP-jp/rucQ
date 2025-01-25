package handler

import (
	"net/http"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/model"
)

func (s *Server) GetQuestionGroups(e echo.Context) error {
	questionGroups, err := s.repo.GetQuestionGroups()

	if err != nil {
		e.Logger().Errorf("failed to get question groups: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res []QuestionGroup

	if err := copier.Copy(&res, &questionGroups); err != nil {
		e.Logger().Errorf("failed to copy response body: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusOK, res)
}

func (s *Server) PostQuestionGroup(e echo.Context, params PostQuestionGroupParams) error {
	user, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	if !user.IsStaff {
		return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
	}

	var req PostQuestionGroupJSONRequestBody

	if err := e.Bind(&req); err != nil {
		e.Logger().Errorf("failed to bind request body: %v", err)

		return echo.NewHTTPError(http.StatusBadRequest, "Bad request")
	}

	var questionGroup model.QuestionGroup

	if err := copier.Copy(&questionGroup, &req); err != nil {
		e.Logger().Errorf("failed to copy request body: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	if err := s.repo.CreateQuestionGroup(&questionGroup); err != nil {
		e.Logger().Errorf("failed to create question group: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res QuestionGroup

	if err := copier.Copy(&res, &questionGroup); err != nil {
		e.Logger().Errorf("failed to copy response body: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusCreated, res)
}
