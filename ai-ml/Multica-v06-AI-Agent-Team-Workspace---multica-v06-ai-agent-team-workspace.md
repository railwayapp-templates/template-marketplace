# Deploy Multica v0.6 AI Agent Team Workspace on Railway

Assign issues to coding agents like teammates and track every run.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/multica-v06-ai-agent-team-workspace)

## About

Multica is a source-available workspace where people and AI coding agents work from the same issue board. You assign an issue to an agent such as Claude Code or Codex the way you would assign a teammate, and every run, message and result is tracked on the issue. This community template deploys Multica v0.6.2 on Railway.

Multica has a Go backend (API, realtime and agent daemon hub), a Next.js web app and PostgreSQL. Agents run through the Multica CLI daemon, on your own computers or on Railway. This template uses the official `ghcr.io/multica-ai` images pinned to v0.6.2, with a small Caddy gateway that serves everything from one HTTPS domain and routes WebSockets straight to the backend, following upstream's single-origin layout. Postgres, Redis and a Railway Bucket stay on the private network. Sign-up is closed by default: only the email you enter at deploy time can create the first account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Multica Web | `ghcr.io/multica-ai/multica-web:v0.6.2` | Worker |
| Gateway | [baranberkay96/multica-railway](https://github.com/baranberkay96/multica-railway) (branch: main) (root: /services/gateway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Redis | `redis:8.2` | Database |
| Multica Backend | `ghcr.io/multica-ai/multica-backend:v0.6.2` | Worker |
| Agent Runtime | [baranberkay96/multica-railway](https://github.com/baranberkay96/multica-railway) (branch: main) (root: /services/agent-runtime) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Multica Web | 3000 | Port the Next.js server listens on (the gateway and the healthcheck use it). |
| `DOCS_URL` | Multica Web | https://multica.ai | Where /docs is proxied to. Leave the official docs or clear it to disable /docs. |
| `HOSTNAME` | Multica Web | :: | Bind address. '::' is dual-stack in Node, so IPv4 and IPv6 private networking both work. |
| `REMOTE_API_URL` | Multica Web | - | Backend origin (no path). The web server forwards /api, /auth, /v1 and /uploads there at runtime. |
| `PORT` | Gateway | 8080 | Port Caddy listens on; the public domain and the healthcheck target it. |
| `MULTICA_WEB_UPSTREAM` | Gateway | - | Private address of the Multica web app (receives every path not listed below). |
| `MULTICA_BACKEND_UPSTREAM` | Gateway | - | Private address of the Multica backend (receives /ws, /api/daemon/ws and /health). |
| `POSTGRES_DB` | Postgres | railway | Default database created when the image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to the Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to the Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to the DB (generated). |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `PORT` | Multica Backend | 8080 | Port of the Go API/WebSocket server (dual-stack); the healthcheck probes it. |
| `APP_ENV` | Multica Backend | production | Enables production safety checks (insecure JWT secrets and fixed verification codes are refused). |
| `REDIS_URL` | Multica Backend | - | Redis for per-IP auth rate limiting, the realtime relay between replicas and task-claim caches. |
| `S3_BUCKET` | Multica Backend | - | Railway Bucket name for attachments, avatars and uploads. |
| `S3_REGION` | Multica Backend | - | Bucket region (used for request signing). |
| `JWT_SECRET` | Multica Backend | (secret) | Signs sessions, daemon tokens and attachment/avatar URL signatures (generated). Changing it logs everyone out. |
| `ALLOW_SIGNUP` | Multica Backend | false | Keep false: new accounts only for ALLOWED_EMAILS, ALLOWED_EMAIL_DOMAINS or workspace invitations. |
| `DATABASE_URL` | Multica Backend | - | Postgres connection string on the private network. |
| `DO_NOT_TRACK` | Multica Backend | - | Upstream sends one anonymous deployment snapshot per day. Set 1 to turn it off. |
| `ALLOWED_EMAILS` | Multica Backend | - | REQUIRED. Your email address (comma-separated for several). Only these addresses, allowed domains and invited people can sign up. |
| `RESEND_API_KEY` | Multica Backend | (secret) | Optional. Resend API key to email login codes and invitations (HTTP API, works on every Railway plan). Without it codes are printed to this service's logs. |
| `FRONTEND_ORIGIN` | Multica Backend | - | Public URL of the app (the Gateway domain). Change it when you add a custom domain. |
| `MULTICA_APP_URL` | Multica Backend | - | App URL used in invitation emails, CLI login and links. |
| `AWS_ENDPOINT_URL` | Multica Backend | - | S3-compatible endpoint of the Railway Bucket. |
| `GOOGLE_CLIENT_ID` | Multica Backend | - | Optional. Google OAuth client ID to show 'Continue with Google'. |
| `AWS_ACCESS_KEY_ID` | Multica Backend | - | Bucket access key. |
| `RESEND_FROM_EMAIL` | Multica Backend | - | Sender address on a domain verified in Resend. Required as soon as RESEND_API_KEY is set. |
| `S3_USE_PATH_STYLE` | Multica Backend | false | Railway Buckets use virtual-hosted-style addressing. Set true only if the bucket's Credentials tab says path-style. |
| `DATABASE_MAX_CONNS` | Multica Backend | 20 | Max Postgres connections per backend replica. Keep replicas x this well below Postgres max_connections (100). |
| `MULTICA_PUBLIC_URL` | Multica Backend | - | Public API URL for webhook URLs and the daemon setup command shown in the UI (same origin via the Gateway). |
| `GOOGLE_REDIRECT_URI` | Multica Backend | - | OAuth callback to register in Google Cloud Console when Google login is enabled. |
| `CORS_ALLOWED_ORIGINS` | Multica Backend | - | Origins allowed for CORS and the realtime WebSocket origin check. |
| `GOOGLE_CLIENT_SECRET` | Multica Backend | (secret) | Optional. Google OAuth client secret (with GOOGLE_CLIENT_ID). |
| `ALLOWED_EMAIL_DOMAINS` | Multica Backend | - | Optional. Comma-separated email domains (e.g. example.com) whose users may sign up. |
| `AWS_SECRET_ACCESS_KEY` | Multica Backend | (secret) | Bucket secret key. |
| `MULTICA_VCS_SECRET_KEY` | Multica Backend | (secret) | Base64 32-byte key encrypting Git provider tokens at rest (generated). Keep it; losing it makes stored tokens unreadable. |
| `REALTIME_METRICS_TOKEN` | Multica Backend | (secret) | Bearer token protecting /health/realtime metrics (generated). |
| `MULTICA_TRUSTED_PROXIES` | Multica Backend | - | Same trusted ranges for the webhook rate limiter and the WebSocket origin check. |
| `ATTACHMENT_DOWNLOAD_MODE` | Multica Backend | proxy | Serve files through the backend so the bucket stays private and needs no CORS setup. |
| `MULTICA_SLACK_SECRET_KEY` | Multica Backend | (secret) | Base64 32-byte key encrypting bring-your-own Slack app tokens; enables the Slack integration (generated). |
| `MULTICA_PLUGIN_SECRET_KEY` | Multica Backend | (secret) | Base64 32-byte key for plugin secret settings and hook signing (generated). |
| `DISABLE_WORKSPACE_CREATION` | Multica Backend | false | Set true after creating your workspace so other users can only join workspaces they are invited to. |
| `RATE_LIMIT_TRUSTED_PROXIES` | Multica Backend | 10.0.0.0/8,100.64.0.0/10,172.16.0.0/12,192.168.0.0/16,fd00::/8 | Private ranges (Gateway, web app, Railway edge) whose X-Forwarded-For is trusted for per-IP auth rate limits. |
| `MULTICA_TELEGRAM_SECRET_KEY` | Multica Backend | (secret) | Base64 32-byte key encrypting Telegram bot tokens; enables the Telegram integration (generated). |
| `MULTICA_VCS_INTEGRATION_ENABLED` | Multica Backend | true | Enable self-hosted Git providers (Gitea, Forgejo, GitLab), as in upstream's self-host compose. |
| `MULTICA_DATABASE_STARTUP_TIMEOUT` | Multica Backend | 15m | How long migrations and the server keep retrying while Postgres is still starting. |
| `OPENAI_API_KEY` | Agent Runtime | (secret) | Optional. Lets Codex agents run on Railway (or run 'codex login' over Railway SSH). |
| `MULTICA_APP_URL` | Agent Runtime | - | Public app URL used in links the daemon and agents produce (follows the backend's FRONTEND_ORIGIN). |
| `ANTHROPIC_API_KEY` | Agent Runtime | (secret) | Optional. Lets Claude Code agents run on Railway (or log in with a subscription over Railway SSH). |
| `MULTICA_SERVER_URL` | Agent Runtime | - | Backend URL on the private network; the daemon's HTTP and WebSocket traffic never leaves Railway. |
| `MULTICA_RUNTIME_TOKEN` | Agent Runtime | (secret) | Optional, set after first login: a personal access token (mul_...) from Settings > API Tokens. Until set, this runtime stays idle. |
| `MULTICA_DAEMON_DEVICE_NAME` | Agent Runtime | Railway | Name of this machine in Settings > Runtimes. |
| `MULTICA_DAEMON_MAX_CONCURRENT_TASKS` | Agent Runtime | 4 | Agent runs executed in parallel on this service (upstream default 20 is sized for workstations). |

## Configuration

- **Healthcheck:** `/login`
- **Healthcheck:** `/_gateway/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/readyz`
- **Volume:** `/home/agent`

**Category:** AI/ML · **Tags:** multica, ai-agents, coding-agents, claude-code, codex · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/multica-v06-ai-agent-team-workspace)
