# Deploy Baikal on Railway

Open-source Google Calendar and Contacts alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/baikal)

## About

Baïkal is a lightweight CalDAV and CardDAV server built on sabre/dav: it stores calendars, events, tasks and contacts and syncs them to the apps you already use — iOS and macOS Calendar and Contacts, DAVx⁵ on Android, Thunderbird, vdirsyncer. It is what you need to leave Google Calendar and Contacts without changing how anyone works: the built-in apps keep working, they just talk to a server you own.

Deploy Baïkal on Railway as two services. The `baikal` service is public over HTTPS and builds from [github.com/gridalpha/baikal-railway](https://github.com/gridalpha/baikal-railway), a Dockerfile that unpacks the official `baikal-0.12.1.zip` release onto `php:8.4-apache`, since upstream publishes no image of its own. A managed **PostgreSQL 18** database on the private network holds every calendar, event, task, address book and contact. You self-host Baïkal here without its install wizard: on first boot the container writes `config/baikal.yaml`, provisions a non-superuser database role, loads the schema and closes the public installer, so the deployment arrives installed with the admin password you chose.

![Baïkal Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787077079/35aec204-05e6-4ddb-bc50-249c0b6e9c9c.png)

CalDAV and CardDAV are how phones and laptops sync calendars and contacts, but most implementations are buried inside something larger: a mail suite, a file-sync platform, a cloud account. Baïkal is the standalone version. Self-host it when a household's or a team's schedules should leave third-party servers while native apps keep working.

Key features:

- CalDAV calendars with events and VTODO tasks, plus CardDAV address books
- Web admin for users, calendars and address books, no config files to edit
- Digest, Basic or Apache-delegated authentication for DAV clients
- Free/busy lookups and optional invitation email over SMTP
- Works with iOS, macOS, DAVx⁵, Thunderbird, Evolution, vdirsyncer and khal

The architecture is flat by design. The `baikal` service is Apache with mod_php serving Baïkal's `html/`, which answers three kinds of request: the admin UI at `/admin/`, the DAV endpoints at `/dav.php`, and the `.well-known` redirects clients probe first. PostgreSQL holds all synced data, and the `/data` volume keeps the YAML config the admin UI rewrites.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| baikal | [gridalpha/baikal-railway](https://github.com/gridalpha/baikal-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | baikal | 8080 | HTTP listening port |
| `DATABASE_URL` | baikal | - | Admin connection used to provision the role |
| `BAIKAL_DB_NAME` | baikal | baikal | Database provisioned for the app |
| `BAIKAL_DB_USER` | baikal | (secret) | Non-superuser role provisioned for the app |
| `BAIKAL_TIMEZONE` | baikal | UTC | Server timezone on first boot |
| `BAIKAL_DB_HARDEN` | baikal | true | Revoke PUBLIC connect after provisioning |
| `PHP_MEMORY_LIMIT` | baikal | 256M | PHP memory limit |
| `BAIKAL_DB_BACKEND` | baikal | pgsql | Database driver; sqlite uses the volume |
| `BAIKAL_MAX_WORKERS` | baikal | 32 | Apache MaxRequestWorkers |
| `BAIKAL_DAV_AUTH_TYPE` | baikal | Digest | DAV auth: Digest, Basic or Apache |
| `BAIKAL_ADMIN_PASSWORD` | baikal | (secret) | Password for the admin account |
| `BAIKAL_CALDAV_ENABLED` | baikal | true | Serve the CalDAV endpoint |
| `BAIKAL_CARDDAV_ENABLED` | baikal | true | Serve the CardDAV endpoint |
| `BAIKAL_ADMIN_PASSWORD_FORCE_RESET` | baikal | (secret) | True for one deploy resets admin password |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** PHP, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/baikal)
