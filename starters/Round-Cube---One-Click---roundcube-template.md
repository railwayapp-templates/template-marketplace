# Deploy Round Cube - One Click on Railway

Roundcube webmail with Postgres - bring your own IMAP/SMTP provider

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/roundcube-template)

## About

Hosting Roundcube on Railway means the webmail client runs as a containerized
Apache/PHP service while a managed Postgres holds settings, contacts, and
sessions. The template provisions exactly two services: `roundcube` (built
from the pinned `roundcube/roundcubemail:1.7.4-apache` image with a thin
Railway wrapper) and the `Postgres` database plugin. Mail itself stays at your
IMAP/SMTP provider, so there are no deliverability, PTR/DNS, or IP-reputation
concerns to manage. The deploy form has no prompts: the database connection is
injected through Railway variable expressions and the Postgres password is
generated fresh per deployment. The database schema is created and migrated
automatically on every boot (`bin/initdb.sh --update`), and PGP keys from the
enigma plugin persist on a dedicated volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| roundcube | [lNamelessl/roundcube-railway-template](https://github.com/lNamelessl/roundcube-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ROUNDCUBEMAIL_DB_USER` | roundcube | (secret) |
| `ROUNDCUBEMAIL_DB_PASSWORD` | roundcube | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/roundcube/enigma`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** Dockerfile, Shell, PHP

[View on Railway →](https://railway.com/deploy/roundcube-template)
