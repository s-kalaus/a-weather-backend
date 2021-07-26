development:
	@cd docker && docker-compose up -d --build

ssh:
	@cd docker && docker-compose exec weather-runner-development bash

ssh-nginx:
	@cd docker && docker-compose exec weather-nginx-development bash

down:
	@cd docker && docker-compose down

