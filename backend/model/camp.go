package model

import "gorm.io/gorm"

type Camp struct {
	gorm.Model
	DisplayID   string
	Name        string
	Description string
	IsDraft     bool
}
