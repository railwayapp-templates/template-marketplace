# Deploy cron-visualizer on Railway

Cron expression visualizer: plain-English text + next runs, any timezone

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cron-visualizer)

## About

Hosting runs two independent services. **visualizer** is a single stateless web service:
a React (Vite) single-page app served by Caddy inside a compact Alpine container. The
image is self-sufficient — it listens on the Railway-injected `PORT`, exposes `GET /health`
(200) for the Railway healthcheck, and restarts on failure (ON_FAILURE, max 10 retries).
No database, no volumes, no variables, no background workers; all schedule math happens in
the visitor's browser. **cron-toolkit** (optional) runs the official
`alseambusher/crontab-ui:0.4.2` Docker image with a persistent volume mounted at
`/crontab-ui/crontabs` for its job database, backups and logs; supervisord inside the
container runs the app plus a bundled `crond`. Its scope is jobs *inside that container
only* — for platform-native scheduling on Railway, use Railway Cron; crontab-ui is a
convenience manager, not a Railway Cron replacement.

**Security note (cron-toolkit):** it ships **without basic authentication** — anyone with
the URL can read and edit its job list. For any publicly reachable deployment, set
`BASIC_AUTH_USER` and `BASIC_AUTH_PWD` (the image's exact variable names) on the
cron-toolkit service right after deploying; basic auth activates automatically when both
are present. The visualizer has no secrets and no server-side state, so it needs no auth
variable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| visualizer | [lNamelessl/self-hosted-cron-visualizer](https://github.com/lNamelessl/self-hosted-cron-visualizer) | Web service |
| cron-toolkit | `alseambusher/crontab-ui:0.4.2` | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/crontab-ui/crontabs`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/cron-visualizer)
