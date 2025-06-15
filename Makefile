.PHONY: build
.PHONY: up
.PHONY: stop
.PHONY: restart
.PHONY: down
.PHONY: bash

build:
	docker-compose build

up:
	docker-compose up -d

stop:
	docker-compose stop

restart:
	docker-compose restart

down:
	docker-compose down

bash:
	docker-compose exec frontend bash
