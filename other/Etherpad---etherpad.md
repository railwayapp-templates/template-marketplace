# Deploy Etherpad on Railway

Google Docs Alternative. Real-time collaborative text editor.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/etherpad)

## About

Etherpad is an open-source real-time collaborative editor that has done one job well since 2009: letting many people type in the same document at once, with every keystroke attributed to its author and every revision kept. Wikimedia, universities and governments run it for meeting notes, shared drafting and workshops. A pad is just a URL — send the link, people start typing, author colours show who wrote what, and a timeslider scrubs the history character by character.

Deploy Etherpad on Railway and this template gives you the shape the project's own production compose file describes: an **Etherpad** web service on a public HTTPS domain, and a **Railway managed Postgres** database holding every pad, revision, author and chat message. Etherpad reaches Postgres over the private network, so the database is never exposed to the internet. A persistent volume keeps the plugin packages you install through the admin panel, plus the manifest Etherpad reads at startup to reinstall them, so a redeploy never quietly reverts your setup.

![Diagram of the Etherpad and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788322106/etherpad-architecture.png)

Etherpad is a Node.js server that keeps each open pad in memory, streams changes over WebSockets, and writes every revision to a database. Teams self-host it when document contents should not leave their own infrastructure, when a guest should not have to sign up for anything, or to embed a live editor in their own product.

Key features:

- Real-time editing with per-author colours and a revision timeslider
- Pads addressable by URL, with read-only share links
- Built-in chat alongside the document
- Import and export as plain text, HTML, Markdown, PDF and Word `.docx`
- An HTTP API for creating pads, setting text and managing authors
- Around 170 community plugins installable from the admin panel, in 100+ languages

The Railway architecture has two parts. The Etherpad service is the whole application — web UI, WebSocket server, API and admin panel — and the only public one. Postgres is the durable store: pads, revisions, authors, chat and sessions all live there, which is why content survives redeploys. The volume holds only plugin packages and their manifest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| etherpad | [gridalpha/etherpad-railway](https://github.com/gridalpha/etherpad-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | etherpad | 9001 | HTTP server listening port |
| `DB_HOST` | etherpad | - | Private Postgres hostname |
| `DB_NAME` | etherpad | - | Database name |
| `DB_PASS` | etherpad | - | Database password |
| `DB_PORT` | etherpad | - | Postgres port |
| `DB_TYPE` | etherpad | postgres | Storage backend selector |
| `DB_USER` | etherpad | (secret) | Database user |
| `PUBLIC_URL` | etherpad | - | Canonical origin for link previews |
| `SSO_ISSUER` | etherpad | - | Issuer for built-in sign-on |
| `TRUST_PROXY` | etherpad | true | Honour X-Forwarded headers from the edge |
| `USER_SECRET` | etherpad | (secret) | User OAuth client secret |
| `ADMIN_SECRET` | etherpad | (secret) | Admin OAuth client secret |
| `USER_PASSWORD` | etherpad | (secret) | Password for the user account |
| `USER_REDIRECT` | etherpad | - | User OAuth redirect URI |
| `ADMIN_PASSWORD` | etherpad | (secret) | Password for the admin account |
| `ADMIN_REDIRECT` | etherpad | - | Admin OAuth redirect URI |
| `REQUIRE_AUTHENTICATION` | etherpad | true | Require sign-in to open any pad |
| `SHOW_SETTINGS_IN_ADMIN_PAGE` | etherpad | false | Hide the settings file editor |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/etherpad)
