# Deploy Nginx Proxy Manager on Railway

Expose web services easily and securely.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vXq1Wp)

## About

Nginx Proxy Manager is an open-source web interface for managing Nginx reverse proxies with automatic TLS certificate provisioning via Let's Encrypt. It lets you expose web services securely over HTTPS — with no manual Nginx config required — through a clean, browser-based admin panel.

Hosting Nginx Proxy Manager means running a persistent web server that manages proxy rules, SSL certificates, and access controls on your behalf. This Railway template deploys the official Docker image as a single service with a persistent volume for configuration and certificate storage. On first login, change the default admin credentials immediately. Railway handles the public domain and HTTPS termination at the platform level; Nginx Proxy Manager handles the internal routing and certificate management for any additional services you point it at.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx-proxy-manager | `jlesage/nginx-proxy-manager` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8181 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/docker/appdata/nginx-proxy-manager`

**Category:** Other

[View on Railway →](https://railway.com/deploy/vXq1Wp)
