package model

import (
	"gorm.io/gorm"
)

type Participant struct {
    gorm.Model
    UserID  uint  
    User    User  `gorm:"foreignKey:UserID"` // 外部キーを明示
    EventID uint
}
