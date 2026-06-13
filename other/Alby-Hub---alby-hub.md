# Deploy Alby Hub on Railway

Easy, connectable, feature-rich Bitcoin Lightning node for self-sovereignty

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/alby-hub)

## About

Alby Hub is a self-custodial, open source Lightning wallet service that lets you connect your own wallet or node to apps using Nostr Wallet Connect (NWC). It can run with an embedded Lightning node by default, or connect to external backends like LND, Phoenixd, Cashu, CLN, and Bark.

Alby Hub runs as a single containerized web service with persistent disk storage for wallet state, app data, and the default embedded SQLite database. If you use the built-in LDK node, persistent storage is required so channel and node data survive restarts. Alby Hub is designed to run continuously so it can stay connected to relays, receive payments, and serve connected apps at any time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Alby Hub | `ghcr.io/getalby/hub:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WORK_DIR` | /albyhub-data/data/albyhub |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/albyhub-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/alby-hub)
