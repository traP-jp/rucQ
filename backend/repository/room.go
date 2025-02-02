package repository

import (
	"errors"

	"github.com/go-sql-driver/mysql"
	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/gorm"
)

func (r *Repository) GetRooms() ([]model.Room, error) {
	var rooms []model.Room

	if err := r.db.Preload("Members").Find(&rooms).Error; err != nil {
		return nil, err
	}

	return rooms, nil
}

func (r *Repository) GetRoomByID(id uint) (*model.Room, error) {
	var room model.Room

	if err := r.db.Preload("Members").Where(&model.Room{
		Model: gorm.Model{
			ID: id,
		},
	}).First(&room).Error; err != nil {
		return nil, err
	}

	return &room, nil
}

func (r *Repository) CreateRoom(room *model.Room) error {
	if err := r.db.Create(room).Error; err != nil {
		var mysqlErr *mysql.MySQLError

		if errors.As(err, &mysqlErr) && mysqlErr.Number == 1062 {
			return model.ErrAlreadyExists
		}

		return err
	}

	return nil
}

func (r *Repository) UpdateRoom(room *model.Room) error {
	return r.db.Save(room).Error
}
