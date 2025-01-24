package model

import (
	"time"

	"gorm.io/gorm"
)

type Event struct {
	gorm.Model
	Name            string
	Description     string
	Location        string
	TimeStart       time.Time
	TimeEnd         time.Time
	CampID          string
	OrganizerTraqID string
	ByStaff         bool
}
