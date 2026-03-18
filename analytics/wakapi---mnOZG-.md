# Deploy wakapi on Railway

A minimalist, self-hosted WakaTime-compatible backend for coding statistics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mnOZG-)

## About

# Railway Wakapi instance

This project deploys a Wakapi instance to Railway. Wakapi is a language-agnostic developer analytics tool that allows you to track your coding activity.

## Deployment

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/mnOZG-?referralCode=KgmRt8)

## More Information

For more information about Wakapi, please refer to the original author's repository at [mutey/wakapi](https://github.com/muety/wakapi).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wakapi | `ghcr.io/muety/wakapi:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `ENVIRONMENT` | prod | - |
| `WAKAPI_DB_NAME` | /data/wakapi.db | database name for mysql / postgres or file path for sqlite (e.g. /data/wakapi.db) |
| `WAKAPI_DB_TYPE` | sqlite3 | Database type (one of sqlite3, mysql, postgres, cockroach) |
| `WAKAPI_LISTEN_IPV4` | 0.0.0.0 | - |
| `WAKAPI_ALLOW_SIGNUP` | true | Whether to enable user registration |
| `WAKAPI_PASSWORD_SALT` | (secret) | - |
| `WAKAPI_INSECURE_COOKIES` | false | - |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/`

**Category:** Analytics

[View on Railway →](https://railway.com/template/mnOZG-)
