# Deploy kellnr-registry on Railway

Private Rust crate registry with access control and backups

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kellnr-registry)

## About

Kellnr is a private Rust crate registry with a web interface, Cargo-compatible indexes, access control, crates.io proxying, and documentation generation. This template deploys version 6.5.3 with generated administrator credentials and durable local storage.

Sign in as `admin` using `KELLNR_SETUP__ADMIN_PWD`. Cargo clients can use `KELLNR_SETUP__ADMIN_TOKEN` from the service variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kellnr | [monotykamary/railway-template-kellnr](https://github.com/monotykamary/railway-template-kellnr) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Kellnr HTTP port used by the Railway public domain. |
| `KELLNR_LOCAL__PORT` | 8000 | Local Kellnr listener port. |
| `KELLNR_ORIGIN__PORT` | 443 | External HTTPS port used in generated Cargo registry URLs. |
| `KELLNR_ORIGIN__HOSTNAME` | - | Public Railway hostname used in generated registry URLs. |
| `KELLNR_ORIGIN__PROTOCOL` | https | Public protocol; Railway terminates TLS. |
| `KELLNR_SETUP__ADMIN_PWD` | - | Generated initial password for the admin user. |
| `KELLNR_REGISTRY__DATA_DIR` | /data | Persistent SQLite, crate, index, documentation, and cache directory. |
| `KELLNR_SETUP__ADMIN_TOKEN` | (secret) | Generated initial Cargo API token for the admin user. |
| `KELLNR_REGISTRY__AUTH_REQUIRED` | true | Requires authentication for registry operations. |
| `KELLNR_REGISTRY__COOKIE_SIGNING_KEY` | - | Persistent cookie signing key. Keep unchanged across redeployments. |
| `KELLNR_REGISTRY__NEW_CRATES_RESTRICTED` | true | Restricts creation of new crates to administrators. |

## Configuration

- **Healthcheck:** `/api/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/kellnr-registry)
