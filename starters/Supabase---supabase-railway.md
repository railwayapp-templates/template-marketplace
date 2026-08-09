# Deploy Supabase on Railway

Firebase alternative. Full stack: auth, storage, realtime and functions

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supabase-railway)

## About

Supabase is the open-source Firebase alternative: a PostgreSQL database wrapped in an auto-generated REST API, an auth server, realtime subscriptions, S3-compatible file storage, Deno edge functions and a table-editor dashboard. You get plain Postgres — schemas, joins, transactions, Row Level Security and the full extension ecosystem, including `pgvector` for embeddings. Self-host Supabase under Apache-2.0 to keep data in your own infrastructure, with a connection string any ORM or BI tool can point at.

Run Supabase on Railway and the upstream stack comes up pre-wired: `db` on a persistent volume, `kong` as the single public API gateway, plus `auth`, `rest`, `realtime-dev`, `storage` on a managed bucket, `imgproxy`, `meta`, `studio` and `functions`. Only Kong gets a public domain — every other service is private. Requests enter at `/rest/v1`, `/auth/v1`, `/storage/v1`, `/realtime/v1`, `/functions/v1`, `/graphql/v1` or `/pg/`, are authenticated by Kong's key-auth and ACL plugins, and proxied to the right service.

![Supabase Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786185010/0b470ee5-eb42-4548-aec7-e33004d1f757.png)

Supabase is small services pointed at one Postgres database. PostgREST reflects your schema into a REST API and swaps its Postgres role per request from the JWT, so authorization is enforced by RLS in the database, not application code. GoTrue issues those JWTs, Realtime tails logical replication, Storage applies the same RLS model to files.

