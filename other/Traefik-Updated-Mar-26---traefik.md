# Deploy Traefik [Updated Mar ’26] on Railway

Traefik [Mar ’26] (Managed Reverse Proxy & Load Balancer), Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/traefik)

## About

Traefik is a popular open-source cloud-native reverse proxy and load balancer designed for modern microservices architectures. It integrates seamlessly with Docker, supports dynamic service discovery, and is actively maintained on GitHub as "traefik/traefik."

Hosting Traefik on Railway lets you deploy a robust reverse proxy and load balancer using modern tools. You can launch Traefik quickly with traefik docker compose for containerized setups or use the traefik helm chart for Kubernetes deployments. The built-in traefik dashboard gives visual insights into routing, active services, and configurations, making management on Railway seamless and efficient.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| traefik | `traefik:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TRAEFIK_LOG_LEVEL` | info |
| `TRAEFIK_API_INSECURE` | true |
| `TRAEFIK_PROVIDERS_DOCKER` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/traefik/acme`

**Category:** Other

[View on Railway →](https://railway.com/deploy/traefik)
