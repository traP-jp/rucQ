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

	if err := r.db.Preload("Options").Find(&questions).Error; err != nil {
		return nil, err
	}

	return questions, nil
}

func (r *Repository) GetQuestionByID(id uint) (*model.Question, error) {
	var question model.Question

	if err := r.db.Preload("Options").First(&question, id).Error; err != nil {
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

func (r *Repository) UpdateQuestion(questionID uint, question *model.Question) (*model.Question, error) {
	var existingQuestion model.Question

	if err := r.db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Preload("Options").First(&existingQuestion, questionID).Error; err != nil {
			return err
		}

		existingQuestion.Title = question.Title
		existingQuestion.Description = question.Description
		existingQuestion.Type = question.Type
		existingQuestion.IsPublic = question.IsPublic
		existingQuestion.Due = question.Due
		existingQuestion.IsOpen = question.IsOpen

		if err := tx.Model(&existingQuestion).Association("Options").Clear(); err != nil {
			return err
		}

		if len(question.Options) > 0 {
			if err := tx.Model(&existingQuestion).Association("Options").Append(question.Options); err != nil {
				return err
			}
		}

		return tx.Save(&existingQuestion).Error
	}); err != nil {
		return nil, err
	}

	return &existingQuestion, nil
}
