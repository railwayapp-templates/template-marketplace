# Deploy Pterodactyl on Railway

Pterodactyl Panel pinned, admin created at deploy, login captcha fixed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-1)

## About

[Pterodactyl](https://github.com/pterodactyl/panel) is a web panel for running game servers: Minecraft, Rust, Valheim, CS2 and hundreds more through its "eggs". The panel handles users, servers, files, schedules and backups; the game servers themselves run on Wings, Pterodactyl's daemon, on machines you connect as nodes.

This template runs the panel (official image, pinned to v1.15.1) with MariaDB and Redis on Railway's private network.

The panel has no sign-up page, so a fresh install has no way in until someone runs a command in the container. Here the deploy form asks for your email, a password is generated into `PTERODACTYL_ADMIN_PASSWORD`, and a start step creates the admin account right after the database migrations. On later starts it sees existing users and leaves them alone.

Two defaults break logins on a fresh deploy, and both are handled. The panel ships with reCAPTCHA turned on using keys that only work on Pterodactyl's own domain, so it's off here (`RECAPTCHA_ENABLED`), and you can add your own keys later. And behind Railway's proxy the panel doesn't know requests arrive over HTTPS unless the proxy is trusted, which `TRUSTED_PROXIES` does.

The app key and the hashids salt come from generated variables. Left to itself, the image generates the key on first start and prints it into the deploy logs.

My first version used MySQL 8.4. Laravel loads the initial schema with the `mysql` command-line client, and the MariaDB client inside the panel image failed twice: first on MySQL's self-signed certificate, then on its default password plugin. MariaDB 11.4, which Pterodactyl recommends anyway, works.

Before publishing I tested the final version on a fresh deploy. The admin from the deploy form signed in without a captcha and had admin rights, the sign-up endpoint doesn't exist (405), an application API key created in the admin area worked, and a location created through the API was still there after restarting the panel and the database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Pterodactyl | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /pterodactyl) | Web service |
| Redis | `redis:7.4` | Database |
| MariaDB | `mariadb:11.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Pterodactyl | 80 | Port Railway routes to |
| `APP_ENV` | Pterodactyl | production | Production mode |
| `APP_KEY` | Pterodactyl | - | Encryption key (generated). Keep it |
| `APP_URL` | Pterodactyl | - | Public URL of the panel; Wings nodes connect to it. Change it when you add a custom domain |
| `DB_HOST` | Pterodactyl | - | MariaDB over the private network |
| `DB_PORT` | Pterodactyl | 3306 | MariaDB port |
| `LOG_LEVEL` | Pterodactyl | info | Log level |
| `PANEL_URL` | Pterodactyl | - | Open this and sign in with PTERODACTYL_ADMIN_EMAIL and PTERODACTYL_ADMIN_PASSWORD |
| `REDIS_HOST` | Pterodactyl | - | Redis over the private network |
| `REDIS_PORT` | Pterodactyl | 6379 | Redis port |
| `DB_DATABASE` | Pterodactyl | - | Database name |
| `DB_PASSWORD` | Pterodactyl | (secret) | Database password |
| `DB_USERNAME` | Pterodactyl | (secret) | Database user |
| `LOG_CHANNEL` | Pterodactyl | stderr | Logs to the Railway log view |
| `MAIL_MAILER` | Pterodactyl | log | No email until you add SMTP settings (MAIL_MAILER=smtp and MAIL_HOST, MAIL_PORT, MAIL_USERNAME, MAIL_PASSWORD, MAIL_FROM_ADDRESS) |
| `APP_TIMEZONE` | Pterodactyl | UTC | Panel time zone |
| `CACHE_DRIVER` | Pterodactyl | redis | Cache in Redis |
| `HASHIDS_SALT` | Pterodactyl | - | Salt for public IDs (generated). Keep it |
| `HASHIDS_LENGTH` | Pterodactyl | 8 | Length of public IDs |
| `REDIS_PASSWORD` | Pterodactyl | (secret) | Redis password |
| `SESSION_DRIVER` | Pterodactyl | redis | Sessions in Redis |
| `TRUSTED_PROXIES` | Pterodactyl | * | Trust Railway's proxy so the panel knows requests arrive over HTTPS |
| `QUEUE_CONNECTION` | Pterodactyl | redis | Queue in Redis |
| `RECAPTCHA_ENABLED` | Pterodactyl | false | reCAPTCHA off: the built-in keys only work on Pterodactyl's domain. Add your own keys to turn it on |
| `APP_SERVICE_AUTHOR` | Pterodactyl | - | Author email for eggs you create |
| `APP_ENVIRONMENT_ONLY` | Pterodactyl | false | Let the admin area save settings in the database |
| `SESSION_SECURE_COOKIE` | Pterodactyl | true | Session cookie only over HTTPS |
| `PTERODACTYL_ADMIN_EMAIL` | Pterodactyl | - | Email of the admin account, created on first start. Sign in with it and PTERODACTYL_ADMIN_PASSWORD |
| `PTERODACTYL_ADMIN_PASSWORD` | Pterodactyl | (secret) | Password of the admin account (generated) |
| `PTERODACTYL_ADMIN_USERNAME` | Pterodactyl | (secret) | Username of the admin account |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Pterodactyl | true | Lets the Alpine-based image resolve Railway private domains |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password (generated) |
| `MARIADB_USER` | MariaDB | (secret) | Database user |
| `MARIADB_DATABASE` | MariaDB | panel | Database for the panel |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Database password (generated) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Root password (generated) |

## Configuration

- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'exec redis-server --requirepass "$REDIS_PASSWORD" --save "" --appendonly no'`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Tags:** pterodactyl, game-server, minecraft, panel, wings, mysql · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pterodactyl-1)
