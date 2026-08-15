# Deploy Banana Slides on Railway

AI slide maker: turn prompts or files into editable PPTs with voice.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bananaslides)

## About

BananaSlides is an open-source AI presentation generator that creates slide decks from user prompts and content. It uses Google Gemini to generate presentation content and images, with configurable output language, request retries, concurrency, and generation timeouts. The application provides a self-hosted web interface for creating AI-powered presentations.

Hosting BananaSlides on Railway uses the published `xiaosong233/banana-slides-railway:latest` Docker image and exposes the Flask application on port `80`. Railway provides the public HTTP/HTTPS networking layer, while the container runs the application in production mode using its documented Supervisor startup command. The deployment requires a Google Gemini API key for AI generation and uses Railway-generated secrets for application security and access control.

BananaSlides does not require a separate database service or documented persistent volume for the supplied deployment. Configuration is managed through Railway Variables, including the Gemini API endpoint, output language, concurrency limits, retry settings, CORS configuration, and request timeout. Railway handles the public domain and TLS, so no separate reverse proxy is required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| banana-slides | `xiaosong233/banana-slides-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | Port the Flask application listens on |
| `FLASK_ENV` | production | Run Flask in production mode |
| `LOG_LEVEL` | INFO | Application logging level |
| `SECRET_KEY` | (secret) | Secret key for application security |
| `ACCESS_CODE` | - | Access code for application access |
| `CORS_ORIGINS` | * | Allowed CORS origins |
| `GENAI_TIMEOUT` | 300.0 | GenAI request timeout in seconds |
| `GOOGLE_API_KEY` | (secret) | Google Gemini API key |
| `GOOGLE_API_BASE` | https://generativelanguage.googleapis.com | Google Generative Language API base URL |
| `OUTPUT_LANGUAGE` | en | Default generated output language |
| `GENAI_MAX_RETRIES` | 2 | Maximum GenAI request retries |
| `MAX_IMAGE_WORKERS` | 8 | Maximum concurrent image workers |
| `AI_PROVIDER_FORMAT` | gemini | AI provider format |
| `MAX_DESCRIPTION_WORKERS` | 5 | Maximum concurrent description workers |

## Configuration

- **Start command:** `sh -c 'rm -f /etc/nginx/sites-enabled/default && exec /usr/bin/supervisord -c /app/docker/supervisord.conf'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/instance`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bananaslides)
