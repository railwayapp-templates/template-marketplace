# Deploy Grafana on Railway

Datadog Alternative. Dashboards, alerts, PromQL, SQL, Loki, PNG export

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grafana-dashboards)

## About

Grafana is the open source dashboarding and alerting layer most engineering teams put in front of their metrics, logs and traces. It queries data where it already lives — Prometheus, PostgreSQL, MySQL, Loki, Elasticsearch, ClickHouse, InfluxDB, CloudWatch and a hundred more — and turns it into shared dashboards, ad-hoc exploration and alert rules. Teams self-host Grafana as the answer to Datadog when per-host or per-series billing stops making sense.

Deploy Grafana on Railway in the shape its own docs call production, not as one container with a SQLite file inside it. This template runs `grafana/grafana` behind a managed public URL, keeps every dashboard, user, API key and data source in managed PostgreSQL, uses managed Redis as the remote cache, and runs `grafana/grafana-image-renderer` privately so image export works. A volume at `/var/lib/grafana` holds plugins and generated files across restarts.

![Grafana Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786745937/7d9aae2d-4312-4270-8c96-981f33c6f46a.png)

Grafana is a Go binary with a React frontend that owns no data of its own. It keeps configuration in a database and queries everything else live, so self-hosting is cheap: you run a query layer, not a second copy of your telemetry.

Key features:

- Dashboards over 100+ data sources, mixed freely on one panel
- Unified alerting to Slack, PagerDuty, email, Teams and webhooks
- Explore mode for ad-hoc PromQL, LogQL and SQL, no panel required
- Teams, folder permissions, API keys and OAuth/LDAP/SAML login

How the services fit together. **Grafana** is the only public one, serving the UI and API on port 3000. **PostgreSQL** replaces the default SQLite file and holds dashboards, users, sessions and encrypted data source credentials, so a redeploy neither logs you out nor loses work. **Redis** is the remote cache. **image-renderer** is headless Chromium; the in-process rendering plugin is deprecated upstream, so a separate container is the supported path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| image-renderer | `grafana/grafana-image-renderer:latest` | Worker |
| Grafana | `grafana/grafana:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `PORT` | image-renderer | 8081 | Port Railway health-checks |
| `LOG_LEVEL` | image-renderer | info | Log verbosity |
| `AUTH_TOKEN` | image-renderer | (secret) | Shared token from Grafana |
| `LOG_FORMAT` | image-renderer | json | Structured log output |
| `SERVER_ADDR` | image-renderer | :8081 | Renderer listen address |
| `BROWSER_TIMEZONE` | image-renderer | Etc/UTC | Timezone used when rendering |
| `API_DEFAULT_ENCODING` | image-renderer | png | Default rendered image format |
| `RATE_LIMIT_MAX_AVAILABLE` | image-renderer | 6442450944 | Memory budget for browser concurrency |
| `PORT` | Grafana | 3000 | Port Railway health-checks |
| `GF_LOG_MODE` | Grafana | console | Log to stdout |
| `GF_LOG_LEVEL` | Grafana | info | Log verbosity |
| `GF_DATABASE_HOST` | Grafana | - | Database host and port |
| `GF_DATABASE_NAME` | Grafana | - | Database name |
| `GF_DATABASE_TYPE` | Grafana | postgres | Backend database engine |
| `GF_DATABASE_USER` | Grafana | (secret) | Database user |
| `GF_SERVER_DOMAIN` | Grafana | - | Public hostname |
| `GF_SERVER_ROOT_URL` | Grafana | - | Public base URL |
| `GF_SERVER_HTTP_PORT` | Grafana | 3000 | HTTP listening port |
| `GF_DATABASE_PASSWORD` | Grafana | (secret) | Database password |
| `GF_DATABASE_SSL_MODE` | Grafana | disable | Private network, no TLS needed |
| `GF_REMOTE_CACHE_TYPE` | Grafana | redis | Remote cache backend |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) | Built-in admin username |
| `GF_SECURITY_SECRET_KEY` | Grafana | (secret) | Encrypts stored data source credentials |
| `GF_USERS_ALLOW_SIGN_UP` | Grafana | false | Disable open registration |
| `GF_REMOTE_CACHE_CONNSTR` | Grafana | - | Redis cache connection string |
| `GF_RENDERING_SERVER_URL` | Grafana | http://image-renderer.railway.internal:8081/render | Private renderer endpoint |
| `GF_AUTH_ANONYMOUS_ENABLED` | Grafana | false | Disable anonymous access |
| `GF_RENDERING_CALLBACK_URL` | Grafana | http://grafana.railway.internal:3000/ | Callback URL renderer loads |
| `GF_SECURITY_COOKIE_SECURE` | Grafana | true | HTTPS-only session cookies |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) | Set this — your admin password |
| `GF_RENDERING_RENDERER_TOKEN` | Grafana | (secret) | Shared token for render requests |
| `GF_SECURITY_CONTENT_SECURITY_POLICY` | Grafana | true | Enable content security policy |
| `GF_SECURITY_STRICT_TRANSPORT_SECURITY` | Grafana | true | Send HSTS header |
| `GF_SECURITY_CONTENT_SECURITY_POLICY_TEMPLATE` | Grafana | script-src 'self' 'unsafe-eval' 'unsafe-inline' 'strict-dynamic' $NONCE;object-src 'none';font-src 'self';style-src 'self' 'unsafe-inline' blob:;img-src * data: blob:;base-uri 'self';connect-src 'self' grafana.com ws://$ROOT_PATH wss://$ROOT_PATH;manifest-src 'self';media-src 'none';form-action 'self' $FORM_ACTION_ADDITIONAL_HOSTS; | CSP allowing blob: image export |
| `GF_SECURITY_STRICT_TRANSPORT_SECURITY_MAX_AGE_SECONDS` | Grafana | 31536000 | HSTS max age, one year |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c 'echo "boot: uid=$(id -u) mem.max=$(cat /sys/fs/cgroup/memory.max 2>/dev/null) cpu.max=$(cat /sys/fs/cgroup/cpu.max 2>/dev/null)"; mkdir -p /var/lib/grafana/plugins /var/lib/grafana/png /var/lib/grafana/csv; chown -R 472:472 /var/lib/grafana; export HOME=/usr/share/grafana; exec su -s /bin/sh -p -c "id; exec /run.sh" grafana'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/grafana`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/grafana-dashboards)
