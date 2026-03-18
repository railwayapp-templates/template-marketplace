# Deploy PlayNex on Railway

A robust backend with interactive RESTful API's for a video streaming

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zYfM2t)

## About

PlayNex is a robust backend for a YouTube-like video streaming application, integrating MongoDB for data persistence and Cloudinary for media management. It provides secure, RESTful API endpoints documented using Swagger for ease of development and testing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playnex-backend | [bgmanu2426/playnex-backend](https://github.com/bgmanu2426/playnex-backend) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | This is used in development only |
| `DB_NAME` | playnex | geneate suing openssl rand -base64 64 |
| `MONGO_URI` | mongodb://localhost:27017 | - |
| `CLIENT_URL` | * | - |
| `SERVER_URL` | http://localhost:8000 | - |
| `CLOUDINARY_API_KEY` | (secret) | - |
| `ACCESS_TOKEN_EXPIRY` | (secret) | - |
| `ACCESS_TOKEN_SECRET` | (secret) | - |
| `REFRESH_TOKEN_EXPIRY` | (secret) | - |
| `REFRESH_TOKEN_SECRET` | (secret) | - |
| `CLOUDINARY_API_SECRET` | (secret) | - |
| `CLOUDINARY_CLOUD_NAME` | CLOUDINARY_CLOUD_NAME | - |

## Configuration

- **Start command:** `npm run dev`

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/zYfM2t)
