# Deploy Bookstack on Railway

Open-source wiki and knowledge base with managed MySQL, Redis and a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bookstack-wiki)

## About

BookStack is an open-source wiki and documentation platform built on PHP and Laravel, used by engineering teams, IT departments and MSPs as a self-hosted Confluence alternative. It fixes documentation nobody can find: content is organised like a library — shelves hold books, books hold chapters, chapters hold pages — so a newcomer browses instead of guessing search terms. Every page has revision history with diffs, comments, tags and attachments, permissions apply at any level of that tree, and BookStack is MIT licensed with no seat limits.

Deploy BookStack on Railway and this template wires up the three pieces it needs. The **bookstack** service runs `lscr.io/linuxserver/bookstack:latest` — nginx and PHP-FPM on port 80 behind a Railway-managed TLS domain — and the same container runs `artisan queue:work`, so webhooks and email go out in the background. A private **MySQL** database holds pages, revisions, users and the search index; a private **Redis** instance backs the cache, sessions and the queue. Uploads live on a Railway volume at `/config`, served from your own domain. To self-host BookStack you supply two values: the email and password for the first administrator.

![BookStack Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786825248/c9276255-374c-458b-9bdc-ba357c6a02b6.png)

BookStack is deliberately conventional — a Laravel app, a MySQL database and a directory of uploads — so it runs well on small instances. Teams self-host it when docs are commercially sensitive or a per-seat wiki bill stops making sense.

- **Library structure and two editors** — shelves, books, chapters and pages with drag-and-drop sorting, written in WYSIWYG or Markdown with live preview
- **History and permissions** — diffs with one-click restore, role defaults, and overrides on any shelf, book, chapter or page
- **Authentication** — local accounts plus SAML 2.0, OIDC, LDAP/Active Directory, Google, GitHub, Okta and Entra ID, selected with `AUTH_METHOD`
- **Content tools** — a bundled diagrams.net editor, code highlighting, page templates, comments, PDF and Markdown export, a REST API and webhooks

Only **bookstack** has a public domain. **MySQL** is the system of record and powers search. **Redis** holds the cache, the queue the worker drains, and sessions — so a restart does not sign everyone out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bookstack | `linuxserver/bookstack` | Web service |
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | bookstack | Etc/UTC | Container timezone |
| `PGID` | bookstack | 911 | LinuxServer container group ID |
| `PORT` | bookstack | 80 | nginx listening port |
| `PUID` | bookstack | 911 | LinuxServer container user ID |
| `APP_ENV` | bookstack | production | Laravel environment name |
| `APP_KEY` | bookstack | - | 32-character session encryption key |
| `APP_URL` | bookstack | - | Public base URL for links |
| `DB_HOST` | bookstack | - | Private MySQL hostname |
| `DB_PORT` | bookstack | - | MySQL port |
| `APP_DEBUG` | bookstack | false | Never enable in production |
| `APP_PROXIES` | bookstack | 0.0.0.0/0,::/0 | Trust Railway proxy headers |
| `DB_DATABASE` | bookstack | - | Database name |
| `DB_PASSWORD` | bookstack | (secret) | Database password reference |
| `DB_USERNAME` | bookstack | (secret) | Scoped database user |
| `CACHE_DRIVER` | bookstack | redis | Cache store backend |
| `STORAGE_TYPE` | bookstack | local_secure_restricted | Serve uploads behind auth; set "local" for a public wiki |
| `REDIS_SERVERS` | bookstack | - | Packed Redis connection string |
| `SESSION_DRIVER` | bookstack | redis | Session store backend |
| `QUEUE_CONNECTION` | bookstack | redis | Queue backend; also starts worker |
| `INITIAL_ADMIN_NAME` | bookstack | Admin | Display name of first admin |
| `INITIAL_ADMIN_EMAIL` | bookstack | admin@example.com | First admin login email |
| `SESSION_SECURE_COOKIE` | bookstack | true | HTTPS-only session cookie |
| `INITIAL_ADMIN_PASSWORD` | bookstack | (secret) | First admin password |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `MYSQLHOST` | MySQL | - | Private hostname, never publicly exposed |
| `MYSQLPORT` | MySQL | 3306 | MySQL port on the private network |
| `MYSQLUSER` | MySQL | root | Superuser; give the app a scoped user instead |
| `MYSQL_URL` | MySQL | - | Private-network connection string |
| `MYSQLDATABASE` | MySQL | - | Alias consumers reference as ${{MySQL.MYSQLDATABASE}} |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first init |
| `MYSQL_PUBLIC_URL` | MySQL | - | External connection string; empty host/port until a TCP proxy exists |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, generated once at init — read only when the data dir is created |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/bookstack-wiki)
