package repository

import "github.com/traP-jp/rucQ/backend/model"

type GetOptionsQuery struct {
	QuestionID *uint
}

func (r *Repository) CreateOption(option *model.Option) error {
	if err := r.db.Create(option).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) GetOptions(query *GetOptionsQuery) ([]model.Option, error) {
	tx := r.db

	if query.QuestionID != nil {
		tx = tx.Where(&model.Option{QuestionID: *query.QuestionID})
	}

	var options []model.Option

	if err := tx.Find(&options).Error; err != nil {
		return nil, err
	}

	return options, nil
}

func (r *Repository) UpdateOption(ID uint, option *model.Option) error {

	if err := r.db.Where("id = ?", ID).Updates(option).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) DeleteOption(ID uint) error {

	if err := r.db.Delete(&model.Option{}, ID).Error; err != nil {
		return err
	}

	return nil
}
