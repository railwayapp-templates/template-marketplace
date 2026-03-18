# Deploy trivyal on Railway

Create and play fun trivia games with friends!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/4fD3YO)

## About

# Trivyal

Trivyal is a trivia game app that everyone can use to play trivia games.
Users can sign up for an account to be able to create games and host them, or just play hosted live games without creating an account

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/4fD3YO?referralCode=androidquartz)

## Original Blog Post on Railway

[Deploying a Dart app in Railway](https://blog.railway.com/p/deploy-a-dart-app-part-2)

## Features

- **Realtime**: All players see the same questions simultaneously and have a chance to answer during the question time

- **Speed Boost**: Fast answers are rewarded with bonus points.

- **You're the Maestro**: As the host, control the pace and reveal answers at your command.

- **Big Screen, Small Screen**: Hosts can display the game on a big screen, while players answer on their phones.

- **Podium Showdown**: Players can see how they stack up against each other after each question.

## Screenshots

![Login Screen](screenshots/login-screen.png)
![Edit Game with questions](screenshots/edit-game-with-questions.gif)
![Full demo](screenshots/full-demo.gif)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trivyal-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| trivyal | [Andrew-Bekhiet/trivyal](https://github.com/Andrew-Bekhiet/trivyal) | Worker |
| Caddy reverse proxy | [Andrew-Bekhiet/serverpod-caddy-reverse-proxy](https://github.com/Andrew-Bekhiet/serverpod-caddy-reverse-proxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | trivyal-postgres | railway | - |
| `POSTGRES_USER` | trivyal-postgres | (secret) | - |
| `POSTGRES_PASSWORD` | trivyal-postgres | (secret) | - |
| `UTILS_SECRETS_DART` | trivyal | (secret) | Base64 encoded secrets.dart containing googleServerClientId string |
| `SERVERPOD_DATABASE_PORT` | trivyal | 5432 | Postgres db port |
| `SERVERPOD_DATABASE_USER` | trivyal | (secret) | - |
| `CONFIG_GOOGLE_CLIENT_SECRET` | trivyal | (secret) | Base64 encoded google_client_secret.json |
| `SERVERPOD_DATABASE_PASSWORD` | trivyal | (secret) | - |
| `SERVERPOD_DATABASE_REQUIRE_SSL` | trivyal | true | - |
| `BACKEND_PORT` | Caddy reverse proxy | 8080 | Serverpod backend port |
| `FRONTEND_PORT` | Caddy reverse proxy | 8082 | Serverpod frontend port |
| `BACKEND_DOMAIN` | Caddy reverse proxy | - | Serverpod service's Railway provided domain |
| `FRONTEND_DOMAIN` | Caddy reverse proxy | - | Serverpod service's Railway provided domain |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/4fD3YO)
