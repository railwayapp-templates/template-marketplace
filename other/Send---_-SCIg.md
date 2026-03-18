# Deploy Send on Railway

simple & secured file sharing - (minio S3 included)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_-SCIg)

## About

Send + MinIO

This template sets up a full deployment of the “Send” file-sharing service on Railway, designed for quick and secure sharing of files. It includes MinIO, an open-source object storage solution with an S3-compatible API, for file storage and management, allowing for robust and scalable storage similar to AWS S3.

Features:

	•	Send File Sharing Service: A privacy-focused file-sharing service based on Mozilla’s Send, enabling secure and temporary file sharing.
	•	MinIO S3 Storage: Provides scalable object storage with an S3-compatible API, offering seamless storage integration for Send’s file uploads.
	•	Ease of Deployment: Quickly deploy Send with MinIO using Railway’s infrastructure, allowing easy setup and management without handling servers.

Configuration:

	1.	Access the MinIO Console: After deploying, navigate to the MinIO console (usually accessible through Railway’s dashboard) to manage storage settings.
	2.	Create a New Bucket: In the MinIO console, create a bucket for storing uploaded files. This bucket will serve as the storage location for Send’s file uploads.
	3.	Configure Send with MinIO Bucket Information:
	•	Take note of the bucket name, access key, secret key, and endpoint information from the MinIO console.
	•	In Railway, go to the environment variables for Send and enter these details:
	4.	Adjust Additional Settings: Customize settings such as file size limits and expiry times in the Railway environment variables for Send to meet your specific needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Bucket | `minio/minio:latest` | Database |
| send | [timvisee/send](https://github.com/timvisee/send) | Web service |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| redis | `redis/alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `PORT` | send | 1443 | - |
| `BASE_URL` | send | - | The public service or customer domain. |
| `NODE_ENV` | send | production | - |
| `S3_BUCKET` | send | YOUR_MINIO_BUCKETNAME | created in minio console |
| `IP_ADDRESS` | send | 0.0.0.0 | - |
| `S3_ACCESS_KEY` | send | MINIO_BUCKET_ACCESS_KEY | created in minio console |
| `S3_SECRET_KEY` | send | (secret) | created in minio console |
| `S3_USE_PATH_STYLE_ENDPOINT` | send | true | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `REDISPORT` | redis | 6379 | - |
| `REDISUSER` | redis | send-user | - |
| `REDISPASSWORD` | redis | (secret) | - |

## Configuration

- **Volume:** `/app/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`

**Category:** Other · **Languages:** JavaScript, HTML, CSS, Kotlin, Swift, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/_-SCIg)
