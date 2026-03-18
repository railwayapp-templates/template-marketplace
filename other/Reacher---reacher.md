# Deploy Reacher on Railway

Open-Source Email Verification API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reacher)

## About

[Reacher](https://github.com/reacherhq/reacher) is an open-source email verification API built in Rust. It checks if an email address really exists without sending a message. You can self-host it or use the hosted API, and it's great for keeping your user data clean and reducing bounce rates.

Hosting Reacher involves deploying its Rust-based API service and required background workers that handle SMTP and DNS checks. You can easily spin up Reacher on Railway with a single service and minimal configuration—just connect your GitHub repo or Docker image, set environment variables, and Railway takes care of scaling, networking, and runtime management—no servers or deployment scripts needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Reacher | `reacherhq/backend:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/reacher)
