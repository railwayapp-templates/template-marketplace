# Deploy BoxyHQ / Jackson SSO on Railway

Security Building Blocks For Developers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/xV6lZy)

## About

BoxyHQ’s SSO solution allows you to go from the first line of code to deployment in just a few days, saving you time and getting you to market faster. Plus, we offer custom integration support to help you every step of the way.

- Effortless integration
- Reduced development time
- Become enterprise ready

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| jackson | `boxyhq/jackson` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `DB_URL` | jackson | - | The database URL to connect to. If you are using self-signed certificates then pass sslmode=no-verify instead of sslmode=require in the DB_URL. This is because self-signed certs will be rejected as unauthorized in strict mode. Also, set DB_SSL=true and DB_SSL_REJECT_UNAUTHORIZED=false  |
| `EXTERNAL_URL` | jackson | - | The public URL to reach this service. This is used internally to construct the callback url at which the SAML/OIDC IdP sends back the authorization response. |
| `NEXTAUTH_SECRET` | jackson | (secret) | Set this to a random string. You can use openssl rand -base64 32 to get one. This secret is used to encrypt JWT and hash the email verification token.  |
| `JACKSON_API_KEYS` | jackson | (secret) | A comma separated list of API keys that will be validated when serving the API requests for SSO connection (/api/v1/connections) and Directory Sync (/api/v1/directory-sync).  For example JACKSON_API_KEYS=key1,key2,key3 |
| `NEXTAUTH_ADMIN_CREDENTIALS` | jackson | (secret) | Set this to a comma separated string of the pattern email:password to enable login to the Admin Portal, for example NEXTAUTH_ADMIN_CREDENTIALS=deepak@boxyhq.com:Password123. If you don't specify any value access is denied to all. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/xV6lZy)
