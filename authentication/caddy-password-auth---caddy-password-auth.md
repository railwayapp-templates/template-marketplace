# Deploy caddy-password-auth on Railway

A lightweight Caddy reverse proxy with HTTP Basic Authentication.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/caddy-password-auth)

## About

A lightweight Caddy reverse proxy with HTTP Basic Authentication for Railway.

| Variable      | Required | Description                          | Example                   |
| ------------- | -------- | ------------------------------------ | ------------------------- |
| ORIGIN        | ✅        | Upstream URL to proxy to             | https://myapp.railway.app |
| BASIC_AUTH    | ❌        | Username:password format             | admin:secret              |
| PORT          | ❌        | Port to listen on (defaults to 80)   | 8080

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy-password-auth | [iliab1/caddy-password-auth](https://github.com/iliab1/caddy-password-auth) | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `ORIGIN` | Your upstream service URL |
| `BASIC_AUTH` | Username and password in username:password format |

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/caddy-password-auth)
