# Deploy Bigcapital on Railway

Double-entry accounting and invoicing software for small businesses

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bigcapital-accounting)

## About

Bigcapital is open-source double-entry accounting software for small businesses,
bookkeepers and finance teams who want QuickBooks-style invoicing, bills and financial
statements without a per-seat subscription. It covers the full cycle: a chart of accounts,
customers and vendors, items, sales invoices, purchase bills, expenses, manual journals,
inventory, and reports from the balance sheet to receivable aging. Multi-currency and
multi-organization support are built in, and every figure traces to a journal entry.

Deploy Bigcapital on Railway and you get the whole production topology, not a single
container. The `gateway` service is the one public origin: it serves the `webapp` React
front end and forwards `/api` to the `server` NestJS backend, which keeps the session
cookie and the API on the same host. `mariadb` holds the ledger, `redis` backs the job
queue, `gotenberg` renders invoice PDFs, `clickhouse` stores analytics roll-ups, and a
Railway object-storage bucket keeps document attachments. Self-hosting Bigcapital
elsewhere means wiring those seven pieces together yourself; here they arrive connected,
with volumes, health checks and private networking set.

![Diagram of the Bigcapital services deployed on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789660123/bigcapital-architecture.webp)

Hosted bookkeeping platforms price per user, per company or per transaction. Self-hosting
Bigcapital gives an accountant with several client companies, or a business that wants its
ledger inside its own infrastructure, the same feature surface at infrastructure cost.

Key capabilities:

- Double-entry general ledger with a seeded, editable chart of accounts
- Sales invoices, estimates, receipts and credit notes, plus purchase bills
- Customer and vendor records with running receivable and payable balances
- Expense tracking, manual journals, and banking with account reconciliation
- Inventory items with cost and sell prices, and landed-cost allocation
- Balance sheet, profit and loss, cash flow, general ledger, trial balance and aging reports
- Multi-currency with exchange rates, and multiple organizations under one login

