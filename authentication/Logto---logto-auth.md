# Deploy Logto on Railway

Open-source identity provider with hosted sign-in, SSO, RBAC and MFA

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/logto-auth)

## About

Logto is an open-source identity provider that gives your product a complete sign-in stack: an OIDC and OAuth 2.1 authorization server, a hosted sign-in and registration experience, passwordless and social login, multi-factor auth, role-based access control, enterprise SSO, and organizations for B2B tenants. Teams reach for it when a homegrown session table has stopped scaling but a per-monthly-active-user bill is not acceptable. Official SDKs cover React, Next.js, Vue, Swift, Kotlin, Go, Python and .NET.

Self-host Logto on Railway and this template wires it up for you. It runs the official `svhd/logto` image twice — as the public auth endpoint that issues tokens and serves the sign-in pages, and as the admin console on its own domain, because Logto identifies the admin tenant by hostname and the two cannot share an origin. Both containers use a managed Postgres holding every user, application, signing key and session, plus a managed Redis backing Logto's configuration cache. Deploy Logto on Railway and you get both public URLs, a seeded database and a working OIDC discovery document in minutes.

![Diagram of the Logto, Admin Console, Postgres and Redis services](https://res.cloudinary.com/rroe4rtk/image/upload/v1787447902/logto-architecture.png)

Logto is a customer identity and access management platform under the MPL-2.0 licence, developed in the open at [github.com/logto-io/logto](https://github.com/logto-io/logto). Self-hosting means your user table, password hashes and token signing keys stay in a database you control, and your login screens sit on your own domain. It suits consumer apps wanting a polished sign-in flow, and B2B SaaS needing per-organization roles and enterprise SSO.

Key capabilities:

- OIDC and OAuth 2.1 server with PKCE, refresh tokens and JWKS rotation
- Hosted, brandable sign-in, registration and account pages
- Passwordless email and SMS codes, social connectors, passkeys and TOTP MFA
- Role-based access control over API resources, plus organizations
- SAML and OIDC enterprise SSO, machine-to-machine apps, webhooks, audit logs
- A full Management API, so everything the console does can be scripted

**Logto** is the auth endpoint: it hosts `/oidc`, the sign-in experience and the Management API, and is the URL your SDK points at. **Logto Admin Console** runs the same image on a second domain, signing administrators in against a separate internal tenant and then calling the auth service's Management API. **Postgres** holds schema, OIDC private keys, sessions, users and logs, which is why sessions survive a redeploy. **Redis** keeps the two containers' configuration caches consistent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Logto | `svhd/logto:latest` | Web service |
| Redis | `redis:8.2` | Database |
| Logto Admin Console | `svhd/logto:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | Logto | 3001 | Auth endpoint listening port |
| `DB_URL` | Logto | - | Postgres connection string |
| `ENDPOINT` | Logto | - | Public auth URL and OIDC issuer |
| `REDIS_URL` | Logto | - | Shared configuration cache |
| `NODE_OPTIONS` | Logto | --max-old-space-size=2048 | Node heap ceiling for the container |
| `ADMIN_ENDPOINT` | Logto | - | Console URL, allowed CORS origin |
| `SECRET_VAULT_KEK` | Logto | (secret) | Base64 32-byte secret vault key |
| `DATABASE_POOL_SIZE` | Logto | 10 | Postgres connections per tenant |
| `TRUST_PROXY_HEADER` | Logto | 1 | Honour X-Forwarded-* from the edge |
| `ADMIN_DISABLE_LOCALHOST` | Logto | 1 | Never open the console port here |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | Logto Admin Console | 3001 | Auth listener, used by the health check |
| `DB_URL` | Logto Admin Console | - | Postgres connection string |
| `ENDPOINT` | Logto Admin Console | - | Public auth URL and OIDC issuer |
| `REDIS_URL` | Logto Admin Console | - | Shared configuration cache |
| `ADMIN_PORT` | Logto Admin Console | 3002 | Console listener, served publicly |
| `NODE_OPTIONS` | Logto Admin Console | --max-old-space-size=2048 | Node heap ceiling for the container |
| `ADMIN_ENDPOINT` | Logto Admin Console | - | Public admin console URL |
| `LOGTO_CORE_HOST` | Logto Admin Console | - | Waited on before startup |
| `SECRET_VAULT_KEK` | Logto Admin Console | (secret) | Must match the auth service |
| `DATABASE_POOL_SIZE` | Logto Admin Console | 10 | Postgres connections per tenant |
| `TRUST_PROXY_HEADER` | Logto Admin Console | 1 | Honour X-Forwarded-* from the edge |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'for i in $(seq 1 30); do npm run cli db seed -- --swe && break; echo "logto: seed attempt $i failed, retrying"; sleep 5; done; npm run alteration deploy latest; exec npm run start'`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'H="$LOGTO_CORE_HOST"; case "$H" in ""|:*) H=logto.railway.internal:3001;; esac; for i in $(seq 1 60); do node -e "fetch(process.argv[1]).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" "http://$H/api/status" && break; echo "logto-admin: waiting for core at $H ($i)"; sleep 5; done; npm run alteration deploy latest; exec npm run start'`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/logto-auth)
