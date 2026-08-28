# Deploy Hister - private search engine for pages and files on Railway

Private search for your web pages and local files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hister-private-sea-1)

## About

Hister is an open-source private search engine for pages and files. This template runs the official Hister image with a persistent data directory and token-based access, so you can keep one searchable library available without exposing it publicly.

Hister stores its application data, SQLite database, search indexes, previews, sessions, and settings under `/hister/data`. Railway attaches persistent storage at that path. Public mode is disabled and Railway generates the access token, so visitors need the token before they can use the search interface. Railway terminates HTTPS and forwards traffic to Hister on port 4433.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Hister | `ghcr.io/asciimoo/hister:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4433 | Internal Hister port. Keep 4433. |
| `HISTER_DATA_DIR` | /hister/data | Persistent Hister data directory. Keep /hister/data. |
| `HISTER__APP__PUBLIC` | false | Keeps Hister private. Keep false so token access is required. |
| `HISTER__SERVER__ADDRESS` | 0.0.0.0:4433 | Hister listener address. Keep 0.0.0.0:4433. |
| `HISTER__SERVER__BASE_URL` | - | Public HTTPS URL Railway generates for Hister. |
| `HISTER__APP__ACCESS_TOKEN` | (secret) | Generated token required to sign in to Hister. |
| `HISTER__APP__USER_HANDLING` | false | Disables built-in user management. Keep false. |

## Configuration

- **Healthcheck:** `/api/config`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/hister/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/hister-private-sea-1)
