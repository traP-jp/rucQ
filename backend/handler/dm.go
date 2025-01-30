// handler/server.go

package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// PostDM は DM を送信するハンドラです。
func (s *Server) PostDM(e echo.Context, params PostDMParams) error {
	var req PostDMJSONRequestBody
	if err := e.Bind(&req); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	}

	// スタッフだけがbotを用いてdmを送信できるようにする
	user, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)

		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	if !user.IsStaff {
		return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
	}

	// botToken := os.Getenv("BOT_ACCESS_TOKEN")

	// // 対象ユーザーの取得
	// targetUser, err := s.repo.GetUserByID(req.ToUserTraqId)
	// if err != nil {
	// 	e.Logger().Errorf("user not found: %v", err)
	// 	return echo.NewHTTPError(http.StatusNotFound, "ユーザーが見つかりません。")
	// }

	return nil
}