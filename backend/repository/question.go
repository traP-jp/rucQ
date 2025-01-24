package repository

import (
	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/gorm"
)

func (r *Repository) CreateQuestion(question *model.Question) error {
	if err := r.db.Create(question).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) GetQuestions() ([]model.Question, error) {
	var questions []model.Question

	if err := r.db.Find(&questions).Error; err != nil {
		return nil, err
	}

	return questions, nil
}

func (r *Repository) GetQuestionByID(id uint) (*model.Question, error) {
	var question model.Question

	if err := r.db.First(&question, id).Error; err != nil {
		return nil, err
	}

	return &question, nil
}

func (r *Repository) DeleteQuestionByID(id uint) error {
	if err := r.db.Delete(&model.Question{}, id).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) UpdateQuestion(questionID uint, question *model.Question) error {
	if err := r.db.Where(&model.Question{
		Model: gorm.Model{
			ID: questionID,
		},
	}).Updates(question).Error; err != nil {
		return err
	}

	return nil
}
