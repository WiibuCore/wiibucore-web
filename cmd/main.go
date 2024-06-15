package main

import (
	"log"
	"net/http"

	"wiibucore-api/pkg/api"
	"wiibucore-api/pkg/config"

	"github.com/gorilla/mux"
)

func main() {
	config.InitDB()

	r := mux.NewRouter()
	router := r.PathPrefix("/api").Subrouter()

	api.Auth(router)

	log.Println("server running on port 8000")
	http.ListenAndServe(":8000", router)
}
