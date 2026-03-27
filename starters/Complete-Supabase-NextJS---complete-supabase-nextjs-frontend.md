# Deploy Complete Supabase + NextJS on Railway

"PG On Rails" | Self-hosted Supabase. Amazing developer experience.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/complete-supabase-nextjs-frontend)

## About

PG On Rails is a passion project that combines two of my favourite things: Supabase and Railway! It is **local-first** and is a joy to build Supabase applications with. It is a monorepo with one directory per service, and is designed for the modern deployment pattern of **watch paths.**

My longterm vision is to make PG On Rails *the best strategy for bootstrapping, building and self-hosting Supabase.*

Please visit the official [GitHub repo](https://github.com/BenIsenstein/pgonrails) to view GIFs of the deployment process.

You can now deploy and setup PG On Rails completely **hands-free**! With a single shell command, accomplish every step from the manual setup in minutes without lifting a finger. Simply run the following command on a Linux, MacOS or WSL terminal:

bash &lt;(curl -fsSL https://raw.githubusercontent.com/BenIsenstein/pgonrails-cli/main/start.sh)

For the manual tutorial, continue reading!

To deploy this template, only 3 environment variables need to be configured. Please visit the Supabase self-hosting tool to generate a JWT secret and keys, and input them when prompted into the `Postgres` service.

You can use your deployment as a remote backend only, or you can practice truly local-first development by running your project on your machine. To do this, you'll need to eject the project and clone your newly forked GitHub repo.

Whether remote or local, you'll be able to use the Supabase Studio dashboard right away, by copying the `DASHBOARD_PASSWORD` variable from the Kong service. Visit the public url for Kong, and log in with user `pgonrails` and the password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| PostgREST | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /rest) | Worker |
| Edge Functions | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /functions) | Worker |
| Supabase Storage | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /storage) | Worker |
| Postgres | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /db) | Database |
| PgBouncer | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /pgbouncer) | TCP service |
| Kong | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /kong) | Web service |
| imgproxy | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /imgproxy) | Worker |
| Site | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /site) | Web service |
| Supabase Realtime | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /realtime) | Worker |
| Postgres Meta | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /meta) | Worker |
| Supabase Auth | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /auth) | Worker |
| MinIO | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /minio) | TCP service |
| Supabase Studio | [BenIsenstein/pgonrails](https://github.com/BenIsenstein/pgonrails) (root: /studio) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | PostgREST | 3000 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `PGRST_DB_URI` | PostgREST | - | Private connection string for Postgres. |
| `PGRST_DB_SCHEMAS` | PostgREST | public,storage,graphql_public | Schemas within Postgres that PostgREST is permitted to expose via RESTful API. |
| `PGRST_JWT_SECRET` | PostgREST | (secret) | Project JWT secret. |
| `PGRST_DB_MAX_ROWS` | PostgREST | 1000 | Max number of rows returned by a request. |
| `PGRST_SERVER_HOST` | PostgREST | :: | Defines the network interface that the server binds to when it starts. |
| `PGRST_SERVER_PORT` | PostgREST | - | The port that PostgREST listens at. |
| `PGRST_DB_ANON_ROLE` | PostgREST | anon | Anon role used in JWTs. |
| `PGRST_DB_USE_LEGACY_GUCS` | PostgREST | false | Whether to use legacy Grand Unified Scheme (GUC) variables. Keep set to "false". |
| `PGRST_APP_SETTINGS_JWT_EXP` | PostgREST | - | Time before refreshing sessions. Defaults to an hour. |
| `PGRST_DB_EXTRA_SEARCH_PATH` | PostgREST | public | Extra schemas added to the search_path of every request. |
| `PGRST_APP_SETTINGS_JWT_SECRET` | PostgREST | (secret) | Project JWT secret. |
| `PORT` | Edge Functions | 9000 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `JWT_SECRET` | Edge Functions | (secret) | Project JWT secret. |
| `VERIFY_JWT` | Edge Functions | false | Whether to verify if a JWT is legit on every request. |
| `SUPABASE_URL` | Edge Functions | - | Private url for Kong. |
| `SUPABASE_DB_URL` | Edge Functions | - | Private url for directly querying Postgres. |
| `EDGE_RUNTIME_PORT` | Edge Functions | - | The port that Edge Functions will listen at. |
| `SUPABASE_ANON_KEY` | Edge Functions | - | Project anon key. |
| `EDGE_RUNTIME_LISTEN` | Edge Functions | :: | Defines the network interface that the server binds to when it starts. |
| `SUPABASE_SECRET_KEYS` | Edge Functions | (secret) | New opaque API keys |
| `SUPABASE_PUBLISHABLE_KEYS` | Edge Functions | - | New opaque API keys |
| `SUPABASE_SERVICE_ROLE_KEY` | Edge Functions | - | Project service role key. |
| `PORT` | Supabase Storage | 5000 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `ANON_KEY` | Supabase Storage | - | Project anon key. |
| `TENANT_ID` | Supabase Storage | default-tenant | Self-hosted storage tenant. |
| `SERVER_HOST` | Supabase Storage | :: | Defines the network interface that the server binds to when it starts. |
| `SERVER_PORT` | Supabase Storage | - | The port Supabase Storage listens at. |
| `SERVICE_KEY` | Supabase Storage | - | Project service key. |
| `DATABASE_URL` | Supabase Storage | - | Postgres connection string. |
| `DB_ANON_ROLE` | Supabase Storage | anon | DB anon role used in JWTs |
| `IMGPROXY_URL` | Supabase Storage | - | Private url for imgproxy. |
| `TUS_URL_PATH` | Supabase Storage | /upload/resumable | Resumable uploads url path. |
| `DB_SUPER_USER` | Supabase Storage | (secret) | DB superuser role (also "supabase_admin") |
| `POSTGREST_URL` | Supabase Storage | - | Private url for PostgREST. |
| `TUS_PART_SIZE` | Supabase Storage | 50 | Resumable uploads part size bytes. |
| `AUTH_JWT_SECRET` | Supabase Storage | (secret) | Project JWT secret. |
| `DB_SERVICE_ROLE` | Supabase Storage | service_role | DB service role used in JWTs |
| `FILE_SIZE_LIMIT` | Supabase Storage | 52428800 | File size |
| `STORAGE_BACKEND` | Supabase Storage | s3 | Storage backend. Can also be "file" but must be "s3" on Railway. |
| `DB_INSTALL_ROLES` | Supabase Storage | false | Whether to install storage DB roles. |
| `AWS_ACCESS_KEY_ID` | Supabase Storage | - | S3 id. |
| `DATABASE_POOL_URL` | Supabase Storage | - | PgBouncer connection string. |
| `SERVER_ADMIN_PORT` | Supabase Storage | 5001 | The port to access Storage admin functions. |
| `STORAGE_S3_BUCKET` | Supabase Storage | - | name of top-level bucket. objects are stored in a structure of <top-level-bucket>/<tenant>/<supabase-bucket>/<object> |
| `STORAGE_S3_REGION` | Supabase Storage | default-region | S3 region doesn't matter for our self-hosted S3-compatible storage. |
| `TUS_URL_EXPIRY_MS` | Supabase Storage | 3600000 | Resumable uploads url expiry milliseconds. |
| `AUTH_JWT_ALGORITHM` | Supabase Storage | HS256 | The algorithm used to sign JWTs. |
| `STORAGE_S3_ENDPOINT` | Supabase Storage | - | URL for S3-compatible storage. |
| `AWS_SECRET_ACCESS_KEY` | Supabase Storage | (secret) | S3 secret. |
| `DB_AUTHENTICATED_ROLE` | Supabase Storage | authenticated | DB role for logged-in users, used in JWTs |
| `STORAGE_S3_MAX_SOCKETS` | Supabase Storage | 200 | Max socket connections with S3-compatible storage. |
| `UPLOAD_FILE_SIZE_LIMIT` | Supabase Storage | 524288000 | File size |
| `IMGPROXY_REQUEST_TIMEOUT` | Supabase Storage | 15 | imgproxy request timeout. |
| `IMGPROXY_HTTP_MAX_SOCKETS` | Supabase Storage | 500 | Max socket connections to imgproxy. |
| `S3_PROTOCOL_ACCESS_KEY_ID` | Supabase Storage | - | S3 id for storage's managing access to consumers |
| `DB_ALLOW_MIGRATION_REFRESH` | Supabase Storage | true | Refresh migration hashes on mismatch |
| `DATABASE_CONNECTION_TIMEOUT` | Supabase Storage | 3000 | Timeout seconds for Postgres connections. |
| `STORAGE_S3_FORCE_PATH_STYLE` | Supabase Storage | true | Use the path style to reference storage objects. |
| `IMAGE_TRANSFORMATION_ENABLED` | Supabase Storage | true | Enable use of imgproxy. |
| `S3_PROTOCOL_ACCESS_KEY_SECRET` | Supabase Storage | (secret) | S3 secret for storage's managing access to consumers |
| `UPLOAD_FILE_SIZE_LIMIT_STANDARD` | Supabase Storage | 52428800 | File size |
| `UPLOAD_SIGNED_URL_EXPIRATION_TIME` | Supabase Storage | 120 | The time window in seconds a consumer has to download a storage object via signed url. |
| `IMAGE_TRANSFORMATION_LIMIT_MAX_SIZE` | Supabase Storage | 2000 | imgproxy max dimensions |
| `IMAGE_TRANSFORMATION_LIMIT_MIN_SIZE` | Supabase Storage | 0 | imgproxy min dimensions |
| `PORT` | Postgres | 5432 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `DB_NAME` | Postgres | postgres | Database name within the Postgres server. |
| `JWT_EXP` | Postgres | - | The Postgres JWT extension config uses "JWT_EXP". |
| `JWT_EXPIRY` | Postgres | 3600 | Time before sessions are refreshed. Default one hour. |
| `JWT_SECRET` | Postgres | (secret) | Please visit the Supabase self-hosting tool in a new tab to generate a JWT secret and keys: https://supabase.com/docs/guides/self-hosting/docker#generate-and-configure-api-keys |
| `POSTGRES_DB` | Postgres | - | Database name within the Postgres server. |
| `POSTGRES_HOST` | Postgres | /var/run/postgresql | Local socket address to run at when performing internal migrations on start. |
| `POSTGRES_PORT` | Postgres | - | Port that Postgres listens at. |
| `DB_AUTH_PASSWORD` | Postgres | (secret) | Postgres password for the auth_admin role. |
| `LISTEN_ADDRESSES` | Postgres | * | Defines the network interface that the server binds to when it starts. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Main DB password. |
| `SUPABASE_ANON_KEY` | Postgres | - | Please visit the Supabase self-hosting tool in a new tab to generate a JWT secret and keys: https://supabase.com/docs/guides/self-hosting/docker#generate-and-configure-api-keys |
| `DB_STORAGE_PASSWORD` | Postgres | (secret) | Postgres password for the storage_admin role. |
| `DB_WEBHOOKS_PASSWORD` | Postgres | (secret) | Postgres password for the functions_admin role (this name might be confusing, the functions_admin role is for webhooks, not edge functions). |
| `SUPABASE_SERVICE_KEY` | Postgres | - | Please visit the Supabase self-hosting tool in a new tab to generate a JWT secret and keys: https://supabase.com/docs/guides/self-hosting/docker#generate-and-configure-api-keys |
| `DB_PGBOUNCER_PASSWORD` | Postgres | (secret) | Postgres password for the pgbouncer role. |
| `DB_SUPERUSER_PASSWORD` | Postgres | (secret) | Postgres password for the postgres and supabase_admin roles. |
| `DB_AUTHENTICATOR_PASSWORD` | Postgres | (secret) | Postgres password for the authenticator role. |
| `DB_PUBLIC_CONNECTION_STRING` | Postgres | - | Public connection string to access the DB. |
| `DB_PRIVATE_CONNECTION_STRING` | Postgres | - | Private network connection string to access the DB. |
| `PORT` | PgBouncer | 5432 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `DB_HOST` | PgBouncer | - | Private network host for Postgres. |
| `DB_PORT` | PgBouncer | - | Port that Postgres listens at. |
| `DB_USER` | PgBouncer | (secret) | The Postgres role that PgBouncer connects to Postgres as before executing client transactions. |
| `AUTH_TYPE` | PgBouncer | scram-sha-256 | The Postgres password encryption type that PgBouncer should use to authenticate connecting clients. This must be "scram-sha-256" because that's how Supabase Postgres encrypts passwords. |
| `POOL_MODE` | PgBouncer | transaction | Postgres connection pool mode. Options are "session", "transaction" and "statement" |
| `AUTH_QUERY` | PgBouncer | SELECT * FROM pgbouncer.get_auth($1) | The query that PgBouncer uses to authenticate connecting clients within Postgres. The pgbouncer.get_auth() function is created within the Postgres DB automatically. |
| `DB_PASSWORD` | PgBouncer | (secret) | Postgres password for DB user. |
| `LISTEN_ADDR` | PgBouncer | * | Defines the network interface that the server binds to when it starts. |
| `LISTEN_PORT` | PgBouncer | - | The port that PgBouncer listens at. |
| `MAX_CLIENT_CONN` | PgBouncer | 100 | The maximum number of client connections that PgBouncer will accept simultaneously. |
| `DEFAULT_POOL_SIZE` | PgBouncer | 20 | The number of server connections that PgBouncer maintains per database in its pool. |
| `PGBOUNCER_PUBLIC_CONNECTION_STRING` | PgBouncer | - | Public connection string to access the connection pooler. |
| `PORT` | Kong | 8000 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `AUTH_HOST` | Kong | - | Auth host for routing. |
| `AUTH_PORT` | Kong | - | Auth port for routing. |
| `META_HOST` | Kong | - | PG Meta host for routing. |
| `META_PORT` | Kong | - | PG Meta port for routing. |
| `REST_HOST` | Kong | - | REST host for routing. |
| `REST_PORT` | Kong | - | REST port for routing. |
| `STUDIO_HOST` | Kong | - | Studio host for routing. |
| `STUDIO_PORT` | Kong | - | Studio port for routing. |
| `KONG_PLUGINS` | Kong | request-transformer,cors,key-auth,acl,basic-auth,request-termination,ip-restriction,post-function | Plugins that Kong will load and make available at runtime. |
| `STORAGE_HOST` | Kong | - | Storage host for routing. |
| `STORAGE_PORT` | Kong | - | Storage port for routing. |
| `KONG_DATABASE` | Kong | off | Setting to "off" enables DB-less mode, loading config from kong.yml instead of a database. Ideal for containerized, version-controlled deployments. |
| `REALTIME_HOST` | Kong | - | Realtime host for routing. |
| `REALTIME_PORT` | Kong | - | Realtime port for routing. |
| `ANALYTICS_HOST` | Kong | stub | Analytics host for routing. There is currently no analytics server in the template. |
| `ANALYTICS_PORT` | Kong | 4000 | Analytics port for routing. There is currently no analytics server in the template. |
| `FUNCTIONS_HOST` | Kong | - | Functions host for routing. |
| `FUNCTIONS_PORT` | Kong | - | Functions port for routing. |
| `KONG_DNS_ORDER` | Kong | AAAA,LAST,A,CNAME | Defines the priority sequence Kong uses when resolving hostnames through DNS. |
| `KONG_PROXY_LISTEN` | Kong | - | Specifies the network addresses and ports on which Kong’s proxy interface listens for incoming traffic. |
| `SUPABASE_ANON_KEY` | Kong | - | Project anon key. |
| `DASHBOARD_PASSWORD` | Kong | (secret) | Password to access Supabase Studio. |
| `DASHBOARD_USERNAME` | Kong | (secret) | Username to access Supabase Studio. |
| `SUPABASE_SERVICE_KEY` | Kong | - | Project service role key. |
| `KONG_PROXY_ACCESS_LOG` | Kong | /dev/stdout combined | - |
| `KONG_DNS_NOT_FOUND_TTL` | Kong | 1 | - |
| `KONG_DECLARATIVE_CONFIG` | Kong | /usr/local/kong/kong.yml | Local filepath to kong.yml |
| `KONG_NGINX_WORKER_PROCESSES` | Kong | 2 | Sets the number of Nginx worker processes Kong spawns to handle incoming network connections and process requests. Setting to "auto" will match the number of CPU cores, for max cuncurrency and higher memory overhead. |
| `KONG_NGINX_PROXY_PROXY_BUFFERS` | Kong | 64 160k | Number and size of in-memory buffers to handle responses from upstream services. If the upstream response (headers + initial body) fits within this buffer size, it’s handled entirely in memory — faster and more efficient. |
| `PORT` | imgproxy | 5001 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `IMGPROXY_BIND` | imgproxy | - | Defines the network interface and port that the server bind to when it starts. |
| `IMGPROXY_USE_S3` | imgproxy | true | Use S3-compatible storage to read images before transforming them. |
| `AWS_ACCESS_KEY_ID` | imgproxy | - | S3 id. |
| `IMGPROXY_USE_ETAG` | imgproxy | true | Enable or disable the use of ETag HTTP headers when serving images through the proxy. |
| `IMGPROXY_AUTO_WEBP` | imgproxy | true | Enable WebP support detection. When the file extension is omitted in the imgproxy URL and browser supports WebP, imgproxy will use it as the resulting format. |
| `IMGPROXY_S3_ENDPOINT` | imgproxy | - | URL for S3-compatible storage. |
| `AWS_SECRET_ACCESS_KEY` | imgproxy | (secret) | S3 secret. |
| `IMGPROXY_JPEG_PROGRESSIVE` | imgproxy | true | Enables progressive JPEG compression. |
| `IMGPROXY_IGNORE_SSL_VERIFICATION` | imgproxy | true | Disable SSL verification, so imgproxy can be used in an environment with self-signed SSL certificates. |
| `PORT` | Site | 5173 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `HOSTNAME` | Site | :: | Defines the network interface that the server binds to when it starts. |
| `SUPABASE_URL` | Site | - | Private url for Kong. |
| `DEPENDS_ON_STORAGE` | Site | - | Ensure that Storage has started and run its DB migrations before Site does. |
| `NEXT_PUBLIC_SITE_URL` | Site | - | Public url for the site. |
| `NEXT_PUBLIC_SUPABASE_URL` | Site | - | Public url for Kong. |
| `SUPABASE_SERVICE_ROLE_KEY` | Site | - | Project service role key FOR USE ON THE SERVER ONLY. |
| `DB_PRIVATE_CONNECTION_STRING` | Site | - | Private network connection string to run DB migrations on startup. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Site | - | Project anon key which can safely be in a user's browser. |
| `NEXT_PUBLIC_UPDATE_PASSWORD_REQUIRE_REAUTHENTICATION` | Site | (secret) | Whether to require a one-time passcode during password change. Read from the Auth service ENV config. |
| `PORT` | Supabase Realtime | 4000 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `DB_HOST` | Supabase Realtime | - | Private network host for Postgres. |
| `DB_NAME` | Supabase Realtime | - | Database name within the Postgres server. |
| `DB_PORT` | Supabase Realtime | - | Port that Postgres can be accessed at. |
| `DB_USER` | Supabase Realtime | (secret) | Postgres role to access the DB as. |
| `APP_NAME` | Supabase Realtime | realtime | Realtime server name. |
| `DNS_NODES` | Supabase Realtime | '' | A list of DNS server nodes or resolvers to use for name resolution in distributed or clustered environments. |
| `DB_ENC_KEY` | Supabase Realtime | - | Key used to encrypt sensitive fields in _realtime.tenants and _realtime.extensions tables. |
| `ERL_AFLAGS` | Supabase Realtime | -proto_dist inet6_tcp | Set to either "-proto_dist inet_tcp" or "-proto_dist inet6_tcp" depending on whether or not your network uses IPv4 or IPv6, respectively. |
| `DB_PASSWORD` | Supabase Realtime | (secret) | Postgres password for DB user. |
| `RUN_JANITOR` | Supabase Realtime | true | Do you want to janitor tasks to run |
| `RLIMIT_NOFILE` | Supabase Realtime | 10000 | Maximum number of concurrent open network connections or open files. |
| `API_JWT_SECRET` | Supabase Realtime | (secret) | Project JWT secret. |
| `SEED_SELF_HOST` | Supabase Realtime | true | Create a tenant for self-hosting on startup. |
| `SECRET_KEY_BASE` | Supabase Realtime | (secret) | Secret used by the server to sign cookies. |
| `SELF_HOST_TENANT_NAME` | Supabase Realtime | supabase-realtime | Realtime tenant name for self-hosting. MUST MATCH THE SUBDOMAIN OF THIS SERVICE AS IT APPEARS IN THE RAILWAY PRIVATE NETWORK. This service was named "Supabase Realtime" in the project so that it will automatically deploy with the url of "supabase-realtime.railway.internal" in the private network. |
| `DB_AFTER_CONNECT_QUERY` | Supabase Realtime | SET search_path TO _realtime | DB query to run on connect. |
| `PORT` | Postgres Meta | 8080 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `CRYPTO_KEY` | Postgres Meta | - | Encryption key for securing connection strings between Studio and Postgres Meta. |
| `PG_META_HOST` | Postgres Meta | :: | Defines the network interface that the server binds to when it starts. |
| `PG_META_PORT` | Postgres Meta | - | The port that PG Meta listens on. |
| `PG_META_DB_HOST` | Postgres Meta | - | DB networking host. |
| `PG_META_DB_NAME` | Postgres Meta | - | Database name within Postgres. |
| `PG_META_DB_PORT` | Postgres Meta | - | DB port. |
| `PG_META_DB_USER` | Postgres Meta | (secret) | The Postgres role that PG Meta will make queries as. |
| `PG_META_DB_PASSWORD` | Postgres Meta | (secret) | The Postgres password for DB user. |
| `PORT` | Supabase Auth | 9999 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `GOTRUE_JWT_AUD` | Supabase Auth | authenticated | the "aud" key on every JWT payload. |
| `GOTRUE_JWT_EXP` | Supabase Auth | - | Time before refreshing sessions. Default one hour. |
| `GOTRUE_API_HOST` | Supabase Auth | :: | Defines the network interface that the server binds to when it starts. |
| `GOTRUE_API_PORT` | Supabase Auth | - | The port that Auth listens at. |
| `GOTRUE_SITE_URL` | Supabase Auth | - | Public url for site for Auth redirects. |
| `API_EXTERNAL_URL` | Supabase Auth | - | Public url for Kong for redirects. |
| `GOTRUE_DB_DRIVER` | Supabase Auth | postgres | Must be "postgres". |
| `GOTRUE_SMTP_HOST` | Supabase Auth | smtp.gmail.com | SMTP server for transactional emails. |
| `GOTRUE_SMTP_PASS` | Supabase Auth | abcd efgh ijkl mnop | SMTP password for authentication with the server. |
| `GOTRUE_SMTP_PORT` | Supabase Auth | 587 | The port your SMTP provider listens at. |
| `GOTRUE_SMTP_USER` | Supabase Auth | (secret) | SMTP user for authentication with the server. |
| `GOTRUE_JWT_SECRET` | Supabase Auth | (secret) | Project JWT secret. |
| `GOTRUE_DB_DATABASE_URL` | Supabase Auth | - | Postgres connection string. |
| `GOTRUE_JWT_ADMIN_ROLES` | Supabase Auth | service_role | Admin role to include in service_role JWTs. |
| `GOTRUE_SMTP_ADMIN_EMAIL` | Supabase Auth | johndoe@gmail.com | Email address to receive troubleshooting emails. |
| `GOTRUE_SMTP_SENDER_NAME` | Supabase Auth | PG On Rails | Transactional email sender name. |
| `GOTRUE_MAILER_AUTOCONFIRM` | Supabase Auth | true | Set to "true" to disable emails, which can be useful in development. Set to "false" to require email confirmations. NOTE - SMTP traffic on Railway is only allowed for the Pro Plan and above. |
| `GOTRUE_MAILER_EXTERNAL_HOSTS` | Supabase Auth | - | Auth should expect requests from these hosts. |
| `GOTRUE_JWT_DEFAULT_GROUP_NAME` | Supabase Auth | authenticated | The default role that is given to users in their access token after authentication. Used by Postgres for row-level-security (RLS). |
| `GOTRUE_MAILER_URLPATHS_INVITE` | Supabase Auth | /auth/v1/verify | Where to redirect users from emails. Relative path within Kong. |
| `GOTRUE_MAILER_TEMPLATES_INVITE` | Supabase Auth | - | Invite email template. |
| `AUTH_LOCAL_MAILER_TEMPLATES_URL` | Supabase Auth | http://localhost:8080 | Local path within the Auth docker container to fetch email templates. |
| `GOTRUE_MAILER_URLPATHS_RECOVERY` | Supabase Auth | /auth/v1/verify | Where to redirect users from emails. Relative path within Kong. |
| `GOTRUE_MAILER_TEMPLATES_RECOVERY` | Supabase Auth | - | Forgot password email template. |
| `GOTRUE_MAILER_TEMPLATES_MAGIC_LINK` | Supabase Auth | - | Magic link signin email template. |
| `GOTRUE_MAILER_URLPATHS_CONFIRMATION` | Supabase Auth | /auth/v1/verify | Where to redirect users from emails. Relative path within Kong. |
| `GOTRUE_MAILER_URLPATHS_EMAIL_CHANGE` | Supabase Auth | /auth/v1/verify | Where to redirect users from emails. Relative path within Kong. |
| `GOTRUE_MAILER_TEMPLATES_CONFIRMATION` | Supabase Auth | - | Confirm signup email template. |
| `GOTRUE_MAILER_TEMPLATES_EMAIL_CHANGE` | Supabase Auth | - | Email change email template. |
| `GOTRUE_MAILER_SUBJECTS_REAUTHENTICATION` | Supabase Auth | Your One-Time Passcode | The default subject for the OTP email is cringe and needs to be overridden. |
| `GOTRUE_MAILER_TEMPLATES_REAUTHENTICATION` | Supabase Auth | - | Password change OTP template. |
| `GOTRUE_MAILER_TEMPLATES_EMAIL_CHANGED_NOTIFICATION` | Supabase Auth | - | Email changed notification email template. |
| `GOTRUE_MAILER_TEMPLATES_PHONE_CHANGED_NOTIFICATION` | Supabase Auth | - | Phone changed notification email template. |
| `GOTRUE_MAILER_TEMPLATES_IDENTITY_LINKED_NOTIFICATION` | Supabase Auth | - | Identity linked notification email template. |
| `GOTRUE_MAILER_TEMPLATES_PASSWORD_CHANGED_NOTIFICATION` | Supabase Auth | (secret) | Password changed notification email template. |
| `GOTRUE_MAILER_TEMPLATES_IDENTITY_UNLINKED_NOTIFICATION` | Supabase Auth | - | Identity unlinked notification email template. |
| `GOTRUE_MAILER_TEMPLATES_MFA_FACTOR_ENROLLED_NOTIFICATION` | Supabase Auth | - | MFA factor enrolled notification email template. |
| `GOTRUE_SECURITY_UPDATE_PASSWORD_REQUIRE_REAUTHENTICATION` | Supabase Auth | (secret) | When set to "true", when a user hasn't manually signed in for 24 hours, in order to change their password, they must provide a OTP from their email or phone. |
| `GOTRUE_MAILER_TEMPLATES_MFA_FACTOR_UNENROLLED_NOTIFICATION` | Supabase Auth | - | MFA factor unenrolled notification email template. |
| `PORT` | MinIO | 9000 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `S3_ID` | MinIO | - | S3 id for other services to reference. |
| `S3_SECRET` | MinIO | (secret) | S3 secret for other services to reference. |
| `CONSOLE_PORT` | MinIO | 9001 | Port for the MinIO admin console. Public networking over HTTP must be turned on for the service, and pointed at port 9001. |
| `MINIO_ROOT_USER` | MinIO | (secret) | S3 id. |
| `STORAGE_S3_BUCKET` | MinIO | default-bucket | name of top-level bucket. objects are stored in a structure of <top-level-bucket>/<tenant>/<supabase-bucket>/<object> |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | S3 secret. |
| `PORT` | Supabase Studio | 3000 | All PG On Rails services declare PORT to standardize building urls within the Railway private network. |
| `HOSTNAME` | Supabase Studio | :: | Defines the network interface that the server binds to when it starts. |
| `POSTGRES_DB` | Supabase Studio | - | DB name within Postgres. |
| `SUPABASE_URL` | Supabase Studio | - | Private url for Kong. |
| `POSTGRES_HOST` | Supabase Studio | - | DB private network host. |
| `POSTGRES_PORT` | Supabase Studio | - | DB port. |
| `OPENAI_API_KEY` | Supabase Studio | (secret) | API key to use the AI assistant in Supabase Studio and be billed from your OpenAI account. |
| `AUTH_JWT_SECRET` | Supabase Studio | (secret) | Project JWT secret. |
| `POSTGRES_PASSWORD` | Supabase Studio | (secret) | Postgres password for DB superuser. |
| `SUPABASE_ANON_KEY` | Supabase Studio | - | Project anon key. |
| `PG_META_CRYPTO_KEY` | Supabase Studio | - | Encryption key for securing connection strings between Studio and Postgres Meta. |
| `STUDIO_PG_META_URL` | Supabase Studio | - | Private url for Postgres Meta. |
| `SUPABASE_PUBLIC_URL` | Supabase Studio | - | Public url for Kong. |
| `DEFAULT_PROJECT_NAME` | Supabase Studio | PG On Rails | Project name which appears in the browser tab for Supabase Studio. |
| `SUPABASE_SERVICE_KEY` | Supabase Studio | - | Project service role key. |
| `DEFAULT_ORGANIZATION_NAME` | Supabase Studio | My Org | Organization name which appears in the browser tab for Supabase Studio |
| `SNIPPETS_MANAGEMENT_FOLDER` | Supabase Studio | /app/snippets | Local filepath in the container for SQL snippets |
| `EDGE_FUNCTIONS_MANAGEMENT_FOLDER` | Supabase Studio | /app/edge-functions | Local filepath in the container for edge functions |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9000
- **Volume:** `/data`

**Category:** Starters · **Languages:** TypeScript, Shell, PLpgSQL, Dockerfile, CSS, HTML, JavaScript

[View on Railway →](https://railway.com/deploy/complete-supabase-nextjs-frontend)
