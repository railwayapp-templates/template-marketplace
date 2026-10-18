# Deploy Crewtavo on Railway

Free, open-source field service software: quotes, crews, invoices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/crewtavo)

## About

Crewtavo is free, open-source field-service software for lawn care, paving, roofing, cleaning, HVAC and other service businesses: requests, quotes, scheduling, a crew app on every phone, invoicing, online payments and a client portal. It's free for companies with up to 50 employees, and every business runs its own copy, with its own data.

This template creates one complete Crewtavo in your Railway project: the Crewtavo app (web app, API and background tasks), a Postgres database, sign-ins, a data API and file storage on a volume. Only the app is public. It reaches the other services over Railway's private network and generates their keys from one shared secret, so there's nothing to copy or configure, and database migrations run on every start. After a few minutes, open the address on the crewtavo service and create the owner account. To use your own domain, add it to the crewtavo service and set APP_URL to it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rest | `public.ecr.aws/supabase/postgrest:v16.4` | Database |
| auth | `public.ecr.aws/supabase/gotrue:v2.197.0` | Database |
| storage | `public.ecr.aws/supabase/storage-api:v1.82.1` | Database |
| db | `ghcr.io/jviars/crewtavo-db:pg17` | Database |
| crewtavo | `ghcr.io/jviars/crewtavo:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PGRST_DB_URI` | rest | - | Database connection for the data API, over the private network. |
| `PGRST_DB_SCHEMAS` | rest | public,graphql_public | Database schemas the data API serves. |
| `PGRST_JWT_SECRET` | rest | (secret) | Shared token secret from the crewtavo service. Leave as is. |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | Most rows the data API returns in one request. |
| `PGRST_SERVER_HOST` | rest | * | Address the data API listens on. |
| `PGRST_DB_ANON_ROLE` | rest | anon | Database role for requests from people who are not signed in. |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | Compatibility setting for how request details reach the database. |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | Token lifetime database functions use, in seconds. |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public,extensions | Extra schemas available to database functions. |
| `GOTRUE_JWT_AUD` | auth | authenticated | Audience name on sign-in tokens. |
| `GOTRUE_JWT_EXP` | auth | 3600 | How long a sign-in token lasts, in seconds. |
| `GOTRUE_API_HOST` | auth | :: | Address the sign-in service listens on. |
| `GOTRUE_API_PORT` | auth | 9999 | Port the sign-in service listens on. |
| `GOTRUE_SITE_URL` | auth | - | Your Crewtavo's address, used in sign-in and invite links. Follows APP_URL. |
| `API_EXTERNAL_URL` | auth | - | Public address of the sign-in API, through Crewtavo. Follows APP_URL. |
| `GOTRUE_DB_DRIVER` | auth | postgres | Database driver for the sign-in service. |
| `GOTRUE_JWT_SECRET` | auth | (secret) | Shared token secret from the crewtavo service. Leave as is. |
| `GOTRUE_DISABLE_SIGNUP` | auth | true | Only people the business invites can join. Leave on. |
| `GOTRUE_MAILER_OTP_EXP` | auth | 86400 | How long emailed sign-in and invite links last, in seconds. |
| `GOTRUE_URI_ALLOW_LIST` | auth | - | Addresses sign-in may send people back to. Follows APP_URL. |
| `GOTRUE_DB_DATABASE_URL` | auth | - | Database connection for the sign-in service, over the private network. |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | Database role allowed to manage user accounts. |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | Accounts that Crewtavo creates are confirmed without an extra email. |
| `GOTRUE_OAUTH_SERVER_ENABLED` | auth | true | Lets Claude and ChatGPT connect to Crewtavo when a user approves it. |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | Sign in with email and password. |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | Sign in with a phone number. Off. |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | Database role for signed-in users. |
| `GOTRUE_OAUTH_SERVER_AUTHORIZATION_PATH` | auth | /oauth/consent | Crewtavo page where a user approves an AI assistant connection. |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | Anonymous sign-in. Off. |
| `GOTRUE_OAUTH_SERVER_ALLOW_DYNAMIC_REGISTRATION` | auth | true | Lets AI assistants register before asking a user for approval. |
| `PORT` | storage | 5000 | Port the file storage service listens on. |
| `REGION` | storage | local | Storage region label. Files stay on this service’s volume. |
| `TENANT_ID` | storage | crewtavo | Name of the storage tenant. |
| `SERVER_HOST` | storage | :: | Address the file storage service listens on. |
| `DATABASE_URL` | storage | - | Database connection for file storage, over the private network. |
| `POSTGREST_URL` | storage | - | Private address of the rest (data API) service. |
| `AUTH_JWT_SECRET` | storage | (secret) | Shared token secret from the crewtavo service. Leave as is. |
| `FILE_SIZE_LIMIT` | storage | 52428800 | Largest file someone can upload, in bytes (50 MB). |
| `STORAGE_BACKEND` | storage | file | Keep files on this service’s volume. |
| `GLOBAL_S3_BUCKET` | storage | crewtavo | Name of the bucket files are stored in. |
| `FILE_STORAGE_BACKEND_PATH` | storage | /var/lib/storage | Folder on the volume where files are kept. |
| `ENABLE_IMAGE_TRANSFORMATION` | storage | false | Resize images on the fly. Off. |
| `REQUEST_ALLOW_X_FORWARDED_PATH` | storage | true | Lets Crewtavo forward file requests to this service. |
| `POSTGRES_DB` | db | postgres | Name of the Crewtavo database. |
| `POSTGRES_HOST` | db | /var/run/postgresql | Where Postgres listens inside this service. |
| `POSTGRES_PORT` | db | 5432 | Port the other services use to reach Postgres. |
| `POSTGRES_PASSWORD` | db | (secret) | Generated database password, shared with the other services. Leave as is. |
| `PORT` | crewtavo | 8080 | Port the Crewtavo web app listens on. Leave as is. |
| `APP_URL` | crewtavo | - | Your Crewtavo's public address. Uses the Railway domain; change it if you add your own domain. |
| `JWT_SECRET` | crewtavo | (secret) | Generated secret that signs sign-ins for every service. Leave as is: changing it signs everyone out. |
| `SUPABASE_DB_URL` | crewtavo | - | Connection to the db service over the private network. Filled in automatically. |
| `SUPABASE_AUTH_URL` | crewtavo | - | Private address of the auth (sign-in) service. Filled in automatically. |
| `SUPABASE_REST_URL` | crewtavo | - | Private address of the rest (data API) service. Filled in automatically. |
| `SUPABASE_STORAGE_URL` | crewtavo | - | Private address of the storage (files) service. Filled in automatically. |

## Configuration

- **Volume:** `/var/lib/storage`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/crewtavo)
