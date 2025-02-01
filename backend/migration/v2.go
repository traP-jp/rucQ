package migration

import (
	"fmt"

	"github.com/go-gormigrate/gormigrate/v2"
	"gorm.io/gorm"
)

type v2OldBudget struct {
	gorm.Model
	UserID      *uint
	CampID      uint
	Amount      *uint
	AmmountPaid uint
	UserTraqID  *string
}

func (v2OldBudget) TableName() string {
	return "budgets"
}

type v2NewBudget struct {
	gorm.Model
	UserTraqID string `gorm:"index;constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;foreignKey:UserTraqID;references:TraqID"`
	CampID     uint   `gorm:"index;constraint:OnUpdate:RESTRICT,OnDelete:RESTRICT;foreignKey:CampID;references:ID"`
	Amount     *uint
	AmountPaid uint
}

func (v2NewBudget) TableName() string {
	return "budgets"
}

type v2User struct {
	gorm.Model
	TraqID   string `gorm:"primaryKey"`
	IsStaff  bool   `gorm:"index"`
	TraqUuid string

	Budgets []v2NewBudget
}

func (v2User) TableName() string {
	return "users"
}

func v2() *gormigrate.Migration {
	return &gormigrate.Migration{
		ID: "2",
		Migrate: func(db *gorm.DB) error {
			var oldBudgets []v2OldBudget

			if err := db.Find(&oldBudgets).Error; err != nil {
				return fmt.Errorf("failed to get old budgets: %w", err)
			}

			newBudgets := make([]v2NewBudget, 0, len(oldBudgets))

			for _, oldBudget := range oldBudgets {
				if oldBudget.UserID == nil {
					continue
				}

				var user v2User

				if err := db.First(&user, *oldBudget.UserID).Error; err != nil {
					return fmt.Errorf("failed to get user: %w", err)
				}

				newBudgets = append(newBudgets, v2NewBudget{
					UserTraqID: user.TraqID,
					CampID:     oldBudget.CampID,
					Amount:     oldBudget.Amount,
					AmountPaid: oldBudget.AmmountPaid,
				})
			}

			if err := db.Migrator().DropTable(&v2OldBudget{}); err != nil {
				return fmt.Errorf("failed to drop old budgets table: %w", err)
			}

			if err := db.Migrator().CreateTable(&v2NewBudget{}); err != nil {
				return fmt.Errorf("failed to create new budgets table: %w", err)
			}

			if err := db.Create(newBudgets).Error; err != nil {
				return fmt.Errorf("failed to insert new budgets: %w", err)
			}

			return nil
		},
	}
}
