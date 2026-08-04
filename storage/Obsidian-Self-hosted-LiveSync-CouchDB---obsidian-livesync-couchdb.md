# Deploy Obsidian Self-hosted LiveSync CouchDB on Railway

One-click CouchDB server for Obsidian Self-hosted LiveSync sync plugin.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/obsidian-livesync-couchdb)

## About

Deploy a self-hosted CouchDB server for Obsidian Self-hosted LiveSync.

This template deploys CouchDB 3.4.3 pre-configured for Obsidian sync. A random admin password is auto-generated and printed in the deploy logs on first boot. Persistent storage is handled via a Railway volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| obsidian-livesync-couchdb | [BURNI80/obsidian-livesync-railway](https://github.com/BURNI80/obsidian-livesync-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `COUCHDB_USER` | (secret) |
| `COUCHDB_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/couchdb/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/obsidian-livesync-couchdb)
