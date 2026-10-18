# Deploy libSQL Server | (Just Updated) Turso SQLite Database, Auth Token Generated on Railway

SQLite-compatible Turso database server, auth token generated

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libsql-server-or-just-updated-turso-sqli)

## About

libSQL Server (`sqld`) is Turso's open-source, SQLite-compatible database server. It speaks the Hrana protocol over HTTP, so any libSQL or Turso client can read and write a SQLite database over the network. This template runs it with a persistent volume, a generated auth token, and a public HTTPS endpoint.

This template runs `ghcr.io/tursodatabase/libsql-server` (pinned by digest) in standalone mode. The database files live on a volume mounted at `/var/lib/sqld`, so data survives redeploys. HTTP basic auth is enabled at boot: the username is `admin` and the password is the `LIBSQL_AUTH_TOKEN` variable, generated for you at deploy time. `/health` stays open for Railway's healthcheck; every other route requires the token.

Agent contract:

- Base URL: `https://`
- Username: `admin`
- Password variable: `LIBSQL_AUTH_TOKEN`
- Health path: `/health`
- SQL endpoint: `POST /v2/pipeline` (Hrana over HTTP)

```bash
curl -s -u admin:$LIBSQL_AUTH_TOKEN -X POST https:///v2/pipeline \
  -H 'content-type: application/json' \
  -d '{"requests":[{"type":"execute","stmt":{"sql":"create table if not exists t(a)"}},{"type":"execute","stmt":{"sql":"insert into t values (1)"}},{"type":"execute","stmt":{"sql":"select a from t"}}]}'
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libsql | `ghcr.io/tursodatabase/libsql-server@sha256:6dd3eb276d9d3604e4a48ac4a999a2e267814732d57d7e94c04ba71482333a67` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LIBSQL_AUTH_TOKEN` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export SQLD_DB_PATH=/var/lib/sqld/data SQLD_NODE=standalone SQLD_HTTP_LISTEN_ADDR="[::]:$PORT" SQLD_HTTP_AUTH="basic:$(printf "admin:%s" "$LIBSQL_AUTH_TOKEN" | base64 -w0)"; echo "libsql uid=$(id -u) data=$SQLD_DB_PATH"; exec /usr/local/bin/docker-wrapper.sh /bin/sqld'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/sqld`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/libsql-server-or-just-updated-turso-sqli)
