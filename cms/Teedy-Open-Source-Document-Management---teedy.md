# Deploy Teedy | Open-Source Document Management on Railway

Self-host Teedy document management with OCR, AES-256 encryption & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teedy)

## About

Deploy Teedy on Railway to get a production-ready, self-hosted document management system with built-in OCR, full-text search, and encrypted file storage. Self-host Teedy with zero infrastructure headaches — this template pre-configures a **Teedy** application server backed by a **PostgreSQL** database, with a persistent volume for document storage and Lucene search indexes.

Teedy (formerly Sismics Docs) is an open-source, lightweight document management system built with Java and Jetty. It solves the problem of organizing, searching, and securing digital documents for individuals and small teams without requiring expensive enterprise software.

Key features of self-hosted Teedy include:

- **Built-in OCR** with Tesseract 4 — full-text search across scanned images, PDFs, DOCX, ODT, and TXT
- **256-bit AES encryption** for all stored files at rest
- **Document workflows** with multi-step verification and approval chains
- **LDAP authentication and two-factor authentication (2FA)**
- **Hierarchical tag system** with Dublin Core and custom metadata
- **File versioning** with full change history
- **User/group permissions** with storage quotas and audit logging
- **RESTful API and webhooks** for programmatic access and automation

The Railway template deploys two services: the Teedy application container (`sismics/docs:v1.11`) and a PostgreSQL database for persistent metadata storage. Document files and Lucene search indexes are stored on an attached volume at `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Teedy | `sismics/docs:v1.11` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Teedy | 8080 | HTTP listening port |
| `DATABASE_URL` | Teedy | - | JDBC PostgreSQL connection string |
| `DATABASE_USER` | Teedy | (secret) | PostgreSQL username |
| `DOCS_BASE_URL` | Teedy | - | Public-facing application URL |
| `DATABASE_PASSWORD` | Teedy | (secret) | PostgreSQL password |
| `DOCS_ADMIN_EMAIL_INIT` | Teedy | - | Admin email (first boot only). Note: default username password for login is `admin`/`admin` |
| `DOCS_DEFAULT_LANGUAGE` | Teedy | eng | Default OCR language |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/teedy)
