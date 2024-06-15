.PHONY: web api

all: web api

web:
	@echo "Starting Web with Astro..."
	cd web && bun dev &

api:
	@echo "Starting API with Go..."
	go run cmd/main.go