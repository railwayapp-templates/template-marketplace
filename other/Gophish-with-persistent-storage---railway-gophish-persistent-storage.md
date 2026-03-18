# Deploy Gophish (with persistent storage) on Railway

Gophish phishing simulation platform with persistent data storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/railway-gophish-persistent-storage)

## About

Gophish is an open-source phishing simulation platform for security awareness training. Deploy with persistent storage, automatic CSRF configuration, and secure defaults. Perfect for IT security teams running phishing training campaigns.

This template deploys Gophish with persistent SQLite storage on Railway. The deployment automatically configures CSRF protection using your Railway domain, manages volume persistence for campaign data, and generates secure admin credentials on first start. Railway handles HTTPS termination, scaling, and infrastructure management while you focus on creating effective security training campaigns. Data persists across redeployments via Railway volumes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-gophish-persistent-storage | [mcmxcii-ldn/railway-gophish-persistent-storage](https://github.com/mcmxcii-ldn/railway-gophish-persistent-storage) | Database |

## Configuration

- **Volume:** `/opt/gophish/data`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/railway-gophish-persistent-storage)
