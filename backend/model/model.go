package model

// 全モデルを書いておく
func GetAllModels() []any {
	return []any{
		&Camp{},
		&Event{},
		&User{},
		&Question{},
		&Answer{},
	}
}
