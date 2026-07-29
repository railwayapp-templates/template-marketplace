# Deploy Stirling PDF on Railway

Self-hosted PDF toolkit for conversion, editing, signing, and OCR.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/stirling-pdf-3)

## About

Stirling PDF is a self-hosted, browser-based PDF toolkit for converting, editing, signing, redacting, organizing, compressing, and OCR-processing documents. It brings a broad set of document workflows into one interface while processing files on infrastructure you control instead of requiring a third-party PDF service.

Hosting Stirling PDF requires one application container, a public HTTPS endpoint, and durable storage for configuration, users, custom files, pipelines, and logs. This template runs the immutable `stirlingtools/stirling-pdf:2.14.2` image on its documented port `8080`. Because Railway permits one volume per service, `STIRLING_BASE_PATH` places the related state tree beneath a single `/stirling-data` mount. Login is enabled and initial administrator credentials are generated per deployment, preventing the public endpoint from becoming an anonymous, resource-consuming PDF processor. Railway checks the unauthenticated `/api/v1/info/status` health endpoint while the application UI remains protected by login.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Stirling PDF | `stirlingtools/stirling-pdf:2.14.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `METRICS_ENABLED` | true |
| `STIRLING_BASE_PATH` | /stirling-data |
| `SYSTEM_ENABLESCARF` | false |
| `SECURITY_ENABLELOGIN` | (secret) |
| `SECURITY_LOGINMETHOD` | (secret) |
| `STIRLING_JVM_PROFILE` | balanced |
| `SYSTEM_DEFAULTLOCALE` | en-US |
| `SYSTEM_ENABLEPOSTHOG` | false |
| `SYSTEMFILEUPLOADLIMIT` | 100MB |
| `SYSTEM_ENABLEURLTOPDF` | false |
| `STORAGE_LOCAL_BASEPATH` | /stirling-data/storage |
| `SYSTEM_ENABLEANALYTICS` | false |
| `SYSTEM_GOOGLEVISIBILITY` | false |
| `DISABLE_ADDITIONAL_FEATURES` | false |
| `SECURITY_INITIALLOGIN_PASSWORD` | (secret) |
| `SECURITY_INITIALLOGIN_USERNAME` | (secret) |
| `PROCESS_EXECUTOR_SESSION_LIMIT_LIBRE_OFFICE_SESSION_LIMIT` | 1 |

## Configuration

- **Start command:** `/bin/bash -c 'mkdir -p /stirling-data/configs /stirling-data/logs /stirling-data/customFiles /stirling-data/pipeline /stirling-data/storage && chown -R 1000:1000 /stirling-data && exec tini -- /scripts/init.sh'`
- **Healthcheck:** `/api/v1/info/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/stirling-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/stirling-pdf-3)
