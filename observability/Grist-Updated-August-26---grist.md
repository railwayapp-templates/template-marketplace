# Deploy Grist [Updated August '26] on Railway

Grist [August '26] (Build Spreadsheets, Databases & Forms) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grist)

## About

Grist is an open-source relational spreadsheet from Grist Labs that pairs a familiar grid with the structure of a real database. Every document is a portable SQLite file, formulas are written in Python instead of a proprietary formula language, and access rules apply down to individual rows and columns. This template runs the official `gristlabs/grist` Docker image so you can self host Grist as an Airtable alternative.

Self hosting Grist means your tables, attachments, and user accounts stay on infrastructure you own, with no per-seat billing and no vendor record caps. Grist stores each document as a self-contained `.grist` SQLite file, so backups are as simple as copying files. On Railway, the container pull, TLS, public domain, healthcheck, restarts, and a persistent volume for `/persist` are handled for you, so a working instance is live in minutes rather than an afternoon of Docker work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gristlabs/grist | `gristlabs/grist` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8484 | PORT |
| `APP_HOME_URL` | - | APP_HOME_URL |
| `GRIST_DEFAULT_EMAIL` | admin@example.com | GRIST_DEFAULT_EMAIL |
| `GRIST_SESSION_SECRET` | (secret) | GRIST_SESSION_SECRET |

## Configuration

- **Volume:** `/persist`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/grist)
