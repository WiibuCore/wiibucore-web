package models

type User struct {
	ID       int `gorm:"primaryKey"`
	Name     string
	Username string
	Password string
}

type Register struct {
	Name            string `json:"name"`
	Username        string `json:"username"`
	Password        string `json:"password"`
	PasswordConfirm string `json:"password_confirm"`
}

type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
