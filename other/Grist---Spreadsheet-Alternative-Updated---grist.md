# Deploy Grist - Spreadsheet Alternative [Updated] on Railway

Modern relational spreadsheet combining spreadsheets and databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grist)

## About

Spreadsheet Alternative - Grist  is a modern relational spreadsheet. It combines the flexibility of a spreadsheet with the robustness of a database. It allows you to organize data, build custom dashboards, and write Python-based formulas with automatic cell updates, making it a perfect open-source alternative to Airtable or Excel.

![Grist](https://www.getgrist.com/wp-content/uploads/2025/05/ai-assistant-v2.gif)

Hosting Spreadsheet Alternative - Grist [Updated] on Railway provides a self-managed spreadsheet server. The deployment uses the official Docker image (`gristlabs/grist`), mapping internal service ports and establishing persistence. To preserve documents and data across restarts, a persistent volume should be mounted at `/persist`. Configuration is handled entirely via environment variables, enabling features like service activation, SSO logins, and single-user default identities. Public networking exposes Grist's web UI and REST API. Railway automatically manages the deployment lifecycle and scales the service seamlessly.

![Grist](https://www.getgrist.com/wp-content/uploads/2023/05/MoreFeatures4.gif)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gristlabs/grist:latest | `gristlabs/grist:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8484 |
| `GRIST_DATA_DIR` | /persist/docs |
| `GRIST_IN_SERVICE` | true |
| `GRIST_DEFAULT_EMAIL` | bilalnawaz072@gmail.com |
| `GRIST_SESSION_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/persist`

**Category:** Other

[View on Railway →](https://railway.com/deploy/grist)
