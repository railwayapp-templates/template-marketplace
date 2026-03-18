# Deploy Magika on Railway

An AI powered file type detection tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/nnnGdy)

## About

## Instructions

1. Deploy and copy the endpoint URL.
2. Add a `Bearer Token` header with the generated `AUTH_TOKEN` service variable
3. `POST` either:
- A file as raw bytes to the `/identify_bytes` slug
- A URL to the `/identify_from_url` slug with format:

```json
{"url":"file url here"}
```

### Additional Information

- It is recommended to only rely on the `ct_label` value for the file type. More information [here](https://github.com/google/magika/blob/main/docs/faq.md)

- Add a custom domain routed through Cloudflare

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| magika | `ghcr.io/nxfi777/magika-railway:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_TOKEN` | (secret) | Basic Auth password |
| `PYTHONUNBUFFERED` | 1 | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/template/nnnGdy)
