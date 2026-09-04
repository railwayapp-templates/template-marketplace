# Deploy Hanko on Railway

Passkey-first authentication server for your own applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hanko)

## About

Hanko is an open-source authentication server built around passkeys. It gives an application
sign-up, sign-in, email verification, password fallback, TOTP and security-key MFA, sessions and a
self-service account screen, behind a JSON API and two drop-in web components. Teams reach for it
when they want the developer experience of Auth0, Clerk or Stytch without handing user identities
to a third party — everything it stores lives in a PostgreSQL database you control.

Deploy Hanko on Railway and this template wires the production shape for you. A `gateway` service
running Caddy is the single public origin; behind it, `hanko` serves the flow API and a private
admin API, `elements` serves the `elements.js` web components and the frontend SDK, and
`quickstart` is upstream's example app with a working sign-in page and profile screen. `Postgres`
holds all persistent state, `Redis` holds flow locks and rate-limit counters, and `mailpit`
captures the passcodes Hanko emails during registration, so you can self-host Hanko end to end
before you have an SMTP relay. One origin matters: a passkey is bound to the hostname that created
it, so the gateway keeps credential, cookie and API in agreement.

![Hanko services and datastores on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788474633/hanko-architecture.png)

Hanko replaces the login half of an application. Your app never stores a password hash or runs a
WebAuthn ceremony; it renders Hanko's components, then validates the JWT Hanko issues against the
keys at `/.well-known/jwks.json`. Self-hosting fits when identities are regulated data, when
per-monthly-active-user pricing has grown large, or when the login screen must live on your
own domain.

- Passkey-first registration and login, with password and email passcode fallbacks
- MFA: TOTP apps, cross-platform security keys, per-device trust
- OAuth/OIDC social login, plus SAML for enterprise single sign-on
- Server-side sessions with revocation, limits and a custom JWT claim template
- Webhooks on user and email events, plus an admin API
- `` and `` components for React, Vue, Svelte or plain HTML

The Railway topology maps onto that directly. `hanko` runs the API and applies its migrations at
startup, `Postgres` is the system of record, and `Redis` gives every container one shared view of
rate limits plus a lock per authentication flow. `elements` is a static asset server, `quickstart`
is a replaceable reference app, and `gateway` routes all of them under one hostname.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elements | `ghcr.io/teamhanko/hanko/elements:latest` | Worker |
| hanko | [gridalpha/hanko-railway](https://github.com/gridalpha/hanko-railway) | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mailpit | `axllent/mailpit:latest` | Web service |
| quickstart | `ghcr.io/teamhanko/hanko/quickstart:latest` | Worker |
| Redis | `redis:8.2` | Database |
| gateway | [gridalpha/hanko-railway](https://github.com/gridalpha/hanko-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | elements | 80 | nginx listening port |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | elements | 1 | Size workers from the container quota |
| `PORT` | hanko | 8000 | Public API port, also the health-check port |
| `SECRET_KEYS` | hanko | (secret) | Encrypts stored JWKs, never change |
| `DATABASE_URL` | hanko | - | Postgres connection string |
| `SERVICE_NAME` | hanko | Hanko | Name used in outgoing mail |
| `FLOWLOCKER_STORE` | hanko | redis | Distributed flow locks |
| `CORS_ALLOW_ORIGINS` | hanko | - | Browser origins allowed to call the API |
| `FLOWLOCKER_ENABLED` | hanko | true | One writer per authentication flow |
| `RATE_LIMITER_STORE` | hanko | redis | Share limits across containers |
| `RATE_LIMITER_ENABLED` | hanko | true | Rate limit passcode and password attempts |
| `EMAIL_DELIVERY_ENABLED` | hanko | true | Send verification mail from Hanko |
| `EMAIL_DELIVERY_FROM_NAME` | hanko | Hanko | Sender display name |
| `EMAIL_DELIVERY_SMTP_HOST` | hanko | mailpit.railway.internal | SMTP host for passcode mail |
| `EMAIL_DELIVERY_SMTP_PORT` | hanko | 1025 | SMTP port for passcode mail |
| `FLOWLOCKER_REDIS_ADDRESS` | hanko | - | Redis host and port |
| `FLOWLOCKER_REDIS_PASSWORD` | hanko | (secret) | Redis password |
| `WEBAUTHN_RELYING_PARTY_ID` | hanko | - | Hostname passkeys bind to |
| `RATE_LIMITER_REDIS_ADDRESS` | hanko | - | Redis host and port |
| `EMAIL_DELIVERY_FROM_ADDRESS` | hanko | - | Sender address |
| `RATE_LIMITER_REDIS_PASSWORD` | hanko | (secret) | Redis password |
| `WEBAUTHN_RELYING_PARTY_ORIGINS` | hanko | - | Allowed WebAuthn origins |
| `WEBAUTHN_RELYING_PARTY_DISPLAY_NAME` | hanko | Hanko | Name shown by the authenticator |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | mailpit | 8025 | Inbox UI port |
| `MP_UI_AUTH` | mailpit | - | Basic auth for the inbox UI |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before pruning |
| `MP_UI_BIND_ADDR` | mailpit | 0.0.0.0:8025 | Inbox UI listener |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Private SMTP listener, dual stack |
| `PORT` | quickstart | 8080 | Example app listening port |
| `HANKO_URL` | quickstart | - | Browser-facing Hanko API URL |
| `HANKO_ELEMENT_URL` | quickstart | - | Web component bundle URL |
| `HANKO_URL_INTERNAL` | quickstart | - | Server-side session validation |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | gateway | 8080 | Caddy listening port |
| `APP_UPSTREAM` | gateway | quickstart.railway.internal:8080 | Your application, demo by default |
| `HANKO_UPSTREAM` | gateway | hanko.railway.internal:8000 | Hanko public API upstream |
| `ELEMENTS_UPSTREAM` | gateway | elements.railway.internal:80 | Web component asset upstream |

## Configuration

- **Healthcheck:** `/`
- **Healthcheck:** `/health/ready`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Healthcheck:** `/healthz`

**Category:** Authentication · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/hanko)
