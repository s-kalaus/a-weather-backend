development:
	@cd docker && docker-compose up -d --build

ssh:
	@cd docker && docker-compose exec weather-runner-development bash

ssh-nginx:
	@cd docker && docker-compose exec weather-nginx-development bash

down:
	@cd docker && docker-compose down

build:
	@docker build -t kalaus-weather -f docker/backend/Dockerfile .
	@docker tag kalaus-weather:latest kalaus/weather:latest
	@docker push kalaus/weather:latest
