package repository

import (
	"errors"

	"github.com/traP-jp/rucQ/backend/model"
	"gorm.io/gorm"
)

func (r *Repository) GetParticipants(eventID uint) ([]model.Participant, error) {
	var participants []model.Participant

	if err := r.db.
		Preload("User").
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
		Joins("JOIN users ON users.id = participants.user_id").
		Where("participants.event_id = ? AND users.traq_id = ?", participant.EventID, participant.User.TraqID).
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
    var participant model.Participant
    // 対象のレコードを取得
    if err := r.db.
        Joins("JOIN users ON users.id = participants.user_id").
        Where("participants.event_id = ? AND users.traq_id = ?", eventID, traqID).
        First(&participant).Error; err != nil {
        // レコードが見つからなくても、削除処理は成功と見なすなら nil を返す
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil
        }
        return err
    }

    // 取得したレコードを削除
    if err := r.db.Delete(&participant).Error; err != nil {
        return err
    }

    return nil
}
