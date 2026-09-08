# Deploy CloudDev on Railway

A free open-source AWS cloud emulator with 43 services & web dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/clouddev)

## About

CloudDev is a free, open-source AWS emulator that runs dozens of AWS-compatible services from a single Go binary. It supports services such as S3, DynamoDB, Lambda, SQS, SNS, API Gateway, IAM, KMS, CloudFormation, EventBridge, and more.

When deployed on Railway, CloudDev can serve as shared AWS-compatible infrastructure for applications and services running in the same Railway project.

Hosting CloudDev on Railway combines an AWS-compatible development environment with Railway's managed deployment platform.

Railway provides:

* Managed container deployment
* Private networking between services
* Persistent volumes for supported CloudDev state
* Public access to the CloudDev dashboard
* Simple scaling and resource management
* A single project for applications and their supporting infrastructure

A Railway deployment can keep CloudDev close to the applications that use it. Services in the same project can communicate privately, reducing the need to expose emulator endpoints publicly.

CloudDev runs as a single container and does not require a separate database or supporting service for its core operation. For deployments that need state to survive restarts or redeployments, attach a Railway persistent volume to the directory configured for CloudDev data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CloudDev | [codestorm-official/CloudDev](https://github.com/codestorm-official/CloudDev) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4580 | CloudDev web dashboard port |
| `CLOUDDEV_HOST` | 0.0.0.0 | Listen on all container network interfaces |
| `CLOUDDEV_DATA_DIR` | /data | Persistent CloudDev state directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/clouddev)
