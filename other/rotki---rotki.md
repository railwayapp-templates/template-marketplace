# Deploy rotki on Railway

Portfolio tracking, analytics, accounting and management application

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rotki)

## About

rotki is an open-source, privacy-first portfolio tracking, accounting, and analytics tool for cryptocurrency and DeFi assets. Unlike cloud-based SaaS competitors, rotki stores your financial data encrypted locally on your computer while providing comprehensive multi-chain portfolio management, profit/loss reporting, tax documentation, and transaction history across 300+ exchanges, wallets, and DeFi protocols.

Hosting rotki requires deploying a Docker container that runs both the Python backend and Node.js frontend. The application uses persistent storage for encrypted user databases and logs, with typical storage requirements of 5-8GB. rotki operates as a self-contained web application accessible via browser on port 80 (mapped to your preferred host port). The deployment is stateful, requiring volumes for `/data` and `/logs` directories to persist user accounts, transaction history, and application logs. rotki supports environment variable configuration for logging levels, timezone settings, and performance tuning. The application is designed for single-user or small team deployments prioritizing data privacy and sovereignty over traditional multi-tenant SaaS architectures.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rotki | `rotki/rotki:v1.41.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOGLEVEL` | info | Enable logging from other modules |
| `MAX_LOGFILES_NUM` | 3 | SQLite instructions setting |
| `LOGFROMOTHERMODULES` | true | Maximum size in MB for all log files combined |
| `SQLITE_INSTRUCTIONS` | 0 | - |
| `MAX_SIZE_IN_MB_ALL_LOGS` | 550 | Maximum number of log files to keep |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.rotki`

**Category:** Other

[View on Railway →](https://railway.com/template/rotki)
