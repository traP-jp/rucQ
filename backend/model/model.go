package model

import (
	"errors"

	"gorm.io/gorm"
)

var (
	ErrAlreadyExists = errors.New("already exists")
	ErrNotFound      = gorm.ErrRecordNotFound
)

// 全モデルを書いておく
func GetAllModels() []any {
	return []any{
		&Camp{},
		&Event{},
		&User{},
		&Budget{},
		&QuestionGroup{},
		&Question{},
		&Option{},
		&Answer{},
	}
}

// model に定義されている全ての構造体のポインタの配列を返す
