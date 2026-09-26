# Deploy LLDAP on Railway

LLDAP 0.6: light LDAP server for user management, with a web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lldap)

## About

LLDAP is a light LDAP server built for managing users and groups, not for general-purpose directory use. It comes with a friendly web interface and a GraphQL API, and many self-hosted apps can log users in against it, including Nextcloud, Gitea, Jellyfin, Authelia, Grafana and Keycloak.

This template runs the official `lldap/lldap:v0.6.3` image as one service with SQLite on a Railway volume. The web interface is public and protected by the admin password generated for this deployment. The LDAP port 3890 stays on Railway's private network, because plain LDAP sends passwords unencrypted: apps in the same project connect to `lldap.railway.internal:3890` over IPv4 or IPv6. JWT and key-seed secrets are generated and stable, so logins and stored passwords survive redeploys. The base DN defaults to `dc=example,dc=com`; change it before the first boot if you need another. LLDAP uses very little memory and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lldap | `lldap/lldap:v0.6.3` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 17170 |
| `LLDAP_HTTP_HOST` | :: |
| `LLDAP_HTTP_PORT` | 17170 |
| `LLDAP_LDAP_HOST` | :: |
| `LLDAP_LDAP_PORT` | 3890 |
| `LLDAP_JWT_SECRET` | (secret) |
| `LLDAP_LDAP_BASE_DN` | dc=example,dc=com |
| `LLDAP_LDAP_USER_DN` | admin |
| `LLDAP_LDAP_USER_EMAIL` | admin@example.com |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/lldap)
