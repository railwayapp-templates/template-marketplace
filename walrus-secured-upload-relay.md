# Deploy walrus-secured-upload-relay on Railway

Walrus Upload Relay with JWT Auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/walrus-secured-upload-relay)

## About

# Walrus Upload Relay

## About

> **Walrus Upload Relay** is a powerful new companion binary for the Walrus TypeScript SDK that makes it easier and faster for apps to upload data to Walrus. The relay acts as a specialized, high-performance lane for an application's data, taking over the task of encoding and [distributing data](https://www.walrus.xyz/blog/how-walrus-red-stuff-encoding-works) shards across Walrus’s decentralized network of storage nodes. Designed to be more lightweight than the Publisher, any developer can run a Relay for their own applications, so you don't have to rely on a third-party operator. Plus, aspiring Relay operators can easily set up a Relay and get paid for the service in SUI.

This template used an additional Auth Proxy to act as a reverse proxy for the upload-relay and validate all incoming request for valid JWT bearer token

## Deployment

Please make sure to add 2 required variables:
- `JWT_TOKEN`: Secret to validate incoming request. This should be **the same** with secret set in you **backend**.
- `SUI_NETWORK`: Network to run in, must be "mainnet" or "testnet"

## Why Deploy on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying walrus-secured-upload-relay on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| auth-proxy | `cmdoss/auth-proxy` | Worker |
| walrus-upload-relay | `cmdoss/walrus-upload-relay:main` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `JWT_SECRET` | auth-proxy | (secret) | Secret to validate JWT Token |
| `UPSTREAM_URL` | auth-proxy | - | Target service to proxy |
| `SUI_NETWORK` | walrus-upload-relay | - | "mainnet" or "testnet" |

**Category:** Other

[View on Railway →](https://railway.com/template/walrus-secured-upload-relay)
