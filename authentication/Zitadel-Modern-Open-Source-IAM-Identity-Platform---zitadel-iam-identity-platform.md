# Deploy Zitadel — Modern Open Source IAM & Identity Platform on Railway

Self-host Zitadel — modern IAM with OIDC, SAML & multi-tenancy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zitadel-iam-identity-platform)

## About

Zitadel is a modern, open-source identity and access management (IAM) platform — a cloud-native alternative to Keycloak, Auth0, and Okta with first-class OIDC, SAML, passkeys, MFA, and multi-tenancy. Its API-first design and clean console make enterprise-grade identity approachable without a dedicated DevOps team, and its event-sourced architecture gives a full audit trail of every identity action. This template deploys Zitadel v4 on PostgreSQL with the masterkey and external-domain settings self-hosting depends on.

---

Zitadel is powerful and modern, but self-hosting it has three specifics that determine success — this template handles all three.

**`ZITADEL_MASTERKEY` must be exactly 32 characters, and losing it means total data loss.** The masterkey encrypts all secrets at rest. If it's lost or changed, every encrypted value becomes permanently unrecoverable, and a wrong length fails init. Generate a 32-character key, set it once, and back it up offline. This template supplies it via `--masterkeyFromEnv` so it stays stable across redeploys.

**PostgreSQL only — CockroachDB support was dropped in v4.** Older Zitadel guides reference CockroachDB, but as of v4, PostgreSQL is the sole supported backend. This template uses Postgres, which is current; anything still wired for CockroachDB is out of date.

**The v4 Login UI shares the core's network context.** Zitadel v4 splits into a Go core and a Next.js Login V2 UI. The login UI depends on a machine token (PAT) the core generates during first init and must reach the core over the shared network, with `ZITADEL_DEFAULTINSTANCE_FEATURES_LOGINV2_REQUIRED=true` enabling the new flow. This template wires the core and login UI so authentication works out of the box — the piece a naive Zitadel deployment gets stuck on.

**Set the external domain and let Railway handle TLS.** `ZITADEL_EXTERNALDOMAIN` must be your Railway domain and `ZITADEL_EXTERNALSECURE=true` (traffic is HTTPS), but `ZITADEL_TLS_ENABLED=false` — Railway terminates TLS at its proxy, so Zitadel must not. This template sets all three.

Typical cost: **~$10–20/month** on Railway for Zitadel and Postgres, more if you scale CPU for heavy login traffic. Zitadel hashes passwords with bcrypt/argon2 (deliberately CPU-intensive), so allocate generously for production login load. Zitadel is Apache-2.0 and free to self-host.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zitadel-postgres | `ghcr.io/railwayapp-templates/postgres-ssl` | Database |
| Zitadel | [sethumadhavan-k/zitadel](https://github.com/sethumadhavan-k/zitadel) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | zitadel-postgres | railway | - |
| `POSTGRES_USER` | zitadel-postgres | (secret) | - |
| `POSTGRES_PASSWORD` | zitadel-postgres | (secret) | - |
| `ZITADEL_EXTERNALDOMAIN` | Zitadel | - | Publicly accessible domain for your Zitadel instance (e.g., auth.example.com) |
| `ZITADEL_EXTERNALSECURE` | Zitadel | true | - |
| `ZITADEL_DATABASE_POSTGRES_DATABASE` | Zitadel | zitadel | - |
| `ZITADEL_DATABASE_POSTGRES_USER_PASSWORD` | Zitadel | (secret) | - |
| `ZITADEL_DATABASE_POSTGRES_USER_SSL_MODE` | Zitadel | disable | - |
| `ZITADEL_DATABASE_POSTGRES_USER_USERNAME` | Zitadel | (secret) | - |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_PASSWORD` | Zitadel | (secret) | - |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_SSL_MODE` | Zitadel | disable | - |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_USERNAME` | Zitadel | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/zitadel-iam-identity-platform)
