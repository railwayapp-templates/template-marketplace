# Deploy Nx Cloud CE on Railway

Nx Cloud Community Edition

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ORHjp6)

## About

Original Nx Cloud is a service that helps you and your team scale your Nx workspace. It provides a dashboard that gives you insights into your workspace's health, and it provides a set of CI integrations that help you and your team get the most out of Nx. We are currently working on the first version of Nx Cloud Community Edition.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nx Cloud CE | [IKatsuba/nx-cloud](https://github.com/IKatsuba/nx-cloud) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| MinIO Bucket Creator | `minio/mc:latest` | Database |
| MinIO | `minio/minio:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_HOST` | Nx Cloud CE | - | Database host |
| `DB_NAME` | Nx Cloud CE | - | Database name |
| `DB_PORT` | Nx Cloud CE | 5432 | Database port |
| `DB_USER` | Nx Cloud CE | (secret) | Database user |
| `AWS_REGION` | Nx Cloud CE | us-east-1 | AWS region |
| `JWT_SECRET` | Nx Cloud CE | (secret) | JWT Secret |
| `DB_PASSWORD` | Nx Cloud CE | (secret) | Database password |
| `AWS_ACCESS_KEY_ID` | Nx Cloud CE | - | AWS Access Key ID |
| `AWS_S3_BUCKET_NAME` | Nx Cloud CE | - | AWS S3 Bucket Name |
| `AWS_S3_ENDPOINT_URL` | Nx Cloud CE | - | AWS S3 Endpoint URL |
| `AWS_SECRET_ACCESS_KEY` | Nx Cloud CE | (secret) | AWS Secret Access Key |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Nx Cloud CE | true | Enable Alpine Private Networking |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `MINIO_BUCKET` | MinIO Bucket Creator | - | MinIO Bucket |
| `MINIO_ENDPOINT` | MinIO Bucket Creator | - | MinIO Endpoint |
| `MINIO_ROOT_USER` | MinIO Bucket Creator | (secret) | MinIO Root User |
| `MINIO_ROOT_PASSWORD` | MinIO Bucket Creator | (secret) | MinIO Root Password |
| `PORT` | MinIO | 9000 | MinIO Port |
| `MINIO_BUCKET` | MinIO | nx-cloud | MinIO Bucket |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO Root User |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO Root Password |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Start command:** `/bin/sh -c "minio server --address [::]:$PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/ORHjp6)
