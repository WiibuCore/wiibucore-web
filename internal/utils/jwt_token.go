package utils

import (
	"time"
	"wiibucore-api/internal/models"

	"github.com/golang-jwt/jwt/v5"
)

var mySigningKey = []byte("mysecretkey")

type ClaimsToken struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

func CreateToken(user *models.User) (string, error) {
	claims := ClaimsToken{
		user.ID,
		user.Name,
		user.Username,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(2 * time.Minute)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(mySigningKey)
	return ss, err
}
