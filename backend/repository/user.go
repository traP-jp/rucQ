package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) GetOrCreateUser(traqID string) (*model.User, error) {
	var user model.User

	if err := r.db.FirstOrCreate(&user, model.User{TraqID: traqID}).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *Repository) GetStaffs() ([]model.User, error) {
	var staffs []model.User

	if err := r.db.Where(&model.User{IsStaff: true}).Find(&staffs).Error; err != nil {
		return nil, err
	}

	return staffs, nil
}

func (r *Repository) SetUserIsStaff(user *model.User, isStaff bool) error {
	if err := r.db.Model(user).Update("is_staff", isStaff).Error; err != nil {
		return err
	}

	return nil
}
