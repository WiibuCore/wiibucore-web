package handlers

import (
	"encoding/json"
	"net/http"

	"wiibucore-api/internal/models"
	"wiibucore-api/internal/utils"
	"wiibucore-api/pkg/config"
)

func Register(w http.ResponseWriter, r *http.Request) {
	var register *models.Register

	if err := json.NewDecoder(r.Body).Decode(&register); err != nil {
		utils.Response(w, 500, err.Error(), nil)
		return
	}

	defer r.Body.Close()

	if register.Password != register.PasswordConfirm {
		utils.Response(w, 400, "password doesn't match", nil)
		return
	}

	hashPassword, err := utils.HashingPassword(register.Password)
	if err != nil {
		utils.Response(w, 500, err.Error(), nil)
		return
	}

	user := models.User{
		Name:     register.Name,
		Username: register.Username,
		Password: hashPassword,
	}

	if err := config.DB.Create(&user).Error; err != nil {
		utils.Response(w, 500, err.Error(), nil)
		return
	}
	utils.Response(w, 201, "successfully", nil)
}
