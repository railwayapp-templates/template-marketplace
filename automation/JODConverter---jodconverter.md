# Deploy JODConverter on Railway

Convert Word, Excel and others to PDF (and back) through a simple REST API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jodconverter)

## About

JODConverter is a REST API that converts office documents from one format
to another — `docx → pdf`, `xlsx → csv`, `odt → docx`, `html → pdf`, and
most other pairs LibreOffice supports — by wrapping headless LibreOffice
behind a simple HTTP endpoint. Send a file, get back the converted result.

This template packages the official `jodconverter/jodconverter-examples:rest`
image (headless LibreOffice + the JODConverter Spring Boot REST sample)
behind an nginx proxy, so it deploys on Railway with zero configuration:
dynamic `$PORT` binding, sane default upload-size limits, and an optional
API-key gate you can turn on later. There's no database or external
service to provision — one container does the whole job. Budget at least
1GB RAM per instance, since headless LibreOffice conversions are
memory-hungry.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| JODTemplateRailway | [olivier4429/JODTemplateRailway](https://github.com/olivier4429/JODTemplateRailway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEYS` | (secret) | empty = open ; otherwise a comma-separated list of keys |
| `NGINX_CLIENT_MAX_BODY_SIZE` | 25m | Max request body size accepted by the nginx front proxy before it even reaches Spring Boot. Must be ≥ SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE, otherwise nginx returns 413 first. |
| `JODCONVERTER_LOCAL_PORT_NUMBERS` | 2002,2003 | Number of parallel LibreOffice conversion workers |
| `SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE` | 20MB | Maximum size accepted for a single uploaded file. |
| `SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE` | 20MB | Maximum size accepted for the whole multipart request. Should stay in line with NGINX_CLIENT_MAX_BODY_SIZE. |

## Configuration

- **Healthcheck:** `/swagger-ui/index.html`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** Shell, PowerShell, Dockerfile

[View on Railway →](https://railway.com/deploy/jodconverter)
