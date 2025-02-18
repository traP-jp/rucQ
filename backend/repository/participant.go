package repository

import (
	"errors"

	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/gorm"
)

func (r *Repository) GetParticipants(eventID uint) ([]model.Participant, error) {
	var participants []model.Participant

	if err := r.db.
		Where("event_id = ?", eventID).
		Find(&participants).
		Error; err != nil {
		return nil, err
	}

	return participants, nil
}

func (r *Repository) RegisterEvent(participant model.Participant) error {
	var existing model.Participant
	err := r.db.
		Where("event_id = ? AND user_traq_id = ?", participant.EventID, participant.User.TraqID).
		First(&existing).Error
	if err == nil {
		// 同じデータが見つかった場合は作成せずに終了
		return nil
	} else if !errors.Is(err, gorm.ErrRecordNotFound) {
		// 他のエラーが発生した場合はエラーを返す
		return err
	}

	if err := r.db.Create(&participant).Error; err != nil {
		return err
	}

	return nil
}

func (r *Repository) UnregisterEvent(eventID uint, traqID string) error {
	if err := r.db.
		Where("event_id = ? AND user_traq_id = ?", eventID, traqID).
		Delete(&model.Participant{}).
		Error; err != nil {
		return err
	}

	return nil
}
