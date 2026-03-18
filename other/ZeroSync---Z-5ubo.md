# Deploy ZeroSync on Railway

Rocicorp's ZeroSync engine for local-first apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Z-5ubo)

## About

## Initial setup

This template only creates the sync engine. You will need to bring your own Postgres instance.

Before deploying for the first time,

- Manually set the `PG_DATABASE_URL` environment variable. This should be the private URL.
- Next you will need to update your Postgres' instance WAL level to `logical`.
  - You can follow the [official documentation here](https://zero.rocicorp.dev/docs/connecting-to-postgres#configuration) for a more detailed explanation on how to do it. If you are comfortable with Postgres and SQL, here is the short version:
  - Connect to your existing Postgres instance, and run `"ALTER SYSTEM SET wal_level = 'logical'`. Next restart your running Postgres instance.

After deploying for the first time,

- Open the generated public endpoint in a new tab. If you see an `ok` it means everything is working.
- To connect to Zero via your web application, you can use the `ZERO_PUBLIC_URL`.

## Permissions

In Zero, access is denied by default. To be able to sync data to your application, you will first need to set up permissions. It's best to read this [page](https://zero.rocicorp.dev/docs/permissions) to understand how it works.

Although you describe permissions by calling functions in Typescript, permissions are actually compiled into JSON and then uploaded to your Postgres instance. Once you defined your permissions, you will have to run the following command:

```
npx zero-deploy-permissions -p ./path/to/schema --upstream-db ${DATABASE_PUBLIC_URL}
```

Note that `DATABASE_PUBLIC_URL` is the public URL to your database, not the private URL that you set up before deploying.

## Configuration

You may have to play around with the `ZERO_NUM_SYNC_WORKERS` to figure out what works best depending on the your service's allocated resources. Decrease/increase this value depending on how many upstream connections your service resources allow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ZeroSync | `rocicorp/zero:0.15.2025021402` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ZERO_PORT` | 4848 | The main port for client connections. |
| `ZERO_CVR_DB` | - | A separate Postgres database used to store CVRs. |
| `ZERO_AUTH_JWK` | - | A public key in JWK format used to verify JWTs. Only one of ZERO_AUTH_JWK, ZERO_AUTH_JWKS_URL and ZERO_AUTH_SECRET may be set. |
| `PG_DATABSE_URL` | - | Postgres connection URL. |
| `ZERO_CHANGE_DB` | - | Another Postgres database used to store a replication log. |
| `ZERO_LOG_LEVEL` | info | Sets the logging level for the application. |
| `ZERO_LOG_FORMAT` | text | Sets the log output format. |
| `ZERO_PUBLIC_URL` | - | URL to be used with the Zero client. |
| `ZERO_AUTH_SECRET` | (secret) | A symmetric key used to verify JWTs. Only one of ZERO_AUTH_JWK, ZERO_AUTH_JWKS_URL and ZERO_AUTH_SECRET may be set. |
| `ZERO_UPSTREAM_DB` | - | The "upstream" authoritative Postgres database. |
| `ZERO_REPLICA_FILE` | /zero-data/zstart_replica.db | File path to the SQLite replica that zero-cache maintains. |
| `ZERO_AUTH_JWKS_URL` | - | A URL that returns a JWK set used to verify JWTs. Only one of ZERO_AUTH_JWK, ZERO_AUTH_JWKS_URL and ZERO_AUTH_SECRET may be set. |
| `ZERO_CVR_MAX_CONNS` | 30 | The maximum number of connections to open to the CVR database. |
| `ZERO_CHANGE_MAX_CONNS` | 1 | The maximum number of connections to open to the change database. |
| `ZERO_NUM_SYNC_WORKERS` | 20 | The number of processes to use for view syncing. |
| `ZERO_UPSTREAM_MAX_CONNS` | 20 | The maximum number of connections to open to the upstream database for committing mutations. |
| `ZERO_LOG_TRACE_COLLECTOR` | - | The URL of the trace collector to which to send trace data. Traces are sent over HTTP. |
| `ZERO_CHANGE_STREAMER_PORT` | 4849 | The port on which the change-streamer runs. |
| `ZERO_HEARTBEAT_MONITOR_PORT` | 4850 | The port on which the heartbeat monitor listens for health checks. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/zero-data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Z-5ubo)
