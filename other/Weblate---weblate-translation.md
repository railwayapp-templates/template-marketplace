# Deploy Weblate on Railway

Web app for translating software, synced with your Git repository

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/weblate-translation)

## About

Weblate is a web-based continuous localization platform that keeps translations in the same Git repository as your code. Translators work in a browser — with translation memory, machine-translation suggestions, glossaries and around thirty automatic quality checks — while Weblate commits their edits back and pulls new source strings in. It reads over sixty file formats, from gettext PO and Android resources to JSON, YAML and XLIFF, and is used by Fedora, Debian and LibreOffice. Self-host Weblate to keep translation content on your own infrastructure, with no per-seat bill.

Deploy Weblate on Railway and this template wires up the whole stack: the official `weblate/weblate` image with its bundled nginx, Granian server and six Celery workers, PostgreSQL for projects and history, Redis backing the cache, Celery broker and sessions, and a Mailpit inbox so invitation mail works immediately. A volume at `/app/data` holds the cloned repositories, media and the Django secret.

![Weblate, Mailpit, Redis and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788083275/weblate-architecture.png)

Weblate sits between your source repository and the people translating your product. It watches a branch, parses the translation files it finds, and turns each string into a reviewable unit with history, comments, suggestions and checks. Translators never touch Git; maintainers never hand-merge a PO file. Commits are attributed to the translator, and Weblate can push directly, open pull requests on GitHub, GitLab or Gitea, or wait for you to pull.

Capabilities worth knowing before you self-host Weblate:

- **60+ file formats** — gettext, Android XML, Apple strings, JSON, YAML, XLIFF, Java properties, CSV
- **Quality checks and glossaries** — around thirty built-in checks for placeholders, punctuation, plurals and terminology, with project-wide and shared translation memory
- **Machine translation** — DeepL, Google, Microsoft, LibreTranslate and OpenAI-compatible engines
- **Access control** — teams and roles, two-factor authentication, SAML and OAuth sign-in, audit log
- **A REST API** and webhooks, so CI can trigger pulls and pushes

The Railway architecture mirrors upstream's own Compose file. The Weblate service is one container: nginx serves static files and proxies to Granian, while supervisord runs Celery workers for notifications, translation tasks, memory, backups and the scheduler. PostgreSQL stores every project, string and change record. Redis is not optional — it is the Celery broker, the cache and the session store, so signed-in users survive a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| Redis | `redis:8.2` | Database |
| weblate | [gridalpha/weblate-railway](https://github.com/gridalpha/weblate-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | mailpit | 8025 | Inbox web interface port |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before pruning |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Inbox listener, dual stack |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Private SMTP listener |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | weblate | 8080 | Port the bundled nginx listens on |
| `REDIS_DB` | weblate | 1 | Redis database index |
| `REDIS_HOST` | weblate | - | Private cache host |
| `REDIS_PORT` | weblate | - | Cache port |
| `POSTGRES_DB` | weblate | - | Database name |
| `POSTGRES_HOST` | weblate | - | Private database host |
| `POSTGRES_PORT` | weblate | 5432 | Database port |
| `POSTGRES_USER` | weblate | (secret) | Database user |
| `WEBLATE_DEBUG` | weblate | 0 | Never enable in production |
| `REDIS_PASSWORD` | weblate | (secret) | Cache password |
| `WEBLATE_LOGLEVEL` | weblate | INFO | Application log verbosity |
| `POSTGRES_PASSWORD` | weblate | (secret) | Database password |
| `POSTGRES_SSL_MODE` | weblate | prefer | TLS mode for the database connection |
| `WEBLATE_TIME_ZONE` | weblate | UTC | Time zone for dates and scheduling |
| `WEBLATE_ADMIN_NAME` | weblate | Weblate Admin | First administrator's display name |
| `WEBLATE_EMAIL_HOST` | weblate | - | SMTP host |
| `WEBLATE_EMAIL_PORT` | weblate | 1025 | SMTP port |
| `WEBLATE_SITE_TITLE` | weblate | Weblate | Name shown in the interface |
| `WEBLATE_ADMIN_EMAIL` | weblate | admin@example.com | First administrator's email address |
| `WEBLATE_SITE_DOMAIN` | weblate | - | Public hostname, required to boot |
| `WEBLATE_ENABLE_HTTPS` | weblate | 1 | HTTPS redirect, HSTS and secure cookies |
| `WEBLATE_SERVER_EMAIL` | weblate | weblate@example.com | Envelope sender for error mail |
| `WEBLATE_EMAIL_USE_SSL` | weblate | 0 | Plain SMTP on the private network |
| `WEBLATE_EMAIL_USE_TLS` | weblate | 0 | Plain SMTP on the private network |
| `WEBLATE_REQUIRE_LOGIN` | weblate | (secret) | Require sign-in to browse projects |
| `WEBLATE_ADMIN_PASSWORD` | weblate | (secret) | First administrator's password |
| `WEBLATE_IP_PROXY_HEADER` | weblate | HTTP_X_FORWARDED_FOR | Read client address from forwarded header |
| `WEBLATE_REGISTRATION_OPEN` | weblate | 0 | Public sign-up closed by default |
| `WEBLATE_DEFAULT_FROM_EMAIL` | weblate | weblate@example.com | From address on outgoing mail |
| `WEBLATE_SECURE_PROXY_SSL_HEADER` | weblate | HTTP_X_FORWARDED_PROTO,https | Trust the edge's TLS termination |
| `WEBLATE_TRUSTED_PROXY_ADDRESSES` | weblate | 100.64.0.0/10 152.233.0.0/17 fd00::/8 | Railway edge ranges |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/healthz/`
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/weblate-translation)
