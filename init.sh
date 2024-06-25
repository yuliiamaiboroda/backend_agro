#!/bin/sh

set -e

Color_Off='\033[0m'
Green='\033[0;32m'

init(){
    git submodule update --init --remote --recursive

    if [ "$(docker network ls --format "{{.Name}}" | grep -w traefik)" != "traefik" ]; then
        docker network create traefik > /dev/null
        echo "${Green}Created docker network traefik $Color_Off"
    fi

    if [ ! -f ".env" ]; then
        cat > .env << EOF
# MongoDB
MONGO_CONNECTION_STRING=mongodb://root:verysecret@db/?retryWrites=true&w=majority

# JWT
JWT_SECRET=3600
JWT_SECRET_REFRESH=refreshtoken
JWT_EXPIRATION=expiration
JWT_REFRESH_EXPIRATION=605000

# CLOUDINARY
CLOUDINARY_NAME=agrohimpromcenter
CLOUDINARY_KEY=123456789
CLOUDINARY_SECRET=verysecret

# NODEMAILER
MAIL_SENDER_HOST=smtp.gmail.com
MAIL_SENDER_PORT=465
MAIL_SENDER_EMAIL=noreply@gmail.com
MAIL_SENDER_PASSWORD=secret

# URL
REACT_APP_URL=http://localhost:8080
NEXT_APP_URL=http://localhost:8080

# Docker settings
COMPOSE_PROJECT_NAME=ahrohimpromcentr
APP_HOST=localhost
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=verysecret
MONGO_INITDB_DATABASE=example
EOF
    fi

    if [ ! -f "./frontend/.env" ]; then
        cat > ./frontend/.env << EOF
# Google API Key
NEXT_APP_GOOGLE_API_KEY=1234

# Base URL
NEXT_PUBLIC_BASE_URL=http://api.localhost:8080
EOF
    fi

    if [ ! -f "./admin/.env" ]; then
        cat > ./admin/.env << EOF
REACT_APP_BASE_URL=http://api.localhost:8080
PUBLIC_URL=http://localhost:8080/admin-panel-agro
EOF
    fi

    if [ ! -f "docker-compose.override.yaml" ]; then
        cp -v docker-compose.override.yaml.example docker-compose.override.yaml
    fi
}

init
