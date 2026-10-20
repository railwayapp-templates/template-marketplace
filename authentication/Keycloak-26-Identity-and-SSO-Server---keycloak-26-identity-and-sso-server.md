# Deploy Keycloak 26 Identity and SSO Server on Railway

Single sign-on, OAuth2/OIDC and SAML for your apps, backed by Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak-26-identity-and-sso-server)

## About

Keycloak is an open-source identity and access management server: single sign-on, OAuth 2.0 / OpenID Connect and SAML 2.0 for your applications, with user federation, social login and multi-factor authentication. This community template runs Keycloak 26 on Railway with Postgres, an optimized server build and a generated admin password.

Keycloak is a Java (Quarkus) server that keeps realms, users, clients and sessions in a relational database. In production it needs a fixed public hostname, TLS in front of it, correct proxy headers, a health endpoint for the platform and a JVM sized to its container. This template builds an optimized image (`kc.sh build` with Postgres, health and metrics), starts it with `start --optimized`, sets the hostname from Railway's public domain, trusts Railway's edge proxy headers, and creates the first admin from a generated password, so no setup page is ever exposed. An entrypoint sizes the heap and CPU count from the container limits instead of the host.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Keycloak | [baranberkay96/keycloak-railway](https://github.com/baranberkay96/keycloak-railway) (branch: main) (root: /services/keycloak) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB. |
| `PORT` | Keycloak | 8080 | Port Keycloak's HTTP listener uses; Railway routes the public domain and its healthcheck here. |
| `KC_DB` | Keycloak | postgres | Database vendor. Build-time option, baked into the optimized image; keep it postgres. |
| `KC_CACHE` | Keycloak | local | local = single-node caches (one replica). Set ispn before raising replicas so nodes form a JGroups cluster via the database (jdbc-ping). |
| `KC_HOSTNAME` | Keycloak | - | Public base URL used in tokens (issuer) and redirects. Change it when you add a custom domain. |
| `JVM_MAX_CPUS` | Keycloak | 4 | CPU count reported to the JVM (sizes GC and HTTP thread pools). Lowered automatically if the container has a smaller CPU quota. |
| `KC_HTTP_HOST` | Keycloak | :: | Bind address. :: is dual-stack (IPv4 and IPv6), so private-network callers reach Keycloak in every Railway environment. |
| `KC_HTTP_PORT` | Keycloak | - | HTTP port, kept equal to PORT. |
| `KC_LOG_LEVEL` | Keycloak | info | Root log level (e.g. info, debug, or info,org.keycloak.events:debug). |
| `KC_DB_PASSWORD` | Keycloak | (secret) | Postgres password (generated on the Postgres service). |
| `KC_DB_URL_HOST` | Keycloak | - | Postgres host on the private network. |
| `KC_DB_URL_PORT` | Keycloak | - | Postgres port. |
| `KC_DB_USERNAME` | Keycloak | (secret) | Postgres user. |
| `DB_WAIT_SECONDS` | Keycloak | 600 | How long the entrypoint waits for Postgres to accept connections before starting Keycloak (0 = do not wait). |
| `JVM_HEAP_MAX_MB` | Keycloak | 1024 | Upper bound for the JVM heap in MB. The entrypoint uses the smaller of this, 70% of the container memory limit, and the limit minus 384 MB. |
| `KC_HTTP_ENABLED` | Keycloak | true | Plain HTTP listener behind Railway's TLS-terminating edge. |
| `JVM_HEAP_PERCENT` | Keycloak | 70 | Share of the container memory limit the heap may use (Keycloak's own default ratio), capped by JVM_HEAP_MAX_MB. |
| `KC_PROXY_HEADERS` | Keycloak | xforwarded | Trust X-Forwarded-* headers from Railway's edge proxy, which terminates TLS. |
| `KEYCLOAK_VERSION` | Keycloak | 26.8.1 | quay.io/keycloak/keycloak tag the image is built from (build argument). Change it to upgrade; back up Postgres first. |
| `KC_DB_URL_DATABASE` | Keycloak | - | Postgres database name. |
| `KC_DB_POOL_MAX_SIZE` | Keycloak | 20 | Maximum database connections per Keycloak replica (upstream default 100; Postgres allows 100 in total). |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | Keycloak | (secret) | Password of that temporary admin (generated). Sign in with it, create a permanent admin, then delete the temporary one. |
| `KC_BOOTSTRAP_ADMIN_USERNAME` | Keycloak | (secret) | Username of the temporary admin created in the master realm on first start. Changing it later has no effect. |
| `KC_HOSTNAME_BACKCHANNEL_DYNAMIC` | Keycloak | true | Lets apps in this project call Keycloak over the private network (http://keycloak.railway.internal:8080) for token, JWKS and introspection requests. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health/ready`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Tags:** keycloak, sso, oidc, oauth2, saml · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/keycloak-26-identity-and-sso-server)
