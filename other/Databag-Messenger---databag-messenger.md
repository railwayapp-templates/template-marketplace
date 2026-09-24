# Deploy Databag Messenger on Railway

Federated messaging with native account auth and persistent data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/databag-messenger)

## About

Federated messaging with native account auth and persistent data.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

Federated messaging with native account auth and persistent data.

| Service | Role | Persistent path |
| --- | --- | --- |
| `databag` | Public application | `/var/lib/databag` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| databag | `balzack/databag:latest@sha256:b9dc352afb4a3639fa550d42e1a4ca8e1e1d6b72d830f100a14fd92cfaf8f7b4` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `ADMIN` | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/databag`

**Category:** Other

[View on Railway →](https://railway.com/deploy/databag-messenger)
