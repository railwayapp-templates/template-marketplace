# Deploy Pomerium on Railway

Identity-aware proxy that puts SSO in front of any web app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pomerium)

## About

Pomerium is an open-source identity-aware reverse proxy. Rather than putting applications behind a VPN or bolting a login screen onto each, you put Pomerium in front: every request is authenticated against an identity provider, then authorised against a policy you write, before it reaches the application. Teams use it to publish internal dashboards, admin panels and legacy apps to the internet without giving any of them a user database. Self-host Pomerium and the sessions, the policy engine and TLS termination stay on infrastructure you control.

This template deploys Pomerium as five services already wired together. `pomerium` is the gateway: it runs the proxy, authorize and databroker roles and owns the URL your users visit. `authenticate` runs Pomerium's login hop on its own domain, because the browser is redirected there for the OIDC exchange. `dex` is a bundled CNCF identity provider, so the template works the moment it deploys instead of asking you to register an OAuth client first. `verify` is a demo app that renders the identity Pomerium forwarded to it, and `Postgres` holds session state and Dex's storage. You supply an admin email and password; every shared secret is generated at boot.

![Pomerium gateway, authenticate, Dex, verify and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789510877/pomerium-architecture.webp)

Pomerium replaces perimeter access control with per-request authorisation. A VPN decides once, at connection time, that a device is inside the network; Pomerium decides on every HTTP request, from the user's identity, their groups and the route's policy. The application behind it stays private and needs no auth code.

- **Per-route policy** in Pomerium Policy Language — by email, domain, group or claim
- **Any OIDC provider** — Google Workspace, Okta, Entra ID, Auth0, Keycloak, or the bundled Dex
- **Signed identity forwarding** — a verifiable JWT plus `X-Pomerium-Claim-*` headers for apps that do header SSO
- **A self-service dashboard** at `/.pomerium/` showing session, devices and routes
- **WebSocket and streaming support**, so proxied dev tools and dashboards work

