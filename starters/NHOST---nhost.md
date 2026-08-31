# Deploy NHOST on Railway

Backend for apps: database, GraphQL API, logins and file uploads

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nhost)

## About

Nhost is an open-source backend-as-a-service: a Postgres database, an instant GraphQL API over it, email and social sign-in, S3-backed file storage and serverless functions — the Firebase feature set, built on tools you can read the source of. Teams reach for it when they want Firebase's speed without Firebase's data model: the database is ordinary Postgres, so foreign keys, joins and SQL migrations all still work, and access control is row-level permission rules. Self-host Nhost and every user record, uploaded file and row of data stays on infrastructure you control.

Deploy Nhost on Railway and the whole stack comes up wired together: a Hasura GraphQL engine over managed Postgres, Nhost Auth issuing JWTs that Hasura validates, Nhost Storage backed by an object storage bucket, a Node 22 runtime for your serverless functions, the Nhost dashboard behind HTTP basic authentication, and a Mailpit inbox catching verification and password-reset email. Each service gets its own public URL, matching what the Nhost JavaScript SDK expects, and every shared secret is generated once and referenced by the services that need it.

![Diagram of the Nhost services and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788095686/nhost-architecture.png)

Nhost packages four open-source pieces into one backend so you do not have to integrate them yourself. Hasura turns your Postgres schema into a GraphQL API with subscriptions and role-based permissions, and no resolver code. Nhost Auth owns the `auth` schema, handles email/password, magic links, one-time codes, WebAuthn and OAuth, and signs the JWTs Hasura checks. Nhost Storage owns the `storage` schema, streams uploads to an S3-compatible bucket and applies the same permission rules to files that Hasura applies to rows. Functions serves your `.ts` and `.js` files as HTTP endpoints.

Key features:

- Instant GraphQL API — queries, mutations, subscriptions and aggregates from your schema
- Row-level permissions per role, with `X-Hasura-User-Id` in every rule
- Email/password, passwordless, one-time-code, WebAuthn and OAuth sign-in
- File uploads with per-file permissions, image transforms and presigned URLs
- TypeScript serverless functions, called directly or from Hasura triggers
- Official JavaScript, React and Vue SDKs, plus anything speaking GraphQL

