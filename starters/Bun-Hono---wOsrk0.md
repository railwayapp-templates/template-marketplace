# Deploy Bun + Hono on Railway

A Bun + Hono Starter with Health Check, Route Grouping, Cors and more!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wOsrk0)

## About

This is a barebones starter template for a Bun project using the Hono web framework. It provides a simple foundation to build a web application with binary compilation, route grouping, CORS setup, and health check endpoints. This template is ready to be deployed on Railway.

We utilize a multi-stage Dockerfile to compile the application into a binary for optimal production performance. The development environment supports hot reloading for a better developer experience.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hono | [kadumedim/bun-hono](https://github.com/kadumedim/bun-hono) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | Your environment |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/wOsrk0)
