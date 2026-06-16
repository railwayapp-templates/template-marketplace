# Deploy vast-green on Railway

Self-hosted S3 storage with a web management dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vast-green-1)

## About

Garage is a lightweight, open-source, S3-compatible object storage engine written in Rust — consuming only ~30–50 MB of RAM. This template pairs it with a modern web dashboard (garage-webui) so you can manage buckets, keys, and files visually without touching the CLI.

This template deploys two services inside your Railway project: **Garage** (the S3 storage backend) and **WebUI** (a Go + React dashboard). Garage handles all object read/write via a standard S3-compatible API, persisting data and credentials to a Railway volume across restarts. The WebUI connects to Garage's Admin API over Railway's private internal network — never exposed publicly — letting you manage buckets, access keys, and files from a browser without touching the CLI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Garage S3 | [matheusac19/railway_garage_template](https://github.com/matheusac19/railway_garage_template) | Web service |
| WebUI | [matheusac19/railway_garage_ui_template](https://github.com/matheusac19/railway_garage_ui_template) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Garage S3 | 3900 | Inject the number 3900 into the script and perform the Healthcheck on 3900. |
| `GARAGE_BUCKET` | Garage S3 | my-bucket | Name of the S3 bucket that will be automatically created on the first server startup. You can create others later, but this will be your primary bucket. (Ex: storage-app, images-site). |
| `GARAGE_KEY_NAME` | Garage S3 | my-admin-key | A user-friendly name for the access key that will be automatically generated. The system will create the credentials by linking this key to the primary bucket with read and write permissions. |
| `GARAGE_ACCESS_KEY` | Garage S3 | - | (Recommended) Create your S3 Access Key ID. It MUST start with 'GK' (Ex: GKmyproject123). If left blank, a secure key will be generated in the logs of the first deployment. |
| `GARAGE_SECRET_KEY` | Garage S3 | (secret) | (Recommended) Create your S3 Secret Key. It must be EXACTLY 64 hexadecimal characters (letters a-f, numbers 0-9). If left blank, one will be automatically generated in the logs. |
| `API_BASE_URL` | WebUI | - | Garage Admin API URL (private network) |
| `API_ADMIN_KEY` | WebUI | - | Admin token from the Garage service |
| `AUTH_USER_PASS` | WebUI | - | Bcrypt-hashed login for the UI — format: user:$2b$... — leave blank to disable auth |
| `S3_ENDPOINT_URL` | WebUI | - | Garage S3 endpoint (private network) |

## Configuration

- **Start command:** `sh /start.sh`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/garage-volume`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vast-green-1)
