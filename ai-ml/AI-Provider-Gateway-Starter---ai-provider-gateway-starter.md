# Deploy AI Provider Gateway Starter on Railway

9Router with generated login, persistent config and your own AI providers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-provider-gateway-starter)

## About

9Router with generated login, persistent config and your own AI providers.

This deployment fork provisions 9router. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | `decolua/9router@sha256:5fc7020f3cf1ca6831bffe80314ecab9dde915d27ee3c479a4bb66f45dabbc27` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | Port used by the 9Router web application |
| `BASE_URL` | - | Public URL used by the server-side application |
| `DATA_DIR` | /app/data | Directory used to store persistent application data |
| `HOSTNAME` | 0.0.0.0 | Listen on all network interfaces inside the container |
| `NODE_ENV` | production | Run 9Router in production mode |
| `CLOUD_URL` | https://9router.com | Official 9Router cloud service URL |
| `JWT_SECRET` | (secret) | Secret used to sign and verify JWT authentication tokens |
| `API_KEY_SECRET` | (secret) | Secret used to secure and generate API credentials |
| `MACHINE_ID_SALT` | - | Random salt used when generating machine-specific identifiers |
| `INITIAL_PASSWORD` | (secret) | Generated password for the first dashboard login. |
| `NEXT_PUBLIC_BASE_URL` | - | Public application URL exposed to the browser |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com | Official 9Router cloud URL exposed to the frontend |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ai-provider-gateway-starter)
