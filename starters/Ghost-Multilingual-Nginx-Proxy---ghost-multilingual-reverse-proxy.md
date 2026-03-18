# Deploy Ghost Multilingual Nginx Proxy on Railway

Nginx proxy for multi-language Ghost blogs with subdirectory routing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-multilingual-reverse-proxy)

## About

A Dockerized Nginx reverse proxy template, optimized for Railway. It allows you to host multiple Ghost CMS instances under a single domain, routing traffic to different blogs based on URL subdirectories (e.g., `/en`, `/fr`). It's a cost-effective solution for managing multilingual sites or multiple publications.

Hosting the Ghost Multilingual Reverse Proxy on Railway is straightforward. The process involves deploying this template, which sets up an Nginx server inside a Docker container. You then configure a few environment variables to link the proxy to your separate Ghost CMS instances, which should also be hosted on Railway.

The critical configuration step is ensuring each Ghost instance's public `url` variable matches the final domain structure (e.g., `https://your-domain.com/fr/`). The proxy then intelligently routes incoming traffic to the correct Ghost service based on the URL path, making all your blogs accessible from one domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ghost Nginx Proxy | [bePublish/ghost-multilingual-reverse-proxy](https://github.com/bePublish/ghost-multilingual-reverse-proxy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SERVER_NAME` | - | Your custom domain that mapped (e.g., your-domain.com) |
| `GHOST_ROOT_URL` | http://ghost.railway.internal:2368 | The internal URL of your main Ghost instance on Railway (e.g., http://ghost.railway.internal:2368) |
| `GHOST_INSTANCES` | /fr:http://ghost-fr.railway.internal:2368 | The path and internal URL for your other Ghost instances (e.g., /fr:http://ghost-fr.railway.internal:2368). |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ghost-multilingual-reverse-proxy)
