# Deploy Opencart on Railway

Deploy OpenCart 4 store + MySQL on Railway. Persistent, free, one-click.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencart)

## About

**What is opencart-railway-template?**

A ready-to-deploy template for **OpenCart 4.1.0.4** on Railway. One-click deploy spins up a full storefront and admin panel in a single container, with an embedded MariaDB and a persistent volume so your data survives every redeploy. Fully automatic installation — you only provide your admin credentials at deploy time. Free-tier friendly, zero manual configuration, built for small to medium e-commerce stores.

Hosting this template deploys a **single OpenCart service** built from the public GitHub repo — Apache 2.4 + PHP 8.1 with an **embedded MariaDB** all inside one container, keeping cost to a minimum. On first boot an idempotent installer creates the schema, imports the demo data, and creates your admin user — all driven by environment variables, so no install wizard is needed. Database data lives on a **persistent volume mounted at `/var/lib/mysql`**, so products, orders and settings survive every redeploy. Railway handles HTTPS, the public domain, and the healthcheck for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opencart | [BURNI80/opencart-railway-template](https://github.com/BURNI80/opencart-railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_EMAIL` | - | ADMIN_EMAIL |
| `ADMIN_PASSWORD` | (secret) | ADMIN_PASSWORD |
| `ADMIN_USERNAME` | (secret) | ADMIN_USERNAME |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencart)
