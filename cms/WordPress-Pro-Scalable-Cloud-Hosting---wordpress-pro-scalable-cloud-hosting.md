# Deploy WordPress Pro – Scalable Cloud Hosting on Railway

Production-ready WordPress with Mariadb & scalable storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wordpress-pro-scalable-cloud-hosting)

## About

WordPress is the world’s most popular open-source content management system (CMS), powering blogs, business websites, e-commerce stores, and enterprise platforms. It offers unmatched flexibility through themes, plugins, and custom development—making it a powerful alternative to website builders like Wix, Squarespace, and Webflow.

Hosting WordPress on Railway gives you the flexibility of traditional WordPress hosting with the simplicity of modern cloud deployment. Instead of relying on shared hosting providers with limited scalability, Railway allows you to deploy WordPress with dedicated infrastructure, persistent storage, and managed environment variables.

With this template, you can:

- Deploy WordPress with a connected MySQL database
- Use persistent volumes for uploads and media
- Secure credentials via environment variables
- Scale vertically as traffic grows
- Manage staging and production environments easily

Unlike traditional hosting panels (cPanel, Plesk), Railway provides developer-friendly infrastructure with modern deployment workflows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mariadb | `mariadb` | Database |
| Primary | `wordpress` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MARIADB_USER` | mariadb | (secret) |
| `MARIADB_DATABASE` | mariadb | railway |
| `MARIADB_PASSWORD` | mariadb | (secret) |
| `MARIADB_PRIVATE_PORT` | mariadb | 3306 |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) |
| `PORT` | Primary | 80 |
| `WORDPRESS_DB_USER` | Primary | (secret) |
| `WORDPRESS_AUTH_KEY` | Primary | (secret) |
| `WORDPRESS_DB_PASSWORD` | Primary | (secret) |
| `WORDPRESS_SECURE_AUTH_KEY` | Primary | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Volume:** `/var/www/html`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/wordpress-pro-scalable-cloud-hosting)
