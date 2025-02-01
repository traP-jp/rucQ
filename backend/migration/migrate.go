package migration

import (
	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) error {
	if err := db.AutoMigrate(model.GetAllModels()...); err != nil {
		return err
	}

	return nil
}
