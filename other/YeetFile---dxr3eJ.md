# Deploy YeetFile on Railway

Encrypted file sharing and file/password vault service 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dxr3eJ)

## About

For more configuration options, refer to the [documentation](https://github.com/benbusby/yeetfile/tree/main?tab=readme-ov-file#environment-variables) for the full list of environment variables.

## About

YeetFile is a file vault and file/text transferring service, with both a
[web](https://yeetfile.com) and [CLI
client](https://github.com/benbusby/yeetfile/releases) officially supported.
All content is encrypted locally, and the server is incapable of decrypting any
transmitted content.

## Features

### YeetFile Send

- Send files and text with shareable links
  - Links don't require an account to open
- Configurable upload settings
  - Expiration date/time configurable to X minutes/hours/days (max 30 days)
  - Number of downloads (max 10)
  - Optional password protection
- Free text transfers (up to 2000 characters)

___

### YeetFile Vault

- File and password storage + folder creation
- File/password/folder sharing w/ YeetFile users
  - Read/write permissions per user
- No upload size limit

___

### Accounts

- Email not required at signup
  - Account ID-only signup allowed
  - Signup not required for text-only transfers
- Options to pay for vault/send upgrades
  - Payments handled via Stripe
  - BTC and XMR supported via BTCPay
  - Not required when self-hosting
  - Ability to recycle payment ID to remove record of payment

___

### Other

- Server-specific passwords (optional for self-hosting)
- Easily self-hosted
  - Official CLI can be configured to use any server

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| benbusby/yeetfile:latest | `ghcr.io/benbusby/yeetfile:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | benbusby/yeetfile:latest | 8090 | - |
| `YEETFILE_PORT` | benbusby/yeetfile:latest | 8090 | - |
| `YEETFILE_DEBUG` | benbusby/yeetfile:latest | 0 | - |
| `YEETFILE_DB_USER` | benbusby/yeetfile:latest | (secret) | - |
| `YEETFILE_STORAGE` | benbusby/yeetfile:latest | local | - |
| `YEETFILE_SERVER_SECRET` | benbusby/yeetfile:latest | (secret) | - |
| `YEETFILE_DEFAULT_USER_SEND` | benbusby/yeetfile:latest | -1 | - |
| `YEETFILE_DEFAULT_USER_STORAGE` | benbusby/yeetfile:latest | -1 | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/uploads`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dxr3eJ)
