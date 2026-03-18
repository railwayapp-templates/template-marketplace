# Deploy NocoDB + SQLite on Railway

[Feb 2026 Update] Convert any database into a no-code platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nocodb-sqlite)

## About

NocoDB is the fastest and easiest way to build databases online. It provides a rich spreadsheet interface on top of your data with multiple view types (grid, gallery, form, kanban, calendar), access controls, workflow automations, and programmatic access via REST APIs.

Deploying NocoDB on Railway uses the official Docker image (`nocodb/nocodb:latest`) with SQLite as the default database — no external database service required. NocoDB stores its data (SQLite database, uploaded attachments, metadata) in a single directory that needs to be mounted as a persistent volume. On first launch, NocoDB presents a signup screen to create the initial admin account. The application listens on port 8080 by default. For production use, you should set `NC_AUTH_JWT_SECRET` to a stable secret so authentication tokens survive across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nocodb | `nocodb/nocodb:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NC_PUBLIC_URL` | - | Public app URL |
| `NC_AUTH_JWT_SECRET` | (secret) | JWT secret is utilized for generating authentication tokens. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/nocodb-sqlite)
