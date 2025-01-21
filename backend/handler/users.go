package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (s *Server) GetMe(e echo.Context, params GetMeParams) error {
	user, err := s.repo.GetOrCreateUser(params.XForwardedUser)

	if err != nil {
		return e.JSON(http.StatusInternalServerError, err)
	}

	return e.JSON(http.StatusOK, &GetUserResponse{
		TraqId:  user.TraqID,
		IsStaff: user.IsStaff,
	})
}
