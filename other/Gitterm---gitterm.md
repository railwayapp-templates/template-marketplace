# Deploy Gitterm on Railway

Run Agents Anytime, Anywhere, on Any Cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitterm)

## About

GitTerm lets you run OpenCode in remote, persistent workspaces you can reopen from anywhere. It ships with a web app, API, proxy, worker, Postgres, and Redis, and works across multiple infrastructure backends with more provider support on the way. Deploy it on Railway, add your admin login, then configure workspace providers from the app. Use path routing for a standard single domain, or subdomain routing if you have wildcard domain support on the proxy.

## What You Need

Required:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Optional later:

- GitHub OAuth credentials for sign-in
- GitHub App credentials for repository access
- Provider credentials for Railway, AWS, E2B, Cloudflare, and future providers

Provider configuration is done inside the GitTerm admin UI, not in the template form.

## Routing

### Path Routing

Best when you only have a single normal domain on the proxy.

- `https://your-domain.com/` -&gt; app
- `https://your-domain.com/api/` -&gt; API
- `https://your-domain.com/listener/` -&gt; listener
- `https://your-domain.com/ws//` -&gt; workspaces

### Subdomain Routing

Use this only if your proxy domain has wildcard DNS and wildcard TLS support.

- `https://-.your-domain.com`

If you are unsure, use path routing.

## Startup Behavior

On startup, the server automatically:

1. runs database migrations
2. seeds built-in app data
3. creates or upgrades the admin user when `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set

## Services Included

- `web`
- `server`
- `listener`
- `worker`
- `proxy`
- PostgreSQL
- Redis

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gitterm-server | `ghcr.io/opeoginni/gitterm-server` | Worker |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| gitterm-web | `ghcr.io/opeoginni/gitterm-web` | Worker |
| gitterm-listener | `ghcr.io/opeoginni/gitterm-listener` | Worker |
| gitterm-idle-reaper-worker | `ghcr.io/opeoginni/gitterm-idle-reaper-worker` | Worker |
| gitterm-caddy-proxy | `ghcr.io/opeoginni/gitterm-proxy` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `API_URL` | gitterm-server | - | Public API URL exposed through Caddy |
| `BASE_URL` | gitterm-server | - | Public application origin used for redirects and generated links |
| `REDIS_URL` | gitterm-server | - | Redis connection supplied by Railway |
| `ADMIN_EMAIL` | gitterm-server | - | Initial administrator email; set together with ADMIN_PASSWORD |
| `BASE_DOMAIN` | gitterm-server | - | Public domain without protocol or path |
| `CORS_ORIGIN` | gitterm-server | - | Browser origin allowed to send authenticated requests |
| `DATABASE_URL` | gitterm-server | - | PostgreSQL connection supplied by Railway |
| `ROUTING_MODE` | gitterm-server | path | Routes workspaces through /ws/... without wildcard DNS |
| `ADMIN_PASSWORD` | gitterm-server | (secret) | Initial administrator password; set together with ADMIN_EMAIL |
| `BETTER_AUTH_URL` | gitterm-server | - | Better Auth origin; do not append /api or /api/auth |
| `DEPLOYMENT_MODE` | gitterm-server | self-hosted | Uses self-hosted behavior and email-only login |
| `INTERNAL_API_KEY` | gitterm-server | (secret) | Shared secret for internal service-to-service authentication |
| `WORKSPACE_API_URL` | gitterm-server | - | Public tRPC endpoint injected into workspaces |
| `BETTER_AUTH_SECRET` | gitterm-server | (secret) | Secret used to sign and encrypt authentication sessions |
| `WORKSPACE_JWT_SECRET` | gitterm-server | (secret) | Secret used to sign workspace-scoped tokens |
| `ENCRYPTION_MASTER_KEY` | gitterm-server | - | Persistent 32-byte hexadecimal key used to encrypt stored credentials |
| `DEVICE_CODE_VERIFICATION_URI` | gitterm-server | - | Page used to complete CLI device authentication |
| `REDISHOST` | Redis | - | Private Railway hostname used by services in the same project |
| `REDISPORT` | Redis | 6379 | Internal Redis port |
| `REDISUSER` | Redis | default | Default Redis ACL username |
| `REDIS_URL` | Redis | - | Private Redis connection string used by GitTerm services |
| `REDISPASSWORD` | Redis | (secret) | Compatibility alias for clients expecting REDISPASSWORD |
| `REDIS_PASSWORD` | Redis | (secret) | Automatically generated Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection string for external Redis access |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NEXT_PUBLIC_AUTH_URL` | gitterm-web | - | Better Auth origin supplied by the server |
| `NEXT_PUBLIC_SERVER_URL` | gitterm-web | - | Public API endpoint supplied by the server |
| `NEXT_PUBLIC_BASE_DOMAIN` | gitterm-web | - | Public domain without protocol |
| `NEXT_PUBLIC_LISTENER_URL` | gitterm-web | - | Public real-time listener endpoint |
| `NEXT_PUBLIC_ROUTING_MODE` | gitterm-web | - | Matches the server and proxy routing mode |
| `SERVER_URL` | gitterm-listener | - | Private address of the API server |
| `BASE_DOMAIN` | gitterm-listener | - | Public application domain without protocol |
| `CORS_ORIGIN` | gitterm-listener | - | Browser origin allowed to open subscriptions |
| `DATABASE_URL` | gitterm-listener | - | Database used for authentication and webhook processing |
| `BETTER_AUTH_URL` | gitterm-listener | - | Public Better Auth origin |
| `INTERNAL_API_KEY` | gitterm-listener | (secret) | Shared key used for protected server procedures |
| `BETTER_AUTH_SECRET` | gitterm-listener | (secret) | Shared auth secret required to validate sessions |
| `WORKSPACE_JWT_SECRET` | gitterm-listener | (secret) | Worksapce JWT Secret |
| `ENCRYPTION_MASTER_KEY` | gitterm-listener | - | Shard key for encrypting and decrypting keys |
| `SERVER_URL` | gitterm-idle-reaper-worker | - | Private address of the API server |
| `DEPLOYMENT_MODE` | gitterm-idle-reaper-worker | self-hosted | Uses self-hosted lifecycle behavior without managed quotas |
| `INTERNAL_API_KEY` | gitterm-idle-reaper-worker | (secret) | Shared key used for workspace lifecycle procedures |
| `ENABLE_IDLE_REAPING` | gitterm-idle-reaper-worker | - | Controls automatic idle workspace cleanup |
| `PORT` | gitterm-caddy-proxy | 80 | Default Port for healthchecks |
| `WEB_URL` | gitterm-caddy-proxy | - | Private Railway address of the web service |
| `SERVER_URL` | gitterm-caddy-proxy | - | Private Railway address of the API server |
| `BASE_DOMAIN` | gitterm-caddy-proxy | - | Public domain assigned to the proxy |
| `LISTENER_URL` | gitterm-caddy-proxy | - | Private Railway address of the listener |
| `ROUTING_MODE` | gitterm-caddy-proxy | path | Uses single-domain /ws/... workspace routing |
| `INTERNAL_API_KEY` | gitterm-caddy-proxy | (secret) | Shared key used when Caddy calls protected server endpoints |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitterm)
