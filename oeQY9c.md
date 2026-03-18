# Deploy kill bill on Railway

Open-Source Subscription Billing & Payments Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/oeQY9c)

## About

Template deploys MariaDB, killbill api server and the web interface for management. You can leave all env variables as is.
Initial credentials are admin:password
Please contact beuz at discord if something's not working properly and I'll try to fix it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| killbill | `killbill/killbill:latest` | Worker |
| kaui | `killbill/kaui:2.0.11` | Web service |
| MariaDB | `killbill/mariadb:0.24` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | killbill | 8080 | default port |
| `KILLBILL_DAO_URL` | killbill | jdbc:mysql://mariadb:3306/killbill | url to conect to mariadb |
| `KILLBILL_DAO_USER` | killbill | (secret) | default user |
| `KILLBILL_CATALOG_URI` | killbill | SpyCarAdvanced.xml | Just default config. |
| `KILLBILL_DAO_PASSWORD` | killbill | (secret) | maria db root password |
| `PORT` | kaui | 8080 | defaul port |
| `KAUI_KILLBILL_URL` | kaui | http://killbill:8080 | killbill internal url |
| `KAUI_CONFIG_DAO_URL` | kaui | jdbc:mysql://mariadb:3306/kaui | connect to mariadb |
| `KAUI_CONFIG_DAO_USER` | kaui | (secret) | default user |
| `KAUI_CONFIG_DAO_PASSWORD` | kaui | (secret) | Mariadb root password |
| `MYSQL_ROOT_PASSWORD` | MariaDB | (secret) | default password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/template/oeQY9c)
