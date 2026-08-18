# Deploy NTFY on Railway

Pushover alternative. Self-hosted ntfy push notification server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy-server)

## About

ntfy is an open source pub-sub notification server that turns a plain HTTP request into a push notification on your phone, desktop or browser. `POST` a line of text to a topic URL and every subscriber gets it — no SDK, no app registration, no vendor account. Sysadmins use it to hear that a backup finished; developers wire it into CI, cron and shell scripts with one `curl` line. Self-host ntfy and every alert stays on infrastructure you control.

Deploy ntfy on Railway and what a production instance needs arrives wired together: the ntfy server, built from [gridalpha/ntfy-railway](https://github.com/gridalpha/ntfy-railway) on the official `binwiederhier/ntfy` image; PostgreSQL for the message cache, accounts, access rules and Web Push subscriptions; and an object storage bucket for attachments. All state lives in those two, so the container is stateless — no volume to size or migrate. Access control starts closed, an admin is created from your password, and Web Push keys are generated on first boot.

![ntfy Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786979110/f07ec5df-c795-44f5-9d03-ff0728bd0367.png)

ntfy solves a small problem with no cheap commercial answer: getting a notification out of a script and onto a phone. Teams self-host once they hit a free tier's daily cap, or once compliance says alert bodies cannot leave their stack.

Key features:

- Publish with plain `curl` — a body plus optional `Title`, `Tags`, `Priority` and `Actions` headers
- Subscribe over WebSocket, SSE or JSON stream, or via the Android, iOS, web and CLI clients
- Templates render a Grafana, Alertmanager or GitHub webhook payload as readable text
- Attachments, scheduled delivery, action buttons, markdown, per-topic access control
- Web Push for browser notifications with the tab closed, and UnifiedPush so Android apps can skip Firebase

The **ntfy** service is the only public one and serves both publishing and subscribing. **Postgres** holds cached messages, users, tokens, ACLs and Web Push subscriptions over private networking. The **bucket** holds attachment bodies, which ntfy streams back through its `/file/` route, so it never needs to be public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ntfy | [gridalpha/ntfy-railway](https://github.com/gridalpha/ntfy-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | ntfy | 8080 | HTTP listen port |
| `NTFY_BASE_URL` | ntfy | - | Public-facing server URL |
| `NTFY_S3_BUCKET` | ntfy | - | Attachment bucket name |
| `NTFY_S3_PREFIX` | ntfy | attachments | Key prefix inside the bucket |
| `NTFY_S3_REGION` | ntfy | - | Attachment bucket region |
| `NTFY_ADMIN_USER` | ntfy | (secret) | First admin username |
| `NTFY_LISTEN_HTTP` | ntfy | :8080 | Listen address ntfy binds |
| `NTFY_S3_ENDPOINT` | ntfy | - | Attachment bucket endpoint |
| `NTFY_BEHIND_PROXY` | ntfy | true | Read client IP from forwarded header |
| `NTFY_DATABASE_URL` | ntfy | - | Messages, users, subscriptions |
| `NTFY_ENABLE_LOGIN` | ntfy | (secret) | Allow sign-in via web and API |
| `NTFY_ENABLE_SIGNUP` | ntfy | false | Keep self-registration closed |
| `NTFY_REQUIRE_LOGIN` | ntfy | (secret) | Require login for the web app |
| `NTFY_ADMIN_PASSWORD` | ntfy | (secret) | First admin password |
| `NTFY_S3_ACCESS_KEY_ID` | ntfy | - | Attachment bucket key id |
| `NTFY_UPSTREAM_BASE_URL` | ntfy | https://ntfy.sh | Relay enabling iOS push |
| `NTFY_AUTH_DEFAULT_ACCESS` | ntfy | deny-all | Fallback access for unknown topics |
| `NTFY_PROXY_TRUSTED_HOSTS` | ntfy | 152.233.0.0/17,100.64.0.0/10,fd00::/8 | Railway proxy ranges to strip |
| `NTFY_S3_SECRET_ACCESS_KEY` | ntfy | (secret) | Attachment bucket secret |
| `NTFY_WEB_PUSH_EMAIL_ADDRESS` | ntfy | - | Contact for browser push services |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ntfy-server)
