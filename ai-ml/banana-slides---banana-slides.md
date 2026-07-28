# Deploy banana-slides on Railway

AI-native slide generation with templates, editing, and PPTX export

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/banana-slides)

## About

Banana Slides runs as a single all-in-one Docker service on Railway, combining its React web interface, Nginx gateway, and Flask API behind one public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/banana-slides-railway:v0.9.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |
| `FLASK_ENV` | production |
| `LOG_LEVEL` | INFO |
| `SECRET_KEY` | (secret) |
| `CORS_ORIGINS` | * |
| `GENAI_TIMEOUT` | 300.0 |
| `GOOGLE_API_KEY` | (secret) |
| `GOOGLE_API_BASE` | https://generativelanguage.googleapis.com |
| `OUTPUT_LANGUAGE` | en |
| `GENAI_MAX_RETRIES` | 2 |
| `MAX_IMAGE_WORKERS` | 8 |
| `AI_PROVIDER_FORMAT` | gemini |
| `MAX_DESCRIPTION_WORKERS` | 5 |

## Configuration

- **Start command:** `sh -c 'rm -f /etc/nginx/sites-enabled/default && exec /usr/bin/supervisord -c /app/docker/supervisord.conf'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/instance`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/banana-slides)
