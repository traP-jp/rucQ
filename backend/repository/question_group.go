package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) CreateQuestionGroup(questionGroup *model.QuestionGroup) error {
	if err := r.db.Create(questionGroup).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) GetQuestionGroups() ([]model.QuestionGroup, error) {
	var questionGroups []model.QuestionGroup

	if err := r.db.
		Preload("Questions").
		Preload("Questions.Options").
		Find(&questionGroups).
		Error; err != nil {
		return nil, err
	}

	return questionGroups, nil
}
