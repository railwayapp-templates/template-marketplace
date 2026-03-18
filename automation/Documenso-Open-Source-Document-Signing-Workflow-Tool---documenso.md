# Deploy Documenso (Open-Source Document Signing & Workflow Tool) on Railway

Documenso [Mar ’26] (E-Sign & Manage Documents Securely) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/documenso)

## About

Documenso is a free, open-source eSignature platform available on GitHub that helps individuals and businesses securely send, sign, and manage digital documents. As an alternative to expensive and closed-source eSignature services like DocuSign or Adobe Sign, Documenso provides transparency, affordability, and full control over your documents. Being open-source means anyone can audit the code, customize workflows, and deploy it on their own infrastructure for complete data ownership.

You can self-host Documenso to ensure all your signed documents, audit logs, and user data remain private and under your control. Railway simplifies the entire hosting process, making it easy for both developers and non-technical users to set up Documenso in minutes.

Self-hosting Documenso on Railway gives you:

*   **Full control** of your data and signatures
    
*   **Automatic scaling** with Railway’s managed containers
    
*   **No third-party tracking** or data sharing
    
*   **Custom domain and branding** flexibility
    

* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| documenso | [Shinyduo/documenso](https://github.com/Shinyduo/documenso) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `SMTP_MAIL_USER` | documenso | (secret) |
| `STRIPE_API_KEY` | documenso | (secret) |
| `NEXTAUTH_SECRET` | documenso | (secret) |
| `SENDGRID_API_KEY` | documenso | (secret) |
| `SMTP_MAIL_PASSWORD` | documenso | (secret) |
| `STRIPE_WEBHOOK_SECRET` | documenso | (secret) |
| `NEXT_PUBLIC_ALLOW_SIGNUP` | documenso | true |
| `NEXT_PUBLIC_ALLOW_SUBSCRIPTIONS` | documenso | false |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** TypeScript, JavaScript, Shell, CSS, PLpgSQL, Dockerfile

[View on Railway →](https://railway.com/template/documenso)
