package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) GetEvents() ([]model.Event, error) {
	var events []model.Event

	if err := r.db.Find(&events).Error; err != nil {
		return nil, err
	}

	return events, nil
}

func (r *Repository) CreateEvent(event *model.Event) (eventID int, err error) {
	if err := r.db.Create(event).Error; err != nil {
		return 0, err
	}

	return int(event.ID), nil
}
