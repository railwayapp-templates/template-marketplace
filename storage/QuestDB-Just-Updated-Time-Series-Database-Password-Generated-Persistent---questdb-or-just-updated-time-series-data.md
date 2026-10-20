# Deploy QuestDB | (Just Updated) Time-Series Database, Password Generated, Persistent on Railway

Time-series SQL database. Password generated, data persists.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/questdb-or-just-updated-time-series-data)

## About

QuestDB is a fast open-source time-series database with SQL, a web console, a REST API and PostgreSQL wire support. This template runs the official image with a persistent volume, a generated password, and a public HTTPS endpoint.

This template runs the official `questdb/questdb` image (pinned by digest). Data lives on a volume mounted at `/var/lib/questdb`, so tables survive redeploys. HTTP basic auth is enabled at boot: the username is `admin` and the password is the `QUESTDB_PASSWORD` variable, generated for you at deploy time and stable across redeploys. The same credentials apply to the PostgreSQL wire protocol, which listens on port 8812 inside the project network only. The HTTP server is bound to Railway's `$PORT`, and the JVM is capped to the container (`ActiveProcessorCount=2`, two shared workers) so it does not size itself from the host.

Agent contract:

- Base URL variable: `QUESTDB_URL` (`https://`)
- Username: `admin`
- Password variable: `QUESTDB_PASSWORD`
- Private host variable: `QUESTDB_PRIVATE_HOST` (PG wire on port 8812, same credentials)
- Health path: `/ping` (open, returns 204)
- Query endpoint: `GET /exec?query=...` (HTTP basic auth)

```bash
curl -s -u admin:$QUESTDB_PASSWORD -G "$QUESTDB_URL/exec" \
  --data-urlencode "query=select 1"
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| questdb | `questdb/questdb@sha256:67eaed863ebb2383227919ea9a5499a4a39ceca3862c20b974c84a10e11cdf89` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `QUESTDB_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export QDB_HTTP_USER=admin QDB_HTTP_PASSWORD="$QUESTDB_PASSWORD" QDB_PG_USER=admin QDB_PG_PASSWORD="$QUESTDB_PASSWORD" QDB_HTTP_BIND_TO=0.0.0.0:$PORT QDB_SHARED_WORKER_COUNT=2 JAVA_TOOL_OPTIONS=-XX:ActiveProcessorCount=2; echo "[railway] questdb uid=$(id -u) data_owner=$(stat -c %u:%g /var/lib/questdb) pids.max=$(cat /sys/fs/cgroup/pids.max 2>/dev/null) mem.max=$(cat /sys/fs/cgroup/memory.max 2>/dev/null)"; exec /docker-entrypoint.sh'`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/questdb`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/questdb-or-just-updated-time-series-data)
