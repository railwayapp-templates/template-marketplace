# Deploy DBX on Railway

A lightweight web database client for managing 100+ databases.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dbx-railway-template)

## About

DBX is a lightweight, self-hosted database client designed to manage multiple database systems from a modern web interface. It supports 100+ databases and provides tools for exploring schemas, browsing data, running queries, managing connections, and simplifying everyday database administration from one centralized workspace.

Hosting DBX gives developers and teams a centralized database management interface that can be accessed directly from a browser.

Instead of installing separate database clients on every workstation, DBX can run as a shared self-hosted service for accessing and managing databases across development, testing, and production environments.

Deploying DBX on Railway simplifies the infrastructure required to keep the service online while providing persistent storage, networking, and managed deployment capabilities. This makes DBX particularly useful for developers managing several databases or infrastructure services from a single environment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| t8y2/dbx:latest | `t8y2/dbx:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | PORT |
| `DBX_PORT` | 4224 | HTTP port used by DBX |
| `DBX_DATA_DIR` | /app/data | Persistent application data |
| `DBX_PASSWORD` | (secret) | Password for accessing the DBX web interface |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/dbx-railway-template)
