package handler

import (
	"net/http"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/model"
	"github.com/traP-jp/rucQ/backend/repository"
)

func (s *Server) GetMyAnswer(e echo.Context, questionID QuestionId, params GetMyAnswerParams) error {
	user, err := s.repo.GetOrCreateUser(params.XForwardedUser)

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

	res.UserTraqId = params.XForwardedUser

	return e.JSON(http.StatusOK, res)
}

func (s *Server) PostAnswer(e echo.Context, params PostAnswerParams) error {
	var req PostAnswerJSONRequestBody

	if err := e.Bind(&req); err != nil {
		return e.JSON(http.StatusBadRequest, err)
	}

	var answer model.Answer

	if err := copier.Copy(&answer, &req); err != nil {
		e.Logger().Errorf("failed to copy request to model: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	user, err := s.repo.GetOrCreateUser(params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	answer.UserID = user.ID

	if err := s.repo.CreateAnswer(&answer); err != nil {
		e.Logger().Errorf("failed to create answer: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res Answer

	if err := copier.Copy(&res, &answer); err != nil {
		e.Logger().Errorf("failed to copy model to response: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	res.UserTraqId = params.XForwardedUser

	return e.JSON(http.StatusCreated, res)
}

func (s *Server) DeleteAnswer(e echo.Context, answerID AnswerId, params DeleteAnswerParams) error {
	return nil
}

func (s *Server) PutAnswer(e echo.Context, answerID AnswerId, params PutAnswerParams) error {
	return nil
}
