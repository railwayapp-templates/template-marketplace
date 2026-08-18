# Deploy Multica | Open Source Linear for AI Coding Agents on Railway

Issue tracker where you assign tasks to Claude Code, Codex, Cursor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-coding-agents)

## About

Multica is an open-source issue tracker whose assignees can be coding agents. You file an issue, assign it to Claude Code, Codex, Cursor or any of twenty other agent CLIs, and it picks the work up, opens a pull request and reports back on the issue — the same loop you already run with human teammates.

This template runs the full self-hosted control plane from the images the Multica team publishes to GHCR, pinned to an exact release. Nothing is built from source, so a deploy takes as long as a pull and a redeploy gives you back the version you were already running rather than whatever landed upstream this morning.

Four services and one bucket:

- **multica-api** — the Go API and WebSocket server. Applies its database migrations on boot, waiting for PostgreSQL first so a cold project does not race itself.
- **multica-web** — the Next.js application. It is the only host your browser talks to: it proxies `/api`, `/auth`, `/uploads` and `/ws` to the API over Railway's private network, which keeps the session cookie same-origin and avoids an upstream bug where split-origin deployments save a `401` body instead of your attachment.
- **Postgres** — PostgreSQL 17 with the pgvector extension, on a persistent volume.
- **Valkey** — a Redis-compatible cache. It is what enables Multica's per-IP rate limiting on the login endpoints; without it the middleware is a no-op and `POST /auth/send-code` is unmetered, which is both a brute-force surface and an open relay for mailing strangers. It also carries realtime fan-out, so you can scale the API past one replica.
- **Attachments bucket** — Railway object storage, addressed path-style so presigned URLs work from a browser. Issue attachments and avatars live here rather than on a disk attached to the API, which keeps the application tier stateless.

