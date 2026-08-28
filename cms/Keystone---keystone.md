# Deploy Keystone on Railway

Headless CMS that builds a GraphQL API from a TypeScript schema

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keystone)

## About

Keystone is an open-source headless CMS for Node.js, built by Thinkmill under the MIT licence. You describe your content model once in a TypeScript file, and Keystone generates the database tables, a complete GraphQL API and a React admin interface from it. Because the schema is code rather than a point-and-click builder, content types, validation, hooks and per-field access control live in your repository and go through code review like everything else. Teams reach for it when a project needs a real application backend behind the content.

Self-host Keystone on Railway with this template and the pieces a production install needs are already wired together. The Keystone service is built from a public GitHub repository and serves the admin interface and the GraphQL API on one domain. PostgreSQL stores content through Prisma. Redis holds sessions, so signing out revokes them immediately and the app can run more than one replica. A managed object storage bucket takes image and file uploads, read back through presigned URLs. Nothing touches the container filesystem, so redeploys never lose data.

![Keystone, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787798579/keystone-architecture.png)

Keystone is a framework rather than a prebuilt server, so a deployment is always your own application. This template is that application: a small but complete CMS you fork and extend. Its schema defines `Post` (title, slug, status, publish date, summary, rich text, hero image, attachment, author, tags), `Tag` and `User`, with access rules deciding who reads and writes.

Key features:

- **Schema-driven** — one file produces the database schema, the GraphQL API, TypeScript types and the admin interface.
- **Rich-text document field** — structured JSON, not HTML, so content renders cleanly everywhere.
- **Granular access control** — rules at operation, filter, item and field level, plain functions with the session in scope.
- **Images and files** — pluggable storage adapters; both go to S3-compatible storage here.
- **Prisma under the hood** — PostgreSQL, MySQL or SQLite, with migration files you commit.

Four services make up the deployment. **Keystone** runs the Node.js server answering the admin interface and `/api/graphql`. **PostgreSQL** stores every record. **Redis** stores sessions, so a sign-out genuinely invalidates one. The **object storage bucket** holds uploads, keeping the app stateless and horizontally scalable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| keystone | [gridalpha/keystone-railway](https://github.com/gridalpha/keystone-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | keystone | 3000 | HTTP server listening port |
| `REDIS_URL` | keystone | - | Redis session store connection string |
| `S3_BUCKET` | keystone | - | Bucket receiving image and file uploads |
| `S3_REGION` | keystone | - | Bucket placement region |
| `ADMIN_NAME` | keystone | Admin | Display name for the first administrator |
| `ADMIN_EMAIL` | keystone | admin@example.com | First administrator's sign-in email |
| `S3_ENDPOINT` | keystone | - | Object storage endpoint URL |
| `DATABASE_URL` | keystone | - | Postgres connection string |
| `ADMIN_PASSWORD` | keystone | (secret) | First administrator's password |
| `SESSION_SECRET` | keystone | (secret) | Signs session cookies, 32+ characters |
| `SESSION_MAX_AGE` | keystone | 2592000 | Session lifetime in seconds |
| `S3_ACCESS_KEY_ID` | keystone | - | Object storage access key |
| `GRAPHQL_PLAYGROUND` | keystone | false | Set true to expose Apollo landing page |
| `MAX_FILE_SIZE_BYTES` | keystone | 52428800 | Upload size ceiling in bytes |
| `S3_FORCE_PATH_STYLE` | keystone | true | Path-style addressing, required here |
| `S3_SECRET_ACCESS_KEY` | keystone | (secret) | Object storage secret key |
| `S3_SIGNED_URL_EXPIRY_SECONDS` | keystone | 3600 | Lifetime of presigned asset URLs |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS · **Languages:** TypeScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/keystone)
