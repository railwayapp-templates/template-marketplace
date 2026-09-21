# Deploy Skyvern Browser Agent + Auth Gateway on Railway

Skyvern browser agent with a password protected UI gateway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/skyvern-browser-agent-auth-gateway)

## About

Skyvern automates browser based workflows with AI. Instead of brittle selector scripts, it drives a real Chromium with vision language models, reads the page the way a person would, and completes multi step tasks on sites that have no API. Give it a goal and a URL, and it fills forms, logs in, navigates, downloads files and extracts structured data, with a live view of the browser while it works.

Hosting Skyvern means running three containers together: the Skyvern API server, which also carries the embedded Chromium on a virtual display, the prebuilt React dashboard, and PostgreSQL for tasks, workflows, runs and credentials. This template uses the official images pinned to the current release (`public.ecr.aws/skyvern/skyvern:v1.0.53` and `public.ecr.aws/skyvern/skyvern-ui:v1.0.53`), attaches a volume to the Skyvern service at `/data` for artifacts, recordings, downloads, browser sessions and the encrypted credential vault, generates the JWT signing key and the database password, runs the Alembic migrations on boot, and wires the dashboard to the API over the generated Railway domain. No separate browser service is needed: Chromium runs inside the Skyvern container, exactly as the upstream compose file runs it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| skyvern-ui | `public.ecr.aws/skyvern/skyvern-ui:v1.0.53` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Skyvern | `public.ecr.aws/skyvern/skyvern:v1.0.53` | Web service |
| skyvern-gateway | `caddy:2.11-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | skyvern-ui | 8080 | The bundled static server hardcodes port 8080; this variable exists so Railway's healthcheck and edge proxy probe 8080 as well. Do not change it. |
| `SKYVERN_API_KEY` | skyvern-ui | (secret) | Organization API key the UI uses to mint short-lived browser sessions. Leave blank on the first deploy, then copy the cred value printed in the Skyvern service deploy logs (or read /data/.skyvern/credentials.toml) and paste it here. Until it is set the dashboard loads but every API call is rejected, which also means an unset key keeps the public UI inert. |
| `VITE_API_BASE_URL` | skyvern-ui | - | API address baked into the browser bundle at container start. Must be the public HTTPS URL of the Skyvern service. Update it if you attach a custom domain. |
| `VITE_WSS_BASE_URL` | skyvern-ui | - | Websocket address for the live browser view and streaming logs. Same host as VITE_API_BASE_URL with the wss scheme. |
| `SKYVERN_API_BASE_URL` | skyvern-ui | - | API address used by the UI server itself. It has to be the public HTTPS URL: the Skyvern API binds 0.0.0.0 (IPv4 only), so it is not reachable over Railway's IPv6 private network. |
| `VITE_ENABLE_CODE_BLOCK` | skyvern-ui | true | Shows the code block node in the workflow editor. Keep it equal to ENABLE_CODE_BLOCK on the Skyvern service. |
| `VITE_ENABLE_LOG_ARTIFACTS` | skyvern-ui | false | Shows per-run log artifacts in the UI. Only useful when ENABLE_LOG_ARTIFACTS is also true on the Skyvern service. |
| `VITE_ARTIFACT_API_BASE_URL` | skyvern-ui | - | Optional. Base URL of the file-backed artifact server used to render screenshots and recordings stored as local files. Railway cannot share the Skyvern volume with this service, so leave it blank and set SKYVERN_STORAGE_TYPE=s3 (or gcs/azureblob) on the Skyvern service if you want stored screenshots and recordings to render. |
| `VITE_BROWSER_STREAMING_MODE` | skyvern-ui | cdp | Live browser view transport in the browser. Keep it equal to BROWSER_STREAMING_MODE on the Skyvern service. |
| `VITE_ENABLE_2FA_NOTIFICATIONS` | skyvern-ui | true | Toasts, sounds and websocket streaming for 2FA verification codes. Set to false for high task volume. |
| `POSTGRES_DB` | Postgres | skyvern | Database name. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `ENV` | Skyvern | local | Self-hosted deployment mode, exactly as upstream docker-compose runs it. Live browser view and the local credential vault take the self-hosted code paths only when this is local. Uvicorn auto-reload is turned off separately by SKYVERN_DEV_NO_RELOAD. |
| `PORT` | Skyvern | 8000 | API listen port. uvicorn reads PORT and Railway probes $PORT for the healthcheck, so keep it equal to the domain target port (8000). |
| `LLM_KEY` | Skyvern | OPENAI_GPT5_5 | Which registered model the agent uses. Other valid values include OPENAI_GPT5_4, ANTHROPIC_CLAUDE5_OPUS and GEMINI_3_PRO; the provider for the key you pick must be enabled. |
| `LOG_LEVEL` | Skyvern | INFO | Application log level. Use DEBUG when diagnosing a failing run. |
| `SECRET_KEY` | Skyvern | (secret) | Signs the organization API keys (HS256 JWTs). Generated once. Rotating it invalidates every API key that was already issued, including the one the Skyvern UI service uses. |
| `BROWSER_TYPE` | Skyvern | chromium-headful | The browser runs inside this container on a virtual X display (Xvfb + x11vnc), exactly as in upstream docker-compose. No separate browser service is needed. Use chromium-headless only if you do not need the live browser view. |
| `ENABLE_OPENAI` | Skyvern | true | Registers the OpenAI models in the LLM registry. Set it to false and enable another provider if you switch LLM_KEY. |
| `OPENAI_API_KEY` | Skyvern | (secret) | Required. Your OpenAI API key. Skyvern boots without it but every task and workflow run fails, because the agent falls back to a dummy LLM handler. To use a different provider instead, leave this blank, set ENABLE_OPENAI=false and configure that provider plus LLM_KEY. |
| `DATABASE_STRING` | Skyvern | - | Postgres connection string over the private network. Skyvern needs the postgresql+psycopg:// driver prefix, so this is built by hand instead of reusing DATABASE_PRIVATE_URL. Alembic migrations run on every boot. |
| `ENABLE_ANTHROPIC` | Skyvern | false | Optional. Set to true together with ANTHROPIC_API_KEY and an ANTHROPIC_* LLM_KEY to run the agent on Claude instead of OpenAI. |
| `ANTHROPIC_API_KEY` | Skyvern | (secret) | Optional. Anthropic API key, used only when ENABLE_ANTHROPIC is true. |
| `ENABLE_CODE_BLOCK` | Skyvern | true | Enables the code block node in workflows, as in upstream docker-compose. |
| `MAX_STEPS_PER_RUN` | Skyvern | 50 | Upper bound on agent steps per run. Lower it to cap LLM spend per task. |
| `SECONDARY_LLM_KEY` | Skyvern | OPENAI_GPT5_4_MINI | Cheaper model used for small helper calls such as option selection and SVG conversion. Leave blank to reuse LLM_KEY. |
| `SKYVERN_TELEMETRY` | Skyvern | true | Upstream anonymous usage analytics. Set to false to disable. |
| `CREDENTIAL_VAULT_TYPE` | Skyvern | (secret) | Use the built-in encrypted credential vault. The encryption key is generated into /data/credential_vault/.fernet_key on the volume, so treat the volume as secret material. |
| `SKYVERN_DEV_NO_RELOAD` | Skyvern | true | Disables uvicorn's file-watching auto-reload supervisor, which ENV=local would otherwise switch on. Leave it true: the reloader doubles memory use and can wedge on long browser cleanups. |
| `SKYVERN_PRINT_API_KEY` | Skyvern | (secret) | Prints the generated organization API key into this service's deploy logs once the credentials file exists, so you can copy it into the Skyvern UI service. Set it to false after you have copied the key if you do not want it in the logs. |
| `BROWSER_STREAMING_MODE` | Skyvern | cdp | Live browser view transport. cdp streams through this service's own websocket, so no extra port has to be exposed. Must match VITE_BROWSER_STREAMING_MODE on the Skyvern UI service. |
| `SKYVERN_CREDENTIALS_FILE` | Skyvern | (secret) | Where the generated organization API key is stored. It must live on the volume: if the file is missing at boot Skyvern creates a brand new organization and API key, so an ephemeral path would orphan your workflows on every redeploy. |
| `ENABLE_LOCAL_CREDENTIAL_VAULT` | Skyvern | (secret) | Stores workflow credentials in the built-in vault on the volume instead of Bitwarden or a cloud secret manager. |
| `PORT` | skyvern-gateway | 8080 | Port the gateway listens on. |
| `UPSTREAM` | skyvern-gateway | - | Private address of the Skyvern UI service. |
| `UI_PASSWORD` | skyvern-gateway | (secret) | Password for the Skyvern UI login prompt. Generated on deploy, change it here at any time. |
| `UI_USERNAME` | skyvern-gateway | (secret) | Username for the Skyvern UI login prompt. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'if [ "$SKYVERN_PRINT_API_KEY" = "true" ]; then (i=0; while [ $i -lt 90 ]; do i=$((i+1)); sleep 10; if [ -s "$SKYVERN_CREDENTIALS_FILE" ]; then echo "===== Skyvern API key: copy the cred value below into SKYVERN_API_KEY on the Skyvern UI service ====="; cat "$SKYVERN_CREDENTIALS_FILE"; echo "===== end Skyvern API key ====="; break; fi; done) & fi; exec /bin/bash /app/entrypoint-skyvern.sh'`
- **Healthcheck:** `/api/v1/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'echo c2V0IC1lCjogIiR7UE9SVDo/UE9SVCBpcyByZXF1aXJlZH0iCjogIiR7VUlfVVNFUk5BTUU6P1VJX1VTRVJOQU1FIGlzIHJlcXVpcmVkfSIKOiAiJHtVSV9QQVNTV09SRDo/VUlfUEFTU1dPUkQgaXMgcmVxdWlyZWR9Igo6ICIke1VQU1RSRUFNOj9VUFNUUkVBTSBpcyByZXF1aXJlZH0iCkhBU0g9IiQoY2FkZHkgaGFzaC1wYXNzd29yZCAtLXBsYWludGV4dCAiJFVJX1BBU1NXT1JEIikiCnByaW50ZiAnJXNcbicgXAogICd7JyBcCiAgJyAgYXV0b19odHRwcyBvZmYnIFwKICAnICBhZG1pbiBvZmYnIFwKICAnICBzZXJ2ZXJzIHsnIFwKICAnICAgIHByb3RvY29scyBoMSBoMmMnIFwKICAnICB9JyBcCiAgJ30nIFwKICAiOiRQT1JUIHsiIFwKICAnICBoYW5kbGUgL2dhdGV3YXktaGVhbHRoIHsnIFwKICAnICAgIHJlc3BvbmQgIm9rIiAyMDAnIFwKICAnICB9JyBcCiAgJyAgaGFuZGxlIHsnIFwKICAnICAgIGJhc2ljX2F1dGggeycgXAogICIgICAgICAkVUlfVVNFUk5BTUUgJEhBU0giIFwKICAnICAgIH0nIFwKICAiICAgIHJldmVyc2VfcHJveHkgJFVQU1RSRUFNIiBcCiAgJyAgfScgXAogICd9JyA+IC9ldGMvY2FkZHkvQ2FkZHlmaWxlCmV4ZWMgY2FkZHkgcnVuIC0tY29uZmlnIC9ldGMvY2FkZHkvQ2FkZHlmaWxlIC0tYWRhcHRlciBjYWRkeWZpbGUK | base64 -d > /tmp/start.sh && exec sh /tmp/start.sh'`
- **Healthcheck:** `/gateway-health`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/skyvern-browser-agent-auth-gateway)
