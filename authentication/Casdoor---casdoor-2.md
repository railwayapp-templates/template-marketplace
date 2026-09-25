# Deploy Casdoor on Railway

Casdoor 4.9 identity provider with OAuth 2.0, OIDC, SAML and a web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/casdoor-2)

## About

Casdoor is an open-source identity and access management platform with a web UI. It acts as an OAuth 2.0, OIDC, SAML, CAS and LDAP provider, supports social logins, MFA, passkeys and user management, and includes Casbin-based permissions. SDKs are available for Go, Java, Node.js, Python, PHP, .NET and frontend frameworks.

This template deploys Casdoor v4.9.0 from the official image with a Railway Postgres database. On first start the well-known default admin password `123` is replaced with a generated one, so the instance is never exposed with it. The OIDC issuer is your Railway domain, and the discovery document works out of the box. Casdoor listens on the public domain and the private network, so backend services can call its API internally. It is light enough for the Hobby plan. Back up Postgres regularly, since it holds your users and applications.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| casdoor | `casbin/casdoor:4.9.0` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | casdoor | 8000 |
| `runmode` | casdoor | prod |
| `driverName` | casdoor | postgres |
| `CASDOOR_ADMIN_PASSWORD` | casdoor | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `sh -c '/server & pid=$!; trap "kill -TERM $pid" TERM INT; until curl -fs -o /dev/null http://127.0.0.1:8000/api/health; do kill -0 $pid 2>/dev/null || exit 1; sleep 1; done; J=/tmp/casdoor.cookies; if curl -fs -c $J -H "Content-Type: application/json" -X POST http://127.0.0.1:8000/api/login -d "{\"application\":\"app-built-in\",\"organization\":\"built-in\",\"username\":\"admin\",\"password\":\"123\",\"type\":\"login\"}" | grep -qE "\"status\": *\"ok\""; then curl -fs -b $J -X POST http://127.0.0.1:8000/api/set-password --data-urlencode userOwner=built-in --data-urlencode userName=admin --data-urlencode oldPassword=123 --data-urlencode "newPassword=$CASDOOR_ADMIN_PASSWORD" | grep -qE "\"status\": *\"ok\"" && echo "default admin password replaced"; fi; rm -f $J; wait $pid'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/casdoor-2)
