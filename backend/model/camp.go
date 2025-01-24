package model

type Camp struct {
	ID          string `gorm:"primaryKey"`
	Name        string
	Description string
	IsDraft     bool
}
