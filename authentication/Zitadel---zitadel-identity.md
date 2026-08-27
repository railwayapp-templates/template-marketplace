# Deploy Zitadel on Railway

Identity provider for logins, single sign-on and user accounts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/zitadel-identity)

## About

Zitadel is an open-source identity and access management platform: it gives your applications OpenID Connect, OAuth 2, SAML 2, passkeys, multi-factor authentication and an audit trail of every identity event. Written in Go and backed entirely by PostgreSQL, it is built around organizations rather than one flat user directory, so a single instance serves several tenants with their own users, branding and login policies. Teams self-host Zitadel when per-active-user bills scale with signups, when the user database must stay in their own infrastructure, or when a B2B product needs per-customer isolation.

Deploy Zitadel on Railway and the whole v4 stack arrives pre-wired. The main service runs the API, the console and the Login V2 interface behind an internal Caddy router that sends `/ui/v2/login` to the Next.js login app and everything else — discovery documents, token endpoints, SAML metadata, gRPC-web and Connect-RPC — to the Go API over HTTP/2 cleartext. Managed PostgreSQL holds the event store, and Mailpit catches verification, invitation and password-reset mail privately, so notifications work as soon as the deploy finishes.

![Diagram of the Zitadel, Postgres and Mailpit services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787692680/zitadel-architecture.png)

Zitadel replaces the identity layer you would otherwise buy. It issues and validates tokens, stores users and credentials, enforces login and password policies, federates to external providers, and exposes all of it through REST and gRPC APIs plus a Terraform provider. Every change is stored as an event, so the instance keeps a queryable history of who changed what.

Key features:

- OpenID Connect, OAuth 2 and SAML 2 in one instance, with a login UI branded per organization
- Passkeys, TOTP, OTP over email or SMS, and enforced multi-factor policies
- Multi-tenant organizations with isolated users, domains, roles and settings
- Google, GitHub, GitLab, Microsoft, Apple, generic OIDC, JWT and LDAP federation
- Project roles and project grants for authorization, not just authentication
- Actions and webhooks for customizing tokens and reacting to identity events

The Zitadel service is the whole application — API, console and login UI in one container, fronted by Caddy because Railway routes by hostname while the login interface lives on a URL path. PostgreSQL is the only durable store, and Zitadel creates its own database and scoped role on first boot rather than running as the superuser. Mailpit accepts SMTP privately and shows captured mail in a web inbox.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| zitadel | [gridalpha/zitadel-railway](https://github.com/gridalpha/zitadel-railway) | Web service |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | zitadel | 8000 | Caddy listener Railway routes to |
| `ZITADEL_MASTERKEY` | zitadel | - | At-rest secret encryption key |
| `ZITADEL_ADMIN_EMAIL` | zitadel | - | First admin email address |
| `ZITADEL_EXTERNALPORT` | zitadel | 443 | Public port behind Railway TLS |
| `ZITADEL_ADMIN_PASSWORD` | zitadel | (secret) | First admin password, meets complexity policy |
| `ZITADEL_ADMIN_USERNAME` | zitadel | (secret) | First instance administrator |
| `ZITADEL_EXTERNALDOMAIN` | zitadel | - | Public hostname users visit |
| `ZITADEL_EXTERNALSECURE` | zitadel | true | Public URLs use HTTPS |
| `ZITADEL_DATABASE_POSTGRES_HOST` | zitadel | - | Private database hostname |
| `ZITADEL_DATABASE_POSTGRES_PORT` | zitadel | 5432 | Database port |
| `ZITADEL_DATABASE_POSTGRES_DATABASE` | zitadel | zitadel | Database created on first boot |
| `ZITADEL_DATABASE_POSTGRES_USER_PASSWORD` | zitadel | (secret) | Scoped role password |
| `ZITADEL_DATABASE_POSTGRES_USER_SSL_MODE` | zitadel | disable | Private network, no TLS needed |
| `ZITADEL_DATABASE_POSTGRES_USER_USERNAME` | zitadel | (secret) | Scoped application role |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_PASSWORD` | zitadel | (secret) | Bootstrap superuser password |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_SSL_MODE` | zitadel | disable | Private network, no TLS needed |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_USERNAME` | zitadel | (secret) | Superuser used only to bootstrap |
| `ZITADEL_DEFAULTINSTANCE_SMTPCONFIGURATION_FROM` | zitadel | - | Notification sender address |
| `ZITADEL_DATABASE_POSTGRES_ADMIN_EXISTINGDATABASE` | zitadel | - | Database to connect to first |
| `ZITADEL_DEFAULTINSTANCE_SMTPCONFIGURATION_FROMNAME` | zitadel | ZITADEL | Notification sender display name |
| `ZITADEL_DEFAULTINSTANCE_SMTPCONFIGURATION_SMTP_HOST` | zitadel | - | Notification mail host and port |
| `TZ` | mailpit | UTC | Timestamp timezone |
| `PORT` | mailpit | 8025 | Web inbox port Railway routes to |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the web inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Web inbox bind address |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Private SMTP bind address |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zitadel/bootstrap`
- **Volume:** `/data`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/zitadel-identity)
