package model

import (
	"time"

	"gorm.io/gorm"
)

type Question struct {
	gorm.Model
	Title       string
	Description string
	Type        string
	IsPublic    bool
	Due         *time.Time
	IsOpen      bool
	Options     []string `gorm:"serializer:json"`
}

type Answer struct {
	gorm.Model
	QuestionID uint
	UserID     uint
	Body       *string
}
