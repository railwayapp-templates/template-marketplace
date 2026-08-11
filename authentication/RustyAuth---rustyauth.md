# Deploy RustyAuth on Railway

RustyAuth 1.0.0: dashboard, private API, SableDB, encrypted backups.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustyauth)

## About

RustyAuth `1.0.0` is a passkey-first authentication service with a separately deployable Dioxus WebAssembly
dashboard, a private Rust API, persistent SableDB state, and encrypted S3-compatible recovery points. This
template deploys the complete supported Railway topology as one unit.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustyauth-dashboard | `ghcr.io/rusty-auth/dashboard@sha256:0409dccea72e6c7731c08a6324cabe393a785f81e28606cebcb7404832bf8962` | Web service |
| RustyAuth | `ghcr.io/rusty-auth/rustyauth@sha256:cb154b787f07fa9d6c690d6437eafaf795d795de639d673279b44f4245da8309` | Worker |
| SableDB | `ghcr.io/rusty-auth/sabledb@sha256:87478c0ec529b38aeca49c3725231703e31ee3e5d5823c28a2960e8b857a39fd` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rustyauth-dashboard | 8080 | Public dashboard gateway port. |
| `RUSTYAUTH_API_UPSTREAM` | rustyauth-dashboard | - | Private Railway URL for the RustyAuth API. |
| `PORT` | RustyAuth | 8080 | Private HTTP port for the RustyAuth API. |
| `AUTH_ENV` | RustyAuth | production | Fail-closed production runtime mode. |
| `RUST_LOG` | RustyAuth | rustyauth=info,tower_http=info | Production logging filter. |
| `AUTH_ISSUER` | RustyAuth | - | Issuer derived from the public dashboard gateway domain. |
| `SABLEDB_URL` | RustyAuth | - | Private Railway connection to the bundled SableDB service. |
| `AUTH_TENANT_ID` | RustyAuth | default | Tenant identifier for this standalone realm. |
| `WEBAUTHN_RP_ID` | RustyAuth | - | Passkey relying-party ID derived from the public dashboard gateway domain. |
| `AUTH_BACKUP_SSE` | RustyAuth | provider | Require provider-managed encryption in addition to RustyAuth application encryption. |
| `BOOTSTRAP_TOKEN` | RustyAuth | (secret) | Automatically generated credential for initial administrative enrolment. |
| `WEBAUTHN_RP_NAME` | RustyAuth | RustyAuth | Human-readable relying-party name shown by passkey prompts. |
| `AUTH_BACKUP_BUCKET` | RustyAuth | - | Private Railway bucket used for encrypted recovery points. |
| `AUTH_BACKUP_REGION` | RustyAuth | - | Signing region for the private Railway backup bucket. |
| `SPACETIME_AUDIENCE` | RustyAuth | rustyauth | Audience claim placed in issued access tokens. |
| `WEBAUTHN_RP_ORIGIN` | RustyAuth | - | Passkey origin derived from the public dashboard gateway domain. |
| `AUTH_MASTER_KEY_HEX` | RustyAuth | - | Automatically generated 256-bit master key. |
| `AUTH_BACKUP_ENDPOINT` | RustyAuth | - | S3-compatible endpoint for the private Railway backup bucket. |
| `AUTH_EVENT_RPC_TOKEN` | RustyAuth | (secret) | Automatically generated credential for the event RPC surface. |
| `AUTH_OPERATOR_EMAILS` | RustyAuth | - | Verified email allowed to bootstrap the first dashboard owner. |
| `AUTH_BACKUP_URL_STYLE` | RustyAuth | virtual | Virtual-hosted S3 URL style used by Railway buckets. |
| `AUTH_IDENTITY_RPC_TOKEN` | RustyAuth | (secret) | Automatically generated credential for the identity RPC surface. |
| `AUTH_TRUSTED_PROXY_HOPS` | RustyAuth | 1 | Trust the single dashboard gateway reverse proxy in front of the private API. |
| `AUTH_ACCESS_TOKEN_SECONDS` | RustyAuth | (secret) | Access-token lifetime in seconds. |
| `AUTH_BACKUP_ACCESS_KEY_ID` | RustyAuth | - | Access key for the private Railway backup bucket. |
| `AUTH_SESSION_IDLE_SECONDS` | RustyAuth | 1800 | Browser-session idle timeout in seconds. |
| `AUTH_BACKUP_STORAGE_PROFILE` | RustyAuth | portable | Railway-compatible storage profile with application encryption and read-back verification. |
| `AUTH_BACKUP_INTERVAL_SECONDS` | RustyAuth | 21600 | Create and verify an encrypted recovery point every six hours. |
| `AUTH_BACKUP_SECRET_ACCESS_KEY` | RustyAuth | (secret) | Secret access key for the private Railway backup bucket. |
| `AUTH_SESSION_ABSOLUTE_SECONDS` | RustyAuth | 604800 | Maximum browser-session lifetime in seconds. |
| `AUTH_BACKUP_ENCRYPTION_KEY_HEX` | RustyAuth | - | Automatically generated independent 256-bit backup-encryption key. |
| `PORT` | SableDB | 6379 | Private SableDB port used by RustyAuth. |
| `SABLEDB_SCAN_KEYS_SECS` | SableDB | 3600 | Full key-count telemetry interval; avoids a once-per-minute database walk competing with authentication on larger realms. |
| `SABLEDB_BLOCK_CACHE_SIZE` | SableDB | 256MB | RocksDB point-read cache sized for the Railway realm tier; lightweight Helm installs retain the conservative image default. |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sabledb`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/rustyauth)
