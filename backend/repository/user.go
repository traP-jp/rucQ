package repository

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"

	"github.com/traP-jp/rucQ/backend/model"
)

// APIUser は外部APIから取得するユーザー情報の構造体です。
type APIUser struct {
	ID string `json:"id"`
}

func (r *Repository) GetOrCreateUser(traqID string) (*model.User, error) {
	var user model.User

	// まずデータベースを検索
	if err := r.db.Where("traq_id = ?", traqID).Find(&user).Error; err != nil {
		return nil, err 
	}

	if user.TraqID != "" {
		return &user, nil
	}

	// traQ API にリクエストを送る
	baseURL := "https://q.trap.jp/api/v3/users"
	params := url.Values{}
	params.Add("name", traqID)

	fullURL := fmt.Sprintf("%s?%s", baseURL, params.Encode())

	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		return nil, err
	}

	accessToken := os.Getenv("BOT_ACCESS_TOKEN")
	req.Header.Add("Authorization", "Bearer "+accessToken)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var usersUuid []APIUser
	if err := json.NewDecoder(resp.Body).Decode(&usersUuid); err != nil {
		return nil, err
	}

	// traQ API のレスポンスをチェック
	if len(usersUuid) != 1 {
		return nil, fmt.Errorf("no users found with name %s", traqID)
	}

	// 新しいユーザーをデータベースに作成
	user = model.User{
		TraqID:   traqID,
		TraqUuid: usersUuid[0].ID,
	}
	if err := r.db.Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}


func (r *Repository) GetStaffs() ([]model.User, error) {
	var staffs []model.User

	if err := r.db.Where(&model.User{IsStaff: true}).Find(&staffs).Error; err != nil {
		return nil, err
	}

	return staffs, nil
}

func (r *Repository) SetUserIsStaff(user *model.User, isStaff bool) error {
	if err := r.db.Model(user).Update("is_staff", isStaff).Error; err != nil {
		return err
	}

	return nil
}
