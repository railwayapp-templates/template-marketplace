# Deploy GProxy on Railway

Multi-provider LLM proxy with built-in admin frontend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gproxy)

## About

gproxy is a lightweight reverse proxy that securely routes HTTP and gRPC traffic using flexible expression-based routing rules. It supports automatic Let's Encrypt (ACME) TLS certificates, WebSockets, CORS, hot-reloadable configuration, and transparent proxying, making it ideal for modern API gateways and microservice deployments.

Railway provides a simple way to deploy gproxy without managing infrastructure. This template deploys the official Docker image and exposes the proxy through Railway's networking. A Railway Volume mounted at `/app/data` persists the SQLite database and runtime data across deployments. Railway automatically manages HTTPS, deployments, environment variables, and scaling, while gproxy handles HTTP and gRPC routing, TLS certificate management, and configurable reverse proxy rules.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gproxy | `ghcr.io/leenhawk/gproxy:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8787 |
| `RUST_LOG` | info |
| `GPROXY_DSN` | sqlite:///app/data/gproxy.db?mode=rwc |
| `GPROXY_HOST` | 0.0.0.0 |
| `GPROXY_DATA_DIR` | /app/data |
| `GPROXY_ADMIN_KEY` | your-strong-key |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/gproxy)
