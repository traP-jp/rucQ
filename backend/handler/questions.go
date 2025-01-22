package handler

import "github.com/labstack/echo/v4"

func (s *Server) GetQuestions(e echo.Context) error {
	return nil
}

func (s *Server) PostQuestion(e echo.Context, params PostQuestionParams) error {
	return nil
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
