# Deploy Images on Railway

HTTP service that crops, resizes, converts and compresses images

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/images)

## About

Images is an HTTP API that crops, resizes, converts and compresses images. Your app sends an image and a JSON config in one request, and the response is the processed image. Any language that can send a multipart form can use it, so your app doesn't need a native image library.

Images reads JPEG, PNG, WebP, GIF, AVIF, TIFF and SVG files. It writes JPEG, PNG or WebP, or keeps the format of the source file.

The template deploys one stateless container. It needs no database, no volume and no other service.

The service reads two variables:

| Variable | Default | Purpose |
| --- | --- | --- |
| `API_KEY` | A random string that Railway generates on deploy | Every request to `/process-image` must send it as `Authorization: Bearer YOUR_API_KEY`. The service doesn't start without it. |
| `MAX_UPLOAD_MB` | `25` | The largest request body that the service accepts. Add this variable to change the limit. |

After the deploy, open `/docs` on your domain. The page lists every config option and lets you send test requests from the browser. `/openapi.json` returns the same information as an OpenAPI document.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Images | `ghcr.io/drizzle-team/railway-images:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Clients send this key as "Authorization: Bearer <API_KEY>". The service does not start without it. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/images)
