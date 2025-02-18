package model

import (
	"gorm.io/gorm"
)

type Participant struct {
	gorm.Model
	User    User
	EventID uint
}
