package api

import (
	"wiibucore-api/internal/handlers"

	"github.com/gorilla/mux"
)

func Auth(r *mux.Router) {
	router := r.PathPrefix("/auth").Subrouter()
	router.HandleFunc("/register", handlers.Register).Methods("POST")
}
