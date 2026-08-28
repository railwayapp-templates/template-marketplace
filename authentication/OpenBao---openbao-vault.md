# Deploy OpenBao on Railway

Store and share API keys, passwords and certificates securely

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openbao-vault)

## About

OpenBao is an open-source secrets manager: one audited place to keep API keys, database passwords, TLS certificates and encryption keys, and to hand them to applications over an HTTP API instead of through `.env` files and shared password managers. It is a community fork of HashiCorp Vault, created after Vault moved to the Business Source License, and is developed under open governance at the Linux Foundation's OpenSSF.

Deploy OpenBao on Railway and you get a working secrets manager on first boot rather than a server waiting to be initialised. The template runs two services: the OpenBao server, published on a Railway domain and serving the REST API and web UI, and a PostgreSQL database acting as its storage backend. Every secret is encrypted before it reaches Postgres, so the database holds ciphertext only. The server unseals itself at startup from a key held as a Railway variable, initialises itself on the first boot, creates an admin account and a versioned key/value store, and audits every request. Self-host OpenBao this way and there are no unseal shares to paste in after a redeploy.

![Diagram of the OpenBao and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787805428/openbao-architecture.png)

OpenBao solves a problem that grows quietly: as a system gains services, credentials multiply across CI settings, container environments and laptops, and nobody can say who read which secret or when it was rotated. OpenBao centralises them behind one API, encrypts them at rest, and records every read.

- **Versioned key/value storage** — every write keeps history, so a bad rotation can be rolled back.
- **Dynamic secrets** — a database user created on request and revoked when its lease expires, so no long-lived password can leak.
- **Transit encryption** — apps send plaintext and get ciphertext back; the key never leaves OpenBao.
- **Built-in PKI** — an internal CA issuing short-lived TLS certificates.
- **Policies and identity** — HCL policies scoped by path, attached to userpass, AppRole, JWT/OIDC, LDAP or Kubernetes logins.
- **Audit devices** — a structured request log with sensitive fields hashed.

The Railway architecture is deliberately small. The OpenBao service is the only public one and keeps nothing on disk: PostgreSQL holds the encryption barrier, mount table, tokens, leases and secrets in tables OpenBao creates on first connect. That backend is high-availability aware, which is what makes redeploys clean — the incoming container starts as a standby and takes the lock as the old one shuts down.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| openbao | [gridalpha/openbao-railway](https://github.com/gridalpha/openbao-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | openbao | 8200 | API and web UI listening port |
| `DATABASE_URL` | openbao | - | Storage backend connection string |
| `BAO_LOG_LEVEL` | openbao | info | Server log verbosity |
| `BAO_UNSEAL_KEY` | openbao | - | 32-byte AES key for auto-unseal |
| `BAO_ADMIN_PASSWORD` | openbao | (secret) | First admin account password |
| `BAO_ADMIN_USERNAME` | openbao | (secret) | First admin account username |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** Shell, Dockerfile, HCL

[View on Railway →](https://railway.com/deploy/openbao-vault)
