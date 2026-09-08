# Deploy Floci — AWS Emulator on Railway

A fast, free AWS emulator for development, testing, and CI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/floci)

## About

Floci is a fast, free, and open-source AWS service emulator for development, testing, automation, and CI workflows. It provides AWS-compatible APIs for services such as S3, SQS, DynamoDB, SNS, Secrets Manager, IAM, Lambda, API Gateway, and many others without requiring a real AWS account.

This template deploys Floci on Railway using the official `floci/floci:latest` Docker image.

Floci exposes its AWS-compatible APIs through a unified endpoint on port `4566`. Applications, AWS CLI, SDKs, automation tools, and development environments can connect to the Railway public domain using it as a custom AWS endpoint.

Persistent state is stored in a Railway volume mounted at `/app/data`, allowing supported resources and emulator state to survive service restarts.

Railway volumes are mounted as `root`. This template uses `RAILWAY_RUN_UID=0` to avoid permission issues when Floci writes persistent state to the mounted volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| floci | `floci/floci:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4566 | Railway HTTP target port |
| `FLOCI_PORT` | 4566 | Floci unified AWS API port |
| `FLOCI_BASE_URL` | - | Public endpoint returned in service URLs |
| `FLOCI_STORAGE_MODE` | persistent | Persist state immediately after each mutation |
| `FLOCI_DEFAULT_REGION` | us-east-1 | Default emulated AWS region |
| `FLOCI_DEFAULT_ACCOUNT_ID` | 000000000000 | Default emulated AWS account ID |
| `FLOCI_STORAGE_PERSISTENT_PATH` | /app/data | Persistent Railway volume directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/floci)
