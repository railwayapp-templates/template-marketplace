# Deploy LibreDB Studio with PostgreSQL on Railway

Open-source web-based SQL & NoSQL IDE with AI-powered query assistance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libredb-studio-with-postgresql)

## About

![LibreDB Studio Demo Gif](https://github.com/libredb/libredb-studio/raw/main/public/screenshots/hero-demo.gif)

LibreDB Studio is an open-source database IDE that lets you manage and query PostgreSQL, MySQL, MongoDB, Redis, SQLite, and other databases from your browser. This Railway template pairs LibreDB Studio with PostgreSQL for persistent storage of saved connections and settings, with web access through a Railway-generated domain.

Deploy LibreDB Studio on Railway to manage your databases through a browser-based interface without installing a desktop client. The included PostgreSQL service stores LibreDB Studio's saved connections and settings, keeping them available across application redeployments. After deployment, open the auto-generated Railway domain and sign in with the credentials provided in the service's Variables tab. The administrator account provides full access, while the standard account is intended for query-only access. The application uses HTTP Proxy port `3000`. PostgreSQL runs as a separate service within the Railway project, with its connection configured automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LibreDB Studio | `ghcr.io/libredb/libredb-studio:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | LibreDB Studio | 3000 | Port the app listens on. Must match the HTTP Proxy Port. Leave as 3000 |
| `LLM_MODEL` | LibreDB Studio | - | AI model name; provider default used if empty (e.g. gpt-4o-mini, llama3.1) |
| `JWT_SECRET` | LibreDB Studio | (secret) | Secret key used to sign login session tokens. Auto-generated — keep it |
| `OIDC_SCOPE` | LibreDB Studio | - | OIDC scopes. Defaults to 'openid profile email' if empty |
| `USER_EMAIL` | LibreDB Studio | user@libredb.org | Login email for the standard, query-only account |
| `ADMIN_EMAIL` | LibreDB Studio | admin@libredb.org | Login email for the ADMIN account (full access incl. maintenance tools) |
| `LLM_API_KEY` | LibreDB Studio | (secret) | API key for the chosen AI provider (Gemini/OpenAI). Not needed for a local Ollama |
| `LLM_API_URL` | LibreDB Studio | - | Base URL for ollama/custom AI providers only. Not needed for gemini/openai |
| `OIDC_ISSUER` | LibreDB Studio | - | OIDC issuer URL for SSO. Required when NEXT_PUBLIC_AUTH_PROVIDER=oidc |
| `LLM_PROVIDER` | LibreDB Studio | - | Optional AI query assistance: gemini | openai | ollama | custom. Omit to keep AI off. |
| `USER_PASSWORD` | LibreDB Studio | (secret) | Password for the standard user. Auto-generated; find it in Variables after deploy |
| `ADMIN_PASSWORD` | LibreDB Studio | (secret) | Password for the admin account. Auto-generated; find it in Variables after deploy |
| `OIDC_CLIENT_ID` | LibreDB Studio | - | OIDC application client ID (SSO) |
| `OIDC_ROLE_CLAIM` | LibreDB Studio | - | `realm_access.roles` > Claim path holding user roles, used for admin mapping |
| `OIDC_ADMIN_ROLES` | LibreDB Studio | - | Comma-separated role values mapped to admin. Defaults to 'admin' |
| `STORAGE_PROVIDER` | LibreDB Studio | postgres | Where saved connections & settings live: 'sqlite' (on the volume) or 'postgres' (multi-node) |
| `OIDC_CLIENT_SECRET` | LibreDB Studio | (secret) | OIDC application client secret (SSO) |
| `STORAGE_POSTGRES_URL` | LibreDB Studio | - |  `postgresql://user:pass@host:5432/db` > PostgreSQL URL for multi-node storage. Also set STORAGE_PROVIDER=postgres |
| `NEXT_PUBLIC_AUTH_PROVIDER` | LibreDB Studio | local | Auth mode: 'local' (email/password). Set 'oidc' for SSO (needs the OIDC_* optional vars) |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/libredb-studio-with-postgresql)
