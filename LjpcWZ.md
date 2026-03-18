# Deploy Rallly on Railway

Streamline your scheduling process and save time

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/LjpcWZ)

## About

<p align="center">
    <a href="https://rallly.co/">
        <img alt="rallly logo" src="https://rallly.co/logo.svg" style="width: 500px;">
    </a>
</p>

<h3 align="center">Ditch the back-and-forth emails</h3>
Streamline your scheduling process and save time.

Schedule group meetings with friends, colleagues and teams. Create meeting polls to find the best date and time to organize an event based on your participants' availability. Save time and avoid back-and-forth emails.

Built with Next.js, Prisma, tRPC &amp; TailwindCSS

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Rallly | `lukevella/rallly:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Rallly | 3000 | Internal port |
| `SMTP_PWD` | Rallly | - | The password (if auth is enabled on your SMTP server) |
| `OIDC_NAME` | Rallly | OpenID Connect | The user-facing name of your provider as it will be shown on the login page |
| `SMTP_HOST` | Rallly | - | The host address of your SMTP server |
| `SMTP_PORT` | Rallly | 465 | The port of your SMTP server |
| `SMTP_USER` | Rallly | (secret) | The username (if auth is enabled on your SMTP server) |
| `SMTP_SECURE` | Rallly | true | Set to “true” if SSL is enabled for your SMTP connection |
| `SUPPORT_EMAIL` | Rallly | - | This email will be shown as the contact email for support queries. |
| `ALLOWED_EMAILS` | Rallly | - | Comma-separated list of email addresses that are allowed to register and login (wildcards are supported) |
| `OIDC_CLIENT_ID` | Rallly | - | The client ID of your OIDC application |
| `SECRET_PASSWORD` | Rallly | (secret) | A random 32-character secret key used to encrypt user sessions. |
| `SMTP_TLS_ENABLED` | Rallly | true | Set to “true” if TLS is enabled for your SMTP connection |
| `OIDC_CLIENT_SECRET` | Rallly | (secret) | The client secret of your OIDC application |
| `OIDC_DISCOVERY_URL` | Rallly | - | URL of the '.well-known/openid-configuration' endpoint for your OIDC provider |
| `NEXT_PUBLIC_BASE_URL` | Rallly | - | The base url where this instance is accessible, including the scheme, the domain name, and optionally a port. |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_DSN` | Postgres | - | Public DSN |
| `DATABASE_URL` | Postgres | - | Public URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private Port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_DSN` | Postgres | - | Private DSN |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |

## Configuration

- **Start command:** `/bin/sh -c "sleep 3 && ./docker-start.sh"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/LjpcWZ)
