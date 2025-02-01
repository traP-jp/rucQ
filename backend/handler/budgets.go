package handler

import (
	"net/http"

	"github.com/jinzhu/copier"
	"github.com/labstack/echo/v4"
	"github.com/traP-jp/rucQ/backend/model"
)

func (s *Server) GetMyBudget(e echo.Context, params GetMyBudgetParams) error {
	budget, err := s.repo.GetBudget(*params.XForwardedUser)

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
	operator, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	if !operator.IsStaff {
		return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
	}

	budget, err := s.repo.GetBudget(traqId)

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

func (s *Server) PostUserBudget(e echo.Context, traqId TraqId, params PostUserBudgetParams) error {
	operator, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	if !operator.IsStaff {
		return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
	}

	var req PostUserBudgetJSONRequestBody

	if err := e.Bind(&req); err != nil {
		e.Logger().Errorf("failed to bind request body: %v", err)

		return echo.NewHTTPError(http.StatusBadRequest, "Bad request")
	}

	var budget model.Budget

	if err := copier.Copy(&budget, &req); err != nil {
		e.Logger().Errorf("failed to copy budget: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	user, err := s.repo.GetOrCreateUser(traqId)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	budget.UserTraqID = user.TraqID

	if err := s.repo.UpdateBudget(&budget); err != nil {
		e.Logger().Errorf("failed to update budget: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res Budget

	if err := copier.Copy(&res, &budget); err != nil {
		e.Logger().Errorf("failed to copy budget: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusCreated, res)
}

func (s *Server) PutUserBudget(e echo.Context, traqId TraqId, params PutUserBudgetParams) error {
	operator, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	if !operator.IsStaff {
		return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
	}

	var req PutUserBudgetJSONRequestBody

	if err := e.Bind(&req); err != nil {
		e.Logger().Errorf("failed to bind request body: %v", err)

		return echo.NewHTTPError(http.StatusBadRequest, "Bad request")
	}

	var budget model.Budget

	if err := copier.Copy(&budget, &req); err != nil {
		e.Logger().Errorf("failed to copy budget: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	oldBudget, err := s.repo.GetBudget(traqId)

	if err != nil {
		e.Logger().Errorf("failed to get budget by user id: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	budget.ID = oldBudget.ID

	if err := s.repo.UpdateBudget(&budget); err != nil {
		e.Logger().Errorf("failed to update budget: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var res Budget

	if err := copier.Copy(&res, &budget); err != nil {
		e.Logger().Errorf("failed to copy budget: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusOK, res)
}

func (s *Server) GetBudgets(e echo.Context, params GetBudgetsParams) error {
	operator, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	if !operator.IsStaff {
		return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
	}

	var campID uint

	if params.CampId == nil {
		defaultCamp, err := s.repo.GetDefaultCamp()

		if err != nil {
			e.Logger().Errorf("failed to get default camp: %v", err)

			return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
		}

		campID = defaultCamp.ID
	} else {
		campID = uint(*params.CampId)
	}

	budgets, err := s.repo.GetBudgets(campID)

	if err != nil {
		e.Logger().Errorf("failed to get budgets: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	var response []Budget

	if err := copier.Copy(&response, &budgets); err != nil {
		e.Logger().Errorf("failed to copy budgets: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	return e.JSON(http.StatusOK, response)
}
