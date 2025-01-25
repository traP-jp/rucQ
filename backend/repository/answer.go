package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) CreateAnswer(answer *model.Answer) error {
	if err := r.db.Create(answer).Error; err != nil {
		return err
	}

	return nil
}
