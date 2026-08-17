# Deploy Fider on Railway

Canny Alternative. Open platform to collect and prioritize feedback

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fider)

## About

Fider is an open-source customer feedback board: users post ideas, vote on the ones they want and discuss them in comments, while your team replies with a status that becomes a public roadmap. It is the self-hosted answer to Canny, UserVoice and Nolt — no per-tracked-user bill, and every vote, email address and comment stays in your own database.

Self-host Fider on Railway and four pieces arrive wired together. The `fider` service runs the official `getfider/fider:stable` image on port 3000 behind a managed TLS domain, applying database migrations on every boot. PostgreSQL holds posts, votes, comments and users; a managed object storage bucket keeps avatars, logos and attachments off the container filesystem so they survive redeploys. The fourth service is Mailpit: Fider has no passwords at all, so sign-in and the first administrator both depend on email working from minute one.

![Fider Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786897385/0d7adc7d-d5d9-47ea-b6d9-c47918186a89.png)

Canny and UserVoice price by tracked user, so the month your board takes off is the month the invoice does too. Fider has no seat count. Self-hosting is also the only option when the feedback is sensitive: healthcare, finance and public-sector teams often cannot put customer names and unreleased plans into SaaS.

- **Voting boards with discussion** — posts, upvotes, comments, tags, duplicate merging and search.
- **Statuses that publish a roadmap** — mark a post Planned, Started, Completed or Declined with a staff response, and every voter is notified.
- **Passwordless sign-in** — a one-time email link, or Google, GitHub and Facebook OAuth.
- **Public or private boards**, a localised UI, and custom CSS.

Fider has no worker tier: email and webhooks run as goroutines inside the web process, so these four services are the whole production shape.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mailpit | `axllent/mailpit:latest` | Web service |
| fider | `getfider/fider:stable` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | mailpit | 8025 | Web inbox HTTP port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before pruning |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Bind web inbox to IPv6 |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Bind SMTP listener to IPv6 |
| `MP_SMTP_MAX_RECIPIENTS` | mailpit | 100 | Maximum recipients per message |
| `MP_DISABLE_VERSION_CHECK` | mailpit | true | Skip upstream version check |
| `PORT` | fider | 3000 | HTTP listening port |
| `EMAIL` | fider | smtp | Email delivery driver |
| `LOG_SQL` | fider | false | Do not log every SQL statement |
| `BASE_URL` | fider | - | Public URL used in emails |
| `LOG_LEVEL` | fider | INFO | Application log verbosity |
| `JWT_SECRET` | fider | (secret) | Signs sign-in link tokens |
| `BLOB_STORAGE` | fider | s3 | Store uploads in object storage |
| `DATABASE_URL` | fider | - | PostgreSQL connection string |
| `EMAIL_NOREPLY` | fider | - | From address on outgoing mail |
| `LOG_STRUCTURED` | fider | true | Emit key=value log lines |
| `EMAIL_SMTP_HOST` | fider | - | SMTP host on private network |
| `EMAIL_SMTP_PORT` | fider | 1025 | Mailpit SMTP listener port |
| `SIGNUP_DISABLED` | fider | false | Keep false until first admin exists |
| `BLOB_STORAGE_S3_BUCKET` | fider | - | Bucket name |
| `BLOB_STORAGE_S3_REGION` | fider | - | Bucket region |
| `EMAIL_SMTP_ENABLE_STARTTLS` | fider | false | Plain SMTP on private network |
| `BLOB_STORAGE_S3_ENDPOINT_URL` | fider | - | Bucket S3 endpoint |
| `BLOB_STORAGE_S3_ACCESS_KEY_ID` | fider | - | Bucket access key |
| `BLOB_STORAGE_S3_SECRET_ACCESS_KEY` | fider | (secret) | Bucket secret key |
| `POSTGRES_DB` | Postgres | railway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |

## Configuration

- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/fider)
