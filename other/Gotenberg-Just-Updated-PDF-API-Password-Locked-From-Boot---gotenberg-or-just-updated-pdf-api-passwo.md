# Deploy Gotenberg | (Just Updated) PDF API, Password-Locked From Boot on Railway

Gotenberg PDF API. Password on from boot, no fields to fill, public URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gotenberg-or-just-updated-pdf-api-passwo)

## About

Gotenberg is a stateless API that turns HTML, Markdown, URLs and Office files (Word, Excel,
PowerPoint, LibreOffice formats) into PDF, using headless Chromium and LibreOffice. It can also
merge, split, flatten and watermark PDFs. Apps in any language call it over HTTP instead of
bundling a browser of their own.

This template runs Gotenberg 8 as one service from the official image, pinned by digest, with a
public Railway domain and a password generated for every deploy.

- **The API is password-protected from the first request.** A stock Gotenberg container is
  anonymous: anyone who finds the URL can render pages and convert files on your bill. Here basic
  auth is switched on at boot with the username `gotenberg` and a password generated for your
  deploy (`GOTENBERG_API_BASIC_AUTH_PASSWORD`). `/health` stays open so Railway can check the
  service.
- **Requests cannot reach your private network.** Chromium and URL downloads refuse private and
  internal addresses, so a caller cannot make the service fetch other services in your project.
- **Nothing to fill in.** There are no required fields on the deploy form, and no volume: Gotenberg
  keeps nothing between requests. Chromium starts with the container so the first conversion is
  not a cold start.
- **Memory.** Idle it holds roughly 370 MB; a service with 1 GB or more is comfortable, and large
  Office files or heavy pages need more.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gotenberg | `gotenberg/gotenberg:8@sha256:f29984bd1e226bf1b93ba90af06000afa8b315853e99d27b9aaa41b93f15c769` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GOTENBERG_API_BASIC_AUTH_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export GOTENBERG_API_BASIC_AUTH_USERNAME=gotenberg; echo "[railway] gotenberg auth user=$GOTENBERG_API_BASIC_AUTH_USERNAME port=$PORT uid=$(id -u) tmp_writable=$(test -w /tmp && echo yes || echo no)"; exec /usr/bin/tini -- gotenberg --api-port-from-env=PORT --api-enable-basic-auth --chromium-auto-start --chromium-deny-private-ips --api-download-from-deny-private-ips --webhook-deny-private-ips'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/gotenberg-or-just-updated-pdf-api-passwo)
