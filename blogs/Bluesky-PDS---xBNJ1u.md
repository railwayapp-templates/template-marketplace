# Deploy Bluesky PDS on Railway

Bluesky PDS (Personal Data Server)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/xBNJ1u)

## About

Bluesky PDS is a personal data server used in the decentralized social network Bluesky. It manages user profiles and post data, handling authentication and data exchange within the Bluesky network.

For usage instructions, please check https://github.com/mkizka/bluesky-pds-railway-template

PDS hosting previously required running installation scripts on VPS, but with PaaS platforms like Railway, you can easily self-host without server management complexity.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PDS | `ghcr.io/bluesky-social/pds:0.4` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOG_ENABLED` | true | - |
| `PDS_CRAWLERS` | https://bsky.network | - |
| `PDS_HOSTNAME` | - | Enter the domain you want to use. |
| `PDS_JWT_SECRET` | (secret) | - |
| `PDS_DID_PLC_URL` | https://plc.directory | - |
| `PDS_ADMIN_PASSWORD` | (secret) | - |
| `PDS_DATA_DIRECTORY` | /pds | - |
| `PDS_EMAIL_SMTP_URL` | - | (Optional) Example: smtps://resend:<your api key here>@smtp.resend.com:465/ |
| `PDS_BLOB_UPLOAD_LIMIT` | 52428800 | - |
| `PDS_BSKY_APP_VIEW_DID` | did:web:api.bsky.app | - |
| `PDS_BSKY_APP_VIEW_URL` | https://api.bsky.app | - |
| `PDS_EMAIL_FROM_ADDRESS` | - | (Optional) Example: admin@your.domain |
| `PDS_REPORT_SERVICE_DID` | did:plc:ar7c4by46qjdydhdevvrndac | - |
| `PDS_REPORT_SERVICE_URL` | https://mod.bsky.app | - |
| `PDS_BLOBSTORE_DISK_LOCATION` | /pds/blocks | - |
| `PDS_PLC_ROTATION_KEY_K256_PRIVATE_KEY_HEX` | - | Generate it with `openssl ecparam --name secp256k1 --genkey --noout --outform DER | tail --bytes=+8 | head --bytes=32 | xxd --plain --cols 32` |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pds`

**Category:** Blogs

[View on Railway →](https://railway.com/template/xBNJ1u)
