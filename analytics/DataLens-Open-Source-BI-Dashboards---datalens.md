# Deploy DataLens | Open-Source BI & Dashboards on Railway

Yandex DataLens BI: charts, dashboards and SQL over your databases

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/datalens)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/datalens?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=datalens)

[DataLens](https://datalens.tech/) is the open-source business intelligence platform from Yandex: connect your databases, model datasets with calculated fields, build charts in a drag-and-drop wizard and put them on interactive dashboards with selectors, tabs and drill-downs. This template runs the full open-source stack from upstream's own images, with a login, a generated admin password and a demo workbook to explore on first open.

The stack is six services: DataLens (the web app, the only public one), US (United Storage, the metadata store), Auth, ControlAPI, DataAPI and Postgres.

- **Upstream's images, pinned to release 2.9.0.** Each service is upstream's `ghcr.io/datalens-tech` image at the versions of the v2.9.0 release, with a thin wrapper that adds only key setup. Nothing moves until you bump a tag.
- **Every key unique to your deploy.** Upstream's compose file ships fixed RSA keys and tokens, the same for every install. Here one generated seed on Postgres is the source of every signing key (user sessions, service-to-service tokens), both master tokens and the key that encrypts saved connection passwords. Each service derives the ones it needs at start, so nothing secret is shared in public.
- **Login on, sign-up off.** The `admin` user is created on first boot with a generated password. Self sign-up is disabled: the admin adds users in Service settings, so nobody else can register on your public URL. No email server needed.
- **A demo workbook.** First boot loads upstream's demo: a sample marketplace dataset with a dashboard showing most chart types. It runs on its own non-superuser Postgres role, so charts built on the demo connection can't read DataLens's own databases.
- **Lean by default.** Upstream's workbook export/import needs two more services (meta-manager and a Temporal server); they're left out to keep the stack smaller. Everything else, including the dataset editor, the chart wizard, QL charts and dashboards, works.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| DataAPI | [nomideusz/datalens-railway](https://github.com/nomideusz/datalens-railway) (root: /) | Worker |
| DataLens | [nomideusz/datalens-railway](https://github.com/nomideusz/datalens-railway) (root: /) | Web service |
| Postgres | [nomideusz/datalens-railway](https://github.com/nomideusz/datalens-railway) (root: /) | Database |
| ControlAPI | [nomideusz/datalens-railway](https://github.com/nomideusz/datalens-railway) (root: /) | Worker |
| US | [nomideusz/datalens-railway](https://github.com/nomideusz/datalens-railway) (root: /) | Worker |
| Auth | [nomideusz/datalens-railway](https://github.com/nomideusz/datalens-railway) (root: /) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | DataAPI | 8080 | Port the service listens on - leave as is |
| `US_HOST` | DataAPI | - | United Storage on the private network |
| `BI_COMPENG_PG_URL` | DataAPI | - | Connection string for the pg-compeng-db database |
| `DATALENS_KEY_SEED` | DataAPI | - | Shared seed the service derives its keys and tokens from (set on Postgres) |
| `PORT` | DataLens | 8080 | Port the service listens on - leave as is |
| `US_ENDPOINT` | DataLens | - | United Storage on the private network |
| `AUTH_ENDPOINT` | DataLens | - | Auth service on the private network |
| `BI_API_ENDPOINT` | DataLens | - | Control API on the private network |
| `BI_DATA_ENDPOINT` | DataLens | - | Data API on the private network |
| `DATALENS_KEY_SEED` | DataLens | - | Shared seed the service derives its keys and tokens from (set on Postgres) |
| `DATALENS_ADMIN_PASSWORD` | DataLens | (secret) | Password for the admin user (login: admin). Applied on first boot only; change it later in DataLens |
| `US_ENDPOINT` | Postgres | - | United Storage on the private network (the demo-data seed waits for it) |
| `DATALENS_KEY_SEED` | Postgres | - | Seed every service derives its signing keys, master tokens and the connection-password encryption key from. Never change it after the first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password of the pg-user superuser |
| `PORT` | ControlAPI | 8080 | Port the service listens on - leave as is |
| `US_HOST` | ControlAPI | - | United Storage on the private network |
| `DATALENS_KEY_SEED` | ControlAPI | - | Shared seed the service derives its keys and tokens from (set on Postgres) |
| `PORT` | US | 8080 | Port the service listens on - leave as is |
| `AUTH_ENDPOINT` | US | - | Auth service on the private network |
| `DATALENS_KEY_SEED` | US | - | Shared seed the service derives its keys and tokens from (set on Postgres) |
| `POSTGRES_DSN_LIST` | US | - | Connection string for the pg-us-db database |
| `PORT` | Auth | 8080 | Port the service listens on - leave as is |
| `UI_APP_ENDPOINT` | Auth | - | Public URL of DataLens; sign-in cookies are issued for this host. Change it when you add a custom domain |
| `DATALENS_KEY_SEED` | Auth | - | Shared seed the service derives its keys and tokens from (set on Postgres) |
| `POSTGRES_DSN_LIST` | Auth | - | Connection string for the pg-auth-db database |
| `AUTH_ADMIN_PASSWORD` | Auth | (secret) | Admin password, set on the DataLens service |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/ping`

**Category:** Analytics · **Languages:** Go

[View on Railway →](https://railway.com/deploy/datalens)
