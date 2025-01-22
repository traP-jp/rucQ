package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/model"
)

func (s *Server) GetQuestions(e echo.Context) error {
	return nil
}

func (s *Server) PostQuestion(e echo.Context, params PostQuestionParams) error {
	user, err := s.repo.GetOrCreateUser(params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	if !user.IsStaff {
		return e.JSON(http.StatusForbidden, "You are not allowed to create a question")
	}

	var req PostQuestionJSONRequestBody

	if err := e.Bind(&req); err != nil {
		return e.JSON(http.StatusBadRequest, err)
	}

	var options []model.Option

	if req.Options != nil {
		options = make([]model.Option, len(*req.Options))

		for k, v := range *req.Options {
			options[k] = model.Option{
				Body: v,
			}
		}
	}

	question, err := s.repo.CreateQuestion(&model.Question{
		Title:       req.Title,
		Description: req.Description,
		Type:        req.Type,
		IsPublic:    req.IsPublic,
		Due:         &req.Due,
		IsOpen:      req.IsOpen,
		Options:     options,
	})

	if err != nil {
		e.Logger().Errorf("failed to create question: %v", err)

		return e.JSON(http.StatusInternalServerError, "Internal server error")
	}

	var optionsResponse []Option

	if question.Options != nil {
		optionsResponse = make([]Option, len(question.Options))

		for k, v := range question.Options {
			optionsResponse[k] = Option{
				Id:   int(v.ID),
				Body: v.Body,
			}
		}
	}

	return e.JSON(http.StatusCreated, &Question{
		Id:          int(question.ID),
		Title:       req.Title,
		Description: req.Description,
		Type:        req.Type,
		IsPublic:    req.IsPublic,
		Due:         req.Due,
		IsOpen:      req.IsOpen,
		Options:     &optionsResponse,
	})
}

func (s *Server) DeleteQuestion(e echo.Context, questionID QuestionId, params DeleteQuestionParams) error {
	return nil
}

func (s *Server) GetQuestion(e echo.Context, questionID QuestionId) error {
	return nil
}

func (s *Server) PutQuestion(e echo.Context, questionID QuestionId, params PutQuestionParams) error {
	return nil
}

func (s *Server) PostAnswer(e echo.Context, params PostAnswerParams) error {
	return nil
}

func (s *Server) DeleteAnswer(e echo.Context, answerID AnswerId, params DeleteAnswerParams) error {
	return nil
}

func (s *Server) PutAnswer(e echo.Context, answerID AnswerId, params PutAnswerParams) error {
	return nil
}
