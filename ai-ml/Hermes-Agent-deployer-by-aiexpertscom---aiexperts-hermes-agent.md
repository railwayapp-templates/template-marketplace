# Deploy Hermes Agent deployer by aiexperts.com on Railway

Hermes Agent on Railway - Preconfigured, more secure, and faster deployment

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/aiexperts-hermes-agent)

## About

1. Fork or push this repo, then create a Railway service from it.
2. Attach a persistent volume mounted at `/opt/data`.
3. Set `DASHBOARD_USER` and `DASHBOARD_PASSWORD` (and, to load private skills, `SKILLS_REPO_URL` + `SKILLS_REPO_TOKEN`).
4. Deploy. First boot downloads Caddy (~40 MB) to the volume and caches it; the agent boots with a default identity and a secure login already in front of it.

Hosting runs the official `nousresearch/hermes-agent` Docker image — pinned to a content digest so every boot is reproducible — on a single Railway service. A `secure-start.sh` entrypoint boots the Hermes gateway and dashboard on internal loopback ports, then fronts them with a Caddy reverse proxy on the public `$PORT` that enforces bcrypt HTTP basic auth, so nothing is reachable without a login. The same proxy exposes a `/files` web file browser and a `/dav` WebDAV mount, both confined to a single web-served `share/` folder. All state — agent config, the seeded `SOUL.md` identity, sessions, OAuth tokens, skills, and cron — persists to a Railway volume at `/opt/data`, and the agent runs from that writable volume so its first file write never hits the read-only app install. Inbound `/webhooks/*` traffic skips basic auth (guarded instead by long random path tokens and optional HMAC signature checks) so external services can POST events straight to the agent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ai-experts-hermes-agent | [lucasaerb/hermes-railway](https://github.com/lucasaerb/hermes-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9119 | - |
| `PYTHONPATH` | /opt/hermes | - |
| `HERMES_HOME` | /opt/data | - |
| `DASHBOARD_USER` | (secret) | username for logging in |
| `AGENTMAIL_API_KEY` | (secret) | If you'd like email for your hermes |
| `DASHBOARD_PASSWORD` | (secret) | secure password for logging in |
| `TELEGRAM_BOT_TOKEN` | (secret) | Message @botfather "/newbot" |
| `TELEGRAM_ALLOWED_USERS` | - | Message @userinfobot "/start" to get user id |
| `GATEWAY_ALLOW_ALL_USERS` | false | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/aiexperts-hermes-agent)
