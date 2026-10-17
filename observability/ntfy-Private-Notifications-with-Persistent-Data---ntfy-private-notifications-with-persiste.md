# Deploy ntfy Private Notifications with Persistent Data on Railway

Private push notifications with generated admin and persistent storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy-private-notifications-with-persiste)

## About

Private push notifications with generated admin and persistent storage.

Deploying this template creates ntfy in your Railway project. The application receives an HTTPS domain automatically. Database and Redis services, when included, use private networking and generated credentials. Persistent data is stored on the included volumes or object storage, so application redeploys do not discard it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | `binwiederhier/ntfy@sha256:803b2aaeb94df76c8b32ecd91039dc80b0fddb7041dcaf082b33bcdfd4ba39ad` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `NTFY_PASSWORD` | (secret) | Initial password for the admin user. Used only when the persistent auth database does not contain that user. |
| `NTFY_AUTH_FILE` | /var/lib/ntfy/auth.db | - |
| `NTFY_CACHE_FILE` | /var/lib/ntfy/cache.db | - |
| `NTFY_LISTEN_HTTP` | :8080 | - |
| `NTFY_BEHIND_PROXY` | true | - |
| `NTFY_ENABLE_LOGIN` | (secret) | - |
| `NTFY_ENABLE_SIGNUP` | false | - |
| `NTFY_UPSTREAM_BASE_URL` | https://ntfy.sh | - |
| `NTFY_AUTH_DEFAULT_ACCESS` | deny-all | - |
| `NTFY_ATTACHMENT_CACHE_DIR` | /var/lib/ntfy/attachments | - |

## Configuration

- **Start command:** `/bin/sh -c 'mkdir -p /var/lib/ntfy/attachments && ntfy user add --ignore-exists --role=admin admin && exec ntfy serve'`
- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ntfy`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/ntfy-private-notifications-with-persiste)
