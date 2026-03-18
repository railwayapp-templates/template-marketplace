# Deploy ntfy on Railway

Send push notifications to your phone or desktop using PUT/POST

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/5HQY7M)

## About

## Overview
ntfy lets you send push notifications to your phone or desktop via scripts from any computer, using simple HTTP PUT or POST requests.

## Setup
Add a Custom Domain or Railway-Provided domain on port `80`

## Configuration
Customize your deployment with command line arguments or environment variables.

[Documentation](https://docs.ntfy.sh/config/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | `binwiederhier/ntfy` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Start command:** `ntfy serve`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/template/5HQY7M)
