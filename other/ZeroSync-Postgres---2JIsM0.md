# Deploy ZeroSync + Postgres on Railway

Rocicorp's ZeroSync engine for local-first apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/2JIsM0)

## About

## Initial setup

This template creates both the Postgres instance and the Zero sync engine.

After deploying for the first time,

- Open the generated public endpoint in a new tab. If you see an `ok` it means everything is working.
- To connect to Zero via your web application, you can use the `ZERO_PUBLIC_URL`.

## Permissions

In Zero, access is denied by default. To be able to sync data to your application, you will first need to set up permissions. It's best to read this [page](https://zero.rocicorp.dev/docs/permissions) to understand how it works.

Although you describe permissions by calling functions in Typescript, permissions are actually compiled into JSON and then uploaded to your Postgres instance. Once you defined your permissions, you will have to run the following command:

```
npx zero-deploy-permissions -p ./path/to/schema --upstream-db ${DATABASE_PUBLIC_URL}
```

## Configuration

You may have to play around with the `ZERO_NUM_SYNC_WORKERS` to figure out what works best depending on the your service's allocated resources. Decrease/increase this value depending on how many upstream connections your service resources allow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ZeroSync | `rocicorp/zero:0.15.2025021402` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ZERO_PORT` | ZeroSync | 4848 | The main port for client connections. |
| `ZERO_CVR_DB` | ZeroSync | - | A separate Postgres database used to store CVRs. |
| `ZERO_AUTH_JWK` | ZeroSync | - | A public key in JWK format used to verify JWTs. Only one of ZERO_AUTH_JWK, ZERO_AUTH_JWKS_URL and ZERO_AUTH_SECRET may be set. |
| `PG_DATABSE_URL` | ZeroSync | - | Postgres connection URL. |
| `ZERO_CHANGE_DB` | ZeroSync | - | Another Postgres database used to store a replication log. |
| `ZERO_LOG_LEVEL` | ZeroSync | info | Sets the logging level for the application. |
| `ZERO_LOG_FORMAT` | ZeroSync | text | Sets the log output format. |
| `ZERO_PUBLIC_URL` | ZeroSync | - | URL to be used with the Zero client. |
| `ZERO_AUTH_SECRET` | ZeroSync | (secret) | A symmetric key used to verify JWTs. Only one of ZERO_AUTH_JWK, ZERO_AUTH_JWKS_URL and ZERO_AUTH_SECRET may be set. |
| `ZERO_UPSTREAM_DB` | ZeroSync | - | The "upstream" authoritative Postgres database. |
| `ZERO_REPLICA_FILE` | ZeroSync | /zero-data/zstart_replica.db | File path to the SQLite replica that zero-cache maintains. |
| `ZERO_AUTH_JWKS_URL` | ZeroSync | - | A URL that returns a JWK set used to verify JWTs. Only one of ZERO_AUTH_JWK, ZERO_AUTH_JWKS_URL and ZERO_AUTH_SECRET may be set. |
| `ZERO_CVR_MAX_CONNS` | ZeroSync | 30 | The maximum number of connections to open to the CVR database. |
| `ZERO_CHANGE_MAX_CONNS` | ZeroSync | 1 | The maximum number of connections to open to the change database. |
| `ZERO_NUM_SYNC_WORKERS` | ZeroSync | 20 | The number of processes to use for view syncing. |
| `ZERO_UPSTREAM_MAX_CONNS` | ZeroSync | 20 | The maximum number of connections to open to the upstream database for committing mutations. |
| `ZERO_LOG_TRACE_COLLECTOR` | ZeroSync | - | The URL of the trace collector to which to send trace data. Traces are sent over HTTP. |
| `ZERO_CHANGE_STREAMER_PORT` | ZeroSync | 4849 | The port on which the change-streamer runs. |
| `ZERO_HEARTBEAT_MONITOR_PORT` | ZeroSync | 4850 | The port on which the heartbeat monitor listens for health checks. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zero-data`
- **Start command:** `bash -c '   docker-entrypoint.sh postgres    -c wal_level=logical   -c max_wal_senders=10    -c max_replication_slots=5    -c hot_standby=on    -c hot_standby_feedback=on '`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/2JIsM0)
