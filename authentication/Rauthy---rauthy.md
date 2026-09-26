# Deploy Rauthy on Railway

Rauthy 0.36: lightweight OIDC provider and SSO with passkeys, in Rust.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rauthy)

## About

Rauthy is a lightweight OpenID Connect provider and single sign-on server written in Rust. It manages users, groups, roles and OIDC clients, supports passkeys and TOTP, and offers an admin UI plus a self-service account page. It is a small alternative to Keycloak for adding login to your own apps.

This template runs the official `ghcr.io/sebadob/rauthy:0.36.2` image as one service with its embedded Hiqlite database on a Railway volume, so no separate database is needed. Configuration comes entirely from variables: the encryption key, cluster secrets and bootstrap admin password are generated for each deployment. Rauthy trusts Railway's proxy range, so rate limiting and login logs see real client IPs. The admin API requires multi-factor authentication, which is Rauthy's secure default: sign in, register a passkey on the account page, then open the admin UI. It uses around 100 MB of memory. Keep the encryption key safe, because stored secrets depend on it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rauthy | `ghcr.io/sebadob/rauthy:0.36.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `RP_NAME` | Rauthy |
| `HQL_NODES` | 1 localhost:8100 localhost:8200 |
| `PROXY_MODE` | true |
| `HQL_NODE_ID` | 1 |
| `HTTP_WORKERS` | 2 |
| `LISTEN_SCHEME` | http |
| `ENC_KEY_ACTIVE` | rk1 |
| `HQL_SECRET_API` | (secret) |
| `LISTEN_ADDRESS` | 0.0.0.0 |
| `HQL_SECRET_RAFT` | (secret) |
| `TRUSTED_PROXIES` | 100.64.0.0/10 |
| `LISTEN_PORT_HTTP` | 8080 |
| `BOOTSTRAP_ADMIN_EMAIL` | admin@example.com |
| `BOOTSTRAP_ADMIN_PASSWORD_PLAIN` | (secret) |

## Configuration

- **Healthcheck:** `/auth/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/rauthy)
