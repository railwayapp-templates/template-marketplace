# Deploy InvoicePlane on Railway

InvoicePlane — Self-hosted invoicing with MariaDB

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/invoiceplane)

## About

Deploy [InvoicePlane](https://invoiceplane.com) — a free, open-source, self-hosted invoicing application — on Railway with MariaDB in one click.

InvoicePlane is a complete invoicing solution for freelancers and small businesses. Running it on Railway gives you a fully managed, always-available invoicing platform without managing servers.

This template deploys:

- **InvoicePlane 1.6.5** — The invoicing web application (PHP/Apache)
- **MariaDB 11.4** — Persistent relational database

Both services run within Railway's free tier (~$1/month total).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| InvoicePlane | [BURNI80/InvoicePlane-railway-template](https://github.com/BURNI80/InvoicePlane-railway-template) | Web service |
| MariaDB | `mariadb:11.4` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `IP_DB_PASSWORD` | InvoicePlane | (secret) |
| `IP_DB_USERNAME` | InvoicePlane | (secret) |
| `MYSQL_USER` | MariaDB | (secret) |
| `MARIADB_USER` | MariaDB | (secret) |
| `MYSQL_PASSWORD` | MariaDB | (secret) |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/invoiceplane)
