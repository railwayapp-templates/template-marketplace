# Deploy Magento 2.3 on Railway

Install Magento With Native Search Engine

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/magento-23)

## About

Magento 2.3 is an open-source e-commerce platform built on PHP. It powers online stores with catalog management, checkout, multi-store support, and a rich ecosystem of extensions. This template deploys Magento 2.3 with Nginx and PHP-FPM, using **MySQL only** — no Elasticsearch or OpenSearch required.

Hosting Magento 2.3 involves running a PHP application (Nginx + PHP-FPM) and a MySQL-compatible database for catalog, orders, and **search**. Unlike Magento 2.4+, version 2.3.x supports MySQL as the native search engine, eliminating the need for Elasticsearch or OpenSearch. This Railway setup uses a single Dockerfile that downloads the official Magento 2.3 release from GitHub, runs Composer install, and configures Nginx to listen on the port Railway provides. On first run, the entrypoint detects an empty database and runs `setup:install` automatically with `--search-engine=mysql`, then deploys static content and sets production mode. Optional sample data can be installed via an environment variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL 8 | [feliperosenek/mysql-any-version-railway](https://github.com/feliperosenek/mysql-any-version-railway) | Database |
| Magento 2.3 | [feliperosenek/magento2.3-railway](https://github.com/feliperosenek/magento2.3-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_ROOT_PASSWORD` | MySQL 8 | (secret) | MySQL password root |
| `BASE_URL` | Magento 2.3 | - | Shop base URL |
| `ADMIN_USER` | Magento 2.3 | (secret) | Admin User Magento |
| `MYSQL_HOST` | Magento 2.3 | - | MySQL host |
| `MYSQL_PORT` | Magento 2.3 | 3306 | MySQL port |
| `MYSQL_USER` | Magento 2.3 | (secret) | MySQL user |
| `ADMIN_EMAIL` | Magento 2.3 | - | Magento admin e-email |
| `ADMIN_LASTNAME` | Magento 2.3 | - | Magento admin lastname |
| `ADMIN_PASSWORD` | Magento 2.3 | (secret) | Magento admin password |
| `MYSQL_DATABASE` | Magento 2.3 | railway | MySQL database name |
| `MYSQL_PASSWORD` | Magento 2.3 | (secret) | MySQL password |
| `ADMIN_FIRSTNAME` | Magento 2.3 | - | Magento admin first name |
| `BACKEND_FRONTNAME` | Magento 2.3 | admin | Define your_url/{BACKEND_FRONTNAME} to access admin page |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/magento-23)
