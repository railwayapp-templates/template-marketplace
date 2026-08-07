# Deploy WAHA + n8n — Self-Hosted WhatsApp Automation on Railway

Self-host WhatsApp automation — WAHA + n8n, nodes persist

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/waha-n8n-whatsapp)

## About

WAHA + n8n is a complete, self-hosted WhatsApp automation backend: WAHA provides the WhatsApp HTTP API (send and receive messages, manage sessions), and n8n orchestrates the workflows — connecting WhatsApp events to APIs, databases, CRMs, and AI tools through a visual, no-code editor. This template ships both pre-wired, with the WAHA node auto-installed in n8n, the two services connected over the private network, and persistent volumes so your custom nodes and workflows survive redeploys.

---

The value of a WAHA + n8n bundle is in the wiring — the parts a manual setup gets wrong are all handled here.

**Custom nodes and workflows persist across redeploys.** n8n stores its custom/community nodes and workflow data on disk, and without a volume they're wiped on every redeploy — the auto-installed WAHA node and your flows vanish. This template mounts volumes for both services, so the WAHA node, your workflows, and WAHA's WhatsApp session survive deployments. This is the "persistent nodes" difference.

**The services connect privately — not via localhost.** The single most common WAHA + n8n mistake: n8n cannot reach WAHA at `http://localhost:3000`, because inside the n8n container "localhost" is n8n itself, not WAHA. The two must talk over the internal network by service name. This template wires that automatically, so the connection works out of the box instead of failing with a confusing "connection refused."

**Use the NOWEB engine to stay light.** WAHA's WEBJS engine runs a full headless Chromium and is memory-hungry; the NOWEB engine (`WHATSAPP_DEFAULT_ENGINE=NOWEB`) does the same job with far less RAM. This template defaults to NOWEB so the stack runs comfortably on a small Railway instance.

**Incoming messages flow into n8n via webhook.** `WHATSAPP_HOOK_URL` points at your n8n webhook and `WHATSAPP_HOOK_EVENTS=message` forwards messages, so a workflow triggers the moment someone messages you. Replies go back out through WAHA's API, all in one flow.

**Secure it.** `WAHA_API_KEY` protects WAHA's endpoints, `WAHA_DASHBOARD_USERNAME`/`PASSWORD` guard its dashboard, and `WAHA_PUBLIC_URL` is your Railway domain. Keep `N8N_ENCRYPTION_KEY` stable, or n8n can't decrypt saved credentials.

**Respect WhatsApp's limits — it's an unofficial API.** WAHA connects through a WhatsApp Web session, not Meta's Cloud API. Use a dedicated number (not your personal one), warm it up, and keep outbound modest — well under ~20 messages/minute for a fresh number, pacing with n8n Wait nodes. For regulated or high-volume messaging, use the official Cloud API.

Typical cost: **~$5–15/month** on Railway for WAHA, n8n, and optional Postgres. Both are free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| n8n | `n8nio/n8n` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Waha | `devlikeapro/waha` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | n8n | 5678 | - |
| `DB_TYPE` | n8n | postgresdb | - |
| `NODE_OPTIONS` | n8n | --max_old_space_size=8192 | - |
| `N8N_TRUST_PROXY` | n8n | true | - |
| `DB_POSTGRESDB_USER` | n8n | (secret) | - |
| `N8N_BASIC_AUTH_USER` | n8n | (secret) | - |
| `N8N_BASIC_AUTH_ACTIVE` | n8n | true | - |
| `DB_POSTGRESDB_PASSWORD` | n8n | (secret) | - |
| `N8N_BASIC_AUTH_PASSWORD` | n8n | (secret) | - |
| `N8N_REINSTALL_MISSING_PACKAGES` | n8n | true | - |
| `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS` | n8n | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `WAHA_API_KEY` | Waha | (secret) | - |
| `WAHA_PRINT_QR` | Waha | False | - |
| `WAHA_LOG_LEVEL` | Waha | info | - |
| `WAHA_LOG_FORMAT` | Waha | JSON | - |
| `WAHA_MEDIA_STORAGE` | Waha | LOCAL | - |
| `WHATSAPP_FILES_FOLDER` | Waha | /app/.media | - |
| `WAHA_DASHBOARD_ENABLED` | Waha | True | - |
| `WHATSAPP_START_SESSION` | Waha | default | - |
| `WAHA_DASHBOARD_PASSWORD` | Waha | (secret) | - |
| `WAHA_DASHBOARD_USERNAME` | Waha | (secret) | - |
| `WHATSAPP_DEFAULT_ENGINE` | Waha | WEBJS | - |
| `WHATSAPP_FILES_LIFETIME` | Waha | 0 | - |
| `WHATSAPP_SWAGGER_ENABLED` | Waha | True | - |
| `WAHA_LOCAL_STORE_BASE_DIR` | Waha | /local/.sessions | - |
| `WAHA_RESTART_ALL_SESSIONS` | Waha | True | - |
| `WHATSAPP_SWAGGER_PASSWORD` | Waha | (secret) | - |
| `WHATSAPP_SWAGGER_USERNAME` | Waha | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/waha-n8n-whatsapp)
