# Deploy Documenso on Railway

The Open Source DocuSign Alternative, BYO SMTP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/documenso-1)

## About

**What is Documenso?**  
Documenso is the open-source alternative to DocuSign — a secure, self-hostable e-signature platform for signing, sending, and managing digital documents. It offers enterprise-grade features like compliant signatures, team collaboration, templates, API integration, audit logs, and AI-assisted field detection, all while prioritising privacy, customisation, and transparency.

Bring your own SMTP details, once added, no other setup is required! This is an alternative working one-click install template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Documenso | [documenso/documenso](https://github.com/documenso/documenso) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Documenso | 3000 | The port on which the Documenso application runs. It defaults to 3000. |
| `NEXTAUTH_SECRET` | Documenso | (secret) | The secret key used by NextAuth.js for encryption and signing. |
| `NEXT_PRIVATE_SMTP_HOST` | Documenso | - | The host for the SMTP server for SMTP transports. |
| `NEXT_PRIVATE_SMTP_PORT` | Documenso | - | The port for the SMTP server for SMTP transports. |
| `NEXT_PUBLIC_WEBAPP_URL` | Documenso | - | The URL for the web application. |
| `NEXT_PRIVATE_SMTP_SECURE` | Documenso | - | Whether to force the use of TLS for the SMTP server for SMTP transports. |
| `NEXT_PRIVATE_DATABASE_URL` | Documenso | - | The URL for the primary database connection (with connection pooling). |
| `NEXT_PRIVATE_SMTP_PASSWORD` | Documenso | (secret) | The password for the SMTP server for the smtp-auth transport. |
| `NEXT_PRIVATE_SMTP_USERNAME` | Documenso | (secret) | The username for the SMTP server for the smtp-auth transport. |
| `NEXT_PRIVATE_ENCRYPTION_KEY` | Documenso | - | The primary encryption key for symmetric encryption and decryption. |
| `NEXT_PRIVATE_SMTP_FROM_NAME` | Documenso | - | The sender name for the “from” address. |
| `NEXT_PRIVATE_SMTP_TRANSPORT` | Documenso | smtp-auth | The transport to send emails (smtp-auth, smtp-api, resend, or mailchannels). |
| `NEXT_PUBLIC_UPLOAD_TRANSPORT` | Documenso | database | The transport for file uploads (database or s3). |
| `NEXT_PRIVATE_SMTP_FROM_ADDRESS` | Documenso | - | The email address for the “from” address. |
| `NEXT_PRIVATE_DIRECT_DATABASE_URL` | Documenso | - | The URL for the direct database connection (without connection pooling). |
| `NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY` | Documenso | - | The secondary encryption key for symmetric encryption and decryption. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, Shell, CSS, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/deploy/documenso-1)
