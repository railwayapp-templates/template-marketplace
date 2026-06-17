# Deploy Garage S3 + WebUI on Railway

Self-hosted S3 storage with a web management dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vast-green-1)

## About

Garage S3 + WebUI is a self-hosted, S3-compatible object storage stack. It pairs the lightweight [Garage](https://garagehq.deuxfleurs.fr/) storage server with the `khairul169/garage-webui` dashboard, deploying both as pre-connected services over Railway's private network — giving you working object storage plus a MinIO-style web console with no manual setup.

This template provisions two services in one project. The **Garage S3** service runs the Garage v2.2.0 binary, automatically initializing the cluster layout, creating your first bucket, and provisioning an S3 access key on first boot — all persisted to a Railway volume so data and credentials survive restarts. The **WebUI** service runs the garage-webui dashboard and connects to Garage's Admin API (port 3902) and S3 endpoint (port 3900) over the private network. Both services share an admin token, so cluster health, bucket management, and the object browser work immediately. Auto-generated credentials appear in the Garage service's deploy logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Garage S3 | [matheusac19/railway_garage_template](https://github.com/matheusac19/railway_garage_template) | Web service |
| WebUI | [matheusac19/railway_garage_ui_template](https://github.com/matheusac19/railway_garage_ui_template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Garage S3 | 3900 | Inject the number 3900 into the script and perform the Healthcheck on 3900. |
| `GARAGE_BUCKET` | Garage S3 | my-bucket | Name of the S3 bucket that will be automatically created on the first server startup. You can create others later, but this will be your primary bucket. (Ex: storage-app, images-site). |
| `GARAGE_KEY_NAME` | Garage S3 | my-admin-key | A user-friendly name for the access key that will be automatically generated. The system will create the credentials by linking this key to the primary bucket with read and write permissions. |
| `GARAGE_ACCESS_KEY` | Garage S3 | - | (Recommended) Create your S3 Access Key ID. It MUST start with 'GK' (Ex: GKmyproject123). If left blank, a secure key will be generated in the logs of the first deployment. |
| `GARAGE_SECRET_KEY` | Garage S3 | (secret) | (Recommended) Create your S3 Secret Key. It must be EXACTLY 64 hexadecimal characters (letters a-f, numbers 0-9). If left blank, one will be automatically generated in the logs. |
| `GARAGE_ADMIN_TOKEN` | Garage S3 | (secret) | The administration API key (port 3902) used by the WebUI. Any random string will do (recommended: 'openssl rand -hex 32'). If blank, it will be generated in the logs. It must be IDENTICAL to the WebUI's API_ADMIN_KEY. |
| `PORT` | WebUI | 3909 | - |
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
