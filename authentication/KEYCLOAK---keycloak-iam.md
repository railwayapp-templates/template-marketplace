# Deploy KEYCLOAK on Railway

Auth0 Alternative. Open-source SSO, OIDC and SAML identity server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak-iam)

## About

Keycloak is the open-source identity and access management server built at Red Hat, now a CNCF project. Self-host Keycloak and your applications get single sign-on, OAuth 2.0, OpenID Connect and SAML 2.0 from one place instead of hand-rolled password resets and token endpoints. One server hosts many isolated *realms* with their own users, roles, themes and clients, federates against LDAP and Active Directory, and brokers social logins.

Deploy Keycloak on Railway and two services come up: the official `quay.io/keycloak/keycloak:26.7.1` image and managed PostgreSQL on the private network. Railway terminates TLS at the edge, so `KC_HTTP_ENABLED=true`, `KC_PROXY_HEADERS=xforwarded` and `KC_PROXY_TRUSTED_ADDRESSES=100.64.0.0/10,fd00::/8` are what make tokens carry `https://` URLs and login events record real client IPs. Keycloak 25+ serves health on management port 9000, so `PORT=9000` aims the health check at `/health/ready` while the domain targets 8080 — keeping `/health` off your public URL. All data lives in Postgres, so Keycloak needs no volume.

![Keycloak Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786643130/7e4ea8cd-a6e2-464f-b5cf-2edd2ab214e1.png)

Teams self-host Keycloak when authentication is not something they want to rent: credentials, sessions and audit trails stay in a database you control, per-active-user pricing disappears, and nothing caps realms or clients. Where lighter tools cover OIDC alone, Keycloak adds SAML 2.0 and LDAP/AD federation.

Key features:

- Single sign-on and single logout across every connected app
- OIDC, OAuth 2.0 and SAML 2.0 from one standards-compliant token service
- Multi-realm tenancy: isolated users, roles, themes and policies
- Identity brokering, social login, LDAP/AD federation
- MFA with OTP and WebAuthn passkeys, plus conditional auth flows

PostgreSQL is the system of record for realms, users, clients, keys and sessions, so back up the database, not a volume. Clustering defaults to Infinispan with the `jdbc-ping` stack, so extra replicas find each other through that same database — no multicast, no extra ports.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| keycloak | `quay.io/keycloak/keycloak:26.7.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database name |
| `DATABASE_URL` | Postgres | - | Private connection URL |
| `POSTGRES_USER` | Postgres | (secret) | Default database role |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database role password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection URL |
| `PORT` | keycloak | 9000 | Railway health-check target port |
| `KC_DB` | keycloak | postgres | Database vendor, build-time option |
| `KC_DB_URL` | keycloak | - | Private JDBC connection URL |
| `KC_HOSTNAME` | keycloak | - | Full public URL, set before first boot |
| `KC_DB_PASSWORD` | keycloak | (secret) | Database role password |
| `KC_DB_USERNAME` | keycloak | (secret) | Database role name |
| `KC_HTTP_ENABLED` | keycloak | true | Accept HTTP behind Railway's TLS edge |
| `JAVA_OPTS_APPEND` | keycloak | -XX:MaxRAMPercentage=70 | JVM heap ceiling in the container |
| `KC_PROXY_HEADERS` | keycloak | xforwarded | Trust X-Forwarded-* from the edge |
| `KC_HEALTH_ENABLED` | keycloak | true | Enable /health on port 9000 |
| `KC_METRICS_ENABLED` | keycloak | true | Enable /metrics on port 9000 |
| `KC_DB_POOL_MAX_SIZE` | keycloak | 20 | Connection cap, protects max_connections |
| `KC_DB_POOL_MIN_SIZE` | keycloak | 2 | Idle connection floor |
| `KC_LOG_CONSOLE_COLOR` | keycloak | false | Plain-text logs for Railway |
| `KC_DB_POOL_INITIAL_SIZE` | keycloak | 2 | Connections opened at startup |
| `KC_PROXY_TRUSTED_ADDRESSES` | keycloak | 100.64.0.0/10,fd00::/8 | Railway edge address ranges |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | keycloak | (secret) | Temporary first admin password |
| `KC_BOOTSTRAP_ADMIN_USERNAME` | keycloak | (secret) | Temporary first admin username |
| `KC_HTTP_MAX_QUEUED_REQUESTS` | keycloak | 1000 | Shed excess load with 503s |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/opt/keycloak/bin/kc.sh start`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/keycloak-iam)
