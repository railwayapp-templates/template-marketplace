# Deploy Deno KV | Open Source Key-Value Database for Deno Apps on Railway

Self-hosted Deno.openKv() backend with SQLite storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qdi8HH)

## About

Deno KV is a key-value database with atomic transactions, secondary indexes and watch streams, built into the Deno runtime. This runs the standalone `denokv` server, so the same `Deno.openKv()` code that works locally works against a database you host — outside Deno Deploy.

A single service storing its data in SQLite on a persistent volume, protected by a generated access token. Deno clients connect over HTTP by passing the deployment URL to `Deno.openKv()`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| denokv | `ghcr.io/denoland/denokv:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DENO_KV_SQLITE_PATH` | /data/denokv.sqlite3 | SQLite Path |
| `DENO_KV_ACCESS_TOKEN` | (secret) | Access Token |

## Configuration

- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/qdi8HH)
