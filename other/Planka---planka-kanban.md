# Deploy Planka on Railway

Kanban board for planning work on cards you drag between lists

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/planka-kanban)

## About

Planka is an open-source kanban board that behaves like Trello: projects hold boards, boards hold lists, and lists hold cards you drag between columns. Every change is pushed to other browsers over a WebSocket, so a card moved on one screen moves on everyone else's immediately. Cards carry markdown descriptions, labels, due dates, checklists, attachments and comments. Teams self-host Planka when they want Trello's shape without handing their roadmap to a third-party SaaS.

Deploy Planka on Railway and you get the production shape in one click. The `planka` service runs the official `ghcr.io/plankanban/planka` image and is the only thing exposed to the internet. A managed `Postgres` service holds every project, board, card and user, and a Railway object storage bucket holds every uploaded file — attachments, thumbnails, avatars and project backgrounds — so the app service keeps no local state. Nothing in the bucket is publicly readable: Planka streams each file back through its own token-checked routes, so an attachment is reachable only by someone signed in to that board.

![Planka web service connected to Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788389963/planka-architecture.png)

Planka is a finished application, not a framework you assemble. Self-hosting suits a team that wants the Trello workflow but needs the data on infrastructure it controls — client work under NDA, internal roadmaps, or any board where a per-seat bill scales badly against people who mostly read it.

- Projects, boards, lists and cards with drag-and-drop between columns
- Realtime updates over WebSocket, with per-card activity and notifications
- Markdown descriptions, checklists with progress bars, due dates, card covers
- Colour-coded labels, per-board membership, filtering by member or label
- Attachments with automatic thumbnails, and link attachments with fetched favicons
- Two-factor authentication, API keys, webhooks, an admin panel

Three pieces make it up. `planka` is the Node.js application, serving the React front end and the JSON API on port 1337. `Postgres` is the system of record; Planka runs its migrations at startup, so the schema is created and upgraded with no manual step. The bucket takes all binary content, which lets the app service run with no volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| planka | `ghcr.io/plankanban/planka:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | planka | 1337 | HTTP port the app listens on |
| `BASE_URL` | planka | - | Public URL and allowed browser origin |
| `S3_BUCKET` | planka | - | Object storage bucket name |
| `S3_REGION` | planka | - | Object storage region |
| `SECRET_KEY` | planka | (secret) | Access token signing key |
| `S3_ENDPOINT` | planka | - | Object storage endpoint |
| `TRUST_PROXY` | planka | true | Read client IP and scheme from proxy headers |
| `DATABASE_URL` | planka | - | Postgres connection string |
| `S3_ACCESS_KEY_ID` | planka | - | Object storage access key |
| `DEFAULT_ADMIN_NAME` | planka | Planka Admin | First administrator's display name |
| `DEFAULT_ADMIN_EMAIL` | planka | admin@example.com | First administrator's email |
| `S3_FORCE_PATH_STYLE` | planka | true | Use path-style bucket addressing |
| `OUTGOING_BLOCKED_IPS` | planka | 10.0.0.0/8,100.64.0.0/10,169.254.0.0/16,172.16.0.0/12,192.168.0.0/16,127.0.0.0/8,fd00::/8 | SSRF guard by address |
| `S3_SECRET_ACCESS_KEY` | planka | (secret) | Object storage secret key |
| `DEFAULT_ADMIN_PASSWORD` | planka | (secret) | First administrator's password |
| `DEFAULT_ADMIN_USERNAME` | planka | (secret) | First administrator's username |
| `OUTGOING_BLOCKED_HOSTS` | planka | localhost,.railway.internal,.railway.app | SSRF guard for outbound requests |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/api/bootstrap`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/planka-kanban)
