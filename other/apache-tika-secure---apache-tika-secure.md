# Deploy apache-tika-secure on Railway

Authenticated document text and metadata extraction API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-tika-secure)

## About

Apache Tika extracts text and metadata from more than a thousand document formats. This template deploys the stable official `3.3.1.0-full` container behind an authenticated Caddy proxy.

Retrieve the generated `BASIC_AUTH_USER` and `BASIC_AUTH_PASSWORD` values from the proxy service before calling parsing endpoints.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | [monotykamary/railway-template-apache-tika](https://github.com/monotykamary/railway-template-apache-tika) (root: /proxy) | Web service |
| tika | [monotykamary/railway-template-apache-tika](https://github.com/monotykamary/railway-template-apache-tika) (root: /tika) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 8080 | Internal authenticated proxy port used by the Railway public domain. |
| `TIKA_URL` | proxy | - | Private Apache Tika origin. Keep this service reference unchanged. |
| `BASIC_AUTH_USER` | proxy | (secret) | HTTP Basic username required for all parsing endpoints. |
| `BASIC_AUTH_PASSWORD` | proxy | (secret) | Generated HTTP Basic password for the public parsing API. |
| `PORT` | tika | 9998 | Apache Tika Server HTTP port used on Railway private networking. |
| `JAVA_TOOL_OPTIONS` | tika | -Djava.awt.headless=true -XX:MaxRAMPercentage=75.0 | Runs headless and keeps the JVM heap within the Railway container memory limit. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/tika`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/apache-tika-secure)
