# Deploy HappyView on Railway

A lexicon-driven ATProto AppView.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/happyview)

## About

HappyView is a lexicon-driven [ATProto](https://atproto.com/) [AppView](https://atproto.com/guides/glossary#app-view). Upload lexicon definitions at runtime and HappyView dynamically generates XRPC query and procedure endpoints, indexes records from the network, and proxies writes to users' PDSes — no restart required.

Hosting HappyView requires a Postgres database, an [AIP](https://github.com/graze-social/aip) instance for OAuth 2.1 authentication, and a [Tap](https://github.com/bluesky-social/indigo) instance for syncing records from the AT Protocol network. This template deploys all four services pre-configured to work together. After deployment, you'll need to assign public domains to HappyView and AIP, set your admin DID, and generate signing keys for AIP. See the [quickstart guide](https://github.com/graze-social/happyview/blob/main/docs/quickstart.md) for setup steps.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/gamesgamesgamesgamesgames/happyview-postgres:latest` | Database |
| Tap | `ghcr.io/gamesgamesgamesgamesgames/tap:latest` | Worker |
| HappyView | `ghcr.io/gamesgamesgamesgamesgames/happyview:1` | Worker |
| AIP | `ghcr.io/gamesgamesgamesgamesgames/aip:2.2.4-dev.2` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `TAP_DATABASE_URL` | Tap | - | PostgreSQL connection string for the Tap database |
| `TAP_ADMIN_PASSWORD` | Tap | (secret) | Basic auth password required for all API requests; referenced from HappyView |
| `AIP_URL` | HappyView | - | Internal URL of the AIP service, used for auth validation and proxying OAuth requests |
| `TAP_URL` | HappyView | - | Internal URL of the Tap service for firehose consumption and backfill |
| `RELAY_URL` | HappyView | https://relay1.us-east.bsky.network | ATProto relay URL for repo discovery during backfill |
| `DATABASE_URL` | HappyView | - | PostgreSQL connection string for the HappyView database |
| `AIP_PUBLIC_URL` | HappyView | - | Public URL of the AIP service, returned to the browser for OAuth redirects and DPoP proofs; falls back to AIP_URL if not set |
| `TAP_ADMIN_PASSWORD` | HappyView | (secret) | Admin password for authenticating with the Tap service API |
| `ADMIN_DIDS` | AIP | - | Comma-separated list of DIDs with admin access to the AIP server |
| `DATABASE_URL` | AIP | - | PostgreSQL connection string for the AIP database |
| `EXTERNAL_BASE` | AIP | - | Public base URL of the AIP server, used for OAuth issuer identity and redirect validation |
| `DPOP_NONCE_SEED` | AIP | - | Seed for generating DPoP nonces |
| `STORAGE_BACKEND` | AIP | postgres | Storage backend type: memory or postgres; defaults to memory |
| `ENABLE_CLIENT_API` | AIP | true | Enable the dynamic client registration API; set to true to allow runtime client registration |
| `OAUTH_SIGNING_KEYS` | AIP | - | Private keys for signing OAuth tokens (base58-encoded); see the [AIP docs](https://github.com/graze-social/aip/blob/main/CONFIGURATION.md#key-generation) for details |
| `ATPROTO_OAUTH_SIGNING_KEYS` | AIP | - | Private keys for signing ATProto-specific OAuth tokens (base58-encoded); see the [AIP docs](https://github.com/graze-social/aip/blob/main/CONFIGURATION.md#key-generation) for details |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/happyview)
