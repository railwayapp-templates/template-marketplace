# Deploy HeyForm | Open Source Typeform Alternative for Forms and Surveys on Railway

Self-hosted conversational form builder with logic and analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qmXJnq)

## About

HeyForm is an open-source form builder: conversational, one-question-at-a-time forms with logic jumps, file uploads, custom branding and built-in analytics. It covers what Typeform covers, with the submissions stored in your own database.

Three services — HeyForm itself, MongoDB for forms and submissions, and Redis for sessions and queues — with volumes on both data stores. Application secrets are generated per deployment, and the public URL is wired into the app automatically so share links and embeds work immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.0-alpine` | Database |
| HeyForm | `heyform/community-edition:v3.0.0` | Web service |
| MongoDB | `mongo:7.0.40` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `PORT` | HeyForm | 8000 | Just exists |
| `MONGO_URI` | HeyForm | - | Mongo URI |
| `REDIS_HOST` | HeyForm | - | Redis host |
| `REDIS_PORT` | HeyForm | - | Redis port |
| `SESSION_KEY` | HeyForm | - | Session encryption key |
| `REDIS_PASSWORD` | HeyForm | (secret) | Redis password |
| `APP_HOMEPAGE_URL` | HeyForm | - | Website homepage URL |
| `FORM_ENCRYPTION_KEY` | HeyForm | - | Form encryption key |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Start command:** `sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data --bind 0.0.0.0 ::'`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Start command:** `sh -c "if [ -f ./dist/main.js ]; then node --enable-source-maps ./dist/main.js; elif [ -f ./dist/src/main.js ]; then node --enable-source-maps ./dist/src/main.js; else node --enable-source-maps ./dist/packages/server/main.js; fi"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/qmXJnq)
