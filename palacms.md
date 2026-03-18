# Deploy Pala on Railway

Component-based CMS with a code editor, visual editing, and static sites.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/palacms)

## About

[Pala](https://palacms.com) is a modern monolithic CMS that gives developers control and content editors simplicity. Built with Svelte and PocketBase, it features visual on-page editing, custom page types, dynamic fields, and self-hosted freedom with your data staying under your control.

![screenshot](https://pala-pullzone.b-cdn.net/pala-screenshot.jpg)

Pala is self-contained Svelte application with a Pocketbase backend. There's no need for external database. Pala uses SQLite handled by Pocketbase.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| palacms/palacms | `ghcr.io/palacms/palacms` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PALA_APP_URL` | - | The public-facing URL for your PalaCMS instance. |
| `PALA_USER_EMAIL` | - | Email address for initial PalaCMS user account. |
| `PALA_USER_PASSWORD` | (secret) | Password for initial PalaCMS user account. |
| `PALA_SUPERUSER_EMAIL` | - | Email address for initial superuser account. |
| `PALA_SUPERUSER_PASSWORD` | (secret) | Password for initial superuser account. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/pb_data`

**Category:** CMS

[View on Railway →](https://railway.com/template/palacms)
