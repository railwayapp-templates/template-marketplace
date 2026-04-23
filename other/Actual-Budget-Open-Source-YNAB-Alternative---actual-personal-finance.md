# Deploy Actual Budget | Open Source YNAB Alternative on Railway

Self-host Actual. Free Personal finance app with bank sync, encryption, etc

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/actual-personal-finance)

## About

Deploy Actual Budget on Railway to self-host a privacy-first, local-first personal finance app with envelope budgeting and multi-device sync. Actual Budget is an open-source alternative to YNAB that puts you in full control of your financial data. This Railway template pre-configures the `actualbudget/actual-server` Docker image with a persistent volume at `/data` for SQLite storage and a public domain for immediate access.

Actual Budget is a local-first personal finance application built with TypeScript and released under the MIT license. It was originally a commercial product by James Long before being open-sourced in 2022, and has since grown to over 26,000 GitHub stars with an active community.

Key features of self-hosted Actual Budget include:

- **Envelope/zero-based budgeting** inspired by YNAB — assign every dollar a job
- **Multi-device sync** with optional end-to-end encryption
- **Offline-first PWA** — works without internet, syncs when reconnected
- **Bank sync** via GoCardless (EU/UK banks, free) and SimpleFIN (US/CA banks, $1.50/month)
- **Transaction imports** from QIF, OFX, QFX, CAMT.053, and CSV formats
- **Budgeting rules and scheduled transactions** for automation
- **Split transactions** and detailed reporting dashboards
- **Multi-user support** for shared household budgets
- **Headless API** via the `@actual-app/api` NPM package for programmatic access

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Actual | `actualbudget/actual-server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5006 | HTTP server listening port |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/actual-personal-finance)
