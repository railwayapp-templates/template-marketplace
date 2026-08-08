# Deploy Planka — Self-Hosted Kanban & Trello Alternative on Railway

Self-host Planka — real-time Kanban boards, no per-seat fees

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/planka-kanban-boards)

## About

Planka is the open-source Trello alternative — a fast, real-time Kanban board for project management, with boards, lists, cards, labels, due dates, checklists, attachments, and live collaboration, all self-hosted so your team's data stays yours. It does one thing exceptionally well: clean, responsive visual task boards without the subscription or per-seat fees. This template deploys Planka with PostgreSQL and a persistent volume pre-wired, with the secret key and admin account configured, so your team is planning work in minutes.

---

Planka is lightweight and simple, but three specifics decide whether it starts cleanly and behaves on redeploys — all handled here.

**`SECRET_KEY` must be a long random value or Planka won't start.** Planka signs sessions with `SECRET_KEY`, and if it's missing or too short the container exits immediately with a secret-key error. It needs at least 32 characters (64-hex from `openssl rand -hex 64` is standard). This template generates a strong key, so it boots on the first try — and you should keep it stable, since changing it invalidates active sessions.

**The admin account re-applies on every boot — know this before you change it.** Planka creates its admin from the `DEFAULT_ADMIN_*` variables, and it re-applies them on *every* restart. So if you change the admin password in the UI, it's overwritten on the next redeploy. The clean pattern: log in with the seeded credentials, and to permanently change them, update the environment variables (or remove them after first boot and manage the account in the UI). This template sets sensible defaults you can change in your Railway variables.

**Attachments and board data persist separately.** Card attachments, avatars, and background images live on the volume at `/app/data`, while boards, cards, and comments live in PostgreSQL. Both persist across redeploys, so your work is safe — the volume grows with uploads, so monitor it if your team attaches large files often.

**`BASE_URL` and `TRUST_PROXY` matter behind Railway.** `BASE_URL` must be your Railway public domain so links and real-time connections resolve, and `TRUST_PROXY=true` tells Planka it's behind Railway's edge proxy, which matters for correct client addresses and secure cookies.

**SSO-ready and real-time.** Planka supports OpenID Connect, so you can wire it to Google, Azure AD, Okta, Authentik, or Keycloak with the `OIDC_*` variables. Its real-time sync runs over WebSockets, which Railway supports out of the box, so board changes appear live for everyone.

Typical cost: **~$5/month** on Railway — Planka is remarkably light (~80 MB idle), handling 20–50 concurrent users on a small instance. It's MIT-licensed and free, with no per-seat fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Planka | `ghcr.io/plankanban/planka` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Planka | 1337 | - |
| `SECRET_KEY` | Planka | (secret) | - |
| `TRUST_PROXY` | Planka | true | - |
| `DEFAULT_ADMIN_NAME` | Planka | Admin | - |
| `DEFAULT_ADMIN_EMAIL` | Planka | admin@planka.local | - |
| `DEFAULT_ADMIN_PASSWORD` | Planka | (secret) | - |
| `DEFAULT_ADMIN_USERNAME` | Planka | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/planka-kanban-boards)
