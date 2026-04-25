# Deploy Payload Starter on Railway

Payload starter with Next.js, MongoDB, S3 storage, and blog.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/payload-starter)

## About

The finished project from the Payload Essentials course — a production-ready website built with Payload CMS and Next.js 15. Includes collections, globals, reusable blocks, rich text editing, S3 cloud storage, SEO generation, white-labeled admin, and on-demand cache revalidation. Deploys with MongoDB.

This template deploys the complete project built throughout the Payload Essentials course. It includes a fully configured Payload backend with five collections (Pages, Posts, Categories, Users, Media), two globals (Navigation, Site Settings), four reusable block types, the Lexical rich text editor, and a Next.js frontend with static site generation and on-demand revalidation. The admin panel is white-labeled and the SEO plugin auto-generates meta titles, descriptions, OG images, canonical URLs, sitemaps, and robots.txt. Media is configured for S3-compatible cloud storage with CDN delivery.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| application | [nlvcodes/payload-starter](https://github.com/nlvcodes/payload-starter) | Web service |
| MongoDB | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `S3_API` | application | - | S3 endpoint URL |
| `S3_BUCKET` | application | - | S3 bucket name |
| `SITE_NAME` | application | - | Site name used in meta tags and admin (default: Payload Starter) |
| `DATABASE_URI` | application | - | MongoDB connection string. Change payload-starter to your own database name if desired. |
| `S3_PUBLIC_URL` | application | - | Public CDN URL for media (e.g. https://your-bucket.r2.dev). If not set, media is served through the app via /api/media/file/ |
| `PAYLOAD_SECRET` | application | (secret) | Secret key for Payload authentication |
| `RESEND_API_KEY` | application | (secret) | Resend API key — email features are disabled if not set |
| `EMAIL_FROM_NAME` | application | - | Sender name (default: value of SITE_NAME) |
| `S3_ACCESS_KEY_ID` | application | - | S3 access key |
| `SITE_DESCRIPTION` | application | - | Default site description for meta tags |
| `S3_DEFAULT_REGION` | application | - | Default region for S3. |
| `EMAIL_FROM_ADDRESS` | application | - | Sender email address (default: noreply@example.com) |
| `S3_SECRET_ACCESS_KEY` | application | (secret) | S3 secret key |
| `NEXT_PUBLIC_SERVER_URL` | application | - | Public URL of your site (e.g. https://yourdomain.com) |
| `NEXT_PUBLIC_COPYRIGHT_HOLDER` | application | - | Name shown in footer copyright |
| `MONGOHOST` | MongoDB | - | Automatically generated. |
| `MONGOPORT` | MongoDB | - | Automatically generated. |
| `MONGOUSER` | MongoDB | - | Automatically generated. |
| `MONGO_URL` | MongoDB | - | Automatically generated. |
| `MONGOPASSWORD` | MongoDB | (secret) | Automatically generated. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Automatically generated. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Automatically generated. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | Automatically generated. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/payload-starter)
