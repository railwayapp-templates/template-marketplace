# Deploy OpenBot (Grok Bot) on Railway

Open-source AI grok bots with their own browser, files and tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openbot)

## About

OpenBot gives you AI coworkers with a computer: a browser, files and a shell, with every action recorded. This template runs the official `ghcr.io/copilotkit/openbot` image next to a Railway Postgres, adds the Bot process that lets you create your own coworkers and the scheduler that makes routines fire, puts a password in front of the URL, wires all of it together over the private network, generates every secret, and keeps the coworkers' browser logins and files on a volume so they survive redeploys.

OpenBot is a Bun server that serves the web app and API on one port and drives a headless Chromium inside the same container for the coworkers' "computer". Users, work and the encrypted credential vault live in Postgres; conversation threads and memory live in CopilotKit Intelligence, a free hosted service that the app requires. Three things upstream's single image does not carry come as their own services here: **Agent** runs the coworkers you create (CopilotKit's official `agent-langgraph` v0.0.15 image, pinned by digest), **Routines** is a five-minute cron that fires scheduled work, and **Gate** is a 30 MB Caddy that holds the public URL and asks for a username and password before anything reaches OpenBot. Migrations run automatically when the container starts. Three values are yours to paste at deploy time: an OpenAI key, and two CopilotKit credentials that a short CLI session prints for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gate | `caddy:2-alpine` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| OpenBot | `ghcr.io/copilotkit/openbot:v0.0.5` | Database |
| Routines | `ghcr.io/copilotkit/openbot:v0.0.5` | Worker |
| Agent | `ghcr.io/copilotkit/openbot-agent-langgraph@sha256:da9fdbee1c12e62f66e359ae2c9a083456c2d8f795d0db066b8b1e313542b477` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Gate | 8080 | Port Caddy listens on; matches the public HTTP proxy. |
| `UPSTREAM` | Gate | - | Where the gate forwards to over the private network; wired automatically. |
| `GATE_USER` | Gate | (secret) | Username your browser asks for when you open the OpenBot URL. |
| `GATE_PASSWORD` | Gate | (secret) | Password your browser asks for when you open the OpenBot URL. Generated; copy it from here. Change it any time and redeploy Gate. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `PORT` | OpenBot | 3001 | Tells Railway's healthcheck which port to probe. The image serves the app and API on 3001 - do not change it. |
| `DATABASE_URL` | OpenBot | - | Wired to the Postgres service over the private network. Migrations run at start (single replica). |
| `PROFILES_DIR` | OpenBot | /data/profiles | Coworkers' browser logins, on the /data volume so they survive redeploys. |
| `WORKSPACE_DIR` | OpenBot | /data/workspace | Coworkers' files, on the /data volume so they survive redeploys. |
| `COMPUTER_TOKEN` | OpenBot | (secret) | Shared secret between the API and the in-container browser (agent-computer). Generated. |
| `OPENAI_API_KEY` | OpenBot | (secret) | Your OpenAI API key. The built-in coworkers spend it. To use OpenRouter instead, paste an OpenRouter key here and set OPENAI_BASE_URL to https://openrouter.ai/api/v1. |
| `BETTER_AUTH_URL` | OpenBot | - | Optional - Where OAuth callbacks return to: https://the Gate service's domain (no trailing slash). Only with a sign-in provider. |
| `OPENAI_BASE_URL` | OpenBot | - | Optional - OpenAI-compatible endpoint for OPENAI_API_KEY, e.g. https://openrouter.ai/api/v1 or your own gateway. Leave blank for api.openai.com. The coworkers ask that endpoint for the model gpt-5.6-terra. |
| `TRUSTED_ORIGINS` | OpenBot | - | Optional - Extra origins the API accepts, comma-separated. Leave blank when app and API share this one domain. |
| `AGENT_TOOL_TOKEN` | OpenBot | (secret) | Shared secret the Agent service presents when calling governed tools through OpenBot. Generated. |
| `EMBEDDED_POSTGRES` | OpenBot | off | Postgres is the separate Railway service; migrations run once at start via the start command. |
| `OKTA_OAUTH_ISSUER` | OpenBot | - | Optional - Okta issuer, e.g. https://example.okta.com/oauth2/default. |
| `BETTER_AUTH_SECRET` | OpenBot | (secret) | Optional - Signs sign-in cookies; any random string of 32+ characters. Only set it together with a sign-in provider - set on its own it stops the server. |
| `KEY_ENCRYPTION_KEY` | OpenBot | - | Encrypts the credential vault at rest (base64, 32 bytes). Generated for you. NEVER change it - every stored credential becomes unreadable. |
| `OPENBOT_PUBLIC_URL` | OpenBot | - | This deployment's public address (the Gate service's domain). Used to build the callback URL when someone connects Google Drive or Notion. |
| `MANAGED_AGENT_TOKEN` | OpenBot | (secret) | Shared secret OpenBot presents to the Agent service on every coworker run. Generated. |
| `OPENBOT_SINGLE_USER` | OpenBot | (secret) | Everyone who opens the URL is the one administrator - no sign-in. Fine to try it out. Before sharing the URL, configure Google, Microsoft or Okta sign-in (see the README); a configured provider always wins over this switch. |
| `AUDIT_RETENTION_DAYS` | OpenBot | - | Optional - Days of audit trail to keep. Blank keeps everything (the safe default). |
| `INITIAL_ADMIN_EMAILS` | OpenBot | - | Optional - Comma-separated emails that get the administrator role on sign-in. Required once a sign-in provider is configured; nothing else grants the role. |
| `INTELLIGENCE_API_KEY` | OpenBot | (secret) | From step 1 of the guide: the value of the CPK_INTELLIGENCE_API_KEY line that `npx copilotkit@latest project select` writes to .env (starts with cpk-). Free. |
| `INTELLIGENCE_API_URL` | OpenBot | https://api.intelligence.copilotkit.ai | CopilotKit Intelligence API (durable threads and memory). Leave as is unless you self-host Intelligence. |
| `OKTA_OAUTH_CLIENT_ID` | OpenBot | - | Optional - Okta sign-in. Redirect URI: https://the Gate service's domain/api/auth/callback/okta. Needs OKTA_OAUTH_ISSUER too. |
| `WORKER_SHARED_SECRET` | OpenBot | (secret) | Authenticates the Routines service to OpenBot. Generated. |
| `AGENT_COMPUTER_POLICY` | OpenBot | - | Optional - JSON action policy for what Bots may do in the browser; normally edited at /admin/boundaries instead. |
| `GOOGLE_OAUTH_CLIENT_ID` | OpenBot | - | Optional - Google sign-in. Redirect URI: https://the Gate service's domain/api/auth/callback/google. Set together with GOOGLE_OAUTH_CLIENT_SECRET, BETTER_AUTH_SECRET, BETTER_AUTH_URL and INITIAL_ADMIN_EMAILS. |
| `MANAGED_AGENT_AG_UI_URL` | OpenBot | - | Where coworkers you create run. Wired to the Agent service over the private network. |
| `COPILOTKIT_LICENSE_TOKEN` | OpenBot | (secret) | From step 1 of the guide: the value of the COPILOTKIT_LICENSE_TOKEN line that `npx copilotkit@latest license --write` writes to .env (long, starts with eyJ). Free. |
| `OKTA_OAUTH_CLIENT_SECRET` | OpenBot | (secret) | Optional - Okta sign-in client secret. |
| `MICROSOFT_OAUTH_CLIENT_ID` | OpenBot | - | Optional - Microsoft (Entra ID) sign-in. Redirect URI: https://the Gate service's domain/api/auth/callback/microsoft. |
| `MICROSOFT_OAUTH_TENANT_ID` | OpenBot | - | Optional - Your directory (tenant) GUID to admit only your company; blank means common. |
| `GOOGLE_OAUTH_CLIENT_SECRET` | OpenBot | (secret) | Optional - Google sign-in client secret. |
| `INTELLIGENCE_GATEWAY_WS_URL` | OpenBot | wss://realtime.intelligence.copilotkit.ai | CopilotKit Intelligence realtime gateway. Leave as is unless you self-host Intelligence. |
| `MICROSOFT_OAUTH_CLIENT_SECRET` | OpenBot | (secret) | Optional - Microsoft sign-in client secret. |
| `DATABASE_URL` | Routines | - | Wired to the Postgres service over the private network. |
| `KEY_ENCRYPTION_KEY` | Routines | - | Same key as OpenBot. Wired automatically. |
| `OPENBOT_SINGLE_USER` | Routines | (secret) | Matches OpenBot's single-user mode; the sweep itself never signs anyone in. |
| `SERVER_INTERNAL_URL` | Routines | - | OpenBot over the private network, where due routines are handed off. |
| `INTELLIGENCE_API_KEY` | Routines | (secret) | Same as OpenBot. Wired automatically. |
| `INTELLIGENCE_API_URL` | Routines | - | Same as OpenBot. Wired automatically. |
| `WORKER_SHARED_SECRET` | Routines | (secret) | Authenticates routine dispatches to OpenBot. Wired automatically. |
| `COPILOTKIT_LICENSE_TOKEN` | Routines | (secret) | Same as OpenBot. Wired automatically. |
| `INTELLIGENCE_GATEWAY_WS_URL` | Routines | - | Same as OpenBot. Wired automatically. |
| `PORT` | Agent | 4201 | Port the Agent serves on and Railway's healthcheck probes. Do not change. |
| `BOT_MODEL` | Agent | gpt-5.6-terra | Model the coworkers you create ask for, sent verbatim to the provider. |
| `BOT_PROVIDER` | Agent | openai | Model provider for coworkers you create: openai, anthropic or google. Anything but openai needs its own key added here (ANTHROPIC_API_KEY or GOOGLE_API_KEY). |
| `OPENAI_API_KEY` | Agent | (secret) | Uses OpenBot's model key; coworkers you create spend it on every turn. |
| `OPENAI_BASE_URL` | Agent | - | Optional - Uses OpenBot's OpenAI-compatible endpoint. Blank means api.openai.com. |
| `AGENT_TOOL_TOKEN` | Agent | (secret) | OpenBot's generated token for governed tool callbacks. Wired automatically. |
| `OPENBOT_TOOL_URL` | Agent | - | Private callback where OpenBot enforces tool grants, policy and audit. |
| `MANAGED_AGENT_TOKEN` | Agent | (secret) | OpenBot's generated token, checked on every request. Wired automatically. |

## Configuration

- **Start command:** `sh -c 'H=$(caddy hash-password --plaintext "$GATE_PASSWORD") && printf ":%s {\n\t@health path /health\n\thandle @health {\n\t\trespond 200\n\t}\n\thandle {\n\t\tbasic_auth {\n\t\t\t%s %s\n\t\t}\n\t\treverse_proxy %s\n\t}\n}\n" "$PORT" "$GATE_USER" "$H" "$UPSTREAM" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "mkdir -p /data/workspace /data/profiles && chown pwuser:pwuser /data /data/workspace /data/profiles && cd /app/server && /command/s6-setuidgid pwuser /usr/local/bin/bun scripts/migrate.ts && { (cd /app/agent-computer && PORT=4100 exec /command/s6-setuidgid pwuser /usr/local/bin/bun src/index.ts) & cd /app/server && exec /command/s6-setuidgid pwuser /usr/local/bin/bun src/index.ts; }"`
- **Volume:** `/data`
- **Start command:** `sh -c "cd /app/server && exec timeout -s KILL 240 /usr/local/bin/bun scripts/fire-routines.ts"`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openbot)
