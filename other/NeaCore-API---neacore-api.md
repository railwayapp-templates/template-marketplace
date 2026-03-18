# Deploy NeaCore-API on Railway

Deploy and Host NeaCore-API with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/neacore-api)

## About

---

Hosting NeaCore-API on Railway is the fastest way to get a secure Node.js backend into production. Railway takes care of build, deployment, environment variables, and scaling. Just connect your GitHub repo and deploy. You'll get CI/CD, custom domains, and logs—ideal for staging, production, and fast prototyping.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NeaAPI-Core | [NeaDigitra/NeaAPI-Core](https://github.com/NeaDigitra/NeaAPI-Core) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DB_HOST` | localhost | - |
| `DB_NAME` | database_name | Redis Configuration |
| `DB_PORT` | 3306 | - |
| `DB_USER` | (secret) | - |
| `APP_NAME` | NeaCore API | - |
| `APP_PORT` | 3000 | - |
| `APP_DEBUG` | false | - |
| `DB_CLIENT` | mysql | - |
| `REDIS_URL` | redis://localhost:6379 | - |
| `APP_VERSION` | 1.0.0 | - |
| `CORS_ORIGIN` | https://yourdomain.com,https://anotherdomain.com | - |
| `DB_PASSWORD` | (secret) | - |
| `CORS_MAX_AGE` | 86400 | - |
| `CORS_METHODS` | GET,POST | - |
| `ERROR_BASE_URL` | http://localhost:3000/errors | Database Configuration |
| `RATE_LIMIT_MAX` | 10 | - |
| `REDIS_PASSWORD` | (secret) | Rate Limit Configuration |
| `REDIS_USERNAME` | (secret) | - |
| `CORS_CREDENTIALS` | (secret) | - |
| `RATE_LIMIT_WINDOW` | 10 | - |
| `CORS_OPTIONS_STATUS` | 204 | - |
| `CORS_ALLOWED_HEADERS` | Content-Type,X-Signature,X-Secret | - |
| `CORS_EXPOSED_HEADERS` | Content-Length | - |
| `RATE_LIMIT_UPDATE_INTERVAL` | 3600000 | CORS Configuration |

## Configuration

- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/neacore-api)
