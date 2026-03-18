# Deploy Actual Budget on Railway

Track your personal budget using Actual

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/actual-budget)

## About

[Actual Budget](https://github.com/actualbudget/actual) is a super fast and privacy-focused app for managing your finances. At its heart is the well proven and much loved Envelope Budgeting methodology.

Hosting Actual is pretty simply, no fancy config needed. After setting up your instance you can set a password and start entering your data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| actual | `ghcr.io/actualbudget/actual` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ACTUAL_PORT` | 5006 | Port where Actual runs under |
| `ACTUAL_DATA_DIR` | /data | Storage where config and user data is stored |
| `ACTUAL_ALLOWED_LOGIN_METHODS` | (secret) | Supported Auth methods, add 'header' or 'openid' when you know what you're doing |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/actual-budget)
