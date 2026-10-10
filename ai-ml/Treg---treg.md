# Deploy Treg on Railway

Self-hosted tools registry for MCP/AI agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/treg)

## About

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/treg-1)

OpenRouter for agent tools — one base URL and one token to reach a catalog
of thousands of priced API endpoints (SEO, social, enrichment, ads, scraping,
image/video generation), plus your own tools and team keys. No provider
signups required.

Full reference (catalog, `treg CLI` usage, provider and skill docs,
architecture) lives in the app README on GitHub:
`github.com/mc9max/treg/blob/master/README.md`.

treg is a single service: a Python/uvicorn API (serving the web dashboard and
JSON API on one port) plus your frontend assets baked into the image. The
container healthcheck probes `GET /meta`. All durable state lives under
`/app/data` — the bundled SQLite database, the Fernet encryption key (minted
on first boot), and any uploaded assets. A Railway volume named `treg-data`
mounted at `/app/data` (declared in `railway.json`) keeps all of this
durable; without it the app still boots but resets on each redeploy.

Startup is two stages in the image's `entrypoint.sh`: an idempotent
`treg upgrade` (catalog + schema migration) first, then uvicorn. On Railway
the `PORT` env var wins over the image default (8080 is the practical
default for a fresh deploy), and the public domain routes to that port.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| treg | [mc9max/treg](https://github.com/mc9max/treg) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TREG_EMAIL_FROM` | - | Optional — From header for transactional email. Default: tools-registry <no-reply@treg.to>; set to your Resend-verified domain if you enable the email door. |
| `TREG_PUBLIC_URL` | - | Public URL this instance is reachable at. Auto-filled from the deployment's Railway domain (https://YOUR-DEPLOYMENT-DOMAIN) and used to build the GitHub OAuth callback — leave it as-is unless you put a custom domain / CNAME in front, in which case set it to that domain. |
| `TREG_RESEND_API_KEY` | (secret) | Optional — Resend API key for email OTP login. Requires a Resend-verified sending domain (SPF/DKIM). |
| `TREG_GITHUB_CLIENT_ID` | - | GitHub OAuth App Client ID (recommended login door). Create at github.com/settings/developers. The callback URL to register is: https://YOUR-DEPLOYMENT-DOMAIN/auth/github/callback |
| `TREG_GOOGLE_CLIENT_ID` | - | Google OAuth (web application) Client ID for Google sign-in. Register redirect URI https://YOUR-DEPLOYMENT-DOMAIN/auth/google/callback |
| `TREG_GITHUB_CLIENT_SECRET` | (secret) | Secret for the GitHub OAuth app above. Required for the GitHub login door. |
| `TREG_GOOGLE_CLIENT_SECRET` | (secret) | Secret for the Google OAuth client above (pair with TREG_GOOGLE_CLIENT_ID) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, HTML, JavaScript, Vue, CSS, TypeScript, Shell, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/treg)
