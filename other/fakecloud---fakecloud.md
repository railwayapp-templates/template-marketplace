# Deploy fakecloud on Railway

An open-source AWS emulator for development, testing, and automation.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fakecloud)

## About

fakecloud is a lightweight, open-source AWS-compatible cloud emulator for development and testing. It provides AWS-compatible APIs for services such as S3, SQS, SNS, DynamoDB, IAM, STS, Secrets Manager, CloudWatch, EventBridge, and many others, allowing applications and infrastructure tools to run against an isolated AWS-like environment.

This template deploys fakecloud as a single container on Railway using the official fakecloud container image.

fakecloud exposes its AWS-compatible APIs through a unified gateway on port `4566`. AWS SDKs, AWS CLI, Terraform, OpenTofu, applications, and automated tests can connect to the Railway public domain and use it as a custom AWS endpoint.

A persistent Railway volume is mounted at `/data`, allowing supported fakecloud state to survive container restarts when persistent storage mode is enabled.

No custom start command is required because the official container image starts the fakecloud server automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fakecloud | `ghcr.io/faiscadev/fakecloud:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4566 | Port |
| `FAKECLOUD_ADDR` | 0.0.0.0:4566 | Listen on Railway network |
| `FAKECLOUD_REGION` | us-east-1 | Default AWS region |
| `FAKECLOUD_DATA_PATH` | /data | Persistent storage path |
| `FAKECLOUD_LOG_LEVEL` | info | Application log level |
| `FAKECLOUD_STORAGE_MODE` | persistent | Persist emulator state |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fakecloud)
