# Deploy Authelia | Lightweight Open Source Keycloak Alternative on Railway

Self-Host Authelia -  SSO, TOTP, WebAuthn, OpenID Connect, forward auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/authelia)

## About

Authelia is an open-source authentication and authorization server that adds single sign-on (SSO) and two-factor authentication (2FA) to your web applications via a forward-auth middleware. It's built for developers who want to protect self-hosted services without shipping auth code — supporting TOTP, WebAuthn, and an OpenID Connect provider that is OpenID Certified™.

Self-host Authelia on Railway with this one-click deploy template. It pre-wires Authelia with a PostgreSQL database for persistent schema storage and a Redis instance for session caching — all connected over Railway's private network with no manual networking or Docker configuration required.

Authelia is a lightweight IAM gateway — not a full identity provider. It sits in front of your applications and delegates auth via forward auth, so your reverse proxy checks with Authelia before serving any request.

**Key features:**
- Single Sign-On across all subdomains with one session cookie
- Two-factor authentication: TOTP, WebAuthn (YubiKey, passkeys), Duo push
- OpenID Connect provider (OpenID Certified™) — use as an IdP for Gitea, Grafana, Nextcloud
- Fine-grained access control per domain, subdomain, or path
- Brute-force protection with configurable lockouts and ban times
- File-based user database — no LDAP required

**Architecture:** Authelia stores its schema in PostgreSQL (sessions, TOTP secrets, OIDC tokens) and uses Redis as a distributed session cache. On Railway, both services connect to Authelia over `.railway.internal` private hostnames.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Authelia | [praveen-ks-2001/authelia-railway-template](https://github.com/praveen-ks-2001/authelia-railway-template) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:edge` | Database |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Authelia | 9091 | HTTP server listening port |
| `PG_HOST` | Authelia | - | Postgres database host reference |
| `PG_PORT` | Authelia | - | Postgres database port reference |
| `PG_DATABASE` | Authelia | - | Postgres database name reference |
| `PG_PASSWORD` | Authelia | (secret) | Postgres database password reference |
| `PG_USERNAME` | Authelia | (secret) | Postgres database username reference |
| `AUTHELIA_DOMAIN` | Authelia | - | Root domain for authentication service |
| `AUTH_JWT_SECRET` | Authelia | (secret) | Secret for JWT token signing |
| `AUTHELIA_AUTH_URL` | Authelia | - | Public authentication service URL |
| `AUTHELIA_INIT_PASSWORD` | Authelia | (secret) | Initial admin password first boot |
| `AUTHELIA_INIT_USERNAME` | Authelia | (secret) | Initial admin username for setup |
| `AUTHELIA_SESSION_SECRET` | Authelia | (secret) | Secret for session cookie signing |
| `AUTHELIA_SESSION_REDIS_HOST` | Authelia | - | Redis host for session storage |
| `AUTHELIA_SESSION_REDIS_PORT` | Authelia | - | Redis port for session storage |
| `AUTHELIA_SESSION_REDIS_PASSWORD` | Authelia | (secret) | Redis password for session auth |
| `AUTHELIA_STORAGE_ENCRYPTION_KEY` | Authelia | - | Key encrypting stored sensitive data |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/authelia)
