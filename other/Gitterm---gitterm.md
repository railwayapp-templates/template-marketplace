# Deploy Gitterm on Railway

Run Opencode Anytime, Anywhere, on Any Cloud

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gitterm)

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
| `ROUTING_MODE` | gitterm-server | path | - |
| `GITHUB_APP_ID` | gitterm-server | - | For Github Operations Integration |
| `ADMIN_PASSWORD` | gitterm-server | (secret) | - |
| `DEPLOYMENT_MODE` | gitterm-server | self-hosted | - |
| `AGENT_JWT_SECRET` | gitterm-server | (secret) | - |
| `GITHUB_CLIENT_ID` | gitterm-server | - | For Github Oauth. |
| `INTERNAL_API_KEY` | gitterm-server | (secret) | Key used by other services to talk to the main server. |
| `ENABLE_EMAIL_AUTH` | gitterm-server | true | Enable email/password authentication. |
| `BETTER_AUTH_SECRET` | gitterm-server | (secret) | - |
| `ENABLE_GITHUB_AUTH` | gitterm-server | false | - |
| `ENABLE_IDLE_REAPING` | gitterm-server | true | Stop idle workspaces automatically |
| `GITHUB_CLIENT_SECRET` | gitterm-server | (secret) | For Github Oauth |
| `GITHUB_APP_PRIVATE_KEY` | gitterm-server | - | For Github Operations Integration |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `NEXT_PUBLIC_ENABLE_BILLING` | gitterm-web | false | - |
| `BASE_DOMAIN` | gitterm-listener | - | Domain of Web App |
| `CORS_ORIGIN` | gitterm-listener | - | URL of Web App |
| `INTERNAL_API_KEY` | gitterm-listener | (secret) | - |
| `DEPLOYMENT_MODE` | gitterm-idle-reaper-worker | self-hosted | Mode of Deployment |
| `INTERNAL_API_KEY` | gitterm-idle-reaper-worker | (secret) | - |
| `SERVER_URL` | gitterm-caddy-proxy | - | URL of the main server |
| `INTERNAL_API_KEY` | gitterm-caddy-proxy | (secret) | Key used for authentication between services |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/gitterm)
