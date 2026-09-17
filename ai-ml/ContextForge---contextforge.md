# Deploy ContextForge on Railway

Gateway and registry that unifies MCP servers behind one endpoint

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/contextforge)

## About

MCP Context Forge — IBM's ContextForge — is an open-source AI gateway and registry for the Model Context Protocol. It sits in front of every MCP server, A2A agent and REST API your team uses and publishes them as one authenticated endpoint, so Claude Desktop, VS Code, Cursor or your own agent framework connects once instead of holding a dozen server definitions and a dozen credentials. It federates remote servers, discovers their tools, composes subsets into virtual servers, and puts JWT auth, rate limiting and metrics in front of all of it.

Deploy MCP Context Forge on Railway and you get the production shape, not a single container: **mcp-context-forge**, the gateway itself, on a public HTTPS URL; **Postgres**, holding the registry of servers, tools, prompts, users, teams and API tokens; and **Redis**, backing the cache, the MCP session registry, session affinity across workers and leader election. Browsers and MCP clients arrive over the public domain; everything else stays private. Self-host MCP Context Forge this way and you supply only an admin email and password.

![Diagram of the ContextForge gateway with Postgres and Redis on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789581258/mcp-context-forge-architecture.webp)

MCP clients were designed to talk to one server at a time, usually a local process. That breaks the moment a team has twenty servers, some remote, some behind OAuth, each with its own credential. ContextForge registers them once, keeps their tool catalogues fresh, and re-publishes everything through one MCP endpoint with real authentication and observability in the path.

- **Federation** — register remote MCP servers over Streamable HTTP or SSE; tools, prompts and resources are discovered and refreshed automatically
- **Virtual servers** — compose a subset of federated tools into one named endpoint per team
- **REST, gRPC and A2A wrapping** — turn an API or agent endpoint into MCP tools
- **Auth and multi-tenancy** — email login, SSO, scoped JWT tokens, teams, per-token IP limits
- **Plugins and observability** — PII-redaction and OPA hooks, per-tool metrics, Prometheus

