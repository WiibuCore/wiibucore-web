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

func Login(w http.ResponseWriter, r *http.Request) {
	var login models.Login

	if err := json.NewDecoder(r.Body).Decode(&login); err != nil {
		utils.Response(w, 500, err.Error(), nil)
		return
	}

	var user models.User

	if err := config.DB.First(&user, "username = ?", login.Username).Error; err != nil {
		utils.Response(w, 404, "username or password doesnt exist", nil)
		return
	}

	if err := utils.VerifyPassword(user.Password, login.Password); err != nil {
		utils.Response(w, 404, "username or password doesnt exist", nil)
		return
	}

	token, err := utils.CreateToken(&user)
	if err != nil {
		utils.Response(w, 500, err.Error(), nil)
		return
	}

	utils.Response(w, 200, "Successfully", token)
}
