# Deploy Ghost CMS + MySQL on Railway

Ghost CMS with MySQL 8, persistent volumes, and private networking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-cms-mysql)

## About

Ghost is an open-source publishing platform built for modern blogs, newsletters, memberships, and editorial sites. This template packages Ghost 6 with MySQL 8, persistent volumes, and Railway private networking so you get a clean, production-ready starting point without hand-wiring database connections or storage.

This template deploys Ghost on the official Docker image and MySQL 8 on a separate private Railway service. Ghost content persists on a dedicated volume, MySQL data persists on its own volume, and the app is configured to use Railway's public domain plus private service-to-service networking. Database passwords are generated automatically for each deployment, so you can launch quickly and then customize themes, email, and custom domains after the initial boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysql | `mysql:8.4` | Database |
| ghost | `ghost:6-alpine` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQL_USER` | mysql | (secret) |
| `MYSQL_DATABASE` | mysql | ghost |
| `MYSQL_PASSWORD` | mysql | (secret) |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) |
| `PORT` | ghost | 2368 |
| `server__host` | ghost | 0.0.0.0 |
| `server__port` | ghost | 2368 |
| `database__client` | ghost | mysql |
| `database__connection__port` | ghost | 3306 |
| `database__connection__user` | ghost | (secret) |
| `database__connection__password` | ghost | (secret) |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/ghost-cms-mysql)
