package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) CreateCamp(camp *model.Camp) error {
	if err := r.db.Create(camp).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) GetCamps() ([]model.Camp, error) {
	var camps []model.Camp

	if err := r.db.Find(&camps).Error; err != nil {
		return nil, err
	}

	return camps, nil
}

func (r *Repository) GetCampByID(id string) (*model.Camp, error) {
	var camp model.Camp

	if err := r.db.Model(&model.Camp{ID: id}).First(&camp).Error; err != nil {
		return nil, err
	}

	return &camp, nil
}
