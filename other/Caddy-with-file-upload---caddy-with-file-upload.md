# Deploy Caddy with file upload on Railway

HTTP server with file upload support built with Caddy + caddyv2-upload

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/caddy-with-file-upload)

## About

[INAPP-Mobile/caddy-upload-template](https://github.com/INAPP-Mobile/caddy-upload-template) is a lightweight deployment template for running the [Caddy web server](https://caddyserver.com) with browser-based file upload support. It combines static file hosting, upload handling, and automatic HTTPS into a simple deployable service suitable for quick file sharing, backups, and internal tools.

Hosting Caddy with file upload on Railway provides an easy way to deploy a secure web-accessible file server without managing complex infrastructure. The template uses Caddy as the reverse proxy and static file server while exposing an upload endpoint that allows users to send files directly through a web interface or HTTP requests. Railway handles container deployment, networking, HTTPS, scaling, and environment management automatically. This setup is useful for lightweight personal cloud storage, temporary file sharing, media uploads, or internal team utilities. Since Caddy includes automatic TLS certificate provisioning, deployments can securely serve uploaded files over HTTPS with minimal configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| caddy-upload-template | [INAPP-Mobile/caddy-upload-template](https://github.com/INAPP-Mobile/caddy-upload-template) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `BASIC_AUTH_PASSWORD_HASH` | (secret) | bcrypt hash of your chosen password. |

**Category:** Other

[View on Railway →](https://railway.com/deploy/caddy-with-file-upload)
