# Deploy Nginx Proxy Manager on Railway

[Jun'26] Easy NGINX reverse proxy and SSL manager with persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nginx-proxy-manager)

## About

Nginx Proxy Manager is a simple web-based interface for managing NGINX reverse proxies, SSL certificates, redirects, and access rules without manually writing NGINX configuration files. This Railway template runs Nginx Proxy Manager in a single container with persistent storage, making it easier to manage proxy hosts and HTTPS routing from a browser-based admin panel.

![Imgur](https://imgur.com/sScFxRF.png)

Hosting Nginx Proxy Manager on Railway gives you a lightweight way to manage reverse proxy rules and SSL certificates through a clean web UI. This template uses the `jlesage/nginx-proxy-manager` Docker image, which packages Nginx Proxy Manager into a single container and stores its application data under one persistent `/config` directory. Railway handles deployment, public networking, environment variables, and persistent volume storage, while Nginx Proxy Manager provides the UI for creating proxy hosts, redirects, SSL certificates, and access rules. This setup is useful when you want a simple proxy management dashboard without maintaining a separate database service.

![Imgur](https://imgur.com/BDFMPcG.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx-proxy-manager | `jlesage/nginx-proxy-manager` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other

[View on Railway →](https://railway.com/deploy/nginx-proxy-manager)
