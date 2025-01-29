package model

import "gorm.io/gorm"

type Dm struct {
	gorm.Model
	Content      string
	User           string
	Events         []Event
	QuestionGroups []QuestionGroup
}