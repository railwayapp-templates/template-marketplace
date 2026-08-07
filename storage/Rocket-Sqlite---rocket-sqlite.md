# Deploy Rocket Sqlite on Railway

Persistent SQLite database with Railway Volumes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rocket-sqlite)

## About

A lightweight SQLite service with a persistent Railway Volume. This template automatically initializes a SQLite database, enables Write-Ahead Logging (WAL) for improved concurrency, and keeps the database file persisted across deployments. It's ideal for development, prototypes, internal tools, and applications that need a simple embedded database.

This template provides a persistent SQLite database hosted on Railway using a mounted volume. On startup, it creates the database if it doesn't already exist, enables WAL mode for better read/write performance, and stores the database on persistent storage so your data survives redeployments. The template is useful for applications that prefer SQLite's simplicity over running a dedicated database server. Connect to the database from applications running within the same service or use it as a foundation for building your own SQLite-backed API.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-sqlite-template | [DhiWisePvtLtd/railway-sqlite-template](https://github.com/DhiWisePvtLtd/railway-sqlite-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATABASE_PATH` | /data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/rocket-sqlite)
