# Deploy refferq on Railway

Create, Manage, and Scale your affiliate programs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/refferq)

## About

**Refferq** is a comprehensive affiliate management platform designed to help businesses create, manage, and scale their affiliate programs.  
It offers advanced features like real-time analytics, automated commissions, and white-label branding — all built with a modern full-stack architecture using **Next.js**, **Prisma**, and **PostgreSQL**.

---

Hosting **Refferq** on **Railway** allows you to deploy a fully functional affiliate management solution with minimal setup.  
The platform handles your infrastructure, including the **Next.js server** and **PostgreSQL database**, ensuring smooth operation and scalability.

Railway simplifies:
- Environment management  
- Connection string setup  
- Continuous deployments from GitHub  

You can easily customize Refferq’s branding, email templates, and commission workflows while leveraging Railway’s automatic SSL and monitoring tools.  
Deploy Refferq in just a few clicks — no manual configuration or DevOps overhead required.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Refferq | [Refferq/Refferq](https://github.com/Refferq/Refferq) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `JWT_SECRET` | Refferq | (secret) | - |
| `ADMIN_EMAILS` | Refferq | - | Admin Notification Emails (comma-separated) |
| `RESEND_API_KEY` | Refferq | (secret) | - |
| `STRIPE_SECRET_KEY` | Refferq | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, HTML, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/refferq)
