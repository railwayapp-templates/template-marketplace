# Deploy Penpot | Open-Source Figma Alternative on Railway

Self host Pentop. UI/UX design, prototype, real-time collaboration & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penpot-figma-alternative)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/penpot-figma-alternative?referralCode=QXdhdr)

Deploy Penpot on Railway to get a fully self-hosted, open-source design and prototyping platform — no vendor lock-in, no per-seat licensing, full data sovereignty. Self-host Penpot as a real alternative to Figma that runs on open web standards (SVG, CSS) and works in any browser.

![Penpot Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776599272/Penpot_railway_arch_ru7cnu.png)

Penpot is the first open-source design and prototyping platform built for cross-domain teams. Created by Kaleidos, it provides a browser-based design tool that rivals Figma

Key features:

- **Real-time multiplayer editing** — multiple designers work simultaneously with live cursors and presence indicators
- **Design tokens** — first design tool with native design token support for consistent design systems
- **Components and variants** — reusable UI elements with overrides, just like Figma components
- **Interactive prototyping** — clickable prototypes with transitions, overlays, and scroll behaviors
- **Inspect mode** — developers get exact CSS properties, SVG code, and measurements without plugins
- **Plugin ecosystem** — 100+ community plugins for code generation, stock images, AI tools, and more
- **Open standards** — SVG-native format means no proprietary lock-in; files are human-readable XML

The architecture separates the frontend (Nginx + ClojureScript SPA), backend (JVM API server handling auth, persistence, and WebSockets), and exporter (Node.js + Puppeteer for rendering). Assets are stored in S3-compatible storage (MinIO on Railway), while PostgreSQL holds project data and Valkey coordinates real-time notifications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MinIO | `minio/minio:latest` | Database |
| Valkey | `valkey/valkey:8.1` | Database |
| Backend | `penpotapp/backend:2.14.3` | Worker |
| Exporter | `penpotapp/exporter:2.14.3` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Frontend | `penpotapp/frontend:2.14.3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | MinIO | 9001 | Console port for public domain |
| `MINIO_ROOT_USER` | MinIO | (secret) | Admin access key |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Admin secret key |
| `VALKEY_EXTRA_FLAGS` | Valkey | --maxmemory 128mb --maxmemory-policy volatile-lfu | Set flags |
| `PENPOT_FLAGS` | Backend | disable-email-verification enable-prepl-server disable-secure-session-cookies enable-login-with-password | Feature flags |
| `PENPOT_REDIS_URI` | Backend | - | Valkey connection URI |
| `AWS_ACCESS_KEY_ID` | Backend | - | MinIO access key |
| `PENPOT_PUBLIC_URI` | Backend | - | Public-facing URL |
| `PENPOT_SECRET_KEY` | Backend | (secret) | Session signing key (stable, shared with Exporter) |
| `PENPOT_DATABASE_URI` | Backend | - | Postgres connection |
| `AWS_SECRET_ACCESS_KEY` | Backend | (secret) | MinIO secret key |
| `PENPOT_DATABASE_PASSWORD` | Backend | (secret) | Database password |
| `PENPOT_DATABASE_USERNAME` | Backend | (secret) | Database user |
| `PENPOT_SMTP_DEFAULT_FROM` | Backend | no-reply@penpot.local | Default sender email |
| `PENPOT_TELEMETRY_ENABLED` | Backend | false | Disable telemetry |
| `PENPOT_SMTP_DEFAULT_REPLY_TO` | Backend | no-reply@penpot.local | Default reply-to email |
| `PENPOT_OBJECTS_STORAGE_BACKEND` | Backend | s3 | Use S3 storage (MinIO) |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | Backend | 367001600 | Max upload size |
| `PENPOT_OBJECTS_STORAGE_S3_BUCKET` | Backend | penpot-assets | S3 bucket name |
| `PENPOT_OBJECTS_STORAGE_S3_REGION` | Backend | us-east-1 | S3 region |
| `PENPOT_OBJECTS_STORAGE_S3_ENDPOINT` | Backend | - | MinIO S3 API |
| `PENPOT_HTTP_SERVER_MAX_MULTIPART_BODY_SIZE` | Backend | 367001600 | Max multipart body size |
| `PENPOT_REDIS_URI` | Exporter | - | Valkey connection URI |
| `PENPOT_PUBLIC_URI` | Exporter | - | Frontend internal URL |
| `PENPOT_SECRET_KEY` | Exporter | (secret) | Shared session key |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |
| `PORT` | Frontend | 8080 | Nginx listening port |
| `PENPOT_FLAGS` | Frontend | disable-email-verification enable-login-with-password | Feature flags |
| `PENPOT_BACKEND_URI` | Frontend | - | Backend proxy URL |
| `PENPOT_EXPORTER_URI` | Frontend | - | Exporter proxy URL |
| `PENPOT_HTTP_SERVER_MAX_BODY_SIZE` | Frontend | 367001600 | Max upload size (350MB) |
| `PENPOT_HTTP_SERVER_MAX_MULTIPART_BODY_SIZE` | Frontend | 367001600 | Max multipart body size |

## Configuration

- **Start command:** `minio server /data --console-address :9001`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `valkey-server --maxmemory 128mb --maxmemory-policy volatile-lfu`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/penpot-figma-alternative)
