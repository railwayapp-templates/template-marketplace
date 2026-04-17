# Deploy casdoor on Railway

Agent-first Identity and Access Management (IAM) /LLM MCP & agent gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/casdoor)

## About

Casdoor runs as a single Dockerized IAM/SSO service on Railway using the official all-in-one image. This gives you a fast browser-ready deployment with built-in SQLite for evaluation and demos.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| casdoor | `casbin/casdoor-all-in-one:3.18.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8000 |
| `ADMIN_PASSWORD` | (secret) |
| `ADMIN_USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/casdoor)
