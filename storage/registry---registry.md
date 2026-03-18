# Deploy registry on Railway

One-click Docker Registry on Railway with S3 storage and basic auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/registry)

## About

Docker Registry is an open-source server for storing and distributing container images using the OCI Distribution Spec. It gives you full control over where your images live, without relying on Docker Hub or other third-party registries.

Hosting a Docker Registry requires an S3-compatible object store for image layers and a basic auth mechanism to secure access. This template handles both automatically — it connects to a Railway S3 service for storage and generates credentials from environment variables on each deploy. No volumes or local disk needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| registry | [smolpaw/railway-registry](https://github.com/smolpaw/railway-registry) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HTTP_SECRET` | (secret) | Random string used to sign tokens internally |
| `AUTH_PASSWORD` | (secret) | Password for docker login |
| `AUTH_USERNAME` | (secret) | Username for docker login |
| `AWS_SECRET_ACCESS_KEY` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/registry)
