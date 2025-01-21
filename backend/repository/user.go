package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) GetOrCreateUser(traqID string) (*model.User, error) {
	var user model.User

	if err := r.db.FirstOrCreate(&user, model.User{TraqID: traqID}).Error; err != nil {
		return nil, err
	}

	return &user, nil
}
