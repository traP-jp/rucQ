package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) CreateQuestion(question *model.Question) (*model.Question, error) {
	if err := r.db.Create(question).Error; err != nil {
		return nil, err
	}

	return question, nil
}
