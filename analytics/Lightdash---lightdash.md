# Deploy Lightdash on Railway

Business intelligence tool that builds dashboards from your dbt models

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lightdash)

## About

Lightdash is an open-source business intelligence platform that turns a dbt project into a governed self-serve analytics layer. Metrics and dimensions are defined once in your dbt YAML; everyone else works through point-and-click explores, a SQL runner, charts, dashboards and scheduled deliveries. Teams pick it over closed BI tools because the semantic layer lives in version control beside the models it describes — a metric change is a reviewable pull request.

Self-host Lightdash on Railway and this template wires up the production shape upstream documents: the API and UI, a dedicated scheduler worker for deliveries and exports, a NATS JetStream queue with a warehouse query worker, a Browserless Chromium instance for chart rendering, managed PostgreSQL for Lightdash's metadata, and an S3-compatible bucket for results. Only the Lightdash service is public. Interactive queries go to NATS and are run by the warehouse worker, which streams results into object storage so a heavy dashboard never blocks the API.

![Diagram of the Lightdash services, NATS, Postgres and bucket on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787743989/lightdash-architecture.png)

Lightdash reads your `schema.yml` files, picks up the `meta` blocks marking columns as dimensions and metrics, and compiles them into explores analysts query without writing SQL. That fits a team already running dbt that wants business users answering their own questions against the definitions the data team maintains — with credentials, results and dashboards on your own infrastructure.

Key features:

- Semantic layer defined in dbt YAML and versioned in git
- Point-and-click explores plus a SQL runner
- Dashboards with cross-filtering, drill-downs and date zooms
- Scheduled email and Slack deliveries with rendered chart images
- Role-based access control, spaces and per-project permissions

