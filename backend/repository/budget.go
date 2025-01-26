package repository

import "github.com/traP-jp/rucQ/backend/model"

func (r *Repository) GetBudgetByUserID(userID uint) (*model.Budget, error) {
	defaultCamp, err := r.GetDefaultCamp()

	if err != nil {
		return nil, err
	}

	var budget model.Budget

	if err := r.db.
		Where(&model.Budget{
			UserID: userID,
			CampID: defaultCamp.ID,
		}).
		FirstOrCreate(&budget).
		Error; err != nil {
		return nil, err
	}

	return &budget, nil
}

func (r *Repository) UpdateBudget(budget *model.Budget) error {
	return r.db.Save(budget).Error
}
