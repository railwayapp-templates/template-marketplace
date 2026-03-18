# Deploy Cursor + Claude Node.js Auth Microservices on Railway

AI-enhanced, auth system, microservices architecture

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ai-enabled-nodejs-microservices-starter)

## About

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/clintgallivan/ai-enabled-nodejs-microservices-starter)
An AI-enhanced TypeScript microservices starter with complete authentication, Redis queuing, email processing, and token cleanup services. Pre-configured for Claude Code and Cursor IDE with production-ready architecture, Docker containerization, and one-click Railway deployment for rapid development and scaling.

Hosting this microservices starter involves deploying multiple interconnected services: a main API, email processing microservice, and token cleanup service, along with PostgreSQL and Redis infrastructure. Railway automatically provisions and connects all services, runs database migrations, and configures environment variables. The template includes built-in health checks, structured logging, JWT authentication with refresh tokens, and queue-based email processing for production reliability.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis-Z6Fh | `bitnami/redis:7.2.5` | Database |
| primary-service | [clintgallivan/ai-enabled-nodejs-microservices-starter](https://github.com/clintgallivan/ai-enabled-nodejs-microservices-starter) | Web service |
| token-cleanup | [clintgallivan/ai-enabled-nodejs-microservices-starter](https://github.com/clintgallivan/ai-enabled-nodejs-microservices-starter) (root: /microservices/token-cleanup) | Worker |
| Postgres-eU1G | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| email-service | [clintgallivan/ai-enabled-nodejs-microservices-starter](https://github.com/clintgallivan/ai-enabled-nodejs-microservices-starter) (root: /microservices/email-service) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis-Z6Fh | - | Railway Private Domain Name. |
| `REDISPORT` | Redis-Z6Fh | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis-Z6Fh | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis-Z6Fh | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis-Z6Fh | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis-Z6Fh | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis-Z6Fh | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis-Z6Fh | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis-Z6Fh | no | Disable writing to AOF file. |
| `JWT_SECRET` | primary-service | (secret) | - |
| `LOGS_SECRET` | primary-service | (secret) | - |
| `HEALTH_SECRET` | primary-service | (secret) | - |
| `ALLOWED_ORIGINS` | primary-service | YOUR-CLIENT-HOST(S) | - |
| `AUTH_RATE_LIMIT` | primary-service | 50 | - |
| `ADMIN_RATE_LIMIT` | primary-service | 50 | - |
| `PUBLIC_RATE_LIMIT` | primary-service | 100 | - |
| `GENERAL_RATE_LIMIT` | primary-service | 1000 | - |
| `PASSWORD_RATE_LIMIT` | primary-service | (secret) | - |
| `LOGS_TOKEN_EXPIRES_IN` | primary-service | (secret) | - |
| `AUTH_RATE_LIMIT_WINDOW` | primary-service | 15m | - |
| `ACCESS_TOKEN_EXPIRES_IN` | primary-service | (secret) | - |
| `ADMIN_RATE_LIMIT_WINDOW` | primary-service | 5m | - |
| `HEALTH_TOKEN_EXPIRES_IN` | primary-service | (secret) | - |
| `PUBLIC_RATE_LIMIT_WINDOW` | primary-service | 1m | - |
| `REFRESH_TOKEN_EXPIRES_IN` | primary-service | (secret) | - |
| `GENERAL_RATE_LIMIT_WINDOW` | primary-service | 15m | - |
| `PASSWORD_RATE_LIMIT_WINDOW` | primary-service | (secret) | - |
| `EMAIL_VERIFY_TOKEN_EXPIRES_IN` | primary-service | (secret) | - |
| `PASSWORD_RESET_TOKEN_EXPIRES_IN` | primary-service | (secret) | - |
| `TIMEZONE` | token-cleanup | UTC | - |
| `LOG_LEVEL` | token-cleanup | info | - |
| `SERVICE_NAME` | token-cleanup | token-cleanup | - |
| `SERVICE_VERSION` | token-cleanup | 1.0.0 | - |
| `CLEANUP_SCHEDULE` | token-cleanup | 0 */6 * * * | - |
| `POSTGRES_DB` | Postgres-eU1G | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres-eU1G | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres-eU1G | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres-eU1G | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres-eU1G | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | email-service | 6379 | - |
| `BASE_URL` | email-service | YOUR APP URL (IT WILL BE USED FOR REDIRECTS SENT IN EMAILS) | - |
| `FROM_NAME` | email-service | YOUR_APP_NAME | - |
| `LOG_LEVEL` | email-service | info | - |
| `SMTP_HOST` | email-service | GET_THIS_FROM_YOUR_EMAIL_PROVIDER | - |
| `SMTP_PASS` | email-service | GET_THIS_FROM_YOUR_EMAIL_PROVIDER | - |
| `SMTP_PORT` | email-service | 587 | - |
| `SMTP_USER` | email-service | (secret) | - |
| `FROM_EMAIL` | email-service | YOUR_APP_EMAIL_ADDRESS (COULD BE NO REPLY) | - |
| `SMTP_SECURE` | email-service | false | - |
| `EMAIL_PROVIDER` | email-service | nodemailer (POSSIBLE TO SWITCH THIS) | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `NODE_ENV=production node dist/server.js`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/logs`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/ai-enabled-nodejs-microservices-starter)