Each service has one job. `server` is the NestJS API that owns the ledger logic and the
background job processors. `webapp` is the compiled React front end on nginx. `gateway` is a
Caddy reverse proxy putting both behind one hostname, so the browser never makes a
cross-site request. `mariadb` stores a system database plus one database per organization,
created on demand. `redis` carries the BullMQ queues behind notifications, exports and
analytics syncs. `gotenberg` turns invoice HTML into PDFs. `clickhouse` holds ledger deltas
for fast workspace totals.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2-alpine` | Web service |
| webapp | `bigcapitalhq/webapp:v0.25.41` | Worker |
| gotenberg | `gotenberg/gotenberg:8` | Worker |
| server | [gridalpha/bigcapital-railway](https://github.com/gridalpha/bigcapital-railway) | Worker |
| mariadb | `mariadb:10.11` | Database |
| clickhouse | `clickhouse/clickhouse-server:24.8` | Database |
| redis | `redis:8.2-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | Caddy listening port |
| `CADDY_CONFIG` | gateway | {"admin":{"disabled":true},"logging":{"logs":{"default":{"level":"INFO"}}},"apps":{"http":{"servers":{"main":{"listen":[":{env.PORT}"],"trusted_proxies":{"source":"static","ranges":["100.64.0.0/10","fd00::/8","152.233.0.0/17"]},"routes":[{"match":[{"path":["/healthz"]}],"handle":[{"handler":"static_response","status_code":200,"body":"ok"}]},{"match":[{"path":["/api","/api/*","/public","/public/*","/socket","/socket/*","/swagger","/swagger/*","/queues","/queues/*"]}],"handle":[{"handler":"reverse_proxy","upstreams":[{"dial":"server.railway.internal:3000"}]}]},{"handle":[{"handler":"reverse_proxy","upstreams":[{"dial":"webapp.railway.internal:80"}]}]}]}}}}} | One-origin proxy: /api to server, rest to webapp |
| `PORT` | webapp | 80 | nginx listening port |
| `NGINX_ENTRYPOINT_WORKER_PROCESSES_AUTOTUNE` | webapp | 1 | Size workers from the cgroup quota |
| `PORT` | gotenberg | 3000 | Gotenberg API port |
| `PORT` | server | 3000 | NestJS API listening port |
| `DB_HOST` | server | - | MariaDB private hostname |
| `DB_PORT` | server | 3306 | MariaDB port |
| `DB_USER` | server | (secret) | Needs global CREATE DATABASE for tenants |
| `BASE_URL` | server | - | Public URL used in emailed links |
| `MAIL_HOST` | server | - | Optional: SMTP host for invites and invoices |
| `MAIL_PORT` | server | - | Optional: SMTP port |
| `S3_BUCKET` | server | - | Attachment bucket name |
| `S3_REGION` | server | - | Bucket region |
| `DB_CHARSET` | server | utf8 | Connection charset |
| `QUEUE_HOST` | server | - | BullMQ queue host |
| `QUEUE_PORT` | server | 6379 | BullMQ queue port |
| `REDIS_HOST` | server | - | Redis private hostname |
| `REDIS_PORT` | server | 6379 | Redis port |
| `DB_PASSWORD` | server | (secret) | MariaDB root password |
| `MAIL_SECURE` | server | - | Optional: true for implicit TLS |
| `S3_ENDPOINT` | server | - | Object storage endpoint |
| `NODE_OPTIONS` | server | --max-old-space-size=2048 | Node heap ceiling for the container |
| `GOTENBERG_URL` | server | - | PDF renderer endpoint |
| `MAIL_PASSWORD` | server | (secret) | Optional: SMTP password |
| `MAIL_USERNAME` | server | (secret) | Optional: SMTP username |
| `APP_JWT_SECRET` | server | (secret) | Signs authentication tokens |
| `MAIL_FROM_NAME` | server | - | Optional: sender display name |
| `SYSTEM_DB_NAME` | server | bigcapital_system | Shared system database |
| `CLICKHOUSE_HOST` | server | - | ClickHouse private hostname |
| `CLICKHOUSE_PORT` | server | 8123 | ClickHouse HTTP port |
| `CLICKHOUSE_USER` | server | (secret) | ClickHouse account |
| `SIGNUP_DISABLED` | server | true | Closes open registration |
| `S3_ACCESS_KEY_ID` | server | - | Bucket access key |
| `MAIL_FROM_ADDRESS` | server | - | Optional: sender address |
| `THROTTLE_AUTH_TTL` | server | 60000 | Auth rate-limit window in ms |
| `BULL_BOARD_ENABLED` | server | false | Queue dashboard off by default |
| `CLICKHOUSE_ENABLED` | server | true | Analytics roll-ups on |
| `CLICKHOUSE_DATABASE` | server | bigcapital_analytics | Analytics database name |
| `CLICKHOUSE_PASSWORD` | server | (secret) | ClickHouse password |
| `S3_FORCE_PATH_STYLE` | server | true | Required for browser-facing reads |
| `THROTTLE_AUTH_LIMIT` | server | 30 | Login attempts per window per client |
| `THROTTLE_GLOBAL_TTL` | server | 60000 | Global rate-limit window in ms |
| `S3_SECRET_ACCESS_KEY` | server | (secret) | Bucket secret key |
| `EXCHANGE_RATE_SERVICE` | server | open-exchange-rate | Currency rate provider |
| `SIGNUP_ALLOWED_EMAILS` | server | - | Your email address; the only account allowed to register |
| `TENANT_DB_NAME_PERFIX` | server | bigcapital_tenant_ | Prefix for per-organization databases |
| `THROTTLE_GLOBAL_LIMIT` | server | 300 | Requests per window per client |
| `SIGNUP_ALLOWED_DOMAINS` | server | - | Optional: allow a whole email domain instead |
| `SIGNUP_EMAIL_CONFIRMATION` | server | false | No SMTP needed to finish sign-up |
| `MARIADB_DATABASE` | mariadb | bigcapital_system | System database created on first boot |
| `MARIADB_AUTO_UPGRADE` | mariadb | 1 | Run mariadb-upgrade after an image bump |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | Root password, read by the entrypoint |
| `CLICKHOUSE_DB` | clickhouse | bigcapital_analytics | Database created on first boot |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Account created on first boot |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Password for that account |

## Configuration

- **Start command:** `/bin/sh -c 'printf %s "$CADDY_CONFIG" > /etc/caddy/config.json; caddy validate --config /etc/caddy/config.json || exit 1; exec caddy run --config /etc/caddy/config.json'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Healthcheck:** `/health`
- **Healthcheck:** `/api/system_db`
- **Start command:** `/bin/sh -c 'exec docker-entrypoint.sh mariadbd --bind-address=* --innodb-buffer-pool-size=1024M --max-connections=300'`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found; exec docker-entrypoint.sh redis-server --bind :: 0.0.0.0 --protected-mode no --appendonly yes --dir /data'`
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/bigcapital-accounting)
