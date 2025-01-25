package repository

import (
	"errors"

	"github.com/go-sql-driver/mysql"
	"github.com/traP-jp/rucQ/backend/model"
)

func (r *Repository) CreateCamp(camp *model.Camp) error {
	if err := r.db.Create(camp).Error; err != nil {
		var mysqlErr *mysql.MySQLError

		if errors.As(err, &mysqlErr) && mysqlErr.Number == 1062 {
			return model.ErrAlreadyExists
		}

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

	if err := r.db.Where(&model.Camp{ID: id}).First(&camp).Error; err != nil {
		return nil, err
	}

	return &camp, nil
}
