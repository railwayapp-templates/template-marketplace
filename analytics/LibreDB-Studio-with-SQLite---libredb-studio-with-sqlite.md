# Deploy LibreDB Studio with SQLite on Railway

Open-source web-based SQL & NoSQL IDE with AI-powered query assistance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libredb-studio-with-sqlite)

## About

![LibreDB Studio Demo Gif](https://github.com/libredb/libredb-studio/raw/main/public/screenshots/hero-demo.gif)

LibreDB Studio is an open-source web-based database IDE for managing and querying databases from your browser. It supports PostgreSQL, MySQL, MongoDB, Redis, SQLite, and other database engines. This Railway template deploys LibreDB Studio with persistent SQLite storage, user authentication, and optional AI-assisted queries.

Deploy LibreDB Studio on Railway to access your databases through a web interface without installing a desktop database client. The template uses SQLite to store saved connections and settings on a persistent Railway volume, so this information survives service redeployments.

After deployment, open the auto-generated Railway domain to access the login page. The template creates separate administrator and query-only accounts with generated passwords. You can retrieve their credentials from the service's Variables tab. The application listens on port `3000`, which must match the configured HTTP Proxy Port.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreDB Studio | `ghcr.io/libredb/libredb-studio:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the app listens on. Must match the HTTP Proxy Port. Leave as 3000 |
| `LLM_MODEL` | - | AI model name; provider default used if empty (e.g. gpt-4o-mini, llama3.1) |
| `JWT_SECRET` | (secret) | Secret key used to sign login session tokens. Auto-generated — keep it |
| `OIDC_SCOPE` | - | OIDC scopes. Defaults to 'openid profile email' if empty |
| `USER_EMAIL` | user@libredb.org | Login email for the standard, query-only account |
| `ADMIN_EMAIL` | admin@libredb.org | Login email for the ADMIN account (full access incl. maintenance tools) |
| `LLM_API_KEY` | (secret) | API key for the chosen AI provider (Gemini/OpenAI). Not needed for a local Ollama |
| `LLM_API_URL` | - | Base URL for ollama/custom AI providers only. Not needed for gemini/openai |
| `OIDC_ISSUER` | - | OIDC issuer URL for SSO. Required when NEXT_PUBLIC_AUTH_PROVIDER=oidc |
| `LLM_PROVIDER` | - | Optional AI query assistance: gemini | openai | ollama | custom. Omit to keep AI off. |
| `USER_PASSWORD` | (secret) | Password for the standard user. Auto-generated; find it in Variables after deploy |
| `ADMIN_PASSWORD` | (secret) | Password for the admin account. Auto-generated; find it in Variables after deploy |
| `OIDC_CLIENT_ID` | - | OIDC application client ID (SSO) |
| `OIDC_ROLE_CLAIM` | - | `realm_access.roles` > Claim path holding user roles, used for admin mapping |
| `OIDC_ADMIN_ROLES` | - | Comma-separated role values mapped to admin. Defaults to 'admin' |
| `STORAGE_PROVIDER` | sqlite | Where saved connections & settings live: 'sqlite' (on the volume) or 'postgres' (multi-node) |
| `OIDC_CLIENT_SECRET` | (secret) | OIDC application client secret (SSO) |
| `STORAGE_SQLITE_PATH` | /app/data/libredb-storage.db | SQLite file path on the mounted volume (/app/data). Keep the default. |
| `STORAGE_POSTGRES_URL` | - |  `postgresql://user:pass@host:5432/db` > PostgreSQL URL for multi-node storage. Also set STORAGE_PROVIDER=postgres |
| `NEXT_PUBLIC_AUTH_PROVIDER` | local | Auth mode: 'local' (email/password). Set 'oidc' for SSO (needs the OIDC_* optional vars) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/libredb-studio-with-sqlite)
