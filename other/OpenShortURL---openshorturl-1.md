# Deploy OpenShortURL on Railway

Open-source URL shortener with analytics, custom slugs, QR codes & API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openshorturl-1)

## About

OpenShortURL is a modern, self-hosted URL shortener with advanced analytics and security features. Built with NestJS, Next.js 16, and React 19, it provides custom slugs, password protection, UTM tracking, two-factor authentication, link bundles for organization, bot detection and filtering, comprehensive click analytics, QR code generation, and AI-powered features including a built-in chat assistant (supporting Anthropic Claude, OpenAI GPT, Google Gemini, Mistral, and Cohere) and Model Context Protocol (MCP) integration for managing URLs through external AI tools like Claude Desktop.

Deploying OpenShortURL on Railway provides a complete URL shortening solution with minimal configuration. The platform includes a NestJS backend API, Next.js frontend dashboard, PostgreSQL database, and Redis for caching. It features a built-in AI chat assistant for managing URLs through natural conversation (optional, requires AI provider API key), link bundles for organizing URLs into collections, automatic bot detection and filtering, Cloudflare Turnstile integration, JWT-based authentication with httpOnly cookies, and real-time analytics including geolocation tracking, device detection, browser analysis, and referrer statistics. The entire stack deploys automatically with Railway's infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| frontend | `ghcr.io/supra126/open-short-url-frontend:latest` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17.7` | Database |
| backend | `ghcr.io/supra126/open-short-url-backend:latest` | Worker |
| Redis | `redis:8.4.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AI_MODEL` | frontend | - | AI model name (e.g., claude-3-5-sonnet-20241022, gpt-4o, gemini-2.0-flash-exp) |
| `AI_PROVIDER` | frontend | - | AI provider: anthropic, openai, or google (optional, leave empty to disable AI features) |
| `GOOGLE_API_KEY` | frontend | (secret) | Google API key for Gemini models (optional, required if AI_PROVIDER=google) |
| `OPENAI_API_KEY` | frontend | (secret) | OpenAI API key for GPT models (optional, required if AI_PROVIDER=openai) |
| `ANTHROPIC_API_KEY` | frontend | (secret) | Anthropic API key for Claude models (optional, required if AI_PROVIDER=anthropic) |
| `NEXT_PUBLIC_LOCALE` | frontend | en | Default language locale (en, zh-TW, zh-CN, ja, ko) |
| `NEXT_PUBLIC_API_URL` | frontend | - | Backend API URL (auto-configured from backend service) |
| `NEXT_PUBLIC_BRAND_NAME` | frontend | Open Short URL | Your brand name displayed in the frontend |
| `NEXT_PUBLIC_BRAND_ICON_URL` | frontend | - | URL to your brand icon/favicon (optional, e.g., https://yourdomain.com/icon.png) |
| `NEXT_PUBLIC_SHORT_URL_DOMAIN` | frontend | - | Domain for displaying short URLs (auto-configured from backend) |
| `NEXT_PUBLIC_BRAND_DESCRIPTION` | frontend | - | description": "Brand description for SEO meta tags (optional) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | frontend | - | Cloudflare Turnstile site key for bot protection (optional, must match backend key) |
| `POSTGRES_DB` | Postgres | open_short_url | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `PORT` | backend | 8080 | Backend server port (Railway will auto-assign if empty) |
| `SMTP_FROM` | backend | - | Email sender address (optional, for password reset emails) |
| `SMTP_HOST` | backend | - | SMTP server hostname (optional, e.g., smtp.gmail.com) |
| `SMTP_PORT` | backend | - | SMTP server port (optional, typically 587 for TLS) |
| `SMTP_USER` | backend | (secret) | SMTP username for authentication (optional) |
| `BRAND_NAME` | backend | Open Short URL | Your brand name displayed in the application |
| `JWT_SECRET` | backend | (secret) | Secret key for JWT token encryption (auto-generated) |
| `REDIS_HOST` | backend | - | Redis server hostname (auto-configured from Redis service) |
| `REDIS_PORT` | backend | - | Redis server port (auto-configured from Redis service) |
| `CORS_ORIGIN` | backend | - | Allowed CORS origin (auto-configured from frontend URL) |
| `DATABASE_URL` | backend | - | PostgreSQL connection URL (auto-configured from Postgres service) |
| `FRONTEND_URL` | backend | - | Frontend application URL (auto-configured) |
| `THROTTLE_TTL` | backend | 60 | Rate limiting time window in seconds (default: 60 seconds) |
| `COOKIE_DOMAIN` | backend | up.railway.app | ADVANCED: Override auto-detected cookie domain (leave empty for automatic detection based on FRONTEND_URL, e.g., app.example.com -> .example.com) |
| `SMTP_PASSWORD` | backend | (secret) | SMTP password for authentication (optional) |
| `BRAND_LOGO_URL` | backend | - | URL to your brand logo image (optional, e.g., https://yourdomain.com/logo.png) |
| `JWT_EXPIRES_IN` | backend | 7d | JWT token expiration time (e.g., 7d, 24h, 30m) |
| `REDIS_PASSWORD` | backend | (secret) | Redis password (auto-configured from Redis service) |
| `THROTTLE_LIMIT` | backend | 10 | Maximum requests per time window (default: 10 requests per minute) |
| `SHORT_URL_DOMAIN` | backend | - | Domain for short URLs (e.g., go.yourdomain.com or RAILWAY_PUBLIC_DOMAIN) |
| `TURNSTILE_SITE_KEY` | backend | - | Cloudflare Turnstile site key for bot protection (optional, get from cloudflare.com) |
| `WEBHOOK_SECRET_KEY` | backend | (secret) | Secret key for webhook payload signing and encryption |
| `TURNSTILE_SECRET_KEY` | backend | (secret) | Cloudflare Turnstile secret key for bot protection (optional, get from cloudflare.com) |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openshorturl-1)
