# Deploy Simple Log Server on Railway

Realtime logs via websocket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tdgyuV)

## About

### Instructions

Open your preferred web browser and navigate to the provided HTTP endpoint URL to establish the websocket connection.

**Request**

Set the request type to `POST`, and append the `/log` slug to your endpoint URL
Include these headers:

- `Content-Type: application/json`
- `Authorization: Basic AUTH`

Replace AUTH with your basic auth credentials (USER:PASS encoded in base64 format). This is critical for authentication.

Construct the body of your request like so:

```json
{
  "log": "YOUR APPLICATION LOG"
}
```

### Additional Tips
- Refresh the page to clear logs
- Route your endpoint through a custom domain with a Cloudflare proxy to enhance the security and reliability of your connections.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LOGS | `nxfi/log-server-py` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASS` | - | Basic Auth Password |
| `PORT` | 5000 | - |
| `USER` | - | Basic Auth Username |
| `PYTHONUNBUFFERED` | 1 | - |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/tdgyuV)
