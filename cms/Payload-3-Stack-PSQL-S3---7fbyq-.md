# Deploy Payload 3 Stack (PSQL & S3) on Railway

To power websites, blogs, or portfolios from small to enterprise.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/7fbyq-)

## About

![Payload 3 Website Template](https://res.cloudinary.com/mohmdevcloud/image/upload/v1724658562/payload_hero_ssoo3j_pc1rjw.png)

<a href="https://payloadcms.mohmdev.com" rel="noopener noreferrer" style="text-decoration: none;">
  <span style="display: inline-flex; align-items: center; margin-bottom: 1em;">
    <img src="https://res.cloudinary.com/mohmdevcloud/image/upload/v1724659948/globe_favicon_o6us0b.svg" alt="https://payloadcms.mohmdev.com" style="width: 1.5em; height: 1.5em; padding-right: 0.5em; filter: invert(50%) sepia(20%) saturate(500%) hue-rotate(180deg); vertical-align: middle;">
    <span style="color: rgb(135, 133, 147); font-weight: 500; font-size: 1.125em;">Live Demo </span>
  </span>
</a>

[Payload 3](https://github.com/payloadcms/payload) transforms Next.js into a complete full-stack framework. By integrating a headless CMS natively into the Next.js environment, it creates a cohesive development experience, much like WordPress did for PHP, but with cutting-edge technology.

&gt; **⚠️ Warning:** This template is regularly updated to align with the official releases from the Payload team. Consequently, new updates may introduce breaking changes that could impact the database schema. Users of this template may need to reset their database and execute the new migrations to update the schema accordingly.

### This template is ideal if you are working on:

- A personal or enterprise-grade website, blog, or portfolio
- A content publishing platform with a fully-featured publication workflow
- A lead generation website with premium content gated behind authentication

![Payload 3 Dashboard](https://res.cloudinary.com/mohmdevcloud/image/upload/v1724658562/payload_dashboard_shb3r8_xp39pb.png)

This template, configured to be hosted on **Railway** includes a beautifully designed, production-ready front end built with [Next.js App Router](https://nextjs.org), served alongside your Payload app in a single instance. This setup allows you to deploy both your backend and website where you need them. In order to make this stack whole, we are using PostgreSQL as the database and MinIO S3 for media storage.

### Core features:

- [Next.js 15 (App Router)](https://nextjs.org)
- [React 19 &amp; React Compiler](https://19.react.dev)
- [PostgreSQL database](https://www.postgresql.org)
- [MinIO S3 for media storage](https://min.io)
- [TypeScript](https://www.typescriptlang.org)
- [React Hook Form](https://react-hook-form.com)
- [Payload Admin Bar](https://github.com/payloadcms/payload-admin-bar)
- [TailwindCSS styling](https://tailwindcss.com/)
- [shadcn/ui components](https://ui.shadcn.com/)
- Authentication
- Fully-featured blog
- Publication workflow
- User accounts
- Dark mode
- Pre-made layout building blocks
- SEO
- Redirects
- Live preview

## Getting Started

To get started with using your newly deployed Payload 3 stack, you will need to set up your S3 bucket and configure it's associated environment variables. The variables you will need are `S3_BUCKET`, `S3_ACCESS_KEY`, and `S3_SECRET_KEY`.

<img style="width: 100%;" alt="S3 Environment Variables" src="https://res.cloudinary.com/mohmdevcloud/image/upload/v1724661893/s3_variables_lr0zxb.png">

In order to get these values, you will need to log into your S3 console. The username and password for the S3 console are automatically generated during deployment. You can find these values among your console's environment variables.

Once logged in, you will need to create a new bucket and generate a new access and secret key. Once you have these values, head back to your project's environment, open up your Payload instance, and replace your obtained values with the existing ones.

🎉 Congradulations! You are now ready to start using your Payload 3 stack. Open up your project's URL, create your admin account, and click the "Seed" button to populate your database with some example data.

<img style="width: 100%;" alt="Seed Database" src="https://res.cloudinary.com/mohmdevcloud/image/upload/v1724658561/seed_xkaadv_nmlorh.png">

---

You can find the source code [here](https://github.com/MohmDev/payloadcms-website-template).<br>
Leave a ⭐ if you like this project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Bucket | `minio/minio:latest` | Database |
| Console | [railwayapp-templates/minio-console](https://github.com/railwayapp-templates/minio-console) | Web service |
| Payload | [MohmDev/payloadcms-website-template](https://github.com/MohmDev/payloadcms-website-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MINIO_ROOT_USER` | Bucket | (secret) | - |
| `MINIO_PUBLIC_PORT` | Bucket | 443 | - |
| `MINIO_PRIVATE_PORT` | Bucket | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Bucket | (secret) | - |
| `PORT` | Console | 9090 | - |
| `PASSWORD` | Console | (secret) | - |
| `USERNAME` | Console | (secret) | - |
| `PORT` | Payload | 8080 | - |
| `S3_BUCKET` | Payload | create-your-own-bucket | - |
| `S3_ACCESS_KEY` | Payload | create-your-own-access-key | - |
| `S3_SECRET_KEY` | Payload | (secret) | - |
| `PAYLOAD_SECRET` | Payload | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/minio/health/ready`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "exec console server --host 0.0.0.0 --port $PORT"`
- **Healthcheck:** `/login`

**Category:** CMS · **Languages:** Dockerfile, TypeScript, JavaScript, CSS, SCSS

[View on Railway →](https://railway.com/deploy/7fbyq-)
