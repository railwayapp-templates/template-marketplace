# Deploy Pterodactyl Panel [Updated Sep '26] on Railway

Pterodactyl Panel — Pinned, Key on a Volume, Admin Created on First Boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-game-s-1)

## About

Pterodactyl Panel is the control plane game server hosts use to create, monitor, and manage servers across one or more nodes. This template deploys it pinned to a known-good version, with its encryption key on a volume, an administrator account ready on first boot, and a first-deploy migration race closed — verified live, by actually logging in, not assumed from documentation.

The panel is a fairly ordinary PHP/React web app — the real complexity is everything it needs *around* it: a stable encryption key across redeploys, a database genuinely finished initializing before migrations run, and an account to log in with on day one. Get any one wrong and the symptom is the same — Railway reports "successfully deployed," and the login page goes nowhere.

Pterodactyl splits into two halves this template's name makes easy to conflate. The **Panel** is purely the control plane: a Laravel app holding your users, nodes, and servers' metadata — it never runs a game server itself. **Wings** is the actual work: a Go daemon on each machine you dedicate to hosting, translating Panel instructions into Docker containers, one per game server. Servers are configured through **Eggs**, grouped into **Nests** (Minecraft, Source Engine, and so on) — the Panel seeds a default set on first install, visible right in this template's own deploy logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MariaDB | `mariadb:11.8.8` | Database |
| Panel | [shruti060701/pterodactyl-panel-railway](https://github.com/shruti060701/pterodactyl-panel-railway) | Web service |
| Redis | `redis:8.6.5-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MARIADB_USER` | MariaDB | (secret) | Database user the panel connects as. Granted access to MARIADB_DATABASE automatically on first boot. |
| `MARIADB_DATABASE` | MariaDB | panel | Name of the database MariaDB creates on first boot. The Panel service connects to this database by default via ${{MariaDB.MARIADB_DATABASE}}. |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Password for MARIADB_USER. Auto-generated; the Panel service reads it back via ${{MariaDB.MARIADB_PASSWORD}}. |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Password for the MariaDB root superuser. Auto-generated. Not used by the Panel service day-to-day — only needed if you connect directly as root for maintenance. |
| `PORT` | Panel | 8080 | The port nginx is rewritten to listen on at container boot — see start-with-admin.sh. Railway routes your public domain to this automatically. |
| `APP_ENV` | Panel | production | Laravel environment name. Affects logging verbosity and error presentation; leave as production. |
| `APP_KEY` | Panel | - | Encrypts node tokens and 2FA secrets. Stable because /app/var is a volume — changing this after first boot makes existing encrypted values unreadable, so leave it alone once the panel is running. |
| `APP_URL` | Panel | - | The panel's own public URL — used to build links it sends itself (e.g. in emails). Resolves automatically to your Railway domain. |
| `DB_HOST` | Panel | - | MariaDB's private network hostname. Resolves automatically once the MariaDB service exists — private networking, not the public internet. |
| `DB_PORT` | Panel | 3306 | MariaDB's port. Standard MySQL/MariaDB port — no reason to change it. |
| `APP_DEBUG` | Panel | false | Laravel debug mode. Keep off in production — on a public deploy it leaks stack traces in API error responses. |
| `REDIS_HOST` | Panel | - | Redis's private network hostname. Resolves automatically once the Redis service exists. |
| `REDIS_PORT` | Panel | 6379 | Redis's port. Standard Redis port — no reason to change it. |
| `ADMIN_EMAIL` | Panel | admin@example.com | Login email for the administrator account created on first boot. Change it in the panel after logging in. |
| `DB_DATABASE` | Panel | - | Database name the panel connects to. References the MariaDB service's own MARIADB_DATABASE value. |
| `DB_PASSWORD` | Panel | (secret) | Database password. References the MariaDB service's own MARIADB_PASSWORD value — kept in sync automatically. |
| `DB_USERNAME` | Panel | (secret) | Database username. References the MariaDB service's own MARIADB_USER value. |
| `LOG_CHANNEL` | Panel | stderr | Where Laravel writes application logs. stderr routes them into the container's log stream so they show up in Railway's deploy logs. |
| `MAIL_MAILER` | Panel | log | How the panel sends email (password resets, notifications). log writes mail to the log instead of actually sending — set up a real mailer if you need working email. |
| `APP_TIMEZONE` | Panel | UTC | Timezone used for logs and scheduled tasks. Change to your own timezone if you'd rather not read UTC timestamps. |
| `CACHE_DRIVER` | Panel | redis | Backend for Laravel's cache layer. Points at the Redis service — don't change unless you're replacing Redis entirely. |
| `HASHIDS_SALT` | Panel | - | Salt used to obfuscate numeric IDs in URLs (e.g. server IDs). Auto-generated; changing it later just changes how existing IDs are encoded in links. |
| `ADMIN_PASSWORD` | Panel | (secret) | Login password for the auto-created administrator. Auto-generated — copy it from this service's variables to log in. |
| `ADMIN_USERNAME` | Panel | (secret) | Login username for the auto-created administrator. |
| `REDIS_PASSWORD` | Panel | (secret) | Redis password. References the Redis service's own REDIS_PASSWORD value — kept in sync automatically. |
| `SESSION_DRIVER` | Panel | redis | Backend for Laravel's session storage. Points at the Redis service — don't change unless you're replacing Redis entirely. |
| `TRUSTED_PROXIES` | Panel | * | Which upstream proxies Laravel trusts for forwarded IP/protocol headers. * trusts all, which is correct behind Railway's own edge proxy. |
| `QUEUE_CONNECTION` | Panel | redis | Backend for Laravel's queued jobs. Points at the Redis service — don't change unless you're replacing Redis entirely. |
| `RECAPTCHA_ENABLED` | Panel | false | On by default in the stock image, and it breaks login on a fresh panel — the verification middleware throws before credentials are checked. Off here; turn on once you have your own reCAPTCHA keys configured. |
| `APP_ENVIRONMENT_ONLY` | Panel | false | Pterodactyl setting restricting certain admin actions to non-production environments. Leave false for a real deployment. |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password for this Redis instance. Auto-generated; the Panel service reads it back via ${{Redis.REDIS_PASSWORD}}. |

## Configuration

- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Start command:** `/bin/sh -c 'redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --bind 0.0.0.0 :: --protected-mode no'`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pterodactyl-game-s-1)
