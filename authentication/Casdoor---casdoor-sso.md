# Deploy Casdoor on Railway

Single sign-on server that manages logins for your apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/casdoor-sso)

## About

Casdoor is an open-source, UI-first identity and access management platform from the Casbin team — a full single sign-on server speaking OAuth 2.0, OIDC, SAML, CAS, LDAP, SCIM, WebAuthn, TOTP and RADIUS, driven by an admin console rather than the XML and realm files older identity servers expect. Built on Casbin, it also carries a real authorization engine, so RBAC, ABAC and ACL policies live beside the accounts they apply to. Teams reach for it when several internal apps need one login, when a SaaS product needs multi-tenant sign-up without renting an identity vendor, and when LLM tools and MCP servers need an auth server in front of them.

Self-host Casdoor on Railway and this template gives you the production shape, not the quickstart one. Three services are wired together: the Casdoor server, serving the JSON API and bundled React admin UI on one public domain; a PostgreSQL database holding every object Casdoor owns — users, organizations, applications, signing certificates, tokens and Casbin rules; and Redis holding login sessions. A volume is attached for uploads. Nothing is left to fill in: the first administrator password is generated at deploy time, the JWT signing certificate is minted on first boot, and self-service sign-up is closed by default.

![Casdoor with its Postgres database and Redis session store on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787782905/casdoor-architecture.png)

Casdoor replaces the half-finished login code most projects accumulate: instead of every application building its own password reset, MFA prompt and social login, they delegate to one server that owns the accounts. Self-host it when user records cannot leave your infrastructure, when per-user identity pricing stops making sense, or when authorization rules belong next to the directory.

Key features:

- OAuth 2.0, OIDC, SAML 2.0, CAS, LDAP and SCIM from a single server
- WebAuthn, TOTP, email and SMS multi-factor authentication
- Dozens of social and enterprise identity providers, from Google Workspace and Azure AD to GitHub and WeChat
- Casbin RBAC, ABAC and ACL permission models with a policy editor
- Multi-tenant organizations, groups, roles and invitations
- SDKs for Go, Java, Python, Node.js, PHP and .NET

The architecture is deliberately plain. The Casdoor service is a single Go binary that also serves the compiled React console, so there is no separate frontend to route, and it migrates its own schema on boot. Redis is not decoration — without it Casdoor writes sessions to the container filesystem, so everyone is signed out on every redeploy and the service cannot scale past one replica. The volume backs Casdoor's local file storage provider.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| casdoor | [gridalpha/casdoor-railway](https://github.com/gridalpha/casdoor-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | casdoor | 8000 | Port Railway health-checks |
| `httpport` | casdoor | 8000 | Port the server binds |
| `logConfig` | casdoor | {"adapter":"console"} | Send logs to stdout |
| `driverName` | casdoor | postgres | Database driver Casdoor uses |
| `radiusSecret` | casdoor | (secret) | RADIUS shared secret |
| `redisEndpoint` | casdoor | - | Session store host,db,password |
| `dataSourceName` | casdoor | - | Postgres connection string |
| `ldapServerPort` | casdoor | 0 | LDAP listener, 0 disables |
| `enableErrorMask` | casdoor | true | Mask internal error detail |
| `ldapsServerPort` | casdoor | 0 | LDAPS listener, 0 disables |
| `CASDOOR_ADMIN_EMAIL` | casdoor | admin@example.com | First-boot admin email |
| `CASDOOR_ADMIN_PASSWORD` | casdoor | (secret) | First-boot admin password |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/files`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/casdoor-sso)
