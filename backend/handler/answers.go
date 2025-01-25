package handler

import (
	"net/http"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/repository"
)

func (s *Server) GetMyAnswer(e echo.Context, questionID QuestionId, params GetMyAnswerParams) error {
	user, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	answer, err := s.repo.GetOrCreateAnswer(&repository.GetAnswerQuery{
		QuestionID: uint(questionID),
		UserID:     user.ID,
	})

	if err != nil {
		e.Logger().Errorf("failed to get or create answer: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res Answer

	if err := copier.Copy(&res, &answer); err != nil {
		e.Logger().Errorf("failed to copy model to response: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	res.UserTraqId = *params.XForwardedUser

	return e.JSON(http.StatusOK, res)
}

func (s *Server) PutAnswer(e echo.Context, questionID QuestionId, params PutAnswerParams) error {
	var req PutAnswerJSONRequestBody

	if err := e.Bind(&req); err != nil {
		return e.JSON(http.StatusBadRequest, err)
	}

	user, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	answer, err := s.repo.GetOrCreateAnswer(&repository.GetAnswerQuery{
		QuestionID: uint(questionID),
		UserID:     user.ID,
	})

	if err != nil {
		e.Logger().Errorf("failed to get or create answer: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	answer.Content = req.Content

	if err := s.repo.UpdateAnswer(answer); err != nil {
		e.Logger().Errorf("failed to update answer: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res Answer

	if err := copier.Copy(&res, &answer); err != nil {
		e.Logger().Errorf("failed to copy model to response: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	res.UserTraqId = *params.XForwardedUser

	return e.JSON(http.StatusOK, res)
}
