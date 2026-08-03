# Deploy presidio-pii on Railway

Authenticated PII detection and anonymization API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/presidio-pii)

## About

Presidio detects personally identifiable information in text and applies configurable anonymization operators. This template deploys stable version 2.2.364 with analyzer and anonymizer services kept private behind an authenticated proxy.

Retrieve `BASIC_AUTH_USER` and the generated `BASIC_AUTH_PASSWORD` from the proxy service before calling `/analyze` and `/anonymize`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| anonymizer | [monotykamary/railway-template-presidio](https://github.com/monotykamary/railway-template-presidio) (root: /anonymizer) | Worker |
| proxy | [monotykamary/railway-template-presidio](https://github.com/monotykamary/railway-template-presidio) (root: /proxy) | Web service |
| analyzer | [monotykamary/railway-template-presidio](https://github.com/monotykamary/railway-template-presidio) (root: /analyzer) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | anonymizer | 3000 | Private Presidio Anonymizer HTTP port. |
| `PORT` | proxy | 8080 | Authenticated proxy port used by the Railway public domain. |
| `ANALYZER_URL` | proxy | - | Private Analyzer origin. Keep this service reference unchanged. |
| `ANONYMIZER_URL` | proxy | - | Private Anonymizer origin. Keep this service reference unchanged. |
| `BASIC_AUTH_USER` | proxy | (secret) | HTTP Basic username for Presidio endpoints. |
| `BASIC_AUTH_PASSWORD` | proxy | (secret) | Generated HTTP Basic password for Presidio endpoints. |
| `PORT` | analyzer | 3000 | Private Presidio Analyzer HTTP port. |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/presidio-pii)
