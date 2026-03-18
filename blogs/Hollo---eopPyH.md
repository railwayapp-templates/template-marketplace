# Deploy Hollo on Railway

Hollo's official Railway template

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/eopPyH)

## About

Hollo is a federated single-user microblogging software powered by [Fedify](https://fedify.dev/). Although it is for single-user, it is designed to be federated through [ActivityPub](https://www.w3.org/TR/activitypub/), which means that you can follow and be followed by other users from other instances, even from other software that supports ActivityPub like Mastodon, Misskey, and so on.

The Railway is the simplest way to deploy Hollo.  With this template, you can get started with your own Hollo in just a few clicks.

To deploy Hollo, you need S3 or S3-compatible object storage for storing media such as images. There are many S3-compatible object storage services, including AWS S3, Cloudflare R2, MinIO, DigitalOcean Spaces, and Linode Object Storage. Once you have your object storage ready, you'll need to configure the environment variables below appropriately (see how to use the S3 client API for each service):

- `S3_BUCKET`: The bucket name of the S3-compatible object storage.
- `S3_URL_BASE`: The public URL base of the S3-compatible object storage.
- `S3_ENDPOINT_URL`: The endpoint URL for S3-compatible object storage. 
- `AWS_ACCESS_KEY_ID`: The access key for S3-compatible object storage.
- `AWS_SECRET_ACCESS_KEY`: The secret key for S3-compatible object storage.

Once you've set up your environment variables and Hollo is deployed on Railway, go to https://yourdomain/setup to set up your login credentials and add your profile.

It's important to note that you need to decide on a domain name *before* you start setting up Hollo for the first time. This is because *you can't change your domain name once Hollo is set up.*

Once you've created your profile, you're ready to start enjoying Hollo. It's worth noting that Hollo doesn't have much of a web interface of its own, so you'll need to use a client app like [Phanpy](https://phanpy.social/) for now.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Hollo | `ghcr.io/fedify-dev/hollo:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |
| `LOG_LEVEL` | Hollo | info | The lowest level of logging messages to see |
| `LOG_QUERY` | Hollo | false | Whether to log SQL queries. |
| `S3_BUCKET` | Hollo | - | The bucket name of the S3-compatible object storage |
| `DRIVE_DISK` | Hollo | s3 | The disk driver used by Hollo to store blobs such as avatars, custom emojis, and other media. Valid values are `fs` (local filesystem) and `s3` (S3-compatible object storage). |
| `SECRET_KEY` | Hollo | (secret) | A secret key used for secure cookies |
| `SENTRY_DSN` | Hollo | - | The DSN of the Sentry project to send error reports and traces to. |
| `BEHIND_PROXY` | Hollo | true | - |
| `DATABASE_URL` | Hollo | - | The database URL |
| `ASSET_URL_BASE` | Hollo | - | The public URL base of the S3-compatible object storage |
| `S3_ENDPOINT_URL` | Hollo | - | The endpoint URL for S3-compatible object storage |
| `AWS_ACCESS_KEY_ID` | Hollo | - | The access key for S3-compatible object storage |
| `AWS_SECRET_ACCESS_KEY` | Hollo | (secret) | The secret key for S3-compatible object storage |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/nodeinfo/2.1`
- **Networking:** Public domain with automatic HTTPS

**Category:** Blogs

[View on Railway →](https://railway.com/deploy/eopPyH)
