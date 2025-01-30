// handler/server.go

package handler

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
)

// PostDM は DM を送信するハンドラです。
func (s *Server) PostDM(e echo.Context, params PostDMParams) error {
	var req PostDMJSONRequestBody
	if err := e.Bind(&req); err != nil {
		e.Logger().Errorf("failed to bind request: %v", err)
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid request body")
	}

	// スタッフだけがbotを用いてdmを送信できるようにする
	user, err := s.repo.GetOrCreateUser(*params.XForwardedUser)

	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}
	// スタッフじゃなければはじく
	if !user.IsStaff {
		return echo.NewHTTPError(http.StatusForbidden, "Forbidden")
	}

	targetUser, err := s.repo.GetOrCreateUser(req.TargetUser)
	if err != nil {
		e.Logger().Errorf("failed to get or create user: %v", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
	}

	// traQ API にリクエストを送る
	baseURL := fmt.Sprintf("https://q.trap.jp/api/v3/users/%s/messages", targetUser.TraqUuid)

	// リクエストボディを作成
	body := map[string]interface{}{
		"content": req.Content,
		"embed":   false,
	}
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return err
	}

	httpRequest, err := http.NewRequest("POST", baseURL, bytes.NewBuffer(jsonBody))
	if err != nil {
		return err
	}

	httpRequest.Header.Set("Content-Type", "application/json")

	accessToken := os.Getenv("BOT_ACCESS_TOKEN")
	httpRequest.Header.Add("Authorization", "Bearer "+accessToken)

	// 指定時刻まで待機してからDMを送信する
	go func() {
		if req.Sendtime != nil {
			sendTime := *req.Sendtime
			duration := time.Until(sendTime)
			if duration > 0 {
				time.Sleep(duration) // 指定時刻まで待機
			}
		}

		// DMを送信する処理
		httpClient := &http.Client{}
		resp, err := httpClient.Do(httpRequest)
		if err != nil {
			e.Logger().Errorf("failed to send DM: %v", err)
			return
		}
		defer resp.Body.Close()

		// APIのレスポンスが成功か確認
		if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
			e.Logger().Errorf("failed to send DM, status: %d", resp.StatusCode)
		}
	}()

	return nil
}
