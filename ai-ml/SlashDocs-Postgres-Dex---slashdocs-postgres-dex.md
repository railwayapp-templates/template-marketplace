# Deploy SlashDocs + Postgres + Dex on Railway

Agent-published HTML docs with review UI, Postgres, S3 and Dex login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/slashdocs-postgres-dex)

## About

slashdocs is an open-source server from Razorpay that gives AI agents a place to publish self-contained HTML documents that humans can review. Agents push documents through the API, CLI, or remote MCP server; people read them in a web UI, leave comments anchored to text, and track versions.

slashdocs ships as one Go binary with the React UI embedded. It needs Postgres for metadata, an S3-compatible bucket for the uploaded HTML, and an OpenID Connect identity provider for human sign-in. This template runs the pinned image `razorpay/slashdocs:0.1.1` next to a Railway Postgres service, a versitygw S3 service with a volume, and a Dex identity provider with a single static admin user, so you can sign in minutes after deploying without creating a Google or Okta app first. A small Caddy service provides the second hostname that slashdocs requires for sandboxed document rendering. All five services talk over Railway's private network and every secret is generated on deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Render | `caddy:2.11-alpine` | Web service |
| Dex | `dexidp/dex:v2.46.0-alpine` | Web service |
| SlashDocs | `razorpay/slashdocs:0.1.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Blob | `versity/versitygw:v1.8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Render | 8080 | Listen port of the render proxy. Railway probes $PORT; /readyz is proxied to SlashDocs. |
| `UPSTREAM` | Render | - | Private address of the SlashDocs service. Caddy forwards every request there and keeps the original Host header, so slashdocs serves it as the render origin. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Render | true | Required for Alpine-based images to resolve *.railway.internal names. |
| `PORT` | Dex | 5556 | Dex listen port (bound dual stack as [::]:5556). Railway probes $PORT for /dex/healthz. The issuer is https://<this service's public domain>/dex. |
| `DEX_ADMIN_EMAIL` | Dex | admin@example.com | Email of the single static admin user you sign in with. Defaults to admin@example.com; change it to your own address before or after deploy. It becomes your slashdocs user on first login. |
| `DEX_CLIENT_SECRET` | Dex | (secret) | OIDC client secret for client id slashdocs (SlashDocs references this value). |
| `DEX_ADMIN_PASSWORD` | Dex | (secret) | Password of the static admin user. Generated on deploy; read it here to sign in. Dex bcrypt-hashes it at boot. |
| `SLASHDOCS_APP_ORIGIN` | Dex | - | Public origin of SlashDocs, used to register the OIDC redirect URI <origin>/v1/auth/oidc/callback. |
| `PORT` | SlashDocs | 8080 | Listen port. Railway probes $PORT for the healthcheck, so keep it equal to SLASHDOCS_PORT. |
| `BLOB_BUCKET` | SlashDocs | slashdocs-documents | S3 bucket that stores uploaded HTML versions. The Blob service creates this directory as a bucket on boot; keep the two in sync. |
| `BLOB_REGION` | SlashDocs | us-east-1 | Region name for the S3 client. Any value works for versitygw. |
| `DATABASE_URL` | SlashDocs | - | Postgres connection string over the private network. Migrations run automatically on boot (SLASHDOCS_MIGRATE=true). |
| `BLOB_ENDPOINT` | SlashDocs | - | S3-compatible endpoint of the bundled versitygw Blob service over the private network (port included). |
| `SESSION_SECRET` | SlashDocs | (secret) | Session signing key (at least 32 bytes). Generated once; rotating it signs everyone out. |
| `SLASHDOCS_PORT` | SlashDocs | 8080 | Port the slashdocs server binds (dual stack, :8080). Keep equal to PORT. |
| `SLASHDOCS_MIGRATE` | SlashDocs | true | Run database migrations on boot. Set false only if you manage migrations yourself. |
| `BLOB_ACCESS_KEY_ID` | SlashDocs | - | S3 access key, shared with the Blob service. |
| `SLASHDOCS_APP_ORIGIN` | SlashDocs | - | Public URL of the web UI and API. Also the OIDC redirect base (<origin>/v1/auth/oidc/callback). No trailing slash. |
| `SLASHDOCS_DEPLOYMENT` | SlashDocs | public | public: anyone the identity provider accepts can sign in (with Dex that is only the static admin user). org: gate logins to SLASHDOCS_ORG_DOMAINS. |
| `ALLOWED_OAUTH_DOMAINS` | SlashDocs | - | Optional. Comma-separated email domains allowed to sign in on a public deployment (e.g. example.com,company.com). |
| `BLOB_FORCE_PATH_STYLE` | SlashDocs | true | Path-style S3 addressing, required for versitygw, MinIO and most non-AWS S3 servers. |
| `SLASHDOCS_ORG_DOMAINS` | SlashDocs | - | Optional. Comma-separated email domains allowed to sign in when SLASHDOCS_DEPLOYMENT=org. |
| `BLOB_SECRET_ACCESS_KEY` | SlashDocs | (secret) | S3 secret key, shared with the Blob service. |
| `SLASHDOCS_RENDER_ORIGIN` | SlashDocs | - | Public URL where uploaded HTML is sandbox-rendered. Must be a different hostname from SLASHDOCS_APP_ORIGIN; the bundled Render service provides it. |
| `SLASHDOCS_KV_EVENTS_MODE` | SlashDocs | notify | Realtime event delivery. notify uses Postgres LISTEN/NOTIFY over DATABASE_URL (safe here: direct connection, no transaction pooler). |
| `SLASHDOCS_OIDC_CLIENT_ID` | SlashDocs | slashdocs | OIDC client id registered in Dex. |
| `SLASHDOCS_OIDC_ISSUER_URL` | SlashDocs | - | Browser-facing OIDC issuer. Points at the bundled Dex service. Replace with your Okta/Entra/Keycloak issuer to swap identity providers (or use GOOGLE_OAUTH_CLIENT_ID/SECRET instead of the SLASHDOCS_OIDC_* set, never both). |
| `SLASHDOCS_SLACK_BOT_TOKEN` | SlashDocs | (secret) | Optional. Slack bot token for comment notifications. |
| `SLASHDOCS_GITHUB_CLIENT_ID` | SlashDocs | - | Optional. GitHub OAuth App client id for GitHub-backed documents (callback: <SLASHDOCS_APP_ORIGIN>/v1/integrations/github/callback). |
| `SLASHDOCS_OIDC_CLIENT_SECRET` | SlashDocs | (secret) | OIDC client secret registered in Dex (generated on the Dex service). |
| `SLASHDOCS_OIDC_PROVIDER_NAME` | SlashDocs | Dex | Label on the login button: Continue with <name>. |
| `SLASHDOCS_GITHUB_CLIENT_SECRET` | SlashDocs | (secret) | Optional. GitHub OAuth App client secret. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | SlashDocs | true | Required for Alpine-based images to resolve *.railway.internal names (Postgres, Blob, Dex). |
| `SLASHDOCS_OIDC_INTERNAL_ISSUER_URL` | SlashDocs | - | Server-side URL for OIDC discovery, token exchange and JWKS (split horizon over the private network). Remove it when you switch to an external provider. |
| `POSTGRES_DB` | Postgres | slashdocs | Database name. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `PORT` | Blob | 9000 | S3 listen port (bound dual stack as :9000). Railway probes $PORT for /health. Private only, no public domain. |
| `ROOT_ACCESS_KEY_ID` | Blob | - | S3 root access key (SlashDocs references this value). |
| `ROOT_SECRET_ACCESS_KEY` | Blob | (secret) | S3 root secret key (SlashDocs references this value). |

