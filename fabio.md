# Deploy fabio on Railway

Fabio Load Balancer - Railway Template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fabio)

## About

Fabio is a zero-configuration HTTP/HTTPS load balancer that provides automatic service discovery and routing. Built for high performance and simplicity, fabio automatically routes traffic to healthy backend services without requiring manual configuration changes, making it perfect for microservices architectures.

Hosting fabio on Railway involves deploying a lightweight load balancer that can route traffic to your backend services. This template provides a fully configured fabio instance with environment variable customization, static routing configuration, and optimized performance settings. The deployment includes automatic health checks, logging configuration, and support for both round-robin and random load balancing strategies. Railway's infrastructure handles scaling and availability while fabio manages intelligent traffic distribution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fabio | [NovusEdge/fabio-railway](https://github.com/NovusEdge/fabio-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Backend routing configuration |
| `FABIO_MAX_CONN` | 10000 | - |
| `FABIO_LOG_LEVEL` | WARN | - |
| `FABIO_ROUTE_PATH` | / | - |
| `FABIO_HEALTH_PATH` | /health | - |
| `FABIO_LB_STRATEGY` | rnd | Registry backend (static for Railway, consul for service discovery) |
| `FABIO_BACKEND_PATH` | / | - |
| `FABIO_DIAL_TIMEOUT` | 10s | - |
| `FABIO_HEALTH_CHECK` | check:http://200 | Performance tuning |
| `FABIO_IDLE_TIMEOUT` | 120s | - |
| `FABIO_READ_TIMEOUT` | 30s | - |
| `FABIO_ROUTE_OPTIONS` | strip=/ | Health check configuration |
| `FABIO_SHUTDOWN_WAIT` | 10s | Connection settings |
| `FABIO_WRITE_TIMEOUT` | 30s | - |
| `FABIO_BACKEND_PROTOCOL` | http | - |
| `FABIO_REGISTRY_BACKEND` | static | Logging configuration |
| `FABIO_KEEPALIVE_TIMEOUT` | 120s | Load balancing strategy (rnd or rr) |
| `FABIO_LOG_ACCESS_FORMAT` | combined | - |
| `FABIO_LOG_ACCESS_TARGET` | stdout | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/fabio)