Pomerium's four internal roles can run in one process or split across several. This template splits them because the login hop and the gateway each need their own hostname: `authenticate` handles the redirect to and from the identity provider, while `pomerium` runs the proxy, the authorize service and the databroker. The two talk over private gRPC.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pomerium | [gridalpha/pomerium-railway](https://github.com/gridalpha/pomerium-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| dex | [gridalpha/pomerium-railway](https://github.com/gridalpha/pomerium-railway) | Web service |
| authenticate | [gridalpha/pomerium-railway](https://github.com/gridalpha/pomerium-railway) | Web service |
| verify | `pomerium/verify:latest` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | pomerium | 8080 | HTTP port Railway probes and routes |
| `GRPC_URL` | pomerium | http://pomerium.railway.internal:5443 | Private gRPC address for peers |
| `SERVICES` | pomerium | proxy,authorize,databroker | Pomerium roles this service runs |
| `LOG_LEVEL` | pomerium | info | Log verbosity |
| `ADMIN_EMAIL` | pomerium | admin@example.com | First account and default allow-list |
| `SECRET_SEED` | pomerium | (secret) | Seed every shared secret derives from |
| `IDP_PROVIDER` | pomerium | oidc | Generic OpenID Connect provider |
| `UPSTREAM_URL` | pomerium | - | Application the gateway proxies to |
| `COOKIE_SECRET` | pomerium | (secret) | Override the derived session cookie key |
| `IDP_CLIENT_ID` | pomerium | pomerium | OAuth client id registered in Dex |
| `SHARED_SECRET` | pomerium | (secret) | Override the derived inter-service secret |
| `ALLOWED_EMAILS` | pomerium | - | Extra allowed addresses; defaults to ADMIN_EMAIL |
| `UPSTREAM_2_URL` | pomerium | - | Optional second upstream |
| `UPSTREAM_3_URL` | pomerium | - | Optional third upstream |
| `ALLOWED_DOMAINS` | pomerium | - | Comma-separated domains allowed through |
| `INSECURE_SERVER` | pomerium | true | Railway's edge terminates TLS |
| `IDP_PROVIDER_URL` | pomerium | - | Issuer URL of the identity provider |
| `IDP_CLIENT_SECRET` | pomerium | (secret) | Override the derived OAuth client secret |
| `UPSTREAM_2_PREFIX` | pomerium | - | Path prefix for the second upstream |
| `UPSTREAM_3_PREFIX` | pomerium | - | Path prefix for the third upstream |
| `POMERIUM_PUBLIC_URL` | pomerium | - | Override the gateway's own base URL |
| `XFF_NUM_TRUSTED_HOPS` | pomerium | - | Proxy hops Pomerium trusts in X-Forwarded-For |
| `DATABROKER_STORAGE_TYPE` | pomerium | postgres | Session storage backend |
| `AUTHENTICATE_SERVICE_URL` | pomerium | - | Public login hop URL |
| `DATABROKER_STORAGE_CONNECTION_STRING` | pomerium | - | Postgres connection string |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | dex | 8080 | HTTP port Railway probes and routes |
| `ADMIN_EMAIL` | dex | - | Email of the single static account |
| `DEX_DB_HOST` | dex | - | Postgres host |
| `DEX_DB_NAME` | dex | - | Postgres database |
| `DEX_DB_PORT` | dex | - | Postgres port |
| `DEX_DB_USER` | dex | (secret) | Postgres user |
| `SECRET_SEED` | dex | (secret) | Shared seed, defined on the gateway |
| `DEX_CLIENT_ID` | dex | pomerium | OAuth client id Pomerium uses |
| `ADMIN_PASSWORD` | dex | (secret) | Password for that account, bcrypt hashed at boot |
| `ADMIN_USERNAME` | dex | (secret) | Display name on the account |
| `DEX_DB_SSLMODE` | dex | require | TLS mode for the database connection |
| `DEX_ISSUER_URL` | dex | - | Override Dex's own issuer URL |
| `DEX_DB_PASSWORD` | dex | (secret) | Postgres password |
| `DEX_CLIENT_SECRET` | dex | (secret) | Override the derived OAuth client secret |
| `AUTHENTICATE_SERVICE_URL` | dex | - | Builds the OAuth redirect URI |
| `PORT` | authenticate | 8080 | HTTP port Railway probes and routes |
| `SERVICES` | authenticate | authenticate | Pomerium role this service runs |
| `LOG_LEVEL` | authenticate | info | Log verbosity |
| `ADMIN_EMAIL` | authenticate | - | Shared admin address |
| `SECRET_SEED` | authenticate | (secret) | Shared seed, defined on the gateway |
| `IDP_PROVIDER` | authenticate | oidc | Generic OpenID Connect provider |
| `COOKIE_SECRET` | authenticate | (secret) | Override the derived session cookie key |
| `IDP_CLIENT_ID` | authenticate | pomerium | OAuth client id registered in Dex |
| `SHARED_SECRET` | authenticate | (secret) | Override the derived inter-service secret |
| `INSECURE_SERVER` | authenticate | true | Railway's edge terminates TLS |
| `IDP_PROVIDER_URL` | authenticate | - | Issuer URL of the identity provider |
| `IDP_CLIENT_SECRET` | authenticate | (secret) | Override the derived OAuth client secret |
| `AUTHORIZE_SERVICE_URL` | authenticate | - | Required in split-service mode |
| `DATABROKER_SERVICE_URL` | authenticate | - | Required in split-service mode |
| `AUTHENTICATE_SERVICE_URL` | authenticate | - | This service's own public URL |
| `PORT` | verify | 8000 | HTTP port the demo app binds |
| `PRIVATE_URL` | verify | http://verify.railway.internal:8000 | Private address the gateway proxies to |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/pomerium)
