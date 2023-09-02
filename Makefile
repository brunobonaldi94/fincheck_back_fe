
DOCKER_COMPOSE=sudo docker-compose


up:
	$(DOCKER_COMPOSE) up -d --build

down:
	$(DOCKER_COMPOSE) down

build:
	$(DOCKER_COMPOSE) build

restart:
	$(DOCKER_COMPOSE) restart

logs:
	$(DOCKER_COMPOSE) logs -f

ps:
	$(DOCKER_COMPOSE) ps

purge:
	$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans

exec:
	$(DOCKER_COMPOSE) exec $(filter-out $@,$(MAKECMDGOALS)) /bin/sh
