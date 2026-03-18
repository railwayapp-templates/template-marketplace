# Deploy Medama Analytics on Railway

Lightweight, cookie-free analytics for privacy-focused websites.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JevCvT)

## About

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/medama-io/medama/refs/heads/main/.github/images/banner-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/medama-io/medama/refs/heads/main/.github/images/banner-light.svg">
    <img alt="Medama: Cookie-free privacy-focused website analytics." src="https://raw.githubusercontent.com/medama-io/medama/refs/heads/main/.github/images/banner-light.svg">
  </picture>
  <br>
  <a href="https://oss.medama.io/introduction">Website</a> |
  <a href="https://oss.medama.io/deployment/installation">Installation</a> |
  <a href="https://demo.medama.io">Demo</a> |
  <a href="https://medama.io/discord">Discord</a>
</p>

## Overview

Medama Analytics is an open-source project dedicated to providing self-hostable, cookie-free website analytics. With a lightweight tracker of less than 1KB, it aims to offer useful analytics while prioritising user privacy.

<p align="center">
    <a href="https://demo.medama.io">
        <img src="https://raw.githubusercontent.com/medama-io/medama/refs/heads/main/.github/images/demo.png" alt="Demo Screenshot" width="70%" height="70%">
    </a>
</p>

### Features

- 📊 **Real-Time Analytics:** Monitor website performance and user interactions instantly.

- 🔒 **Privacy-Focused:** Lightweight tracker (&lt;1KB) without cookies, IP addresses, or additional identifiers, ensuring compliance with GDPR, PECR, and other regulations.

- 🧪 **Easy To Integrate:** [OpenAPI-based](https://oss.medama.io/api-reference/introduction) server for effortless integration into personal or professional dashboards.

- 💼 **Self-Hostable:** Simple, single-binary setup with no external dependencies, capable of running on VMs with 256MB memory for most small websites.

The default login credentials are:

- **Username:** admin
- **Password:** CHANGE_ME_ON_FIRST_LOGIN


### License

The `/core` and `/dashboard` directory is licensed under the Apache License 2.0. See the core [LICENSE](https://github.com/medama-io/medama/blob/main/core/LICENSE) and dashboard [LICENSE](https://github.com/medama-io/medama/blob/main/dashboard/LICENSE) for more information.

The `/tracker` directory is licensed under the MIT License. See [LICENSE](https://github.com/medama-io/medama/blob/main/tracker/LICENSE) for more information.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Medama | `ghcr.io/medama-io/medama:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `LEVEL` | info |
| `LOGGER` | json |
| `APP_DATABASE_HOST` | /db/app.db |
| `CORS_ALLOWED_ORIGINS` | http://localhost:8080,http://localhost:3000 |
| `ANALYTICS_DATABASE_HOST` | /db/analytics.db |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/db`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/JevCvT)
