package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	TraqID  string `gorm:"uniqueIndex"`
	IsStaff bool
}
