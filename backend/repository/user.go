package repository

import (
	"context"
	"fmt"
	"os"

	"github.com/traP-jp/rucQ/backend/model"
	traq "github.com/traPtitech/go-traq"
)

func (r *Repository) GetOrCreateUser(traqID string) (*model.User, error) {
	var user model.User

	// まずデータベースを検索
	if err := r.db.Where("traq_id = ?", traqID).Find(&user).Error; err != nil {
		// traq_id が traqID であるレコードのうち最初の一件を抽出して user に格納する
		// Find に []model.User を渡せば該当レコード全てを取得してくれるらしい
		// 今回は traqID がユーザーを一意に指定できるので、Find には単一の model.User 型変数のポインタが渡されている

		// Where は検索条件の指定であり、まだこの段階ではクエリを実行しているわけではない
		// クエリの実行は Find の段階。他にも Where.Update などのようにして該当するレコードに対して一括処理を実行できる

		return nil, err
	}

	if user.TraqUuid != "" {
		return &user, nil
	}

	configuration := traq.NewConfiguration()
	apiClient := traq.NewAPIClient(configuration)
	configuration.AddDefaultHeader("Authorization", "Bearer "+os.Getenv("BOT_ACCESS_TOKEN"))
	usersUuid, httpResp, err := apiClient.UserApi.GetUsers(context.Background()).Name(traqID).Execute()
	if err != nil {
		return nil, fmt.Errorf("error when calling UserApi.GetUsers: %w\nfull HTTP response: %v", err, httpResp)
	}

	// traQ API のレスポンスをチェック
	if len(usersUuid) != 1 {
		return nil, fmt.Errorf("no users found with name %s", traqID)
		// 2 の場合もあるかもしれないけど、とりあえず普通 0 だよねということで no users found のエラー
	}

	// 追加、更新するユーザーを作成
	user.TraqUuid = usersUuid[0].Id
	user.TraqID = traqID

	// user をセーブしてはいるが、すでに存在するユーザーの場合はこのクエリを実行しても何も起こらないという感じだろうか
	if err := r.db.Save(&user).Error; err != nil {
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
