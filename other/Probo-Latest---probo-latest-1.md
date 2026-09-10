# Deploy Probo — Latest on Railway

Latest tested Probo for Railway, MCP-first with ISO 27001 starter kit.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/probo-latest-1)

## About

Probo is open-source compliance management software for organizing controls, evidence, risks, vendors, policies, and audits.

This template deploys the latest Probo release tested by this template, currently v0.283.1, with PostgreSQL, a Railway Bucket, and headless Chrome. The Probo and Chrome images are pinned by immutable digest so every deployment is reproducible; the repository updates those pins only after the new release passes its deployment tests.

It supplies current PROBOD_* variables, complete HTTPS origins, Railway bucket addressing, a persistent RSA OAuth signing key, and fixes for Railway's root-owned volume.

No OpenAI key is required for MCP-first operation through Codex. When the variable is left blank, the wrapper uses a clearly non-secret placeholder solely for upstream default-agent initialization. The application and MCP remain available; Probo's built-in AI features require a real provider key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Probo | [Calibre-Tech/probo-railway-template](https://github.com/Calibre-Tech/probo-railway-template) | Web service |
| Chrome | `chromedp/headless-shell@sha256:b24482ae166e2c67135f5a8ba9575c257efdd8e2fd6b2e931f9d88ede3d72f3b` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PROBOD_PG_ADDR` | Probo | - | PostgreSQL private host and port |
| `PROBOD_API_ADDR` | Probo | 0.0.0.0:8080 | Internal HTTP listen address |
| `PROBOD_BASE_URL` | Probo | - | Public HTTPS URL for this Probo deployment |
| `PROBOD_SMTP_ADDR` | Probo | - | Required for signup verification and team invitations. Your SMTP host:port (use provider TLS settings). |
| `PROBOD_SMTP_USER` | Probo | (secret) | SMTP username from your provider; leave blank only for a relay that does not require authentication. |
| `PROBOD_AWS_BUCKET` | Probo | - | Railway Bucket name |
| `PROBOD_AWS_REGION` | Probo | - | Railway Bucket region |
| `PROBOD_PG_DATABASE` | Probo | - | PostgreSQL database name |
| `PROBOD_PG_PASSWORD` | Probo | (secret) | PostgreSQL password |
| `PROBOD_PG_USERNAME` | Probo | (secret) | PostgreSQL username |
| `PROBOD_AWS_ENDPOINT` | Probo | - | Railway Bucket S3 endpoint |
| `PROBOD_PG_POOL_SIZE` | Probo | 100 | Maximum PostgreSQL connection pool size |
| `PROBOD_SMTP_PASSWORD` | Probo | (secret) | SMTP password or SMTP-specific API key from your provider; required when it uses authentication. Never use a shared template credential. |
| `PROBOD_CHROME_DP_ADDR` | Probo | - | Headless Chrome private address and upstream port |
| `PROBOD_ENCRYPTION_KEY` | Probo | - | Automatically generated 32-byte application encryption key |
| `PROBOD_OPENAI_API_KEY` | Probo | (secret) | Optional: leave blank for MCP-first Codex workflows; built-in AI requires a real key |
| `PROBOD_AWS_ACCESS_KEY_ID` | Probo | - | Railway Bucket access key ID |
| `PROBOD_SMTP_TLS_REQUIRED` | Probo | true | Require encrypted SMTP. Use your provider settings; disable only for an explicitly trusted private relay. |
| `PROBOD_AUTH_COOKIE_SECRET` | Probo | (secret) | Automatically generated cookie-signing secret |
| `PROBOD_AWS_USE_PATH_STYLE` | Probo | false | Use virtual-hosted addressing for current Railway Buckets |
| `PROBOD_MAILER_SENDER_NAME` | Probo | Probo | Display name on signup, invitation and notification emails. |
| `PROBOD_MAILER_SENDER_EMAIL` | Probo | - | Required: sender address verified with your SMTP provider. Used for account confirmation and invitations. |
| `PROBOD_AUTH_PASSWORD_PEPPER` | Probo | (secret) | Automatically generated password pepper |
| `PROBOD_AWS_SECRET_ACCESS_KEY` | Probo | (secret) | Railway Bucket secret access key |
| `PROBOD_TRUST_AUTH_TOKEN_SECRET` | Probo | (secret) | Automatically generated trust-center token secret |
| `PROBOD_API_CORS_ALLOWED_ORIGINS` | Probo | - | Allowed browser origin including the HTTPS scheme |
| `PROBOD_OAUTH2_SERVER_SIGNING_KEY_PATH` | Probo | /data/oauth2-server-signing-key.pem | Persistent path for the generated OAuth2 RSA signing key |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/probo-latest-1)
