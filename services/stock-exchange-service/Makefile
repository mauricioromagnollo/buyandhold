test:
	go test ./...
.PHONY: test

dev:
	@docker-compose up -d && APP_ENV=development go run cmd/trade/main.go
.PHONY: dev

down:
	@docker-compose down
.PHONY: down
