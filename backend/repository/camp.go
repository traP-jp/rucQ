package repository

import (
	"errors"
	"fmt"

	"github.com/go-sql-driver/mysql"
	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/gorm"
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

func (r *Repository) GetCampByID(id uint) (*model.Camp, error) {
	var camp model.Camp

	if err := r.db.Where(&model.Camp{
		Model: gorm.Model{
			ID: id,
		},
	}).First(&camp).Error; err != nil {
		return nil, err
	}

	return &camp, nil
}

func (r *Repository) GetDefaultCamp() (*model.Camp, error) {
	var camp model.Camp

	if err := r.db.
		Where(&model.Camp{
			IsDraft: false,
		}).
		Order("created_at desc").
		First(&camp).
		Error; err != nil {
		return nil, err
	}

	return &camp, nil
}

func (r *Repository) UpdateCamp(campID uint, camp *model.Camp) error {
	if err := r.db.Where(&model.Camp{
		Model: gorm.Model{
			ID: campID,
		},
	}).Updates(camp).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) AddUserToCamp(campID uint, user *model.User) error {
	var camp model.Camp

	if err := r.db.First(&camp, campID).Error; err != nil {
		return fmt.Errorf("failed to get camp: %w", err)
	}

	count := r.db.
		Model(&camp).
		Where(&model.User{
			TraqID: user.TraqID,
		}).
		Association("Participants").
		Count()

	if count > 0 {
		return model.ErrAlreadyExists
	}

	if err := r.db.Model(&camp).Association("Participants").Append(user); err != nil {
		return fmt.Errorf("failed to append participant: %w", err)
	}

	return nil
}

func (r *Repository) RemoveUserFromCamp(campID uint, user *model.User) error {
	var camp model.Camp

	if err := r.db.First(&camp, campID).Error; err != nil {
		return fmt.Errorf("failed to get camp: %w", err)
	}

	count := r.db.
		Model(&camp).
		Where(&model.User{
			TraqID: user.TraqID,
		}).
		Association("Participants").
		Count()

	if count == 0 {
		return model.ErrNotFound
	}

	if err := r.db.Model(&camp).Association("Participants").Delete(user); err != nil {
		return fmt.Errorf("failed to delete participant: %w", err)
	}

	return nil
}
