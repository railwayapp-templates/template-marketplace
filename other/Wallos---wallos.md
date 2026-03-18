# Deploy Wallos on Railway

Open-Source Personal Subscription Tracker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wallos)

## About

Wallos is a free and open-source, self-hostable web application for managing your personal finances. It helps you track subscriptions and expenses, organize them by category, and gain better control over your spending. With multi-currency support and data privacy by design, it's a powerful alternative to spreadsheets.

> **Warning**: Railway.app does not currently support more than one volume mount. This template mounts a volume to the `/var/www/html/db` directory to ensure your data is safe. However, the logo uploads directory is not mounted. This means that if you update to a new release, **you will lose any custom logos you have uploaded**, but your core financial data will be preserved. This template will be updated if Railway adds support for multiple volume mounts.

Hosting Wallos involves running its official Docker image. The application requires persistent storage for its database (SQLite) and for user-uploaded logos, which is handled via volume mounts. You'll need to map a volume to `/var/www/html/db` for the database and another to `/var/w ww/html/images/uploads/logos` for images. An environment variable for the timezone, such as `TZ`, is also required for correct scheduling and display. This setup ensures your financial data and customizations are preserved across updates, making it ideal for container-based platforms like Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wallos | `bellamy/wallos:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | America/New_York | Timezone |
| `PORT` | 80 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/db/`

**Category:** Other

[View on Railway →](https://railway.com/template/wallos)
