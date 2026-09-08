# Deploy LocalStack — AWS Emulator on Railway

An AWS cloud emulator for development, testing, and CI workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/localstack-aws-emulator)

## About

LocalStack is a cloud service emulator that provides AWS-compatible APIs for development, testing, automation, and CI/CD workflows.

It allows applications to interact with services such as S3, SQS, SNS, DynamoDB, Secrets Manager, SSM, IAM, STS, and many other AWS APIs without connecting directly to production AWS infrastructure.

This template deploys LocalStack on Railway using the official `localstack/localstack` Docker image.

LocalStack exposes AWS-compatible APIs through a unified gateway on port `4566`. AWS CLI, AWS SDKs, applications, and automation tools can connect to the Railway public domain and use it as a custom AWS endpoint.

A Railway persistent volume is mounted at:

```text
/var/lib/localstack
```

With persistence enabled, supported LocalStack resources and state can survive container restarts and redeployments.

> **Important:** A valid `LOCALSTACK_AUTH_TOKEN` is required to start current LocalStack releases. You can obtain your token from https://app.localstack.cloud.

Because Railway does not expose the host Docker daemon or `/var/run/docker.sock`, LocalStack features that require additional Docker containers may be unavailable or limited.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| localstack | `localstack/localstack:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4566 | LocalStack Gateway port |
| `DEBUG` | 0 | Set to 1 to enable verbose LocalStack debugging |
| `PERSISTENCE` | 1 | Persist LocalStack state across container restarts |
| `LOCALSTACK_AUTH_TOKEN` | (secret) | Required: get your token from https://app.localstack.cloud |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/localstack`

**Category:** Other

[View on Railway →](https://railway.com/deploy/localstack-aws-emulator)