Postgres holds all application data plus the `auth`, `storage` and Hasura catalogue schemas; the GraphQL service is the only one your client queries for data; auth and storage each expose a small REST API; and the dashboard is an operator tool, outside the runtime path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| storage | [gridalpha/nhost-railway](https://github.com/gridalpha/nhost-railway) (root: storage) | Web service |
| auth | `nhost/auth:0.40.2` | Web service |
| dashboard | [gridalpha/nhost-railway](https://github.com/gridalpha/nhost-railway) (root: dashboard) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| functions | [gridalpha/nhost-railway](https://github.com/gridalpha/nhost-railway) (root: functions) | Web service |
| graphql | [gridalpha/nhost-railway](https://github.com/gridalpha/nhost-railway) (root: graphql) | Web service |
| mailhog | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `BIND` | storage | :5000 | Listen address inside the container |
| `PORT` | storage | 5000 | Port Railway probes and routes to |
| `S3_BUCKET` | storage | - | Bucket uploaded files go to |
| `S3_REGION` | storage | - | Bucket region |
| `PUBLIC_URL` | storage | - | Base URL used in presigned links |
| `S3_ENDPOINT` | storage | - | Object storage endpoint |
| `S3_ACCESS_KEY` | storage | - | Bucket access key |
| `S3_SECRET_KEY` | storage | (secret) | Bucket secret key |
| `S3_ROOT_FOLDER` | storage | - | Optional key prefix inside the bucket |
| `API_ROOT_PREFIX` | storage | /v1 | Path prefix for every storage route |
| `HASURA_ENDPOINT` | storage | - | Private Hasura endpoint |
| `HASURA_METADATA` | storage | 1 | Register storage tables in Hasura |
| `LOG_FORMAT_TEXT` | storage | true | Human-readable log lines |
| `CORS_ALLOW_ORIGINS` | storage | * | Browser origins allowed to upload |
| `POSTGRES_MIGRATIONS` | storage | 1 | Run storage schema migrations |
| `POSTGRES_MIGRATIONS_SOURCE` | storage | - | Connection used for migrations |
| `HASURA_GRAPHQL_ADMIN_SECRET` | storage | (secret) | Admin key for metadata calls |
| `PORT` | auth | 4000 | Port Railway probes and routes to |
| `AUTH_HOST` | auth | 0.0.0.0 | Listen address inside the container |
| `AUTH_PORT` | auth | 4000 | Port the auth service listens on |
| `AUTH_LOG_LEVEL` | auth | info | Auth service log verbosity |
| `AUTH_SMTP_HOST` | auth | mailhog | SMTP host; must stay this literal name |
| `AUTH_SMTP_PASS` | auth | - | SMTP password, shared with mailhog |
| `AUTH_SMTP_PORT` | auth | 1025 | SMTP port on the mail service |
| `AUTH_SMTP_USER` | auth | (secret) | SMTP username |
| `AUTH_API_PREFIX` | auth | /v1 | Path prefix for every auth route |
| `AUTH_CLIENT_URL` | auth | - | Where email links send the user |
| `AUTH_SERVER_URL` | auth | - | Public base URL used in email links |
| `AUTH_MFA_ENABLED` | auth | false | Enable TOTP multi-factor auth |
| `AUTH_SMTP_SECURE` | auth | false | Plain connection on the private network |
| `AUTH_SMTP_SENDER` | auth | auth@nhost.local | From address on outgoing mail |
| `AUTH_CONCEAL_ERRORS` | auth | false | Return detailed API errors |
| `AUTH_DISABLE_SIGNUP` | auth | false | Set true to close public registration |
| `AUTH_ENCRYPTION_KEY` | auth | - | Encrypts stored OAuth and TOTP secrets |
| `AUTH_LOCALE_DEFAULT` | auth | en | Default locale for emails |
| `AUTH_GRAVATAR_RATING` | auth | g | Maximum Gravatar content rating |
| `AUTH_GRAVATAR_DEFAULT` | auth | blank | Fallback avatar style |
| `AUTH_GRAVATAR_ENABLED` | auth | true | Generate Gravatar avatar URLs |
| `AUTH_SMTP_AUTH_METHOD` | auth | LOGIN | SMTP authentication mechanism |
| `AUTH_DISABLE_NEW_USERS` | auth | false | Set true to require manual activation |
| `AUTH_RATE_LIMIT_ENABLE` | auth | true | Turn on all rate limiters |
| `AUTH_USER_DEFAULT_ROLE` | auth | user | Role new accounts receive |
| `AUTH_PASSWORD_MIN_LENGTH` | auth | (secret) | Minimum accepted password length |
| `HASURA_GRAPHQL_JWT_SECRET` | auth | (secret) | Same signing key as the engine |
| `AUTH_PASSWORD_HIBP_ENABLED` | auth | (secret) | Check passwords against HaveIBeenPwned |
| `HASURA_GRAPHQL_GRAPHQL_URL` | auth | - | Private GraphQL endpoint |
| `AUTH_LOCALE_ALLOWED_LOCALES` | auth | en | Locales users may choose |
| `AUTH_RATE_LIMIT_EMAIL_BURST` | auth | 10 | Emails allowed per interval |
| `HASURA_GRAPHQL_ADMIN_SECRET` | auth | (secret) | Admin key for metadata calls |
| `HASURA_GRAPHQL_DATABASE_URL` | auth | - | Database holding the auth schema |
| `AUTH_ACCESS_TOKEN_EXPIRES_IN` | auth | (secret) | Access token lifetime in seconds |
| `AUTH_ANONYMOUS_USERS_ENABLED` | auth | false | Allow anonymous sessions |
| `AUTH_RATE_LIMIT_GLOBAL_BURST` | auth | 100 | Requests allowed per interval |
| `AUTH_RATE_LIMIT_SIGNUPS_BURST` | auth | 10 | Signups allowed per interval |
| `AUTH_REFRESH_TOKEN_EXPIRES_IN` | auth | (secret) | Refresh token lifetime in seconds |
| `AUTH_RATE_LIMIT_EMAIL_INTERVAL` | auth | 1h | Window for the email limiter |
| `POSTGRES_MIGRATIONS_CONNECTION` | auth | - | Connection used for auth migrations |
| `AUTH_RATE_LIMIT_EMAIL_IS_GLOBAL` | auth | true | Apply the email limit instance-wide |
| `AUTH_RATE_LIMIT_GLOBAL_INTERVAL` | auth | 1m | Window for the global limiter |
| `AUTH_USER_DEFAULT_ALLOWED_ROLES` | auth | user,me | Roles a new account may request |
| `AUTH_RATE_LIMIT_SIGNUPS_INTERVAL` | auth | 5m | Window for the signup limiter |
| `AUTH_RATE_LIMIT_BRUTE_FORCE_BURST` | auth | 10 | Failed logins allowed per interval |
| `AUTH_RATE_LIMIT_BRUTE_FORCE_INTERVAL` | auth | 5m | Window for the login limiter |
| `AUTH_ACCESS_CONTROL_ALLOWED_REDIRECT_URLS` | auth | - | Extra allowed redirect targets |
| `AUTH_EMAIL_SIGNIN_EMAIL_VERIFIED_REQUIRED` | auth | false | Allow sign-in before verification |
| `PORT` | dashboard | 8080 | Port Railway probes and routes to |
| `DASHBOARD_USER` | dashboard | (secret) | Username the dashboard asks for |
| `NEXT_PUBLIC_ENV` | dashboard | production | Dashboard build environment label |
| `DASHBOARD_PASSWORD` | dashboard | (secret) | Password the dashboard asks for |
| `NEXT_PUBLIC_NHOST_AUTH_URL` | dashboard | - | Auth service URL |
| `NEXT_PUBLIC_NHOST_PLATFORM` | dashboard | false | Run in self-hosted mode |
| `NEXT_PUBLIC_NHOST_GRAPHQL_URL` | dashboard | - | GraphQL endpoint URL |
| `NEXT_PUBLIC_NHOST_STORAGE_URL` | dashboard | - | Storage service URL |
| `NEXT_PUBLIC_NHOST_ADMIN_SECRET` | dashboard | (secret) | Admin key the dashboard uses |
| `NEXT_PUBLIC_NHOST_FUNCTIONS_URL` | dashboard | - | Functions service URL |
| `NEXT_PUBLIC_NHOST_HASURA_API_URL` | dashboard | - | Hasura metadata API URL |
| `NEXT_PUBLIC_NHOST_HASURA_CONSOLE_URL` | dashboard | - | Hasura console link |
| `NEXT_PUBLIC_NHOST_HASURA_MIGRATIONS_API_URL` | dashboard | - | Hasura CLI migrations API |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | functions | 3000 | Port Railway probes and routes to |
| `NODE_OPTIONS` | functions | --max-old-space-size=3072 | Heap ceiling for the bundler |
| `NHOST_AUTH_URL` | functions | - | Auth base URL for function code |
| `NHOST_GRAPHQL_URL` | functions | - | GraphQL URL for function code |
| `NHOST_STORAGE_URL` | functions | - | Storage URL for function code |
| `HASURA_GRAPHQL_JWT_SECRET` | functions | (secret) | Signing key available to functions |
| `HASURA_GRAPHQL_GRAPHQL_URL` | functions | - | Private GraphQL endpoint |
| `HASURA_GRAPHQL_ADMIN_SECRET` | functions | (secret) | Admin key available to functions |
| `HASURA_GRAPHQL_DATABASE_URL` | functions | - | Database connection for functions |
| `PORT` | graphql | 8080 | Port Railway probes and routes to |
| `HASURA_GRAPHQL_DEV_MODE` | graphql | false | Hide internal errors from clients |
| `HASURA_GRAPHQL_LOG_LEVEL` | graphql | info | Engine log verbosity |
| `HASURA_GRAPHQL_JWT_SECRET` | graphql | (secret) | Key auth signs and Hasura verifies |
| `HASURA_GRAPHQL_CORS_DOMAIN` | graphql | * | Browser clients live on other origins |
| `HASURA_GRAPHQL_SERVER_PORT` | graphql | 8080 | Port the engine listens on |
| `HASURA_GRAPHQL_ADMIN_SECRET` | graphql | (secret) | Master key for GraphQL and metadata APIs |
| `HASURA_GRAPHQL_DATABASE_URL` | graphql | - | Application and catalogue database |
| `HASURA_GRAPHQL_ENABLED_APIS` | graphql | metadata,graphql,pgdump,config | APIs the engine exposes |
| `HASURA_GRAPHQL_ENABLE_CONSOLE` | graphql | true | Serve the Hasura console at /console |
| `HASURA_GRAPHQL_PG_CONNECTIONS` | graphql | 25 | Initial pool size for the source |
| `HASURA_GRAPHQL_ENABLE_TELEMETRY` | graphql | false | No usage reporting to Hasura |
| `HASURA_GRAPHQL_ENABLED_LOG_TYPES` | graphql | startup,http-log,webhook-log,websocket-log | Log categories emitted |
| `HASURA_GRAPHQL_UNAUTHORIZED_ROLE` | graphql | public | Role applied to anonymous requests |
| `HASURA_GRAPHQL_CONSOLE_ASSETS_DIR` | graphql | /srv/console-assets | Serve console assets from the image |
| `HASURA_GRAPHQL_STRINGIFY_NUMERIC_TYPES` | graphql | false | Return numerics as JSON numbers |
| `HASURA_GRAPHQL_GRACEFUL_SHUTDOWN_TIMEOUT` | graphql | 25 | Seconds to finish in-flight events |
| `TZ` | mailhog | UTC | Timezone for displayed timestamps |
| `PORT` | mailhog | 8025 | Port Railway probes and routes to |
| `MP_UI_AUTH` | mailhog | - | Credentials for the web inbox |
| `MP_DATABASE` | mailhog | /data/mailpit.db | Message store on the volume |
| `MP_SMTP_AUTH` | mailhog | - | SMTP credentials the server accepts |
| `MP_MAX_MESSAGES` | mailhog | 5000 | Messages kept before rotation |
| `MP_UI_BIND_ADDR` | mailhog | [::]:8025 | Web inbox listen address |
| `MP_SMTP_PASSWORD` | mailhog | (secret) | Shared SMTP password, referenced by auth |
| `MP_SMTP_BIND_ADDR` | mailhog | [::]:1025 | SMTP listen address |
| `MP_SMTP_AUTH_ALLOW_INSECURE` | mailhog | true | Accept auth on the plain listener |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Starters · **Languages:** Shell, Dockerfile, PLpgSQL, TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/nhost)
