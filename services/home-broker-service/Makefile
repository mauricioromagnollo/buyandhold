# ==========================
API_SERVICE = home-broker-service
MONGO_DB_SERVICE = mongo-database
ENV = --env-file ./.env
# ==========================

prepare: mongodb home-broker-service
.PHONY: prepare

down:
	@docker-compose $(ENV) down
.PHONY: down

open:
	@docker exec -it $(API_SERVICE) /bin/bash
.PHONY: open

logs:
	@docker-compose $(ENV) logs -f $(API_SERVICE)
.PHONY: logs

home-broker-service:
	@docker-compose $(ENV) up -d --build $(API_SERVICE)
.PHONY: home-broker-service

mongodb:
	@docker-compose $(ENV) up -d --build $(MONGO_DB_SERVICE)
.PHONY: mongodb
