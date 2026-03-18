# Deploy NestJS Starter on Railway

Starter for BFF, API Rest and microservice with NestJS

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/BOGqHd)

## About

NestJS is a progressive Node.js framework for creating efficient, reliable and scalable server-side applications, which is built and fully compatible with TypeScript and JavaScript, combining elements of object-oriented programming, functional programming and functional reactive programming.

Demo: https://nestjs-starter.tresdoce.com.ar/v1/docs

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tresdoce-nestjs-starter | [rudemex/nestjs-starter](https://github.com/rudemex/nestjs-starter) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `CONTEXT` | v1 |
| `ORIGINS` | http://localhost:3000,http://localhost:8080 |
| `TEST_KEY` | testKeyEnv-railway |
| `APP_STAGE` | prod |
| `API_PREFIX` | API-PREFIX |
| `CORS_ENABLED` | true |
| `SWAGGER_PATH` | docs |
| `ALLOWED_HEADERS` | Content-Type,Authorization,Set-Cookie,Access-Control-Allow-Origin,Cache-Control,Pragma |
| `ALLOWED_METHODS` | GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS |
| `SWAGGER_ENABLED` | true |
| `CORS_CREDENTIALS` | (secret) |
| `TRACING_ENDPOINT` | https://opentelemetry-jaeger-url-collector/v1/traces |
| `PROPAGATE_HEADERS` | x-custom-header |
| `RICK_AND_MORTY_API_URL` | https://rickandmortyapi.com/api |
| `RICK_AND_MORTY_API_URL_LIVENESS` | /api/character/1 |

## Configuration

- **Start command:** `yarn start`
- **Healthcheck:** `health/liveness`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/BOGqHd)