The agents themselves do **not** run on Railway. Each person who wants to run one installs the `multica` CLI on their own machine, and the daemon there executes the work with their own agent credentials. What you are hosting is the tracker, the realtime layer and the coordination — not the compute.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey | `valkey/valkey:8.1.9-alpine` | Database |
| Postgres | `pgvector/pgvector:0.8.6-pg17-trixie` | Database |
| multica-api | `ghcr.io/multica-ai/multica-backend:v0.4.28` | Web service |
| multica-web | `ghcr.io/multica-ai/multica-web:v0.4.28` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `VALKEY_PASSWORD` | Valkey | (secret) | Password Valkey requires from the API. Hex on purpose — it is substituted into the REDIS_URL connection string, where a slash or an at-sign would truncate the URL. |
| `POSTGRES_DB` | Postgres | multica | Database Multica connects to. |
| `POSTGRES_USER` | Postgres | (secret) | Database role Multica connects as. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. Hex on purpose — it is substituted into DATABASE_URL, and the default generator alphabet can emit a slash that would cut the connection string short. |
| `PORT` | multica-api | 8080 | Port the Go API listens on. Railway routes traffic and health checks by it. |
| `APP_ENV` | multica-api | production | Enables the production safety checks. Among other things it makes the server ignore any fixed development verification code. |
| `SMTP_TLS` | multica-api | - | Empty or starttls for STARTTLS; implicit for SMTPS on port 465. |
| `REDIS_URL` | multica-api | - | Valkey connection string. Its presence is what switches on per-IP rate limiting for the login endpoints and moves realtime fan-out onto a relay that survives more than one API replica. |
| `S3_BUCKET` | multica-api | - | Railway object storage bucket holding attachments and avatars. |
| `S3_REGION` | multica-api | - | Region of the attachments bucket. |
| `SMTP_HOST` | multica-api | - | SMTP relay for login codes. Takes priority over Resend as soon as it is non-empty. |
| `SMTP_PORT` | multica-api | 587 | SMTP port. 465 switches to implicit TLS automatically. |
| `JWT_SECRET` | multica-api | (secret) | Signs session tokens. Changing it logs everyone out. |
| `ALLOW_SIGNUP` | multica-api | true | Leave true to create your first account, then set it to false — or restrict ALLOWED_EMAILS below — and redeploy. Your instance is on the public internet. |
| `DATABASE_URL` | multica-api | - | PostgreSQL connection string, wired to the Postgres service over the private network. |
| `SMTP_PASSWORD` | multica-api | (secret) | SMTP password. |
| `SMTP_USERNAME` | multica-api | (secret) | SMTP username. Leave empty for an unauthenticated relay. |
| `ALLOWED_EMAILS` | multica-api | - | Comma-separated allow-list of addresses that may sign up. Empty means anyone can. |
| `RESEND_API_KEY` | multica-api | (secret) | Resend key for sending login codes. Leave empty and the code is printed to this service's log instead, which is how you sign in the first time. |
| `FRONTEND_ORIGIN` | multica-api | - | Origin of the web app. Used for CORS and for the session cookie. |
| `MULTICA_APP_URL` | multica-api | - | Public address of the web app, used in links the server generates. |
| `RATE_LIMIT_AUTH` | multica-api | 20 | Requests per minute allowed to /auth/send-code. Upstream's default is 5 and assumes one bucket per visitor; because a CDN sits in front of your service the bucket is regional, hence the higher value. Lower it to 5 on a small instance. |
| `SMTP_FROM_EMAIL` | multica-api | - | Envelope sender for SMTP mail. |
| `AWS_ENDPOINT_URL` | multica-api | - | Railway object storage endpoint. |
| `GOOGLE_CLIENT_ID` | multica-api | - | Google OAuth client id, to offer Sign in with Google. |
| `AWS_ACCESS_KEY_ID` | multica-api | - | Access key for the attachments bucket. |
| `RESEND_FROM_EMAIL` | multica-api | - | Sender address used with Resend. |
| `S3_USE_PATH_STYLE` | multica-api | true | Path-style addressing. Railway object storage only returns CORS headers on the path-style endpoint, so presigned URLs opened by a browser depend on this being true. |
| `MULTICA_PUBLIC_URL` | multica-api | - | This API's own public address. It is what the UI prints in the `multica setup self-host` command, and what autopilot webhook URLs are minted from. |
| `GOOGLE_REDIRECT_URI` | multica-api | - | OAuth callback, already pointed at your web domain. |
| `CORS_ALLOWED_ORIGINS` | multica-api | - | Origins allowed to call the API from a browser. |
| `GOOGLE_CLIENT_SECRET` | multica-api | (secret) | Google OAuth client secret. |
| `ALLOWED_EMAIL_DOMAINS` | multica-api | - | Comma-separated allow-list of email domains that may sign up, e.g. yourcompany.com. |
| `AWS_SECRET_ACCESS_KEY` | multica-api | (secret) | Secret key for the attachments bucket. |
| `MULTICA_VCS_SECRET_KEY` | multica-api | (secret) | Encrypts self-hosted Git provider tokens at rest. Must be base64 of exactly 32 bytes. Without it the integration above stays off however the flag is set. |
| `RATE_LIMIT_AUTH_VERIFY` | multica-api | 60 | Requests per minute allowed to /auth/verify-code. A login code is already void after five wrong guesses; this bounds how fast an attacker can request fresh ones. |
| `MULTICA_LARK_SECRET_KEY` | multica-api | (secret) | Set to base64 of 32 random bytes to enable the Lark / Feishu bot. Empty leaves it off. |
| `MULTICA_TRUSTED_PROXIES` | multica-api | - | A separate setting from the rate limiter above: CIDRs whose X-Forwarded-For the autopilot webhook limiter should believe. Empty means it trusts no headers, which is the safe default here. |
| `ATTACHMENT_DOWNLOAD_MODE` | multica-api | auto | How attachments are delivered: auto lets the server pick between a presigned URL and streaming through the API. |
| `MULTICA_SLACK_SECRET_KEY` | multica-api | (secret) | Encrypts each workspace's Slack bot token at rest. Base64 of exactly 32 bytes. The tokens themselves arrive per workspace via OAuth; this one key unseals them. |
| `MULTICA_WECOM_SECRET_KEY` | multica-api | (secret) | Set to base64 of 32 random bytes to enable the WeCom smart bot. Empty leaves it off. |
| `MULTICA_PLUGIN_SECRET_KEY` | multica-api | (secret) | Encrypts remote MCP server credentials at rest. Base64 of exactly 32 bytes. Without it the plugin configuration endpoints fail closed. |
| `DISABLE_WORKSPACE_CREATION` | multica-api | - | Set to true to stop members creating further workspaces once yours exists. |
| `RATE_LIMIT_TRUSTED_PROXIES` | multica-api | 100.64.0.0/10 | Railway reaches this container from its internal 100.64/10 range, so naming that range lets the rate limiter look past it into X-Forwarded-For. Railway discards whatever XFF the caller sent, so this cannot be used to spoof an address. |
| `MULTICA_VCS_INTEGRATION_ENABLED` | multica-api | true | Enables the self-hosted Git provider integration — Forgejo, Gitea and GitLab. |
| `PORT` | multica-web | 3000 | Port the Next.js server listens on. |
| `DOCS_URL` | multica-web | https://multica.ai | Upstream documentation, proxied under /docs. Clear it to disable that route. |
| `HOSTNAME` | multica-web | :: | Bind address. The image ships 0.0.0.0; :: leaves the Node socket dual-stack so it answers Railway's IPv4 health check as well as anything on the private network. |
| `REMOTE_API_URL` | multica-web | - | Where the Next.js server proxies /api, /auth, /uploads and /ws. Keeping it on the private network is what makes your browser talk to a single origin. |

## Configuration

- **Start command:** `sh -c 'exec valkey-server --requirepass "$VALKEY_PASSWORD"'`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'cd /app && i=1; while [ $i -le 60 ]; do ./migrate up && break; echo "waiting for postgres ($i/60)"; sleep 3; i=$((i+1)); done; exec ./server'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/multica-coding-agents)
