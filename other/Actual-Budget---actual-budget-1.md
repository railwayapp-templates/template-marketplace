# Deploy Actual Budget on Railway

A super fast and privacy-focused app for managing your finances.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/actual-budget-1)

## About

Actual Budget is a privacy-focused personal finance app for managing budgets, expenses, accounts, and financial goals. It uses envelope budgeting to help users control spending, plan monthly cash flow, track categories, and understand where money goes. Users own their data, with multi-device sync and optional end-to-end encryption. :contentReference[oaicite:0]{index=0}

Hosting Actual Budget gives you your own private budgeting server that can be accessed from a browser across devices. Instead of relying only on a desktop app, a hosted setup enables multi-device sync, centralized budget data, and easier access from laptop, tablet, or mobile browser. Actual is commonly deployed as a personal server, and it is also available as a Docker image, making it suitable for self-hosting platforms like Railway. :contentReference[oaicite:1]{index=1}

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| actual-budget | `ghcr.io/actualbudget/actual:sha-c312192-alpine` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5006 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/actual-budget-1)
