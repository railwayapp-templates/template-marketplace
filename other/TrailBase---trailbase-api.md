# Deploy TrailBase on Railway

Single-executable app backend with SQLite, REST APIs and auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trailbase-api)

## About

TrailBase is an open-source application backend that ships as a single executable: a SQLite database, type-safe REST APIs generated from your own tables, realtime subscriptions, email-and-password plus OAuth authentication, a WebAssembly runtime for custom endpoints, and an admin dashboard. It is the Firebase idea reduced to one process — reach for it when you want a backend for a web, mobile or desktop app without running a five-container stack, and when sub-millisecond query latency matters more than write scaling.

Deploy TrailBase on Railway and the whole backend comes up configured. This template runs three services: **trailbase** holds the application and its SQLite depot on a persistent volume, **gateway** is a Caddy reverse proxy owning the public URL that hands TrailBase a correct client IP, and **mailpit** captures the verification and password-reset mail the auth flows send. Uploaded files go to a Railway object-storage bucket rather than the volume, so the disk keeps only databases, config, signing keys and backups. Every browser request enters through the gateway; TrailBase stays on the private network.

![Railway diagram of the TrailBase, gateway and mailpit services](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789471935/trailbase-architecture.webp)

TrailBase collapses the backend-as-a-service stack into one Rust binary over SQLite. The database is in-process, so a query costs no network hop — that is where its sub-millisecond read numbers come from. Self-host it when the app is read-heavy, when the data belongs on infrastructure you control, or when a Postgres-plus-auth-plus-storage stack is out of proportion to the product.

- Record APIs generated from your tables, with per-operation access rules as SQL expressions
- Realtime subscriptions to row changes over SSE
- Auth: email/password, usernames, OAuth, anonymous accounts, TOTP, PKCE for native apps
- A WebAssembly runtime for custom HTTP handlers, scheduled jobs and SQLite functions
- Admin dashboard: table browser, arbitrary SQL, an ER diagram, request logs, user registry
- Typed clients for TypeScript, Dart, Rust, Python, Go, Kotlin, Swift, .NET

**trailbase** is the app; its volume at `/app/traildepot` holds `main.db`, the JWT signing keys and backups, so it must not be removed. **gateway** owns the public origin: TrailBase reads the *last* `X-Forwarded-For` entry, which behind any edge proxy is that proxy's own rotating address, so the gateway rewrites the header to the true client — which is what makes request logs, GeoIP and the per-IP auth rate limit meaningful. **mailpit** is an SMTP sink with a web inbox, since registration fails when verification mail cannot be sent.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2-alpine` | Web service |
| trailbase | [gridalpha/trailbase-railway](https://github.com/gridalpha/trailbase-railway) | Database |
| mailpit | `axllent/mailpit:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | Port Caddy listens on and the domain targets |
| `CADDY_CONFIG` | gateway | {"admin":{"disabled":true},"logging":{"logs":{"default":{"level":"INFO"}}},"apps":{"http":{"servers":{"srv0":{"listen":[":{env.PORT}"],"trusted_proxies":{"source":"static","ranges":["100.64.0.0/10","fd00::/8","152.233.0.0/17"]},"routes":[{"match":[{"path":["/healthz"]}],"handle":[{"handler":"static_response","status_code":200,"body":"ok"}]},{"handle":[{"handler":"reverse_proxy","flush_interval":-1,"headers":{"request":{"replace":{"X-Forwarded-For":[{"search_regexp":"\\s*,.*$","replace":""}]},"delete":["X-Real-IP","True-Client-IP","Cf-Connecting-Ip","Fly-Client-Ip","X-Azure-Socketip","Cloudfront-Viewer-Address"]}},"upstreams":[{"dial":"trailbase.railway.internal:4000"}]}]}]}}}}} | One-line Caddy JSON config: routes, trusted proxies, XFF rewrite |
| `PORT` | trailbase | 4000 | Port the app binds and Railway probes |
| `DEPOT` | trailbase | /app/traildepot | Data directory; matches the volume mount |
| `ADMIN_EMAIL` | trailbase | admin@localhost | Identity of the first admin account |
| `ADMIN_PASSWORD` | trailbase | (secret) | Password for the first admin account |
| `RUST_BACKTRACE` | trailbase | 1 | Backtraces on panic |
| `TINI_SUBREAPER` | trailbase | 1 | tini is not PID 1 on Railway |
| `TRAIL_EMAIL_SMTP_HOST` | trailbase | - | SMTP host on the private network |
| `TRAIL_EMAIL_SMTP_PORT` | trailbase | 1025 | Mailpit's plaintext SMTP port |
| `TRAIL_SERVER_SITE_URL` | trailbase | - | Public URL in mail and OAuth redirects |
| `TINI_KILL_PROCESS_GROUP` | trailbase | 1 | Forward SIGTERM to child processes |
| `TRAIL_EMAIL_SENDER_NAME` | trailbase | TrailBase | Required whenever a sender address is set |
| `TRAIL_EMAIL_SENDER_ADDRESS` | trailbase | - | From address on outgoing mail |
| `TRAIL_EMAIL_SMTP_ENCRYPTION` | trailbase | 1 | Numeric enum: no SMTP encryption |
| `TRAIL_SERVER_AUTH_IP_RATE_LIMIT` | trailbase | 10 | Auth requests per IP per second |
| `TRAIL_SERVER_S3_STORAGE_CONFIG_REGION` | trailbase | - | Object storage region |
| `TRAIL_SERVER_S3_STORAGE_CONFIG_ENDPOINT` | trailbase | - | Object storage endpoint |
| `TRAIL_SERVER_S3_STORAGE_CONFIG_ACCESS_KEY` | trailbase | - | Bucket access key id |
| `TRAIL_SERVER_S3_STORAGE_CONFIG_BUCKET_NAME` | trailbase | - | Bucket holding uploaded files |
| `TRAIL_SERVER_S3_STORAGE_CONFIG_SECRET_ACCESS_KEY` | trailbase | (secret) | Bucket secret key |
| `PORT` | mailpit | 8025 | Inbox UI port, probed by the health check |
| `MP_UI_AUTH` | mailpit | - | Basic-auth credentials for the inbox |
| `MP_DATABASE` | mailpit | /data/mailpit.db | Message store on the volume |
| `MP_MAX_MESSAGES` | mailpit | 5000 | Messages retained before rotation |
| `MP_UI_BIND_ADDR` | mailpit | [::]:8025 | Dual-stack bind for the inbox UI |
| `MP_SMTP_BIND_ADDR` | mailpit | [::]:1025 | Dual-stack bind for the SMTP listener |

## Configuration

- **Start command:** `/bin/sh -c 'printf %s "$CADDY_CONFIG" > /etc/caddy/config.json; caddy validate --config /etc/caddy/config.json || exit 1; exec caddy run --config /etc/caddy/config.json'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/healthcheck`
- **Volume:** `/app/traildepot`
- **Healthcheck:** `/livez`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/trailbase-api)
