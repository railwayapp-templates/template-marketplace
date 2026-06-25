# Deploy third-eye on Railway

Real-time global OSINT intelligence dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/third-eye)

## About

Third Eye runs on Railway as a single Docker-image web service. Railway provides managed deployments, HTTPS domains, and environment variables while the container serves the Next.js dashboard on port 3000.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/third-eye-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HOSTNAME` | 0.0.0.0 |
| `NODE_ENV` | production |
| `NODE_OPTIONS` | --dns-result-order=ipv4first |
| `ENABLE_MSS_SMART_SYSTEM_MODULE` | false |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/third-eye)
