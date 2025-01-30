package handler

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	traq "github.com/traPtitech/go-traq"
)

// PostDM は DM を送信するハンドラです。
func (s *Server) PostDirectMessage(e echo.Context, params PostDirectMessageParams) error {
	var req PostDirectMessageJSONRequestBody
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

	// 指定時刻まで待機してからDMを送信する
	go func() error {
		if req.Sendtime != nil {
			sendTime := *req.Sendtime
			duration := time.Until(sendTime)
			if duration > 0 {
				time.Sleep(duration) // 指定時刻まで待機
			}
		}

		postMessageRequest := *traq.NewPostMessageRequest(req.Content)
		targetUser, err := s.repo.GetOrCreateUser(req.TargetUser)
		if err != nil {
			e.Logger().Errorf("failed to get or create user: %v", err)
			return echo.NewHTTPError(http.StatusInternalServerError, "Internal server error")
		}
		configuration := traq.NewConfiguration()
		configuration.AddDefaultHeader("Authorization", "Bearer "+os.Getenv("BOT_ACCESS_TOKEN"))
		apiClient := traq.NewAPIClient(configuration)
		_, r, err := apiClient.MessageApi.PostDirectMessage(context.Background(), targetUser.TraqUuid).PostMessageRequest(postMessageRequest).Execute()


		if err != nil {
			fmt.Fprintf(os.Stderr, "Error when calling `MessageApi.PostDirectMessage``: %v\n", err)
			fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
		}

		return nil
	}()

	return e.NoContent(http.StatusAccepted)
}
