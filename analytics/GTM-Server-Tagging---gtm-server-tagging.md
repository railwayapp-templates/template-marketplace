# Deploy GTM Server Tagging on Railway

Deploy and Host GTM Server Tagging on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gtm-server-tagging)

## About

Google Tag Manager **Server‑Side Tagging** runs your tags on a lightweight backend container instead of the browser. This speeds up pages, reduces data leakage, and turns every hit into a first‑party request from your own tracking sub‑domain.

A server container is built from Google’s official GTM image and listens on port&nbsp;8080. Railway builds the image, assigns resources, and issues an SSL certificate for any custom domain you attach. Create a dedicated tracking sub‑domain such as **t.yourdomain.com**, point the DNS record to the host Railway provides, wait for the certificate, then paste the full address into **Admin → Container Settings → Tagging Server URL** inside GTM. Because requests now originate from the same site, ad‑blockers overlook them and browsers treat the cookies more leniently.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| preview | [serkanhaslak/gtm-cloud-image](https://github.com/serkanhaslak/gtm-cloud-image) | Web service |
| server-side-tracking | [serkanhaslak/gtm-cloud-image](https://github.com/serkanhaslak/gtm-cloud-image) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | preview | - | This container doesn't need custom domain. Use railway public domain. |
| `RUN_AS_PREVIEW_SERVER` | preview | true | - |
| `PORT` | server-side-tracking | 8080 | Set port 8080 on your custom domain |
| `CONTAINER_CONFIG` | server-side-tracking | - | Get this Config Key from your server GTM Container |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/gtm-server-tagging)
