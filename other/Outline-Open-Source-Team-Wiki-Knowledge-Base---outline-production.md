# Deploy Outline | Open-Source Team Wiki & Knowledge Base on Railway

Team wiki with real-time editing. Sign in with a passkey, no SSO needed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/outline-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/outline-production?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=outline-production)

[Outline](https://www.getoutline.com/) is the fast, open-source team wiki and knowledge base: nested documents in collections, real-time collaborative editing, Markdown shortcuts, full-text search, comments, version history, public sharing, templates, an API and imports from Notion, Confluence and Markdown. This template runs the official Outline image with Postgres, Redis and a volume for uploads, and it works the moment the deploy is green: no SSO provider, OAuth app or SMTP server to set up first.

The stack is three services: Outline, Postgres and Redis.

- **Usable on first boot.** Outline normally refuses to let anyone in until you connect Slack, Google, Microsoft or an OIDC provider, or an SMTP server for magic links. This template uses Outline's built-in first-run setup instead: open the URL, create the workspace and admin account, then add a passkey (Face ID, Touch ID, Windows Hello, a password manager or a security key) and sign in with it from then on. SSO or email, which teammates need for their first sign-in, are optional variables you can fill in later.
- **Upstream's own image, pinned.** Outline runs from the official `outlinewiki/outline` image at a fixed release tag (1.10.1), not `latest`, so a redeploy never surprises you with an untested version.
- **Upgrades that migrate themselves.** Outline runs its database migrations on every boot (guarded by a lock), and Railway's health check on `/_health`, which checks both Postgres and Redis, only switches traffic once they finish. Upgrading is bumping the image tag.
- **Uploads on a volume.** Images and attachments are stored on a persistent volume at `/var/lib/outline/data` and served through Outline itself, so there is no bucket or CORS to configure.
- **Generated secrets.** `SECRET_KEY` and `UTILS_SECRET` are generated as 64-character hex strings at deploy time. Postgres and Redis get their own generated passwords and are reachable only on the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.10.2-alpine` | Database |
| Outline | `outlinewiki/outline:1.10.1` | Web service |
| Postgres | `postgres:17.11-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `URL` | Outline | - | Public URL of Outline (links, emails, sign-in callbacks, passkeys) - set it to your custom domain after adding one |
| `PORT` | Outline | 3000 | Port Outline listens on - leave as is |
| `PGSSLMODE` | Outline | disable | Postgres is reached over Railway's private network, which is already encrypted |
| `REDIS_URL` | Outline | - | Redis on the private network (family=0 lets it connect over IPv6) |
| `SMTP_HOST` | Outline | - | Optional SMTP server: enables email sign-in links, invitations and notifications (Railway allows outbound SMTP on Pro only) |
| `SMTP_PORT` | Outline | 465 | SMTP port |
| `SECRET_KEY` | Outline | (secret) | Signs sessions and encrypts stored integration secrets (64 hex chars). BACK IT UP - changing it logs everyone out |
| `SMTP_SECURE` | Outline | true | true for implicit TLS (port 465), false for STARTTLS (587) |
| `DATABASE_URL` | Outline | - | Postgres on the private network |
| `FILE_STORAGE` | Outline | local | Uploads and attachments are stored on the volume |
| `UTILS_SECRET` | Outline | (secret) | Protects Outline's internal cron/utility endpoints |
| `SMTP_PASSWORD` | Outline | (secret) | SMTP password |
| `SMTP_USERNAME` | Outline | (secret) | SMTP username |
| `OIDC_CLIENT_ID` | Outline | - | Optional single sign-on with any OpenID Connect provider (Authentik, Keycloak, Authelia, Zitadel, Okta...): client ID |
| `OIDC_ISSUER_URL` | Outline | - | OpenID Connect issuer URL; endpoints are discovered from /.well-known/openid-configuration. Redirect URI: <URL>/auth/oidc.callback |
| `SMTP_FROM_EMAIL` | Outline | - | Sender, e.g. Outline <wiki@example.com> |
| `WEB_CONCURRENCY` | Outline | 1 | Number of web processes. Outline otherwise starts one per CPU; raise it only with more RAM |
| `GOOGLE_CLIENT_ID` | Outline | - | Optional Google sign-in: OAuth client ID. Redirect URI: <URL>/auth/google.callback |
| `OIDC_DISPLAY_NAME` | Outline | OpenID Connect | Label on the sign-in button |
| `OIDC_CLIENT_SECRET` | Outline | (secret) | OpenID Connect client secret |
| `GOOGLE_CLIENT_SECRET` | Outline | (secret) | Google OAuth client secret |
| `FILE_STORAGE_LOCAL_ROOT_DIR` | Outline | /var/lib/outline/data | Where the volume is mounted - leave as is |
| `POSTGRES_DB` | Postgres | outline | Database name |
| `POSTGRES_USER` | Postgres | (secret) | Database user |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Auto-generated database password |

## Configuration

- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Volume:** `/data`
- **Healthcheck:** `/_health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/outline/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/outline-production)
