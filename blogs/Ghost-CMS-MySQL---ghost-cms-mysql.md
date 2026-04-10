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

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | mysql | (secret) | Application username Ghost uses to connect to MySQL. |
| `MYSQL_DATABASE` | mysql | ghost | Database name created for the Ghost application. |
| `MYSQL_PASSWORD` | mysql | (secret) | Generated password for the Ghost MySQL application user. |
| `MYSQL_ROOT_PASSWORD` | mysql | (secret) | Generated root password for administrative MySQL access. |
| `url` | ghost | - | Ghost site URL. Railway fills this from the generated public domain. |
| `PORT` | ghost | 2368 | Railway HTTP proxy port for the Ghost service. |
| `server__host` | ghost | 0.0.0.0 | Bind Ghost to all network interfaces inside the container. |
| `server__port` | ghost | 2368 | Ghost application port exposed by the container. |
| `database__client` | ghost | mysql | Database driver Ghost should use. |
| `database__connection__host` | ghost | - | Private hostname for the MySQL service on Railway. |
| `database__connection__port` | ghost | 3306 | Internal MySQL port. |
| `database__connection__user` | ghost | (secret) | MySQL user Ghost uses for application queries. |
| `database__connection__database` | ghost | - | MySQL database Ghost stores content in. |
| `database__connection__password` | ghost | (secret) | Password for the Ghost MySQL application user. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/ghost-cms-mysql)
