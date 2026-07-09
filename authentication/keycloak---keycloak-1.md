# Deploy keycloak on Railway

 Self-hosted Keycloak 26.x with PostgreSQL — deploy in minutes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/keycloak-1)

## About

Keycloak is an open-source identity and access management solution for modern apps and services. It supports OAuth 2.0, OpenID Connect, SAML 2.0, social login, user federation, and a centralized admin UI for users, roles, and clients.

Deploying Keycloak on Railway provisions a Keycloak 26.x instance alongside a sibling PostgreSQL database in a single project. Keycloak connects to postgres over Railway's private network (postgres.railway.internal). The template sets the official Keycloak 26.x env vars (KC_HOSTNAME, KC_BOOTSTRAP_ADMIN_PASSWORD, KC_DB_URL/USERNAME/PASSWORD, KC_PROXY=edge, KC_HTTP_ENABLED, KC_PROXY_HEADERS), generates a secure admin password on first deploy, and uses TLS termination at the Railway edge. Persistent storage uses a Railway volume mounted at the parent path /var/lib/postgresql, which keeps the ext4 lost+found/ directory outside the PGDATA subpath and avoids the common first-deploy initdb crash.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:16-alpine` | Database |
| keycloak | [INAPP-Mobile/keycloak](https://github.com/INAPP-Mobile/keycloak) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | keycloak | Default database Keycloak connects to on first run. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL superuser name. Must match KC_DB_USERNAME on the Keycloak service. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL superuser password. Must match KC_DB_PASSWORD on the Keycloak service. Change both at once if updating. |
| `KC_PROXY` | keycloak | edge | Proxy mode: edge (Railway terminates TLS), passthrough, or reencrypt. |
| `KC_DB_URL` | keycloak | jdbc:postgresql://postgres.railway.internal:5432/keycloak | PostgreSQL JDBC URL. Points at the sibling postgres service on the Railway private network. Username and password are read separately from KC_DB_USERNAME and KC_DB_PASSWORD env vars (do NOT embed them in the URL). |
| `KC_HOSTNAME` | keycloak | - | Public URL Keycloak generates links with (Keycloak 26.x: KC_HOSTNAME). Defaults to https://<railway-domain>. Railway terminates TLS, so always include the https:// prefix. |
| `KC_LOG_LEVEL` | keycloak | info | Log level: info, debug, trace, warn, error, or fatal. |
| `KC_DB_PASSWORD` | keycloak | (secret) | PostgreSQL password. Must match POSTGRES_PASSWORD on the sibling postgres service. Change both at once if updating. |
| `KC_DB_USERNAME` | keycloak | (secret) | PostgreSQL username. Must match POSTGRES_USER on the sibling postgres service. |
| `KC_HTTP_ENABLED` | keycloak | true | Enable plain HTTP listener. Required when KC_PROXY=edge so Keycloak can serve HTTP and rely on Railway for TLS termination. |
| `KC_PROXY_HEADERS` | keycloak | xforwarded | Proxy headers handling (Keycloak 26.x: KC_PROXY_HEADERS). Set to 'xforwarded' when behind a reverse proxy like Railway so Keycloak honors X-Forwarded-* headers (host, proto, port). |
| `KC_BOOTSTRAP_ADMIN_PASSWORD` | keycloak | (secret) | Initial admin password (Keycloak 26.x: KC_BOOTSTRAP_ADMIN_PASSWORD). Auto-generated on first deploy. After the admin user is created, changing this has no effect — use the Admin UI to rotate. |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication · **Languages:** HTML, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/keycloak-1)
