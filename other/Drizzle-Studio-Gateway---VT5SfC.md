# Deploy Drizzle Studio Gateway on Railway

Drizzle Studio but with multiple connections

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/VT5SfC)

## About

## Drizzle Studio Gateway

This is drizzle's new beta gateway. It's the drizzle studio but where you can have multiple database connections at once. See these **X** posts about how to get a license. 

https://x.com/DrizzleORM/status/1822261051452273056
https://x.com/DrizzleORM/status/1816789492230942941

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Drizzle Studio Gateway | `ghcr.io/drizzle-team/gateway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4983 | Don't change this |
| `MASTERPASS` | - | Don't remove this |
| `STORE_PATH` | /app | Where you wanna store the data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Other

[View on Railway →](https://railway.com/deploy/VT5SfC)
