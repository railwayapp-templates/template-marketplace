# Deploy Trace Sync Server on Railway

Tiny self-hosted sync server for Trace settings

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trace-sync-server)

## About

Trace Sync Server is a tiny self-hosted sync service for Trace settings. It stores a single JSON state file on disk, exposes a small HTTP API for uploading and downloading settings, and protects access with one shared bearer token. It is designed to be simple, portable, and easy to run without accounts or a database.

Hosting Trace Sync Server on Railway gives you a private settings sync endpoint backed by a persistent Railway Volume. The service runs as a single Go binary in a Docker container, listens over HTTP, and stores its state in `/data/state.json`. You provide a strong `TRACE_SYNC_TOKEN`, attach a Railway Volume at `/data`, and Trace clients use that token to read or update settings. There is no external database, account system, or web UI to maintain. For safe production use, keep the token secret and rely on Railway’s HTTPS public networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trace-sync-server | [arjunkomath/trace-sync-server](https://github.com/arjunkomath/trace-sync-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TRACE_SYNC_TOKEN` | (secret) | Shared bearer token |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, Shell, Just, Dockerfile

[View on Railway →](https://railway.com/deploy/trace-sync-server)
