# Deploy Personal Management System on Railway

Private web app for your notes, contacts, passwords and finances

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/personal-management-system)

## About

Personal Management System is an open-source personal CRM: one private web app holding the notes, contacts, passwords, appointments, receipts, files and photos most people scatter across a phone, a cloud drive and three note apps. Its author built it for daily personal use, not teams — sixteen modules, no per-seat billing, no telemetry, a database you own. Self-host Personal Management System when you want one searchable home for data you will not hand to another platform.

Deploy Personal Management System on Railway and you get the full split architecture, not a cut-down container. `frontend` serves the Vue single-page app, `backend` runs the Symfony API behind nginx and php-fpm, `scheduler` runs the recurring-payments job, `mariadb` stores everything, and `mailpit` catches outgoing mail so password resets work as soon as the deploy is green. The browser talks to `frontend` and `backend` over public domains; those reach `mariadb` and `mailpit` privately.

![Diagram of the five Personal Management System services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789617457/personal-management-system-architecture.webp)

The project describes itself as a CMS or CRM for your own life: one module per concern, each a small CRUD app over a shared database. Because it is one MariaDB schema, search spans modules and a backup is a single dump.

- **Notes** in nested categories, rich-text, with per-note locking
- **Passwords** encrypted at rest, with a copy-to-clipboard reveal
- **Contacts** grouped, with typed phone, email and messenger entries
- **Payments** — bills, recurring payments, prices, money owed, incomes and charts
- **Schedules and Calendar** for renewals and recurring obligations
- **Goals, Todo, Achievements**, **Job** hours, **Travels**, **Health**, **Issues**, **Reports**
- **Files, Images and Videos** with masonry galleries and thumbnails

The split is deliberate. `frontend` is a static bundle, redeployable without touching the API. `backend` owns the schema, the uploads volume and the signing keys. `scheduler` runs the hourly job in its own container, `mariadb` has its own volume, and `mailpit` supplies SMTP with no signup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scheduler | [gridalpha/personal-management-system-railway](https://github.com/gridalpha/personal-management-system-railway) | Worker |
| mailpit | `axllent/mailpit:latest` | Web service |
| frontend | [gridalpha/personal-management-system-railway](https://github.com/gridalpha/personal-management-system-railway) | Web service |
| backend | [gridalpha/personal-management-system-railway](https://github.com/gridalpha/personal-management-system-railway) | Web service |
| mariadb | `mariadb:11.5.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | scheduler | 8080 | Port of the health endpoint |
| `APP_ENV` | scheduler | prod | Symfony environment |
| `APP_DEMO` | scheduler | false | Strict bool string |
| `PMS_ROLE` | scheduler | scheduler | Selects the job loop instead of the web server |
| `APP_DEBUG` | scheduler | 0 | Must be 0, not false |
| `APP_SECRET` | scheduler | (secret) | Same signing secret as the API |
| `MAILER_DSN` | scheduler | - | Outgoing mail endpoint |
| `UPLOAD_DIR` | scheduler | upload | Upload root, relative to the web root |
| `DATABASE_URL` | scheduler | - | MariaDB connection string |
| `APP_MAINTENANCE` | scheduler | false | Strict bool string |
| `PUBLIC_ROOT_DIR` | scheduler | public | Web root directory name |
| `FILES_UPLOAD_DIR` | scheduler | upload/files | Files module storage |
| `IMAGES_UPLOAD_DIR` | scheduler | upload/images | Images module storage |
| `VIDEOS_UPLOAD_DIR` | scheduler | upload/videos | Video module storage |
| `MINIATURES_UPLOAD_DIR` | scheduler | upload/miniatures | Generated thumbnails |
| `APP_IPS_ACCESS_RESTRICTION` | scheduler | [] | JSON IP allow-list, empty means no restriction |
| `PMS_SCHEDULER_INTERVAL_SECONDS` | scheduler | 3600 | Seconds between recurring-payment runs |
| `APP_DEFAULT_NPL_RECEIVER_EMAILS` | scheduler | [\"admin@example.com\"] | JSON list of notifier recipients |
| `APP_EMERGENCY_EMAILS_RECEIVER_EMAIL` | scheduler | admin@example.com | Recipient for error mail |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Web inbox port, also the health-check port |
| `MP_UI_AUTH` | mailpit | - | Basic auth guarding the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Rolling message cap |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for SMTP |
| `PORT` | frontend | 8080 | HTTP port nginx listens on |
| `PMS_BACKEND_URL` | frontend | - | API origin baked into the SPA |
| `PMS_BACKEND_PRIVATE_URL` | frontend | - | Where the JWT public key is fetched |
| `PORT` | backend | 8080 | HTTP port nginx listens on |
| `APP_ENV` | backend | prod | Symfony environment |
| `APP_DEMO` | backend | false | Strict bool string, only true or false |
| `APP_DEBUG` | backend | 0 | Must be 0, not false: any non-empty string is truthy here |
| `APP_SECRET` | backend | (secret) | JWT passphrase and encryption-key seed, never change |
| `MAILER_DSN` | backend | - | Outgoing mail endpoint |
| `UPLOAD_DIR` | backend | upload | Upload root, relative to the web root |
| `DATABASE_URL` | backend | - | MariaDB connection string |
| `APP_MAINTENANCE` | backend | false | Strict bool string, only true or false |
| `PMS_ADMIN_EMAIL` | backend | admin@example.com | Email of the account seeded at first boot |
| `PUBLIC_ROOT_DIR` | backend | public | Web root directory name |
| `TRUSTED_PROXIES` | backend | 0.0.0.0/0,::/0 | Trust every hop, take the leftmost XFF entry |
| `FILES_UPLOAD_DIR` | backend | upload/files | Files module storage |
| `IMAGES_UPLOAD_DIR` | backend | upload/images | Images module storage |
| `VIDEOS_UPLOAD_DIR` | backend | upload/videos | Video module storage |
| `PMS_ADMIN_PASSWORD` | backend | (secret) | Password of that account |
| `PMS_ADMIN_USERNAME` | backend | (secret) | Username of that account |
| `MINIATURES_UPLOAD_DIR` | backend | upload/miniatures | Generated thumbnails |
| `PMS_ADMIN_LOCK_PASSWORD` | backend | (secret) | Second password for the in-app lock screen |
| `APP_IPS_ACCESS_RESTRICTION` | backend | [] | JSON IP allow-list, empty means no restriction |
| `APP_DEFAULT_NPL_RECEIVER_EMAILS` | backend | [\"admin@example.com\"] | JSON list of notifier recipients |
| `APP_EMERGENCY_EMAILS_RECEIVER_EMAIL` | backend | admin@example.com | Recipient for error mail |
| `MARIADB_USER` | mariadb | (secret) | Scoped account the app connects as |
| `MARIADB_DATABASE` | mariadb | pms | Database created while initializing an empty volume |
| `MARIADB_PASSWORD` | mariadb | (secret) | Password for that scoped account |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Run mariadb-upgrade after an image bump |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Superuser password, read by the entrypoint |

## Configuration

- **Healthcheck:** `/healthz`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'mkdir -p /var/lib/mysql/data && exec docker-entrypoint.sh mariadbd --datadir=/var/lib/mysql/data --bind-address=:: --innodb-buffer-pool-size=512M --max-connections=100'`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Shell, Dockerfile, PHP, Python

[View on Railway →](https://railway.com/deploy/personal-management-system)
