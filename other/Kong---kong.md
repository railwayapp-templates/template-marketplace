# Deploy Kong on Railway

Open-source API gateway for routing, auth and rate limiting

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kong)

## About

Kong Gateway is the open-source API gateway that sits in front of your own APIs and handles what every service would otherwise reimplement: routing, authentication, rate limiting, request and response transformation, caching and observability. Built on OpenResty and shipping 45 plugins, it gives teams one place to enforce API policy instead of scattering middleware across every backend. Self-host it when you want that layer on infrastructure you own, with no per-request pricing.

Deploy Kong Gateway on Railway and this template wires up three services. **kong** is the gateway itself, in database-backed mode — it takes the public domain your clients call, and every service, route, consumer and plugin you create is stored in **Postgres** rather than a config file, so changes apply without a redeploy. **kong-admin** is a small authenticated front door: Kong's Admin API and the Kong Manager web UI carry no authentication of their own, so both stay on the private network while kong-admin serves them behind HTTP basic auth — the UI at `/`, the Admin API at `/kong-admin/`.

![Kong Gateway, its admin gateway and Postgres on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788736762/kong-architecture.png)

An API gateway is one entry point in front of many backends. Without one, every service implements its own auth checks, throttling and logging — and they drift apart. Kong centralises that: backends are Gateway Services, matching rules are Routes, plugins attach at whichever level makes sense. Self-hosting fits when a managed gateway's per-request pricing does not, or when traffic must stay on infrastructure you control.

Key capabilities in the open-source build:

- **Authentication** — key auth, basic auth, HMAC, JWT, OAuth 2.0, LDAP, ACL groups
- **Traffic control** — rate limiting, request size limiting, proxy caching, IP restriction, bot detection
- **Transformation** — request and response rewriting, gRPC-to-JSON and gRPC-web bridging, Lua functions
- **Observability** — Prometheus, OpenTelemetry and Zipkin tracing, Datadog, StatsD, HTTP/TCP/UDP logging
- **AI Gateway** — proxy and guard LLM traffic through the same policy layer

The three services divide cleanly. **Postgres** holds the configuration Kong reads and caches; because it is the source of truth, the gateway container is stateless and needs no volume. **kong** runs the proxy on 8000, the Admin API on 8001, Kong Manager on 8002 and a status endpoint on 8100 that Railway health-checks — a probe that fails if the database is unreachable. **kong-admin** runs Caddy, terminates basic auth and forwards to the admin ports privately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kong-admin | [gridalpha/kong-railway](https://github.com/gridalpha/kong-railway) | Web service |
| kong | [gridalpha/kong-railway](https://github.com/gridalpha/kong-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | kong-admin | 8080 | HTTP listener for the admin gateway |
| `KONG_ADMIN_USER` | kong-admin | (secret) | Basic-auth username |
| `KONG_ADMIN_PASSWORD` | kong-admin | (secret) | Basic-auth password, hashed at boot |
| `KONG_ADMIN_UPSTREAM` | kong-admin | kong.railway.internal:8001 | Kong Admin API upstream |
| `KONG_MANAGER_UPSTREAM` | kong-admin | kong.railway.internal:8002 | Kong Manager upstream |
| `PORT` | kong | 8100 | Port Railway health-checks |
| `KONG_PG_SSL` | kong | on | Encrypt the database connection |
| `KONG_PG_HOST` | kong | - | Postgres private hostname |
| `KONG_PG_PORT` | kong | - | Postgres port |
| `KONG_PG_USER` | kong | (secret) | Postgres user |
| `KONG_DATABASE` | kong | postgres | Use the database-backed config store |
| `KONG_DNS_ORDER` | kong | LAST,A,AAAA,CNAME | Resolve AAAA for private hostnames |
| `KONG_PORT_MAPS` | kong | 443:8000 | Public port maps to container port |
| `KONG_PG_DATABASE` | kong | - | Database holding Kong config |
| `KONG_PG_PASSWORD` | kong | (secret) | Postgres password |
| `KONG_TRUSTED_IPS` | kong | 0.0.0.0/0,::/0 | Trust the whole forwarded chain |
| `KONG_ADMIN_LISTEN` | kong | 0.0.0.0:8001 reuseport backlog=16384, [::]:8001 reuseport backlog=16384 | Admin API, private only |
| `KONG_PROXY_LISTEN` | kong | 0.0.0.0:8000 reuseport backlog=16384 | Public proxy listener |
| `KONG_ADMIN_GUI_URL` | kong | - | Where Kong Manager is served |
| `KONG_PG_SSL_VERIFY` | kong | off | Managed cert is not leaf-verifiable |
| `KONG_STATUS_LISTEN` | kong | 0.0.0.0:8100 | Anonymous status endpoint |
| `KONG_REAL_IP_HEADER` | kong | X-Forwarded-For | Header carrying the client address |
| `KONG_ADMIN_ERROR_LOG` | kong | /dev/stderr | Admin API error log to stderr |
| `KONG_PROXY_ERROR_LOG` | kong | /dev/stderr | Proxy error log to stderr |
| `KONG_ADMIN_ACCESS_LOG` | kong | /dev/stdout | Admin API access log to stdout |
| `KONG_ADMIN_GUI_LISTEN` | kong | 0.0.0.0:8002, [::]:8002 | Kong Manager, private only |
| `KONG_PROXY_ACCESS_LOG` | kong | /dev/stdout | Proxy access log to stdout |
| `KONG_ADMIN_GUI_API_URL` | kong | - | Admin API URL used by the browser |
| `KONG_ANONYMOUS_REPORTS` | kong | off | Disable usage telemetry |
| `KONG_REAL_IP_RECURSIVE` | kong | on | Walk to the leftmost, real client |
| `KONG_ADMIN_GUI_ERROR_LOG` | kong | /dev/stderr | Kong Manager error log to stderr |
| `KONG_ADMIN_GUI_ACCESS_LOG` | kong | /dev/stdout | Kong Manager access log to stdout |
| `KONG_NGINX_WORKER_PROCESSES` | kong | 2 | Workers sized to the container quota |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/status`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kong)
