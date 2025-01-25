package model

import "errors"

var ErrAlreadyExists = errors.New("already exists")

// 全モデルを書いておく
func GetAllModels() []any {
	return []any{
		&Camp{},
		&Event{},
		&User{},
		&QuestionGroup{},
		&Question{},
		&Option{},
		&Answer{},
	}
}
