# Deploy Kaneo v2: Project Management - Jira & Linear Alternative on Railway

Open source Kanban with time tracking. File uploads work out of the box.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kaneo-v2-self-hosted-project-management-)

## About

Kaneo is open source project management: Kanban boards, backlogs, sprints, time tracking, labels and
comments, self-hosted on infrastructure you control. It replaces Jira, Linear and Trello for teams
who do not want per-seat pricing or their roadmap sitting in a vendor's database.

This template runs the latest Kaneo v2 image against managed PostgreSQL, with object storage included
so screenshots / attachments work out of the box.

Kaneo v2 ships one container: nginx serves the built React frontend and reverse-proxies `/api/` to
the Node API beside it, on port 5173. It needs a PostgreSQL database and applies its own migrations
at boot.

Other Kaneo templates skip storage (Kaneo uploads files to S3-compatible object storage,
and that normally requires provisioning an S3 storage bucket and configuring CORS
before anyone can attach screenshots / etc into tasks.) This template ships with S3 storage (SeaweedFS),
so you get a fully working Kaneo deployment without additional work. (Note: Switching to external S3 storage is simple, instructions below).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| SeaweedFS | `chrislusf/seaweedfs:4.41` | Web service |
| Kaneo | `ghcr.io/usekaneo/kaneo:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first boot. Kaneo creates its own tables inside it. |
| `DATABASE_URL` | Postgres | - | [Do not change] Private network connection string. Kaneo reads this through a reference. |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser, created on first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password, generated uniquely for your deployment. Letters only, so it is safe inside a connection URL. |
| `PORT` | SeaweedFS | 8333 | [Do not change] Port the S3 API listens on. Railway's router uses it. |
| `S3_BUCKET` | SeaweedFS | kaneo | Bucket created automatically on first start. Must match S3_BUCKET on the Kaneo service. |
| `S3_ACCESS_KEY_ID` | SeaweedFS | - | [Do not change] S3 access key, generated per deployment. Kaneo reads it by reference. |
| `S3_IDENTITIES_JSON` | SeaweedFS | - | [Do not change] Identity file the start command writes for SeaweedFS, built from the two keys above. Unset or broken, SeaweedFS serves S3 anonymously. |
| `S3_SECRET_ACCESS_KEY` | SeaweedFS | (secret) | [Do not change] S3 secret key, generated per deployment. Kaneo reads it by reference. |
| `PORT` | Kaneo | 5173 | [Do not change] Port Kaneo's bundled nginx listens on. Railway's router and healthcheck use it. |
| `S3_BUCKET` | Kaneo | kaneo | Bucket where uploads are stored. Must match S3_BUCKET on the SeaweedFS service. |
| `S3_REGION` | Kaneo | us-east-1 | Region label used to sign S3 requests. Any valid value works for SeaweedFS; set the real bucket region if you switch to AWS S3. |
| `AUTH_SECRET` | Kaneo | (secret) | Signs user sessions. Generated once when you deploy. Changing it later signs everyone out. |
| `S3_ENDPOINT` | Kaneo | - | URL of the bundled SeaweedFS service where uploaded files are stored. Point at your own S3-compatible bucket to replace it. |
| `DATABASE_URL` | Kaneo | - | [Do not change] PostgreSQL connection string, wired to the Postgres service in this template. |
| `KANEO_CLIENT_URL` | Kaneo | - | Public URL of this Kaneo instance. |
| `S3_ACCESS_KEY_ID` | Kaneo | - | [Do not change] Access key for the storage service, read by reference. |
| `S3_FORCE_PATH_STYLE` | Kaneo | true | SeaweedFS uses path-style URLs. Set false only for virtual-hosted providers such as AWS S3 or R2. |
| `DISABLE_REGISTRATION` | Kaneo | false | Set to true once your team has signed up (this closes public signup, existing accounts keep working). |
| `S3_SECRET_ACCESS_KEY` | Kaneo | (secret) | [Do not change] Secret key for the storage service, read by reference. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'printf "%s" "$S3_IDENTITIES_JSON" > /data/s3-identities.json && exec /usr/bin/weed -logtostderr=true mini -dir=/data -s3.config=/data/s3-identities.json -bucket=$S3_BUCKET -s3.port=$PORT'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/health`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kaneo-v2-self-hosted-project-management-)
