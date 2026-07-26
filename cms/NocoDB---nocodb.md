# Deploy NocoDB on Railway

Self-hosted NocoDB: open-source Airtable alternative. Turn DBs into a UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nocodb)

## About

NocoDB is an open-source, no-code database platform and a self-hostable alternative to Airtable. Turn any database into a smart spreadsheet with grid, gallery, kanban, and form views, then share and collaborate — all on infrastructure you control. This template runs NocoDB with a persistent volume, ready in one click.

This template deploys the NocoDB application with a persistent volume mounted at /usr/app/data, where its embedded database and uploaded attachments are stored so your bases and files survive redeploys. The JWT auth secret is generated automatically on deploy, and the public URL is wired via a Railway reference variable. After deploying, open the generated domain and create your admin account on the sign-up screen. To connect an external Postgres or MySQL database instead of the built-in store, set the NC_DB variable to its connection string.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nocodb | `nocodb/nocodb:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `NC_DISABLE_TELE` | true |
| `NC_AUTH_JWT_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/app/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/nocodb)
