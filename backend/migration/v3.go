package migration

import (
	"fmt"

	"github.com/go-gormigrate/gormigrate/v2"
	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/gorm"
)

// budgetsテーブルを削除し、UserIDを使う形式に戻す
func v3() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "3",
		Migrate: func(db *gorm.DB) error {
			if err := db.Migrator().DropTable("budgets"); err != nil {
				return fmt.Errorf("failed to drop budgets table: %w", err)
			}

			return db.AutoMigrate(model.GetAllModels()...)
		},
	}
}
