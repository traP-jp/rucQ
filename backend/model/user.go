package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	TraqID   string `gorm:"primaryKey"` // 主キー
	IsStaff bool   `gorm:"index"`
	Answers []Answer
	TraqUuid string
}
