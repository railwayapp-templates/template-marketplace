# Deploy rpxy-proxy on Railway

rpxy reverse proxy template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rpxy-proxy)

## About

rpxy is a simple and ultrafast HTTP reverse proxy serving multiple domain names and terminating TLS for HTTP/1.1, 2, and 3, written in Rust. Built for high performance and reliability, rpxy automatically routes traffic to backend services with advanced load balancing, health checking, and TLS termination, making it perfect for microservices architectures and API gateways.

Hosting rpxy on Railway involves deploying a high-performance reverse proxy that can route traffic to your backend services with exceptional speed and reliability. This template provides a fully configured rpxy instance with environment variable customization, automatic health checks, path-based routing, and optimized performance settings. Railway's infrastructure handles IPv6 networking and scaling while rpxy manages intelligent traffic distribution at speeds 30-60% faster than traditional solutions like NGINX.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rpxy-railway | [NovusEdge/rpxy-railway](https://github.com/NovusEdge/rpxy-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port for HTTPS/TLS traffic |
| `TLS_PORT` | 8443 | Server name to match incoming requests (* matches all domains) |
| `LOG_LEVEL` | info | HEALTH CHECKS |
| `MAX_CLIENTS` | 512 | TCP listen backlog size |
| `SERVER_NAME` | * | Load balancing strategy: round_robin or random |
| `ENABLE_HTTP3` | false | ACME/LET'S ENCRYPT CONFIGURATION (OPTIONAL) |
| `LOAD_BALANCE` | round_robin | Logging level: error, warn, info, debug, trace |
| `UPSTREAM_URL` | - | BASIC CONFIGURATION |
| `WORKER_THREADS` | 0 | Maximum concurrent client connections |
| `HEALTH_CHECK_PATH` | /health | Health check path on upstream services |
| `TCP_LISTEN_BACKLOG` | 1024 | TLS CONFIGURATION (OPTIONAL) |
| `HEALTH_CHECK_TIMEOUT` | 10 | PATH-BASED ROUTING (OPTIONAL) |
| `UPSTREAM_HEALTH_CHECK` | /health | Health check timeout in seconds |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/rpxy-proxy)
