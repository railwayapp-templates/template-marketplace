# Deploy Authorizer | Self-Hosted Auth with Postgres, Zero Setup Questions on Railway

Self-host Authorizer on Railway: keys generated, nothing to fill in first

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/authorizer-or-self-1)

## About

Authorizer is a self-hosted authentication server: email and password sign-in, social logins, JWT issuing, roles, and a web dashboard to manage users - running on your own Postgres.

This template deploys Authorizer with every secret generated for you, so the deploy form asks for nothing.

That is the difference worth knowing. The Authorizer template most people find declares seven variables with empty values - JWT_TYPE, JWT_SECRET, JWT_PUBLIC_KEY, JWT_PRIVATE_KEY, CLIENT_ID, CLIENT_SECRET and ADMIN_SECRET - and Railway turns every empty value into a required field. Before the Deploy button will even light up you are expected to generate an RSA key pair by hand and paste both halves into a web form. Three quarters of the deployments from it never come up.

Here the token type is HS256, which needs a single symmetric secret rather than a key pair, and every secret is generated at deploy time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| Authorizer | `lakhansamani/authorizer:2.2.1` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_DB` | Postgres | authorizer |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `ENV` | Authorizer | production |
| `PORT` | Authorizer | 8080 |
| `JWT_TYPE` | Authorizer | HS256 |
| `JWT_SECRET` | Authorizer | (secret) |
| `ADMIN_SECRET` | Authorizer | (secret) |
| `CLIENT_SECRET` | Authorizer | (secret) |
| `DATABASE_TYPE` | Authorizer | postgres |
| `DISABLE_PLAYGROUND` | Authorizer | true |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "exec ./authorizer --admin-secret \"$ADMIN_SECRET\" --database-type postgres --database-url \"$DATABASE_URL\" --env production --jwt-type HS256 --jwt-secret \"$JWT_SECRET\" --client-id \"$CLIENT_ID\" --client-secret \"$CLIENT_SECRET\" --allowed-origins \"$AUTHORIZER_URL\""`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/authorizer-or-self-1)
