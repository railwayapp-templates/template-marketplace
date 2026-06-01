# Deploy Grist — Self-Hosted Relational Spreadsheet on Railway on Railway

Self-host Grist: Python formulas, relational data. No per-user fees.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grist-spreadsheet-database)

## About

Grist is an open-source relational spreadsheet that combines the flexibility of a spreadsheet
with the structure of a real database — **Python formulas**, typed columns, granular row-level
access controls, SSO, a REST API, and a portable SQLite-based format you can download and open
with any tool. Unlike Airtable which locks your data in a proprietary format, or Google Sheets
which lacks relational structure, Grist lets you build interconnected data models with the
formula power of Python rather than limited cell-based scripting.

Self-host on Railway for ~$2–5/month flat versus Grist Team at $8/user/month or Airtable Pro
at $20/user/month — with zero per-user fees and full data ownership.

---

Running Grist in production requires a persistent volume for document storage, a public HTTPS
endpoint for browser and API access, and environment variable management for authentication
configuration and SSO integration. Without a managed host, you're configuring Docker, volume
mounts, SSL certificates, and reverse proxy rules manually.

Railway handles all of it. This template deploys Grist from the official Docker image, mounts
a persistent volume at `/persist`, and exposes a secure HTTPS endpoint immediately after
deploy. All documents, user accounts, and access rules survive every redeploy.

Typical cost: **~$2–5/month** on Railway's Hobby plan — the lowest cost per-user of any
Airtable alternative available. Grist Team costs $8/user/month. Airtable Pro costs
$20/user/month. For a 5-person team, self-hosting on Railway saves $35–95/month.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Deploy Grist | `gristlabs/grist` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8484 |
| `GRIST_SESSION_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/persist`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/grist-spreadsheet-database)
