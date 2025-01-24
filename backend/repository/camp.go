package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) CreateCamp(camp *model.Camp) error {
	if err := r.db.Create(camp).Error; err != nil {
		return err
	}

	return nil
}
