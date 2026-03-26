# Deploy Anki Sync Server on Railway

Deploy and Host Anki Sync Server with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anki-sync-server)

## About

Anki Sync Server is a service that lets you save your Anki deck data on the cloud to be synced across devices.

This template allows you to host this service instead of using Anki's official AnkiWeb. Although unlike AnkiWeb, this sync server doesn't provide a web frontend.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AnkiSync | `ghcr.io/null2264/anki-railway:25.09` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `SYNC_USER1` | Should formatted like this: username:password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/anki_data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/anki-sync-server)
