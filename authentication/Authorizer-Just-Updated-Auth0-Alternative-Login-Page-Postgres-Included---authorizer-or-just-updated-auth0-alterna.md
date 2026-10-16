# Deploy Authorizer | (Just Updated) Auth0 Alternative, Login Page + Postgres Included on Railway

Auth0 alternative: login page, admin dashboard and Postgres included

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authorizer-or-just-updated-auth0-alterna)

## About

Authorizer is an open-source authentication and authorization server: sign-up and login with email and password, a hosted login page, JWT sessions, social login, a GraphQL API and an OpenID Connect discovery document. This template deploys it together with its own Postgres database, with every secret generated for you.

The template starts two services: `authorizer` (the server, public HTTPS domain) and `postgres` (private, on a persistent volume). Authorizer v2 is configured only through command-line flags, so the start command builds the full flag set from environment variables at boot: public URL, allowed origin, client ID and secret, admin secret, JWT secret, encryption key and the database URL. All of these are generated per deploy as Railway secrets, so nothing has to be filled in before you click Deploy.

After the deploy turns green:

- `/app` is the hosted login and sign-up page.
- `/dashboard` is the admin dashboard. Sign in with the `ADMIN_SECRET` variable of the `authorizer` service.
- `/graphql` is the GraphQL API your applications call.
- `/.well-known/openid-configuration` is the OIDC discovery document.
- `/health` is the health endpoint Railway checks.

Multi-factor authentication is switched off with the `--disable-mfa` flag, because Authorizer v2 enforces MFA setup by default and a plain email and password login would otherwise never return a token. To turn it back on, remove `--disable-mfa` from the start command of the `authorizer` service and redeploy.

User accounts live in Postgres on a volume mounted at `/var/lib/postgresql`, so they survive redeploys and restarts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:18.6@sha256:74935e72241653ca55e0414067e6d8763aceb8a810eb51b452253ec3dcfc4336` | Database |
| authorizer | `lakhansamani/authorizer:2.4.2@sha256:7c87f8c4c39bdb245addf63f3f74dc2139d1129421900365ca2e645979532709` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `JWT_SECRET` | authorizer | (secret) |
| `ADMIN_SECRET` | authorizer | (secret) |
| `CLIENT_SECRET` | authorizer | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'exec ./authorizer --url="https://$RAILWAY_PUBLIC_DOMAIN" --allowed-origins="https://$RAILWAY_PUBLIC_DOMAIN" --client-id="$CLIENT_ID" --client-secret="$CLIENT_SECRET" --admin-secret="$ADMIN_SECRET" --jwt-type=HS256 --jwt-secret="$JWT_SECRET" --encryption-key="$ENCRYPTION_KEY" --database-type=postgres --database-url="$DATABASE_URL" --env=production --log-level=info --disable-mfa --http-port="${PORT:-8080}"'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/authorizer-or-just-updated-auth0-alterna)
