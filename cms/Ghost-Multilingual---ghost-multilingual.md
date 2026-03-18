# Deploy Ghost Multilingual on Railway

1-Click deploy multilingual Ghost with 2 separate instances

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ghost-multilingual)

## About

[![Deploy and Host Ghost multilingual with 1-Click on Railway](https://img.youtube.com/vi/JjA-2Qdr9Pw/maxresdefault.jpg)](https://youtu.be/JjA-2Qdr9Pw?si=grlbVGNMC6NU4sNd)

Ghost doesn't support multi-language natively? No problem! Deploy separate Ghost instances and unify them under one domain with different paths:

- `yourdomain.com/en` → English site
- `yourdomain.com/vi` → Vietnamese site

See it in action: [bepublish.com](https://bepublish.com)

This architecture deploys two complete Ghost installations—each with its own database, themes, content, and admin panel—unified under one domain through intelligent routing.
Why this matters:

- ✨ Full independence – Customize each language site without limitations
- ⚡ Better performance – No plugin overhead or database bloat
- 🛠️ Easier maintenance – Manage languages separately, debug faster
- 🎨 Design freedom – Different themes, structures, or features per language

The 1-click deployment handles all the technical complexity: databases, environment variables, routing configuration—everything. You get professional multi-language infrastructure in minutes, not days.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ghost-fr | `ghost:alpine` | Web service |
| Ghost Nginx Proxy | [bePublish/ghost-multilingual-reverse-proxy](https://github.com/bePublish/ghost-multilingual-reverse-proxy) | Web service |
| MySQL | `mysql:8` | Database |
| MySQL-fr | `mysql:8` | Database |
| ghost | `ghost:alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `url` | ghost-fr | - | Please change this to your full URL + /fr/ or any route you want (e.g, https://bepublish.com/fr/) |
| `PORT` | ghost-fr | 2368 | - |
| `mail__transport` | ghost-fr | SMTP | - |
| `database__client` | ghost-fr | mysql | - |
| `mail__options__host` | ghost-fr | smtp.usesend.com | - |
| `mail__options__port` | ghost-fr | 465 | - |
| `mail__options__auth__pass` | ghost-fr | us_pbg249 | - |
| `mail__options__auth__user` | ghost-fr | (secret) | - |
| `database__connection__user` | ghost-fr | (secret) | - |
| `database__connection__password` | ghost-fr | (secret) | - |
| `security__staffDeviceVerification` | ghost-fr | false | 2FA on/off |
| `SERVER_NAME` | Ghost Nginx Proxy | - | Your custom domain (e.g., your-domain.com) |
| `GHOST_ROOT_URL` | Ghost Nginx Proxy | - | The internal URL of your main Ghost instance on Railway (e.g., http://ghost.railway.internal:2368) |
| `GHOST_INSTANCES` | Ghost Nginx Proxy | - | The path and internal URL for your other Ghost instances (e.g., /fr:http://ghost-fr.railway.internal:2368). |
| `MYSQLUSER` | MySQL | root | MySQL user |
| `MYSQL_URL` | MySQL | - | MySQL URL |
| `MYSQLPASSWORD` | MySQL | (secret) | - |
| `MYSQL_DATABASE` | MySQL | railway | MySQL Database |
| `MYSQL_PRIVATE_URL` | MySQL | - | MySQL Private URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | - |
| `MYSQLUSER` | MySQL-fr | root | - |
| `MYSQLPASSWORD` | MySQL-fr | (secret) | - |
| `MYSQL_DATABASE` | MySQL-fr | railway | - |
| `MYSQL_ROOT_PASSWORD` | MySQL-fr | (secret) | - |
| `url` | ghost | - | Please change this to your full URL (e.g, https://bepublish.com) |
| `PORT` | ghost | 2368 | - |
| `mail__transport` | ghost | SMTP | - |
| `database__client` | ghost | mysql | - |
| `mail__options__host` | ghost | smtp.usesend.com | - |
| `mail__options__port` | ghost | 465 | - |
| `mail__options__auth__pass` | ghost | us_pbg249 | - |
| `mail__options__auth__user` | ghost | (secret) | - |
| `database__connection__user` | ghost | (secret) | - |
| `database__connection__password` | ghost | (secret) | - |
| `security__staffDeviceVerification` | ghost | false | 2FA on/off |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ghost/content`
- **Healthcheck:** `/health`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`

**Category:** CMS · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ghost-multilingual)
