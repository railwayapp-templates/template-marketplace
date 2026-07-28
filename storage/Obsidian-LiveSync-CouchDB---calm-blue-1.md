# Deploy Obsidian LiveSync CouchDB on Railway

Self-hosted CouchDB for Obsidian LiveSync

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/calm-blue-1)

## About

Self-hosted CouchDB server pre-configured for the Obsidian Self-hosted LiveSync community plugin. Sync your vaults across desktop, iOS, and Android without paying for Obsidian Sync. One click deploys a CouchDB 3.4.3 instance with CORS, authentication, and persistent storage ready to go.

This template deploys Apache CouchDB with the exact configuration required by vrtmrz's Self-hosted LiveSync community plugin. No manual .ini editing, no reverse proxy setup, no TLS certificates — Railway handles everything. CORS is enabled for Obsidian desktop and mobile, authentication is enforced (no admin party), and your notes persist on a Railway volume at /opt/couchdb/data. The default config fits within Railway's $5/month Hobby plan credit for text-only notes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| obsidian-livesync-railway | [BURNI80/obsidian-livesync-railway](https://github.com/BURNI80/obsidian-livesync-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `COUCHDB_USER ` |  admin |
| `COUCHDB_PASSWORD ` | (secret) |

## Configuration

- **Healthcheck:** `/_up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/couchdb/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/calm-blue-1)
