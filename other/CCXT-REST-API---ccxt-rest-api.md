# Deploy CCXT REST API on Railway

CCXT REST API — 100+ cryptocurrency exchanges via a simple HTTP interface

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ccxt-rest-api)

## About

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures.

This template runs as a single container with no external dependencies. It's a stateless REST API that proxies requests to public cryptocurrency exchange APIs in real-time — no database, no persistent storage, no volumes required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ccxt-rest-api | [INAPP-Mobile/ccxt-rest-api](https://github.com/INAPP-Mobile/ccxt-rest-api) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP server port. Must stay 8080 — it matches the Railway domain target port configured in this template. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/ccxt-rest-api)