The gateway is a FastAPI application served by Gunicorn with Uvicorn workers. It runs its own Alembic migrations on boot under a database advisory lock, so there is no manual migration step.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| mcp-context-forge | `ghcr.io/ibm/mcp-context-forge:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `HOST` | mcp-context-forge | 0.0.0.0 | Bind address; image default 127.0.0.1 is unreachable |
| `PORT` | mcp-context-forge | 8080 | HTTP listening port |
| `LOG_LEVEL` | mcp-context-forge | INFO | Application log level |
| `REDIS_URL` | mcp-context-forge | - | Cache and session backend |
| `APP_DOMAIN` | mcp-context-forge | - | Public base URL |
| `CACHE_TYPE` | mcp-context-forge | redis | Cache backend selector |
| `JWT_ISSUER` | mcp-context-forge | - | Token issuer claim |
| `ENVIRONMENT` | mcp-context-forge | production | Runtime profile |
| `LOG_TO_FILE` | mcp-context-forge | false | Log to stdout, not a file |
| `REQUIRE_JTI` | mcp-context-forge | true | Tokens must carry a revocation id |
| `CSRF_ENABLED` | mcp-context-forge | true | CSRF protection on writes |
| `DATABASE_URL` | mcp-context-forge | - | SQLAlchemy connection string |
| `DB_POOL_SIZE` | mcp-context-forge | 5 | Connections per worker |
| `JWT_AUDIENCE` | mcp-context-forge | - | Token audience claim |
| `AUTH_REQUIRED` | mcp-context-forge | true | Reject anonymous requests |
| `DB_POOL_CLASS` | mcp-context-forge | queue | SQLAlchemy pool implementation |
| `JWT_SECRET_KEY` | mcp-context-forge | (secret) | Signs tokens and sessions |
| `SECURE_COOKIES` | mcp-context-forge | true | Secure flag on session cookies |
| `TRANSPORT_TYPE` | mcp-context-forge | all | Enable HTTP, SSE and streamable HTTP |
| `ALLOWED_ORIGINS` | mcp-context-forge | - | CORS allow-list |
| `COOKIE_SAMESITE` | mcp-context-forge | lax | SameSite policy |
| `DB_MAX_OVERFLOW` | mcp-context-forge | 5 | Burst connections per worker |
| `DB_POOL_PRE_PING` | mcp-context-forge | true | Validate connections before use |
| `GUNICORN_TIMEOUT` | mcp-context-forge | 600 | Worker request timeout in seconds |
| `GUNICORN_WORKERS` | mcp-context-forge | 4 | Worker processes; host cores would give 16 |
| `MCP_REQUIRE_AUTH` | mcp-context-forge | true | JWT required on the MCP endpoint |
| `TRUST_PROXY_AUTH` | mcp-context-forge | false | Never trust proxy identity headers |
| `CSRF_COOKIE_SECURE` | mcp-context-forge | true | Secure flag on the CSRF cookie |
| `EMAIL_AUTH_ENABLED` | mcp-context-forge | true | Email and password login |
| `BASIC_AUTH_PASSWORD` | mcp-context-forge | (secret) | Unused while basic auth is off |
| `FORWARDED_ALLOW_IPS` | mcp-context-forge | * | Trust proxy headers from the edge |
| `API_ALLOW_BASIC_AUTH` | mcp-context-forge | false | No basic-auth fallback |
| `CSRF_TRUSTED_ORIGINS` | mcp-context-forge | - | CSRF origin allow-list |
| `GUNICORN_PRELOAD_APP` | mcp-context-forge | true | Fork workers after import |
| `PLATFORM_ADMIN_EMAIL` | mcp-context-forge | admin@example.com | First admin account |
| `SSRF_ALLOW_LOCALHOST` | mcp-context-forge | false | Block loopback upstreams |
| `SSRF_DNS_FAIL_CLOSED` | mcp-context-forge | true | Reject upstreams that fail DNS |
| `DEFAULT_USER_PASSWORD` | mcp-context-forge | (secret) | Password for admin-created users |
| `MCPGATEWAY_UI_ENABLED` | mcp-context-forge | true | Serve the admin UI |
| `RATE_LIMITING_ENABLED` | mcp-context-forge | true | Redis-backed request limits |
| `USE_STATEFUL_SESSIONS` | mcp-context-forge | true | Required for the GET /mcp stream |
| `AUTH_ENCRYPTION_SECRET` | mcp-context-forge | (secret) | Encrypts stored upstream credentials |
| `MCP_CLIENT_AUTH_ENABLED` | mcp-context-forge | true | JWT required on MCP operations |
| `PLATFORM_ADMIN_PASSWORD` | mcp-context-forge | (secret) | First admin password |
| `SSRF_PROTECTION_ENABLED` | mcp-context-forge | true | Block internal outbound targets |
| `REQUIRE_TOKEN_EXPIRATION` | mcp-context-forge | (secret) | Reject non-expiring tokens |
| `SECURITY_HEADERS_ENABLED` | mcp-context-forge | true | CSP, HSTS and frame options |
| `MCPGATEWAY_CATALOG_ENABLED` | mcp-context-forge | true | Curated public server catalogue |
| `MCPGATEWAY_SKIP_MIGRATIONS` | mcp-context-forge | false | Gateway runs its own migrations |
| `PUBLIC_REGISTRATION_ENABLED` | mcp-context-forge | false | Admin creates all accounts |
| `SSRF_ALLOW_PRIVATE_NETWORKS` | mcp-context-forge | false | Set true for railway.internal upstreams |
| `MCPGATEWAY_ADMIN_API_ENABLED` | mcp-context-forge | true | Serve the admin API |
| `PRIMARY_WORKER_ELECTION_BACKEND` | mcp-context-forge | redis | Cluster-wide leader election |
| `MCPGATEWAY_SESSION_AFFINITY_ENABLED` | mcp-context-forge | true | Route MCP sessions to their worker |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/contextforge)
