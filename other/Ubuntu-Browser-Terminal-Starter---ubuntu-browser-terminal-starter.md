# Deploy Ubuntu Browser Terminal Starter on Railway

Password-protected Ubuntu web terminal with a persistent workspace volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-browser-terminal-starter)

## About

Password-protected Ubuntu web terminal with a persistent workspace volume.

This deployment fork provisions ubuntu-railway. Application domains and any authored TCP endpoints are generated for each new deployment. Database and queue services are private by default.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ubuntu-railway | [XenaaLangliss/ubuntu-railway](https://github.com/XenaaLangliss/ubuntu-railway) (branch: main) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `PASSWORD` | (secret) | Generated browser-terminal password; retrieve it in Railway variables. |
| `USERNAME` | (secret) | Username for the browser login. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/workspace`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ubuntu-browser-terminal-starter)
