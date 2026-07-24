# Deploy Toolkit on Railway

Process image, video, audio & documents via local AI (Snapotter )

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/toolkit)

## About

SnapOtter is an open-source, self-hosted image processing toolkit that combines over 100+ image editing tools with local AI-powered features in a single web application. It includes a visual workflow builder, REST API, user management, and batch processing capabilities, allowing teams to process images privately without relying on third-party cloud services.

Hosting SnapOtter on Railway provides a fully managed environment for running a private image processing platform without managing servers or additional infrastructure. This template deploys SnapOtter as a single service with a Railway Volume for persistent storage of images, user accounts, API keys, and processing pipelines. Railway automatically provisions HTTPS, public networking, and deployment management while keeping all image processing within your own infrastructure. Since SnapOtter runs entirely inside one container, no external databases, Redis instances, or third-party APIs are required for standard deployments, making it simple to operate while maintaining complete ownership of your data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| snapotter/snapotter:latest | `snapotter/snapotter:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1349 | - |
| `DB_PATH` | /data/snapotter.db | - |
| `DEFAULT_PASSWORD` | (secret) | please set the password |
| `DEFAULT_USERNAME` | (secret) | Add  username for login |
| `FILES_STORAGE_PATH` | data/files | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/toolkit)