## Configuration

- **Start command:** `sh -c 'exec caddy reverse-proxy --from :8080 --to "http://$UPSTREAM"'`
- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'echo e3stIC8qIERleCBjb25maWcgZm9yIHRoZSBSYWlsd2F5IHRlbXBsYXRlLiBSZW5kZXJlZCBieSB0aGUgZGV4IGltYWdlIGVudHJ5cG9pbnQgdGhyb3VnaCBnb21wbGF0ZSAqLyAtfX0Ke3stIC8qIChhbnkgLnlhbWwgcGFzc2VkIHRvIGBkZXggc2VydmVgIGlzIHRlbXBsYXRlZCwgY3dkIC9ldGMvZGV4LCBvdXRwdXQgaW4gL3RtcCkuIFNhbWUgc3R5bGUgYXMgKi8gLX19Cnt7LSAvKiB1cHN0cmVhbSBjb25maWcuZG9ja2VyLnlhbWwuIFN0YXRpYyBwYXNzd29yZHMgbXVzdCBiZSBiY3J5cHQ7IGdvbXBsYXRlIGhhc2hlcyB0aGUgZ2VuZXJhdGVkICovIC19fQp7ey0gLyogREVYX0FETUlOX1BBU1NXT1JEIGF0IGJvb3QuIFN0b3JhZ2UgaXMgbWVtb3J5OiBEZXggb25seSBicm9rZXJzIGxvZ2lucywgc2xhc2hkb2NzIGtlZXBzIHNlc3Npb25zLiAqLyAtfX0KaXNzdWVyOiB7eyBnZXRlbnYgIkRFWF9JU1NVRVJfU0NIRU1FIiAiaHR0cHMiIH19Oi8ve3sgZ2V0ZW52ICJSQUlMV0FZX1BVQkxJQ19ET01BSU4iIHwgcmVxdWlyZWQgIlJBSUxXQVlfUFVCTElDX0RPTUFJTiAoZ2VuZXJhdGUgYSBwdWJsaWMgZG9tYWluIGZvciB0aGUgRGV4IHNlcnZpY2UpIiB9fS9kZXgKCnN0b3JhZ2U6CiAgdHlwZTogbWVtb3J5Cgp3ZWI6CiAgaHR0cDogIls6Ol06e3sgZ2V0ZW52ICJQT1JUIiAiNTU1NiIgfX0iCgpvYXV0aDI6CiAgc2tpcEFwcHJvdmFsU2NyZWVuOiB0cnVlCgpzdGF0aWNDbGllbnRzOgogIC0gaWQ6IHNsYXNoZG9jcwogICAgc2VjcmV0OiAie3sgZ2V0ZW52ICJERVhfQ0xJRU5UX1NFQ1JFVCIgfCByZXF1aXJlZCAiREVYX0NMSUVOVF9TRUNSRVQiIH19IgogICAgbmFtZTogc2xhc2hkb2NzCiAgICByZWRpcmVjdFVSSXM6CiAgICAgIC0gInt7IGdldGVudiAiU0xBU0hET0NTX0FQUF9PUklHSU4iIHwgcmVxdWlyZWQgIlNMQVNIRE9DU19BUFBfT1JJR0lOIiB9fS92MS9hdXRoL29pZGMvY2FsbGJhY2siCgplbmFibGVQYXNzd29yZERCOiB0cnVlCnN0YXRpY1Bhc3N3b3JkczoKICAtIGVtYWlsOiAie3sgZ2V0ZW52ICJERVhfQURNSU5fRU1BSUwiIHwgcmVxdWlyZWQgIkRFWF9BRE1JTl9FTUFJTCIgfX0iCiAgICBoYXNoOiAie3sgZ2V0ZW52ICJERVhfQURNSU5fUEFTU1dPUkQiIHwgcmVxdWlyZWQgIkRFWF9BRE1JTl9QQVNTV09SRCIgfCBjcnlwdG8uQmNyeXB0IH19IgogICAgdXNlcm5hbWU6IGFkbWluCiAgICB1c2VySUQ6IDA4YTg2ODRiLWRiODgtNGI3My05MGE5LTNjZDE2NjFmNTQ2Ngo= | base64 -d > /etc/dex/config.yaml && exec docker-entrypoint dex serve /etc/dex/config.yaml'`
- **Healthcheck:** `/dex/healthz`
- **Start command:** `sh -c 'i=0; until wget -q -O /dev/null "$SLASHDOCS_OIDC_INTERNAL_ISSUER_URL/healthz" || [ "$i" -ge 60 ]; do i=$((i+1)); echo "waiting for Dex at $SLASHDOCS_OIDC_INTERNAL_ISSUER_URL ($i/60)"; sleep 3; done; exec slashdocs-server'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'mkdir -p /data/slashdocs-documents && exec versitygw --quiet --port :9000 --health /health posix /data'`
- **Healthcheck:** `/health`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/slashdocs-postgres-dex)
