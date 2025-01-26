package handler

import (
	"net/http"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
)

func (s *Server) GetMyBudget(e echo.Context, params GetMyBudgetParams) error {
	user, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	budget, err := s.repo.GetBudgetByUserID(user.ID)

	if err != nil {
		e.Logger().Errorf("failed to get budget by user id: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res Budget

	if err := copier.Copy(&res, budget); err != nil {
		e.Logger().Errorf("failed to copy budget: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusOK, res)
}

func (s *Server) GetUserBudget(e echo.Context, traqId TraqId, params GetUserBudgetParams) error {
	return nil
}

func (s *Server) PostUserBudget(e echo.Context, traqId TraqId, params PostUserBudgetParams) error {
	return nil
}

func (s *Server) PutUserBudget(e echo.Context, traqId TraqId, params PutUserBudgetParams) error {
	return nil
}