**Lightdash** serves the API and React UI and migrates at boot under a lease, so a rolling deploy never runs two migrators at once. **PostgreSQL** holds Lightdash's metadata — users, spaces, charts, dashboards, schedules and encrypted warehouse credentials — and is not your analytics warehouse. **NATS** carries the JetStream work queue; **warehouse-worker** consumes it, runs the SQL and streams rows into the bucket. **scheduler** owns deliveries and exports so a heavy render cannot starve the API. **headless-browser** screenshots charts for Slack and email.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats | `nats:2.14-alpine` | Database |
| lightdash | `lightdash/lightdash:2.7.0` | Web service |
| headless-browser | `ghcr.io/browserless/chromium:v2.49.0` | Worker |
| warehouse-worker | `lightdash/lightdash:2.7.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| scheduler | `lightdash/lightdash:2.7.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | nats | 8222 | Monitoring port used by the health check |
| `PORT` | lightdash | 8080 | HTTP port the backend listens on |
| `NATS_URL` | lightdash | - | JetStream connection URL |
| `SITE_URL` | lightdash | - | Public URL used in links and redirects |
| `S3_BUCKET` | lightdash | - | Bucket for results and exports |
| `S3_REGION` | lightdash | - | Bucket region |
| `S3_ENDPOINT` | lightdash | - | Object storage endpoint |
| `TRUST_PROXY` | lightdash | true | Read client IP from forwarded headers |
| `NATS_ENABLED` | lightdash | true | Route warehouse queries through NATS |
| `NODE_OPTIONS` | lightdash | --max-old-space-size=4096 | Cap Node heap below the container limit |
| `S3_ACCESS_KEY` | lightdash | - | Bucket access key |
| `S3_SECRET_KEY` | lightdash | (secret) | Bucket secret key |
| `SECURE_COOKIES` | lightdash | true | Required behind Railway's TLS edge |
| `LIGHTDASH_SECRET` | lightdash | (secret) | Signs sessions, encrypts credentials at rest |
| `SCHEDULER_ENABLED` | lightdash | false | Dedicated worker owns scheduled jobs |
| `ALLOW_MULTIPLE_ORGS` | lightdash | false | Only the first signup creates an organization |
| `S3_FORCE_PATH_STYLE` | lightdash | true | Path-style addressing for browser uploads |
| `SOFT_DELETE_ENABLED` | lightdash | true | Recoverable deletes for charts and dashboards |
| `HEADLESS_BROWSER_HOST` | lightdash | - | Browserless private host |
| `HEADLESS_BROWSER_PORT` | lightdash | 3000 | Browserless port |
| `LIGHTDASH_MAX_PAYLOAD` | lightdash | 40mb | Upload limit for large dbt manifests |
| `LIGHTDASH_INSTALL_TYPE` | lightdash | docker_image | Reported install type |
| `HOST` | headless-browser | :: | Bind dual-stack so private peers can connect |
| `PORT` | headless-browser | 3000 | Browserless listening port |
| `HEALTH` | headless-browser | true | Shed sessions under memory pressure |
| `TIMEOUT` | headless-browser | 120000 | Max browser session duration |
| `CONNECTION_TIMEOUT` | headless-browser | 180000 | Max wait on a browser connection |
| `MAX_MEMORY_PERCENT` | headless-browser | 85 | Memory threshold for shedding |
| `MAX_CONCURRENT_SESSIONS` | headless-browser | 5 | Parallel Chromium sessions |
| `PORT` | warehouse-worker | 8080 | Health endpoint port |
| `NATS_URL` | warehouse-worker | - | JetStream connection URL |
| `SITE_URL` | warehouse-worker | - | Public URL used in generated links |
| `S3_BUCKET` | warehouse-worker | - | Bucket results stream into |
| `S3_REGION` | warehouse-worker | - | Bucket region |
| `S3_ENDPOINT` | warehouse-worker | - | Object storage endpoint |
| `TRUST_PROXY` | warehouse-worker | true | Match the app's proxy policy |
| `NATS_ENABLED` | warehouse-worker | true | Consume warehouse jobs from NATS |
| `NODE_OPTIONS` | warehouse-worker | --max-old-space-size=4096 | Cap Node heap below the container limit |
| `S3_ACCESS_KEY` | warehouse-worker | - | Bucket access key |
| `S3_SECRET_KEY` | warehouse-worker | (secret) | Bucket secret key |
| `SECURE_COOKIES` | warehouse-worker | true | Match the app's cookie policy |
| `LIGHTDASH_SECRET` | warehouse-worker | (secret) | Shared signing and encryption key |
| `SCHEDULER_ENABLED` | warehouse-worker | false | Set on every service in this template |
| `ALLOW_MULTIPLE_ORGS` | warehouse-worker | false | Match the app's org policy |
| `S3_FORCE_PATH_STYLE` | warehouse-worker | true | Path-style addressing for browser uploads |
| `SOFT_DELETE_ENABLED` | warehouse-worker | true | Match the app's delete policy |
| `HEADLESS_BROWSER_HOST` | warehouse-worker | - | Browserless private host |
| `HEADLESS_BROWSER_PORT` | warehouse-worker | 3000 | Browserless port |
| `LIGHTDASH_MAX_PAYLOAD` | warehouse-worker | 40mb | Match the app's payload limit |
| `LIGHTDASH_INSTALL_TYPE` | warehouse-worker | docker_image | Reported install type |
| `NATS_WORKER_CONCURRENCY` | warehouse-worker | 100 | Concurrent warehouse queries per replica |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | scheduler | 8080 | Health endpoint port |
| `NATS_URL` | scheduler | - | JetStream connection URL |
| `SITE_URL` | scheduler | - | Public URL used in delivery links |
| `S3_BUCKET` | scheduler | - | Bucket for results and exports |
| `S3_REGION` | scheduler | - | Bucket region |
| `S3_ENDPOINT` | scheduler | - | Object storage endpoint |
| `TRUST_PROXY` | scheduler | true | Match the app's proxy policy |
| `NATS_ENABLED` | scheduler | true | Route warehouse queries through NATS |
| `NODE_OPTIONS` | scheduler | --max-old-space-size=4096 | Cap Node heap below the container limit |
| `S3_ACCESS_KEY` | scheduler | - | Bucket access key |
| `S3_SECRET_KEY` | scheduler | (secret) | Bucket secret key |
| `SECURE_COOKIES` | scheduler | true | Match the app's cookie policy |
| `LIGHTDASH_SECRET` | scheduler | (secret) | Shared signing and encryption key |
| `SCHEDULER_ENABLED` | scheduler | false | Set on every service in this template |
| `ALLOW_MULTIPLE_ORGS` | scheduler | false | Match the app's org policy |
| `S3_FORCE_PATH_STYLE` | scheduler | true | Path-style addressing for browser uploads |
| `SOFT_DELETE_ENABLED` | scheduler | true | Match the app's delete policy |
| `HEADLESS_BROWSER_HOST` | scheduler | - | Browserless private host |
| `HEADLESS_BROWSER_PORT` | scheduler | 3000 | Browserless port |
| `LIGHTDASH_MAX_PAYLOAD` | scheduler | 40mb | Match the app's payload limit |
| `SCHEDULER_CONCURRENCY` | scheduler | 3 | Delivery jobs run in parallel |
| `LIGHTDASH_INSTALL_TYPE` | scheduler | docker_image | Reported install type |

## Configuration

- **Start command:** `/bin/sh -c 'printf "jetstream {\n  store_dir: /tmp/nats\n  max_memory_store: 1073741824\n  max_file_store: 1073741824\n}\n" > /tmp/nats.conf && exec nats-server -c /tmp/nats.conf --addr :: --http_port 8222'`
- **Healthcheck:** `/healthz`
- **Healthcheck:** `/api/v1/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/pressure`
- **Start command:** `node dist/natsWorker.js --stream warehouse`
- **Healthcheck:** `/api/v1/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `node dist/scheduler.js`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/lightdash)
