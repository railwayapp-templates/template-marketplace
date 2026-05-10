# Deploy contactkit on Railway

Self-hostable contact form backend with a zero-dependency TypeScript SDK.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/contactkit)

## About

contactkit is a self-hostable contact form backend built with Fastify and TypeScript. It supports Resend and SMTP email providers out of the box and includes a zero-dependency TypeScript SDK for easy client integration.

Deploying contactkit on Railway takes one click. The template uses a multi-stage Dockerfile for minimal image size, includes a health check endpoint, and auto-restarts on failure. Configure your email provider (Resend or SMTP), set your sender/recipient addresses, and you're live. CORS origins and rate limiting are configurable via environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| contactkit | [dimeloper/contactkit](https://github.com/dimeloper/contactkit) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `EMAIL_PROVIDER` | resend |
| `RESEND_API_KEY` | (secret) |
| `ALLOWED_ORIGINS` | * |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/contactkit)
