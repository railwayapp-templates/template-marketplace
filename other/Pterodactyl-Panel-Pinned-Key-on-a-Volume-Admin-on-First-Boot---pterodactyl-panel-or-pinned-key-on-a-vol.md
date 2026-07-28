# Deploy Pterodactyl Panel | Pinned, Key on a Volume, Admin on First Boot on Railway

Pinned, key on a volume, admin created for you. Captcha off so login works.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-panel-or-pinned-key-on-a-vol)

## About

# Pterodactyl Panel

The game-server control panel, pinned, with its encryption key on a volume and an
administrator account created for you.

## What this fixes

The existing Pterodactyl template has problems that compound, and the first one
destroys data rather than merely inconveniencing you.

**The panel has no volume.** Its entrypoint writes `APP_KEY` into
`/app/var/.env` and generates a new one whenever that file is missing. With no
volume the file is gone on every deploy, so every deploy gets a *different* key -
and Pterodactyl encrypts node tokens and 2FA secrets with it. After a redeploy
they no longer decrypt. Here `/app/var` is a volume and `APP_KEY` is a template
variable, so the key is stable and you can back it up.

**No administrator is created.** The stock image runs migrations and starts the
web server; nothing creates the first user. You get a login page and no account
to use on it, unless you open a shell into the container and run `p:user:make`
yourself.

**reCAPTCHA is on by default, and it breaks the login.** On a fresh self-hosted
panel the verification middleware throws before the credentials are ever checked,
and every login attempt returns a 500. Set to off here; turn it on once you have
your own keys.

**Unpinned images, and a Redis that no longer pulls reliably.** The panel is on
`:latest`, and the Redis service uses a Bitnami image - Bitnami has closed its
public tag catalogue, so that pull fails quietly. This runs `panel:v1.14.1` and
the official `redis:8.6.5-alpine`.

## How the admin step works

The panel image's entrypoint ends with `exec "$@"`, after it has waited for the
database and run the migrations. So the account creation is not a patched
entrypoint - it is the *command*, which the stock entrypoint hands control to at
exactly the right moment. None of Pterodactyl's own setup is reimplemented.

First boot only: if the user table is not empty it is left alone, so a redeploy
never resets your password.

## Verified

By logging in. The panel was deployed from this template, and the generated
`ADMIN_PASSWORD` was used against `/auth/login`, which returned the admin
account. A wrong password is rejected with "No account matching those
credentials could be found."

## Why MariaDB and not MySQL

MySQL 9 requires TLS and rejects its own self-signed certificate on the way in, so
the migrations never run and you get a login page over an empty database. MariaDB
is what Pterodactyl documents anyway.

## Configuration

Nothing to fill in. The admin password, the encryption key, the hashids salt and
both database passwords are generated. Your login is `admin@example.com` with the
generated `ADMIN_PASSWORD` - change the email in the panel afterwards.

Changing `APP_KEY` after first boot makes existing encrypted values unreadable.

## Nodes

The panel is only half of Pterodactyl. Game servers run on Wings daemons, which
need Docker and their own ports - that is a machine you run, not a service here.

Source: https://github.com/ak40u/pterodactyl-railway-starter

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Panel | [ak40u/pterodactyl-railway-starter](https://github.com/ak40u/pterodactyl-railway-starter) | Web service |
| Redis | `redis:8.6.5-alpine` | Database |
| MariaDB | `mariadb:11.8.8` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Panel | 8080 |
| `APP_ENV` | Panel | production |
| `DB_PORT` | Panel | 3306 |
| `APP_DEBUG` | Panel | false |
| `REDIS_PORT` | Panel | 6379 |
| `ADMIN_EMAIL` | Panel | admin@example.com |
| `DB_PASSWORD` | Panel | (secret) |
| `DB_USERNAME` | Panel | (secret) |
| `LOG_CHANNEL` | Panel | stderr |
| `MAIL_MAILER` | Panel | log |
| `APP_TIMEZONE` | Panel | UTC |
| `CACHE_DRIVER` | Panel | redis |
| `ADMIN_PASSWORD` | Panel | (secret) |
| `ADMIN_USERNAME` | Panel | (secret) |
| `REDIS_PASSWORD` | Panel | (secret) |
| `SESSION_DRIVER` | Panel | redis |
| `TRUSTED_PROXIES` | Panel | * |
| `QUEUE_CONNECTION` | Panel | redis |
| `RECAPTCHA_ENABLED` | Panel | false |
| `APP_ENVIRONMENT_ONLY` | Panel | false |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MARIADB_USER` | MariaDB | (secret) |
| `MARIADB_DATABASE` | MariaDB | panel |
| `MARIADB_PASSWORD` | MariaDB | (secret) |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pterodactyl-panel-or-pinned-key-on-a-vol)
