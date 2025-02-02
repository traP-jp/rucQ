package model

import "gorm.io/gorm"

type Budget struct {
	gorm.Model
	UserID     uint
	UserTraqID string
	CampID     uint
	Amount     *uint
	AmountPaid uint
}
