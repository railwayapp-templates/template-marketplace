# Deploy Evolution API Standalone on Railway

[Jun'26] The cheapest self-hosted WhatsApp REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/evolution-api-standalone)

## About

Evolution API Standalone is an ultra-light Evolution API deployment template for Railway. It runs Evolution API without external database or Redis services, making it a simple and low-cost option for users who want to quickly deploy a WhatsApp HTTP REST API backend with persistent volume storage.

Hosting Evolution API Standalone on Railway gives you a fast way to run Evolution API with minimal infrastructure. This template does not include PostgreSQL, MySQL, or Redis. Instead, it focuses on a lightweight setup using the Evolution API service and a Railway volume for persistent instance-related files.

This setup is useful for demos, testing, personal projects, lightweight automation, or users who want the cheapest possible way to start using Evolution API. Railway handles service deployment, networking, environment variables, public domain setup, and persistent volume storage.

Because this template does not use an external database, it is best suited for simple usage, testing, and lightweight WhatsApp automation. For more reliable production workloads, consider using a database-backed Evolution API setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| evolution-api | `evoapicloud/evolution-api:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `CACHE_LOCAL_ENABLED` | true |
| `CACHE_REDIS_ENABLED` | false |
| `AUTHENTICATION_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/evolution/instances`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/evolution-api-standalone)
