# Deploy DATAENG/API2DB on Railway

Deploy and Host API2DB-DATAENG-TEMPLATE with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dataengapi2db)

## About

### Deploy and Host api2db on Railway

Fetch JSON from any HTTP API and store it in PostgreSQL. Ideal for scheduled ETL: run on a 5-minute (or custom) cron to snapshot API data into your database.

 ### About Hosting api2db

- **One service:** A Python app that runs once per invocation (no long-running server).
- **Flow:** GET `SITE_URL` → parse JSON → insert full payload into `TABLE_NAME.raw_json`.
- **Resilience:** Retries on connection/timeout (configurable timeout, retries, and backoff).
- **Use case:** Pair with a **Railway Cron** (or external cron) to pull an API on a schedule and append rows to a table in the DB.

 ### Common Use Cases

 - Scheduled data ingestion — Pull data from third-party APIs on a cron schedule and store it in PostgreSQL for later
 analysis
 - API archiving — Capture raw API responses as JSON snapshots for auditing, compliance, or historical tracking
 - ETL staging — Land raw JSON into a staging table as the first step of a data pipeline before transforming into
 structured tables

 ### Dependencies for api2db Hosting

 - A REST API endpoint that returns JSON (public or authenticated via headers)
 - A PostgreSQL database with a target table containing a raw_json column (e.g. JSONB or TEXT)

- A **PostgreSQL** database (add a Postgres service in the same project or use an external `DATABASE_URL`).
- A table with at least a `raw_json` column. The template does **not** create the table.

 ### Deployment Dependencies

- A **PostgreSQL** database (add a Postgres service in the same project or use an external `DATABASE_URL`).
- A table with at least a `raw_json` column. The template does **not** create the table.

 ### Implementation Details

 The target table needs a raw_json column. A minimal setup:

 ```sql
   CREATE TABLE my_api_data (
       id SERIAL PRIMARY KEY,
       raw_json JSONB NOT NULL,
       created_at TIMESTAMPTZ DEFAULT NOW()
   );
 ```

 For authenticated APIs, pass headers as a JSON object:

 ```
   HEADER_KEYS={"Authorization": "Bearer sk-..."}
 ```

| Variable | Description |
|----------|-------------|
| `SITE_URL` | Full URL to fetch (GET). Example: `https://api.example.com/v1/records` or `https://opensky-network.org/api/states/all?lamin=45&lomin=-123&lamax=46&lomax=-122`. |
| `DATABASE_URL` | PostgreSQL connection string. Use a [reference variable](https://docs.railway.app/variables#reference-variables) from your Postgres service (e.g. `${{Postgres.DATABASE_URL}}`) when possible. |
| `TABLE_NAME` | Name of the table to insert into. Table must already exist with a `raw_json` column (e.g. `TEXT` or `JSONB`). |

### Optional

| Variable | Default | Description |
|----------|---------|-------------|
| `HEADER_KEYS` | `{}` | JSON object of HTTP headers, e.g. `{"Authorization": "Bearer TOKEN", "Accept": "application/json"}`. |
| `DEBUG` | `false` | Set to `true` to log a sample of the fetched payload. |
| `REQUEST_TIMEOUT` | `60` | Request timeout in seconds. |
| `MAX_RETRIES` | `3` | Number of retry attempts on timeout. |
| `RETRY_BACKOFF_SEC` | `10` | Seconds to wait between retries. |


 ### Why Deploy api2db on Railway?

 Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't
 have to deal with configuration, while allowing you to vertically and horizontally scale it. By deploying api2db on
 Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your
 servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lucascordova/api2db | `lucascordova/api2db` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEBUG` | false | Optional: Set to true to log a sample of the response |
| `SITE_URL` | - | Required: API URL to fetch (GET) |
| `TABLE_NAME` | - | Required: Table name (must have a raw_json column) |
| `HEADER_KEYS` | {} | Optional: HTTP headers as JSON object, i.e., {Authorization": "Bearer YOUR_TOKEN", "Accept": "application/json} |
| `MAX_RETRIES` | 3 | Optional: Retry attempts on timeout (default 3) |
| `DATABASE_URL` | - | Required: PostgreSQL connection string |
| `REQUEST_TIMEOUT` | 60 | Optional: Request timeout in seconds (default 60) |
| `RETRY_BACKOFF_SEC` | 10 | Optional: Seconds between retries (default 10) |

**Category:** Automation

[View on Railway →](https://railway.com/deploy/dataengapi2db)
