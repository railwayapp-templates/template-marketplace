# Deploy Adobe S3Mock Test Storage on Railway

S3-compatible test endpoints with durable local object fixtures.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adobe-s3mock-test-storage)

## About

S3-compatible test endpoints with durable local object fixtures.

**Draft status:** Configuration and upstream documentation reviewed. Container startup, Railway application workflows, restart behavior, backup restoration and costs remain unverified.

S3-compatible test endpoints with durable local object fixtures.

| Service | Role | Persistent path |
| --- | --- | --- |
| `app` | Private application or dependency | `/s3mockroot` |
| `s3mock` | Public owner gateway | `None` |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `adobe/s3mock:5.2.3@sha256:ab01a6946750f451ca215a47e91030695b260e4003b8a5a6201d25029b8fca92` | Database |
| s3mock | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | app | 9090 | Port for app; follows the upstream deployment configuration. |
| `COM_ADOBE_TESTING_S3MOCK_STORE_ROOT` | app | /s3mockroot | Com adobe testing s3mock store root for app; follows the upstream deployment configuration. |
| `COM_ADOBE_TESTING_S3MOCK_STORE_REGION` | app | us-east-1 | Com adobe testing s3mock store region for app; follows the upstream deployment configuration. |
| `COM_ADOBE_TESTING_S3MOCK_STORE_INITIAL_BUCKETS` | app | fixtures | Com adobe testing s3mock store initial buckets for app; follows the upstream deployment configuration. |
| `COM_ADOBE_TESTING_S3MOCK_STORE_RETAIN_FILES_ON_EXIT` | app | true | Com adobe testing s3mock store retain files on exit for app; follows the upstream deployment configuration. |
| `PORT` | s3mock | 8080 | Port for s3mock; follows the upstream deployment configuration. |
| `OWNER_AUTH` | s3mock | true | Owner auth for s3mock; follows the upstream deployment configuration. |
| `OWNER_SCOPE` | s3mock | all | Owner scope for s3mock; follows the upstream deployment configuration. |
| `UPSTREAM_HOST` | s3mock | - | Resolved from the linked service; preserve this reference for the included topology. |
| `UPSTREAM_PORT` | s3mock | 9090 | Upstream port for s3mock; follows the upstream deployment configuration. |
| `ACCESS_PASSWORD` | s3mock | (secret) | Generated per-deployment secret. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/favicon.ico`
- **Volume:** `/s3mockroot`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/adobe-s3mock-test-storage)