- Postgres 17 with `pgvector`, PostGIS, `pg_cron`, `pg_net`, `pg_graphql`, Vault and 30+ more
- REST and GraphQL APIs that update the moment your schema does
- Row Level Security enforced for every client, including anonymous ones
- Email, phone, OAuth and SSO auth with JWT sessions
- Realtime change streams, broadcast and presence, plus Deno edge functions

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| auth | `supabase/gotrue:v2.189.0` | Database |
| kong | [gridalpha/supabase-railway](https://github.com/gridalpha/supabase-railway) (root: /) | Web service |
| rest | `postgrest/postgrest:v14.12` | Database |
| db | [gridalpha/supabase-railway](https://github.com/gridalpha/supabase-railway) | Database |
| realtime-dev | `supabase/realtime:v2.102.3` | Database |
| meta | `supabase/postgres-meta:v0.96.6` | Database |
| functions | [gridalpha/supabase-railway](https://github.com/gridalpha/supabase-railway) (root: /) | Worker |
| studio | [gridalpha/supabase-railway](https://github.com/gridalpha/supabase-railway) (root: /) | Worker |
| imgproxy | `darthsim/imgproxy:v3.30.1` | Worker |
| storage | [gridalpha/supabase-railway](https://github.com/gridalpha/supabase-railway) (root: /) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | auth | 9999 | Health check port |
| `GOTRUE_JWT_AUD` | auth | authenticated | Audience claim for user tokens |
| `GOTRUE_JWT_EXP` | auth | 3600 | Access token lifetime in seconds |
| `GOTRUE_API_HOST` | auth | 0.0.0.0 | Bind address inside container |
| `GOTRUE_API_PORT` | auth | 9999 | Auth server listen port |
| `GOTRUE_SITE_URL` | auth | - | Default post-auth redirect target |
| `API_EXTERNAL_URL` | auth | - | Public auth API base URL |
| `GOTRUE_DB_DRIVER` | auth | postgres | Database driver |
| `GOTRUE_JWT_ISSUER` | auth | - | Issuer claim on issued tokens |
| `GOTRUE_JWT_SECRET` | auth | (secret) | Shared HS256 signing secret |
| `SUPABASE_STACK_REV` | auth | 1 | Bump to force a redeploy |
| `GOTRUE_DISABLE_SIGNUP` | auth | false | Set true to close registration |
| `GOTRUE_DB_DATABASE_URL` | auth | - | Auth schema connection string |
| `GOTRUE_JWT_ADMIN_ROLES` | auth | service_role | Roles treated as admin |
| `GOTRUE_SMS_AUTOCONFIRM` | auth | false | Do not auto-confirm phone numbers |
| `GOTRUE_MAILER_AUTOCONFIRM` | auth | true | Confirm emails without SMTP |
| `GOTRUE_EXTERNAL_EMAIL_ENABLED` | auth | true | Allow email sign-up and sign-in |
| `GOTRUE_EXTERNAL_PHONE_ENABLED` | auth | false | Phone auth off, needs SMS provider |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | auth | authenticated | Default Postgres role for users |
| `GOTRUE_MAILER_URLPATHS_INVITE` | auth | /auth/v1/verify | Invite link path |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | auth | /auth/v1/verify | Password recovery link path |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | auth | /auth/v1/verify | Confirmation link path |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | auth | /auth/v1/verify | Email change link path |
| `GOTRUE_EXTERNAL_ANONYMOUS_USERS_ENABLED` | auth | false | Disable anonymous sign-in |
| `PORT` | kong | 8000 | Public gateway listen port |
| `JWT_SECRET` | kong | (secret) | Required: derives the anon/service_role API keys |
| `KONG_PLUGINS` | kong | request-transformer,cors,key-auth,acl,basic-auth,request-termination,ip-restriction,post-function | Enabled gateway plugins |
| `KONG_DATABASE` | kong | off | Declarative config, no Kong DB |
| `KONG_DNS_ORDER` | kong | LAST,A,AAAA,CNAME | Resolve private IPv4 and IPv6 |
| `DASHBOARD_PASSWORD` | kong | (secret) | Studio basic-auth password |
| `DASHBOARD_USERNAME` | kong | (secret) | Studio basic-auth username |
| `KONG_DNS_VALID_TTL` | kong | 5 | Re-resolve upstreams every five seconds |
| `KONG_ROUTER_FLAVOR` | kong | expressions | Expression-based route matching |
| `SUPABASE_STACK_REV` | kong | 2 | Bump to force a redeploy |
| `KONG_PROXY_ACCESS_LOG` | kong | /dev/stdout combined | Send access log to platform logs |
| `KONG_DNS_NOT_FOUND_TTL` | kong | 1 | Cache negative DNS one second |
| `KONG_DECLARATIVE_CONFIG` | kong | /tmp/kong.yml | Path to rendered gateway config |
| `KONG_NGINX_WORKER_PROCESSES` | kong | 2 | Pin workers to container CPU |
| `KONG_NGINX_PROXY_PROXY_BUFFERS` | kong | 64 160k | Upstream response buffers |
| `KONG_NGINX_PROXY_PROXY_BUFFER_SIZE` | kong | 160k | Upstream header buffer size |
| `PORT` | rest | 3000 | Health check port |
| `PGRST_DB_URI` | rest | - | Connection string as authenticator role |
| `PGRST_DB_SCHEMAS` | rest | public,graphql_public | Schemas exposed over REST |
| `PGRST_JWT_SECRET` | rest | (secret) | Verifies incoming API JWTs |
| `PGRST_DB_MAX_ROWS` | rest | 1000 | Max rows returned per request |
| `PGRST_SERVER_HOST` | rest | * | Listen on all interfaces |
| `PGRST_SERVER_PORT` | rest | 3000 | REST API listen port |
| `PGRST_DB_ANON_ROLE` | rest | anon | Role used for unauthenticated requests |
| `SUPABASE_STACK_REV` | rest | 1 | Bump to force a redeploy |
| `PGRST_ADMIN_SERVER_HOST` | rest | localhost | Admin server bind address |
| `PGRST_ADMIN_SERVER_PORT` | rest | 3001 | Internal admin/health port |
| `PGRST_DB_USE_LEGACY_GUCS` | rest | false | Use modern GUC naming |
| `PGRST_APP_SETTINGS_JWT_EXP` | rest | 3600 | Exposed to SQL as jwt_exp |
| `PGRST_DB_EXTRA_SEARCH_PATH` | rest | public | Extra schemas on search path |
| `PGRST_APP_SETTINGS_JWT_SECRET` | rest | (secret) | Exposed to SQL as jwt_secret |
| `JWT_EXP` | db | 3600 | Access token lifetime in seconds |
| `ANON_KEY` | db | - | Optional override; derived from JWT_SECRET when blank |
| `JWT_SECRET` | db | (secret) | Signs all Supabase API JWTs |
| `POSTGRES_DB` | db | postgres | Database created on first boot |
| `POSTGRES_HOST` | db | /var/run/postgresql | Local socket dir for init scripts |
| `POSTGRES_PORT` | db | 5432 | Postgres port for consumers |
| `POSTGRES_USER` | db | (secret) | Required superuser name, do not change |
| `FORCE_DB_RESET` | db | 0 | Set 1 to wipe and re-init cluster |
| `SECRET_KEY_BASE` | db | (secret) | Realtime Phoenix session signing key |
| `SERVICE_ROLE_KEY` | db | - | Optional override; derived from JWT_SECRET when blank |
| `POSTGRES_PASSWORD` | db | (secret) | Password for Supabase service roles |
| `SUPABASE_INIT_REV` | db | 3 | Bump to re-run init scripts |
| `SUPABASE_SELFHOST` | db | true | Marks stack as self-hosted |
| `DASHBOARD_PASSWORD` | db | (secret) | Studio basic-auth password |
| `DASHBOARD_USERNAME` | db | (secret) | Studio basic-auth username |
| `PG_META_CRYPTO_KEY` | db | - | postgres-meta credential encryption key |
| `REALTIME_DB_ENC_KEY` | db | - | Realtime tenant encryption key, 16 chars |
| `S3_PROTOCOL_ACCESS_KEY_ID` | db | - | Storage S3-protocol access key id |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | db | (secret) | Storage S3-protocol secret key |
| `PORT` | realtime-dev | 4000 | Realtime listen port |
| `DB_HOST` | realtime-dev | - | Private Postgres hostname |
| `DB_NAME` | realtime-dev | postgres | Database name |
| `DB_PORT` | realtime-dev | 5432 | Database port |
| `DB_USER` | realtime-dev | (secret) | Database user |
| `APP_NAME` | realtime-dev | realtime | Elixir application name |
| `DNS_NODES` | realtime-dev | '' | No Erlang clustering, single node |
| `DB_ENC_KEY` | realtime-dev | - | Encrypts stored tenant records |
| `ERL_AFLAGS` | realtime-dev | -proto_dist inet_tcp | Erlang distribution over IPv4 TCP |
| `DB_PASSWORD` | realtime-dev | (secret) | Database password |
| `RUN_JANITOR` | realtime-dev | true | Run background cleanup tasks |
| `RLIMIT_NOFILE` | realtime-dev | 10000 | Open file descriptor limit |
| `API_JWT_SECRET` | realtime-dev | (secret) | Verifies realtime API tokens |
| `SEED_SELF_HOST` | realtime-dev | true | Seed the realtime-dev tenant on boot |
| `SECRET_KEY_BASE` | realtime-dev | (secret) | Phoenix session signing key |
| `METRICS_JWT_SECRET` | realtime-dev | (secret) | Signs the metrics endpoint token |
| `DB_AFTER_CONNECT_QUERY` | realtime-dev | SET search_path TO _realtime | Pin schema on each connection |
| `DISABLE_HEALTHCHECK_LOGGING` | realtime-dev | true | Quieten health check log noise |
| `PORT` | meta | 8080 | Health check port |
| `CRYPTO_KEY` | meta | - | Encrypts stored connection credentials |
| `PG_META_PORT` | meta | 8080 | Metadata API listen port |
| `PG_META_DB_HOST` | meta | - | Private Postgres hostname |
| `PG_META_DB_NAME` | meta | postgres | Database name |
| `PG_META_DB_PORT` | meta | 5432 | Database port |
| `PG_META_DB_USER` | meta | (secret) | Database user |
| `SUPABASE_STACK_REV` | meta | 1 | Bump to force a redeploy |
| `PG_META_DB_PASSWORD` | meta | (secret) | Database password |
| `PORT` | functions | 9000 | Edge runtime listen port |
| `JWT_SECRET` | functions | (secret) | Verifies legacy HS256 function tokens |
| `VERIFY_JWT` | functions | false | Set true to require a JWT per call |
| `SUPABASE_URL` | functions | http://kong.railway.internal:8000 | Private gateway address |
| `SUPABASE_DB_URL` | functions | - | Database URL available to functions |
| `SUPABASE_STACK_REV` | functions | 1 | Bump to force a redeploy |
| `SUPABASE_PUBLIC_URL` | functions | - | Public gateway URL |
| `PORT` | studio | 3000 | Dashboard listen port |
| `HOSTNAME` | studio | 0.0.0.0 | Next.js bind address |
| `JWT_SECRET` | studio | (secret) | Required: derives the anon/service_role API keys |
| `POSTGRES_DB` | studio | postgres | Database name shown in the UI |
| `SUPABASE_URL` | studio | http://kong.railway.internal:8000 | Private gateway address |
| `POSTGRES_HOST` | studio | - | Private Postgres hostname |
| `POSTGRES_PORT` | studio | 5432 | Database port |
| `AUTH_JWT_SECRET` | studio | (secret) | Verifies dashboard API tokens |
| `PGRST_DB_SCHEMAS` | studio | public,graphql_public | Mirror of the REST schema list |
| `PGRST_DB_MAX_ROWS` | studio | 1000 | Mirror of the REST row limit |
| `POSTGRES_PASSWORD` | studio | (secret) | Database password |
| `PG_META_CRYPTO_KEY` | studio | - | Must match the meta service key |
| `STUDIO_PG_META_URL` | studio | http://meta.railway.internal:8080 | Private postgres-meta address |
| `SUPABASE_STACK_REV` | studio | 1 | Bump to force a redeploy |
| `SUPABASE_PUBLIC_URL` | studio | - | Public API URL shown in the UI |
| `DEFAULT_PROJECT_NAME` | studio | Default Project | Project label in the UI |
| `POSTGRES_USER_READ_WRITE` | studio | postgres | Role used by the SQL editor |
| `DEFAULT_ORGANIZATION_NAME` | studio | Default Organization | Organization label in the UI |
| `ENABLED_FEATURES_LOGS_ALL` | studio | false | Hide log views, no analytics service |
| `PGRST_DB_EXTRA_SEARCH_PATH` | studio | public | Mirror of the REST search path |
| `PORT` | imgproxy | 5001 | Health check port |
| `IMGPROXY_BIND` | imgproxy | :5001 | Listen address inside container |
| `IMGPROXY_USE_S3` | imgproxy | true | Read source images from S3 |
| `AWS_ACCESS_KEY_ID` | imgproxy | - | Managed bucket access key |
| `IMGPROXY_USE_ETAG` | imgproxy | true | Emit ETag headers for caching |
| `IMGPROXY_AUTO_WEBP` | imgproxy | true | Serve WebP when the client accepts it |
| `IMGPROXY_S3_REGION` | imgproxy | us-east-1 | SigV4 signing region |
| `SUPABASE_STACK_REV` | imgproxy | 1 | Bump to force a redeploy |
| `IMGPROXY_S3_ENDPOINT` | imgproxy | - | Managed bucket S3 endpoint |
| `AWS_SECRET_ACCESS_KEY` | imgproxy | (secret) | Managed bucket secret key |
| `IMGPROXY_MAX_SRC_RESOLUTION` | imgproxy | 16.8 | Max source megapixels |
| `PORT` | storage | 5000 | Storage API listen port |
| `REGION` | storage | us-east-1 | SigV4 signing region |
| `TENANT_ID` | storage | railway | Object key namespace prefix |
| `JWT_SECRET` | storage | (secret) | Required: derives the anon/service_role API keys |
| `SERVER_PORT` | storage | 5000 | Internal HTTP server port |
| `DATABASE_URL` | storage | - | Storage metadata connection string |
| `IMGPROXY_URL` | storage | http://imgproxy.railway.internal:5001 | Private imgproxy address |
| `POSTGREST_URL` | storage | http://rest.railway.internal:3000 | Private PostgREST address |
| `AUTH_JWT_SECRET` | storage | (secret) | Verifies incoming API JWTs |
| `FILE_SIZE_LIMIT` | storage | 52428800 | Max upload size, 50 MB |
| `STORAGE_BACKEND` | storage | s3 | Store objects in the bucket |
| `GLOBAL_S3_BUCKET` | storage | - | Managed bucket name |
| `AWS_ACCESS_KEY_ID` | storage | - | Managed bucket access key |
| `GLOBAL_S3_ENDPOINT` | storage | - | Managed bucket S3 endpoint |
| `GLOBAL_S3_PROTOCOL` | storage | https | Talk to the bucket over HTTPS |
| `STORAGE_PUBLIC_URL` | storage | - | Public base URL for object links |
| `SUPABASE_STACK_REV` | storage | 1 | Bump to force a redeploy |
| `AWS_SECRET_ACCESS_KEY` | storage | (secret) | Managed bucket secret key |
| `S3_PROTOCOL_ACCESS_KEY_ID` | storage | - | Key id for the S3-compatible API |
| `GLOBAL_S3_FORCE_PATH_STYLE` | storage | true | Use path-style S3 addressing |
| `ENABLE_IMAGE_TRANSFORMATION` | storage | true | Enable imgproxy-backed transforms |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | storage | (secret) | Secret for the S3-compatible API |
| `REQUEST_ALLOW_X_FORWARDED_PATH` | storage | true | Trust gateway forwarded path header |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Starters · **Languages:** PLpgSQL, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/supabase-railway)
