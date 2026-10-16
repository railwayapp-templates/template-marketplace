# Deploy Open Hands (OpenHands) on Railway

Open Hands coding agent (OpenHands). Deployment with persistent data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands)

## About

OpenHands (Open Hands) is an open-source coding agent with a web interface and terminal tools.

This fork runs OpenHands with a local process runtime inside one Railway service.
Docker-in-Docker and a Docker socket are not required. The instance is intended
for one trusted owner: agent actions can access files and environment variables
inside this container. It is not a multi-tenant sandbox service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenHands | [XavTo/OpenHands-Fork](https://github.com/XavTo/OpenHands-Fork) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Internal HTTP healthcheck port. |
| `RUNTIME` | local | Runtime mode |
| `WEB_HOST` | - | Public host URL |
| `OH_WEB_URL` | - | Public web URL |
| `OH_SECRET_KEY` | (secret) | App secret key |
| `OH_ENABLE_BROWSER` | false | Disable browser |
| `OH_PERSISTENCE_DIR` | /.openhands | Persistent data dir |
| `LOCAL_WORKSPACE_BASE` | /.openhands/workspace | Persistent workspace for legacy local-runtime conversations. |
| `OPENHANDS_BASIC_AUTH_USER` | (secret) | auth admin |
| `SANDBOX_LOCAL_RUNTIME_URL` | http://127.0.0.1 | Loopback address for the agent process in the same Railway container. |
| `OPENHANDS_BASIC_AUTH_PASSWORD` | (secret) | auth password |
| `OPENHANDS_BASIC_AUTH_EXEMPT_PATHS` | /health | Readiness endpoint only. Application and Socket.IO routes remain protected. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.openhands`

**Category:** AI/ML · **Languages:** Python, TypeScript, Shell, Jinja, Go Template, JavaScript, Makefile, CSS, Dockerfile, Mako

[View on Railway →](https://railway.com/deploy/openhands)
