# Deploy Hedgedoc on Railway

HackMD Alternative. Collaborative markdown notes: live preview, slides

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hedgedoc-notes)

## About

HedgeDoc is an open-source, real-time collaborative markdown editor — the self-hosted answer to HackMD. Several people open the same note URL and type at once, each cursor visible to the others, with a live preview that renders GitHub-flavored markdown plus tables, task lists, MathJax formulas, Mermaid and PlantUML diagrams, and a reveal.js slide mode. Engineering teams use it for incident notes, universities for lecture notes, conferences for session pads. It began as CodiMD, a fork of HackMD's open-source core, and is maintained by the HedgeDoc community under AGPL-3.0.

Deploy HedgeDoc on Railway and the template wires up both pieces it needs: the web and collaboration server, and a PostgreSQL database holding notes, revisions, accounts and sessions. The app mounts a volume for uploaded images, gets a public HTTPS domain, and reaches Postgres over the private network, so the database is never exposed to the internet. Public sign-up is off and your first account is created at boot from the email and password you supply, so the instance is never briefly open to whoever finds the URL.

![HedgeDoc Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786977475/67832371-bf4d-4396-a0f5-e640ecbb0399.png)

HedgeDoc is a Node.js app that keeps each open note's editing state in memory, synchronises keystrokes between browsers over WebSockets, and persists documents and revisions to PostgreSQL. Self-host it when notes hold material you would rather not put on someone else's SaaS.

- Real-time multi-user editing with visible cursors, authorship colours, online-user list
- GitHub-flavored markdown plus MathJax, Mermaid, PlantUML, footnotes and highlighted code
- Per-note permissions, from freely editable through read-only to owner-private
- Publish and slide-mode views of one document; export to markdown, HTML and PDF
- Optional OAuth2, GitHub, GitLab, Google, LDAP and SAML sign-in

Two services make up the deployment. **HedgeDoc** serves the editor, rendered pages and the WebSocket channel on port 3000, with a volume at `/hedgedoc/public/uploads`. **PostgreSQL** stores notes, revisions, users and sessions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hedgedoc | [gridalpha/hedgedoc-railway](https://github.com/gridalpha/hedgedoc-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | hedgedoc | 3000 | HTTP listening port |
| `CMD_DB_URL` | hedgedoc | - | PostgreSQL connection string |
| `CMD_DOMAIN` | hedgedoc | - | Public hostname, no scheme |
| `CMD_LOGLEVEL` | hedgedoc | info | Application log verbosity |
| `CMD_URL_ADDPORT` | hedgedoc | false | Never append a port to URLs |
| `CMD_ALLOW_FREEURL` | hedgedoc | true | Allow custom note URLs |
| `CMD_SESSION_SECRET` | hedgedoc | (secret) | Signs login cookies |
| `CMD_ALLOW_ANONYMOUS` | hedgedoc | false | Guests cannot create notes |
| `CMD_PROTOCOL_USESSL` | hedgedoc | true | Build https URLs behind Railway TLS |
| `CMD_ENABLE_STATS_API` | hedgedoc | false | Keep /status and /metrics closed |
| `HEDGEDOC_ADMIN_EMAIL` | hedgedoc | admin@example.com | Login address of the first account |
| `CMD_IMAGE_UPLOAD_TYPE` | hedgedoc | filesystem | Store uploads on the volume |
| `HEDGEDOC_ADMIN_PASSWORD` | hedgedoc | (secret) | Password of the first account |
| `CMD_ALLOW_EMAIL_REGISTER` | hedgedoc | false | Public sign-up disabled |
| `CMD_ALLOW_ANONYMOUS_EDITS` | hedgedoc | false | No freely editable permission |
| `HEDGEDOC_ADMIN_RESET_PASSWORD` | hedgedoc | (secret) | Set true once to reset that password |
| `CMD_REQUIRE_FREEURL_AUTHENTICATION` | hedgedoc | true | Custom URLs need an account |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/hedgedoc/public/uploads`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/hedgedoc-notes)
