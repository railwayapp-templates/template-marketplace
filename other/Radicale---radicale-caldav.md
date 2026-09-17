# Deploy Radicale on Railway

Calendar, task and contact server that syncs to your phone and laptop

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/radicale-caldav)

## About

Radicale is a small CalDAV and CardDAV server that holds your calendars, to-do lists and contacts and syncs them to every device you own. It speaks the open standards Apple Calendar, Thunderbird, DAVx⁵ and Evolution already use, so nothing needs a plugin — add an account, point it at a URL, and your appointments live on infrastructure you control. It stores each calendar as ordinary iCalendar and vCard files and needs no database, which makes it the usual answer for scheduling without a groupware suite attached.

Deploy Radicale on Railway and this template gives you a working server rather than a blank one. A single `radicale` service runs the upstream `ghcr.io/kozea/radicale:stable` image behind a wrapper that writes Radicale's configuration and password file from the variables you fill in, so there is nothing to upload and no shell to log into. A volume at `/data` holds every collection, and CalDAV, CardDAV and the browser interface all answer on one public HTTPS domain.

![Radicale service and its data volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789513219/radicale-architecture.webp)

Most calendar hosting comes bundled with something much larger. A groupware suite gives you calendars alongside files, chat and mail, and charges you in memory and maintenance for all of it. Radicale implements CalDAV (RFC 4791) and CardDAV (RFC 6352) well enough that standard clients treat it as any other server, and does nothing else.

- **CalDAV and CardDAV in one server** — events, journals, tasks and contacts, with the calendar-query reports clients depend on
- **Plain-file storage** — every item is an `.ics` or `.vcf` file, so a backup is a copy and a restore is a copy back
- **Per-user isolation** — `owner_only` rights give each account its own namespace
- **Built-in web interface** — create, rename, recolour, upload and delete collections from a browser
- **Optional git history** — each change is committed, so a deleted calendar leaves an undo trail
- **htpasswd authentication** — bcrypt credentials, plus LDAP, IMAP, PAM, Dovecot and OAuth2 backends

The architecture is deliberately flat. The `radicale` service is the whole application: it terminates client requests, authenticates them against a password file rebuilt on each boot from your variables, and reads and writes collection files on the volume. No database, no object storage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| radicale | [gridalpha/radicale-railway](https://github.com/gridalpha/radicale-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the health endpoint listens on |
| `RADICALE_PORT` | 5232 | Port Radicale serves CalDAV/CardDAV on |
| `RADICALE_LOG_LEVEL` | info | Logging threshold |
| `RADICALE_EXTRA_USERS` | - | More logins as user:password, comma separated |
| `RADICALE_RIGHTS_TYPE` | owner_only | Per-account collection permissions |
| `RADICALE_ADMIN_PASSWORD` | (secret) | Password for the first account |
| `RADICALE_ADMIN_USERNAME` | (secret) | Login for the first account |
| `RADICALE_GIT_VERSIONING` | true | Commit every storage change to git |
| `RADICALE_MAX_CONNECTIONS` | 32 | Parallel connections accepted |
| `RADICALE_HTPASSWD_ENCRYPTION` | bcrypt | Hash used in the password file |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/radicale-caldav)
