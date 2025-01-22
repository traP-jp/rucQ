package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) CreateQuestion(question *model.Question) (*model.Question, error) {
	if err := r.db.Create(question).Error; err != nil {
		return nil, err
	}

	return question, nil
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
