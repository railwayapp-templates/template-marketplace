# Deploy Dashy - Homelab Dashboard on Railway

Deploy a Self-Hosted Services Dashboard for Your Homelab

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dashy-homelab-dashboard)

## About

Dashy is an open-source, highly customizable dashboard application that helps you organize your self-hosted services, applications, bookmarks, and widgets from a single location. Designed for homelab enthusiasts, developers, and self-hosters, Dashy provides a beautiful and feature-rich homepage with support for status monitoring, themes, integrations, authentication, and custom layouts.

Deploying Dashy on Railway allows you to quickly create a centralized dashboard for managing your self-hosted infrastructure and services. Dashy runs as a lightweight containerized web application and does not require a database, Redis instance, or background workers. With a persistent volume attached, your configuration files, assets, icons, and customizations remain available across deployments and restarts. Railway handles networking, HTTPS, deployments, and scaling automatically, making it easy to maintain a reliable and accessible dashboard for your homelab environment.

### Security Notice

> Dashy is publicly accessible by default. If you plan to expose your dashboard to the internet, consider enabling authentication through Dashy's built-in auth options or a reverse proxy solution such as Authentik, Authelia, Keycloak, or Cloudflare Access.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| dashy | `lissy93/dashy:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NODE_ENV` | production |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/dashy-homelab-dashboard)
