# Deploy Swetrix CE v5.3.1 | Google Analytics Alternative, Data Survives Redeploys on Railway

Cookieless analytics. ClickHouse on a volume, empty deploy form.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/swetrix-ce-v531-or-google-analytics-alte)

## About

Swetrix is open-source, privacy-first web analytics — a cookieless Google Analytics
alternative with funnels, custom events, error tracking, performance monitoring and session
replay, and no consent banner to bolt on. This template runs the pinned **v5.3.1** Community
Edition release across four services, and the deploy form is empty: every value is filled in
for you.

Three things this template does that the other Swetrix listing on this marketplace does not:

- **Your accounts and analytics survive a redeploy.** Swetrix CE has no second database. The
  `user`, `project`, `refresh_token` and `salt` tables live in ClickHouse alongside the event
  data, so a ClickHouse service with no volume loses the login as well as the traffic history
  on every redeploy. Verified on 2026-08-02: recreate a volumeless ClickHouse container and the
  next query returns `Code: 60 ... UNKNOWN_TABLE`. Here the volume is mounted at
  `/var/lib/clickhouse`, and the same recreate returns the account intact.
- **The API is actually reachable from the UI.** The Swetrix web app calls its backend at
  `${BASE_URL}/backend` in self-hosted mode, so the gateway has to strip that prefix. Doing it
  the natural-looking way — an nginx `proxy_pass http://$upstream/;` with a variable upstream —
  sends *every* API call to the backend root instead, because nginx skips its usual prefix
  rewrite when the upstream is a variable. Measured here:
  `POST /backend/v1/auth/register` came back `{"message":"Cannot POST /","statusCode":404}`.
  This template strips the prefix with an explicit `rewrite` and registration returns `201`,
  login `200`.
- **ClickHouse gets the CPU you are paying for.** Swetrix's own self-hosting compose pins
  `concurrent_threads_soft_limit_num=1` so it fits a 1 GB VPS. On Railway that serialises every
  dashboard query onto a single thread. This image reads the container's cgroup quota instead.
  Measured in a 4-vCPU container on the same aggregation, three runs each: **3.89 s** median
  pinned to one thread vs **2.16 s** sized to the container.

Swetrix Community Edition is a NestJS API plus a React Router web UI, backed by ClickHouse for
storage and Redis for caching. ClickHouse is the whole instance state, not just the event
store — accounts, projects, funnels, feature flags, refresh tokens and the key salt all live
there — which makes persistent storage the difference between a working install and one that
resets to a fresh signup screen whenever the platform replaces a container.

The UI hardcodes its API base to the same origin it is served from, so the two have to share a
public hostname. Upstream's compose does that with a separate nginx container; this template
runs nginx beside the frontend it fronts, which is one fewer always-on service to pay for. If
either the frontend or the gateway exits, the container exits with it, so Railway restarts a
broken deploy instead of leaving a gateway answering healthchecks in front of nothing.

Railway provisions four services — web UI + gateway, API, ClickHouse on a volume, Redis on a
volume — wires them over the private network, generates the ClickHouse password, the Redis
password and the JWT secret, and issues an HTTPS domain. The API waits for ClickHouse to answer
`/ping` before it boots, because Swetrix's schema-initialisation step exits successfully even
when it cannot reach the database, and an API that starts too early serves an instance with no
tables until someone redeploys it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | `ghcr.io/bon5co/swetrix-railway-api:latest` | Worker |
| clickhouse | `ghcr.io/bon5co/swetrix-railway-clickhouse:latest` | Database |
| redis | `redis:8.2.1` | Database |
| swetrix | `ghcr.io/bon5co/swetrix-railway:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDIS_PASSWORD` | api | (secret) |
| `SECRET_KEY_BASE` | api | (secret) |
| `CLICKHOUSE_PASSWORD` | api | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c 'rm -rf /data/lost+found && chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/swetrix-ce-v531-or-google-analytics-alte)
