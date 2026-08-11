# Deploy Kan | Open Source Trello Alternative on Railway

Open source Trello alternative: kanban boards, Postgres, attachments

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kan-kanban-board)

## About

Kan is an open-source, Trello-style kanban board — workspaces, boards, lists, cards, labels, comments, checklists and attachments, with a Trello importer built in. This template deploys the whole thing from Kan's own official images: the web app, a one-shot database migrator, Postgres, and managed object storage for attachments.

Three services and a bucket, all from official upstream images:

- **Web** — the Kan application (Next.js). Dashboard, boards, the REST/tRPC API the UI talks to, and email/password auth. The only service with a domain.
- **Migrate** — Kan ships its schema migrations as a separate `kan-migrate` image. This service runs them once on each deploy and then stops. The web image is distroless and never migrates on its own, so this is what creates the tables (upstream #402).
- **Postgres** — accounts, workspaces, boards and every card, on a volume. Kan requires Postgres specifically.
- **Bucket** — Railway object storage for avatars and card attachments, uploaded straight from the browser.

All variables are filled in and described on the deploy screen. **There is nothing you have to supply** — open the URL, register, and the first account becomes your workspace owner.

Four things this template does that are worth knowing about:

**The image is pinned, and here that is a data-safety feature, not a nicety.** Both other Kan templates ship `ghcr.io/kanbn/kan:latest`. Kan's cross-version schema migrations have twice wiped users' workspaces on what looked like a routine image update (upstream #542, #445): the board is simply gone and you are asked to create a new one. A pinned tag (`0.6.0`) means a redeploy gives you exactly the version you already ran — no surprise upgrade under a live board. When you do want to move up, you bump the tag deliberately and back up first.

**Attachments actually upload from the browser.** The obvious way to self-host Kan is the one that ships no storage at all, so every avatar and attachment 404s — or bolts on a MinIO container on a volume nobody backs up. Here they go to a managed Railway bucket. Getting that right took one measurement worth repeating: Railway storage answers both S3 URL shapes, but only the `host/bucket/key` (path-style) form sends CORS headers, and Kan's editor uploads straight from the browser with a presigned PUT. With the other shape every upload is refused in the browser while `curl` cheerfully reports 200. Verified here by requesting a presigned URL through Kan's own API, uploading to it, and reading the preflight response back.

**Migrations run without a broken container.** Upstream's compose runs the migrator as a one-shot that exits — but on Railway a container that exits is a crashed container. This template runs Migrate as a proper job (it migrates, then stops clean and green) and points it at Postgres over the **private** network. The leading template routes its migrations through the public TCP proxy instead, paying egress for every one.

**The database is private.** No public TCP proxy on Postgres; it is reachable only from this project's private network. The web app connects over `postgres.railway.internal`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `postgres:18.4-alpine` | Database |
| Web | `ghcr.io/kanbn/kan:0.6.0` | Web service |
| Migrate | `ghcr.io/kanbn/kan-migrate:0.6.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | kan_db | Database Kan uses; the connection strings point at this name. |
| `POSTGRES_USER` | Postgres | (secret) | Database user created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password, generated once. It is embedded in the connection URLs, so letters and digits only. |
| `PORT` | Web | 3000 | Port the Next.js server listens on. Railway routes traffic and the health check here. |
| `S3_REGION` | Web | - | Bucket region. |
| `SMTP_HOST` | Web | - | SMTP host for transactional email (invites, notifications). Optional; empty leaves email features off. |
| `SMTP_PORT` | Web | - | SMTP port, e.g. 465 (SSL) or 587 (STARTTLS). |
| `SMTP_USER` | Web | (secret) | SMTP username. |
| `EMAIL_FROM` | Web | - | From address for outgoing email, e.g. "Kan <hello@yourdomain.com>". |
| `S3_ENDPOINT` | Web | - | Object storage endpoint for avatars and attachments (the Railway bucket). |
| `POSTGRES_URL` | Web | - | Postgres connection string over the private network. Kan requires Postgres — it is not MySQL-compatible. |
| `SMTP_PASSWORD` | Web | (secret) | SMTP password. |
| `GOOGLE_CLIENT_ID` | Web | - | Google OAuth client id, to offer Sign in with Google. Callback is your URL + /api/auth/callback/google. |
| `S3_ACCESS_KEY_ID` | Web | - | Bucket access key. |
| `KAN_ADMIN_API_KEY` | Web | (secret) | Bearer key for Kan's admin REST API. Generated; most self-hosters never need it. |
| `TRELLO_APP_SECRET` | Web | (secret) | Trello API secret for the importer. |
| `BETTER_AUTH_SECRET` | Web | (secret) | Signs session tokens (32+ chars). Changing it logs everyone out. |
| `TRELLO_APP_API_KEY` | Web | (secret) | Trello API key, used only for the Trello board importer. |
| `S3_FORCE_PATH_STYLE` | Web | true | Keep this on. Railway storage only sends CORS headers on the path-style endpoint, and the browser uploads attachments straight to the bucket — with virtual-hosted URLs every upload fails in the browser while curl still reports 200. |
| `GOOGLE_CLIENT_SECRET` | Web | (secret) | Google OAuth client secret. |
| `NEXT_PUBLIC_BASE_URL` | Web | - | Public URL of this instance — used for links, OAuth callbacks and the app's own API base. Set it to your own domain if you add one. |
| `S3_SECRET_ACCESS_KEY` | Web | (secret) | Bucket secret key. |
| `NEXT_PUBLIC_DISABLE_EMAIL` | Web | - | Set to `true` to hide email-based features entirely when you are not configuring SMTP. |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Web | - | Origins allowed to hold a session. Must include your public URL; add a custom domain here too when you set one. |
| `NEXT_PUBLIC_DISABLE_SIGN_UP` | Web | - | Leave empty to allow registration. The first visitor to register becomes the workspace owner — set this to `true` once your account exists so nobody else can sign up. |
| `NEXT_PUBLIC_ALLOW_CREDENTIALS` | Web | (secret) | Enables email + password sign-in. Set to false to force OAuth-only login. |
| `NEXT_PUBLIC_AVATAR_BUCKET_NAME` | Web | - | Bucket holding user avatars. |
| `NEXT_PUBLIC_ATTACHMENTS_BUCKET_NAME` | Web | - | Bucket holding card attachments (the same bucket). |
| `NEXT_PUBLIC_USE_VIRTUAL_HOSTED_URLS` | Web | false | Keep false — it pairs with S3_FORCE_PATH_STYLE so the browser talks to the bucket over the CORS-enabled path-style endpoint. |
| `POSTGRES_URL` | Migrate | - | Same private Postgres connection string. drizzle-kit applies any pending migrations and then this service stops — redeploy it after a Kan version bump to migrate again. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'cd /db && for i in $(seq 1 60); do npx drizzle-kit migrate && exit 0; echo "migrate: database not ready, retry $i/60"; sleep 3; done; echo "migrate: giving up after 60 attempts"; exit 1'`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kan-kanban-board)
