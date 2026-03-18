# Deploy Virus Scanner on Railway

Scan files and URLs for viruses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wq4sNq)

## About

## Instructions

Deploy the service and then copy the provided endpoint address for usage.

### URLs

To interact with the URL scanning endpoint, use the following details:

- Endpoint: `/scan`
- Request Type: `POST`

Headers:
- `Content-Type: application/json`
- `Authorization: Bearer `

Body:

```json
{
  "url": "YOUR_URL_HERE"
}
```

### Files

For scanning files, the endpoint and request setup are slightly different:

- Endpoint: `/scan_files`
- Request Type: `POST`

Headers:
- `Content-Type: multipart/form-data`
- `Authorization: Bearer `

Body:
When sending the request, attach each file under the key files. For example:

```json
{
  "files": "file_1"
},
{
  "files": "file_2"
}
```

Repeat the above format for each file you wish to scan.

### Additional Information

It is recommended to route your endpoint through a custom domain with a Cloudflare proxy to enhance the security and reliability of your connections.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Scanner | `ghcr.io/nxfi777/virus-scanner:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5000 | - |
| `AUTH_TOKEN` | (secret) | Authentication Bearer |
| `PYTHONUNBUFFERED` | 1 | - |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/wq4sNq)
