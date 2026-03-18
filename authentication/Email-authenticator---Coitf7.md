# Deploy Email authenticator on Railway

Email Authentication service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Coitf7)

## About

## Email Authenticator

This service sends one time passwords to the users of your apps. websites etc. You can use this to generate and verify user emails.

### How to use this Template?

/send-verification-mail is a POST method endpoint which takes 
{"email", "access_key"} in body

/verify-code is also a POST method endpoint which takes
{"email", "access_key", "code"} in body and returns status of the verification.


By default code will disappear in 15 minutes but you can change that.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| API | [AshweenMankash/MagicLinkGenerator](https://github.com/AshweenMankash/MagicLinkGenerator) | Web service |
| Redis | `bitnami/redis` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BROKER` | API | - | Redis database url |
| `SECRET` | API | (secret) | Secret access token to verify your identity |
| `SMTP_PORT` | API | - | SMTP server port |
| `SMTP_SERVER` | API | - | SMTP server host |
| `MAIL_ADDRESS` | API | - | Your email by which you want to send verification emails |
| `SERVICE_NAME` | API | - | This will show up in your verification mail as the name of your service |
| `MAIL_PASSWORD` | API | (secret) | Password of your email address |
| `REDISHOST` | Redis | - | Public host |
| `REDISPORT` | Redis | - | Public port |
| `REDISUSER` | Redis | default | Default user |
| `REDIS_URL` | Redis | - | Public URL |
| `REDISPASSWORD` | Redis | (secret) | Default password |
| `REDIS_PASSWORD` | Redis | (secret) | Default password |
| `REDISHOST_PRIVATE` | Redis | - | Private host |
| `REDISPORT_PRIVATE` | Redis | 6379 | Private port |
| `REDIS_PRIVATE_URL` | Redis | - | Private URL |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Authentication · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/Coitf7)
