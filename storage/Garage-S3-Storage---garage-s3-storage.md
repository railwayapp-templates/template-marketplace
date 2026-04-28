# Deploy Garage S3 Storage on Railway

Ultra-light S3 server: fast, open-source, plug-and-play 🚀

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/garage-s3-storage)

## About

Garage is an ultra-lightweight, open-source distributed object storage service tailored for self-hosting. It implements the Amazon S3 API, allowing seamless integration with existing tools and SDKs. Written in Rust, it is designed for extremely low resource consumption, making it ideal for cost-effective cloud deployments and resource-constrained environments.

Hosting Garage S3 Storage on Railway provides a zero-configuration, plug-and-play experience for robust object storage. This template utilizes a lightweight Alpine Linux Docker image running the official compiled Garage binary. It automatically provisions a persistent Railway Volume mounted at `/data` to ensure your metadata and files survive container restarts. 

On its first boot, a custom shell script automatically initializes the cluster topology, assigns the node capacity, creates your primary bucket, and generates secure access keys based on your environment variables. Railway automatically exposes the S3 API via an HTTP proxy, meaning your storage is immediately ready to accept API requests from any application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Garage S3 | [matheusac19/railway_garage_template](https://github.com/matheusac19/railway_garage_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3900 | Inject the number 3900 into the script and perform the Healthcheck on 3900. |
| `GARAGE_BUCKET` | my-bucket | Name of the S3 bucket that will be automatically created on the first server startup. You can create others later, but this will be your primary bucket. (Ex: storage-app, images-site). |
| `GARAGE_KEY_NAME` | my-admin-key | A user-friendly name for the access key that will be automatically generated. The system will create the credentials by linking this key to the primary bucket with read and write permissions. |
| `GARAGE_ACCESS_KEY` | - | (Recommended) Create your S3 Access Key ID. It MUST start with 'GK' (Ex: GKmyproject123). If left blank, a secure key will be generated in the logs of the first deployment. |
| `GARAGE_SECRET_KEY` | (secret) | (Recommended) Create your S3 Secret Key. It must be EXACTLY 64 hexadecimal characters (letters a-f, numbers 0-9). If left blank, one will be automatically generated in the logs. |

## Configuration

- **Start command:** `sh /start.sh`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/garage-s3-storage)
