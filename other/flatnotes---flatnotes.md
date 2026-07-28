# Deploy flatnotes on Railway

Markdown notes with password authentication and persistent file storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flatnotes)

## About

flatnotes is a lightweight, self-hosted note-taking web app that stores every
note as an ordinary Markdown file. It offers a distraction-free editor,
full-text search, tags, wikilinks, responsive mobile access, and raw or WYSIWYG
editing without requiring a database or proprietary storage format.

This community template deploys flatnotes v5.5.4 from the official
digest-pinned container image. Railway exposes only the web app on port `8080`,
checks `/health`, and mounts one persistent volume at `/data` for notes,
attachments, and the search index. Password authentication is enabled with the
default username `admin`; Railway generates a fresh login password and a
separate JWT signing key for every deployment. The upstream entrypoint
initializes volume ownership and runs the service as UID/GID `1000`. No
database, worker, migration, external API key, or public demo is required. This
template is not affiliated with or endorsed by the flatnotes project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flatnotes | `dullage/flatnotes:v5.5.4@sha256:a509830073d6548d35450a98be3a432716430b674cc70ac93cbbaed1555b5a28` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PGID` | 1000 | Runtime GID paired with PUID. |
| `PUID` | 1000 | Runtime UID used by the supported entrypoint after it initializes /data ownership. |
| `FLATNOTES_PATH` | /data | Authoritative directory for Markdown notes, attachments, and the .flatnotes search index. |
| `FLATNOTES_PORT` | 8080 | Application listener and Railway public-domain target port. |
| `FLATNOTES_PASSWORD` | (secret) | Fresh login password generated for each template deployment. |
| `FLATNOTES_USERNAME` | (secret) | Default login username. |
| `FLATNOTES_AUTH_TYPE` | password | Enables upstream username/password authentication. |
| `FLATNOTES_SECRET_KEY` | (secret) | Distinct 64-character hexadecimal JWT signing key; changing it invalidates sessions. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/flatnotes)
