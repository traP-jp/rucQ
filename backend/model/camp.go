package model

import "gorm.io/gorm"

type Camp struct {
	gorm.Model
	DisplayID      string
	Name           string
	Description    string
	IsDraft        bool
	Participants   []User `gorm:"many2many:camp_participants;"`
	Budgets        []Budget
	Events         []Event
	QuestionGroups []QuestionGroup
}
