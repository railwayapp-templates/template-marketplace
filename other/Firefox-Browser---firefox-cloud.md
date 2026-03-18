# Deploy Firefox Browser on Railway

Run Firefox Browser on your new tab

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firefox-cloud)

## About

**Firefox Cloud** is a lightweight containerized environment that allows you to run the Firefox browser remotely and access it through your web browser. It provides a full desktop-grade browsing experience in the cloud with secure password-protected VNC access.

Hosting Firefox Cloud on Railway enables you to spin up a cloud-based Firefox instance without complex setup. By leveraging a Docker image, you can expose the Firefox UI over the web through a built-in VNC-over-HTTP service. With Railway’s automated deployment and scaling, you don’t need to manage servers manually. You can configure variables such as timezone and password protection to suit your needs, making this setup flexible for development, testing, or general browsing tasks.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Firefox | `jlesage/firefox` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | Etc/UTC |
| `PORT` | 5800 |
| `APP_NAME` | Firefox Cloud |
| `WEB_AUDIO` | 1 |
| `VNC_PASSWORD` | (secret) |
| `WEB_FILE_MANAGER` | 1 |
| `ENABLE_CJK_FONTENABLE_CJK_FONT` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config:rw`

**Category:** Other

[View on Railway →](https://railway.com/deploy/firefox-cloud)
