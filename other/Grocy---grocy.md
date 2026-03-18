# Deploy Grocy on Railway

The Open-Source Self-Hosted Grocery & Household Management Solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grocy)

## About

Grocy is a self-hosted web application designed to manage your household groceries and inventory. It acts as a smart pantry organizer, helping you track stock levels, locations, and expiration dates. By integrating recipe management and shopping lists, Grocy helps streamline your shopping trips and reduce food waste while keeping your data private.

Hosting Grocy typically involves managing a web server stack (Nginx/PHP) and a database. This template utilizes the LinuxServer.io Docker image, which bundles these components into a single, efficient container. The primary requirement for hosting is a persistent volume to store your SQLite database, product images, and configuration files, ensuring data is retained between deployments.

This specific template includes a custom patch to handle DNS resolution. It automatically configures Nginx to work seamlessly with Railway's internal network environment, ensuring the service starts reliably without manual configuration edits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Grocy | [Aravindha1234u/grocy-railway](https://github.com/Aravindha1234u/grocy-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | ETC/UTC | Timezone |
| `PORT` | 80 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/grocy)
