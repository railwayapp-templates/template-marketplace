# Deploy Kestra | (Just Updated) Workflow Orchestration, Shell and Python Tasks Work on Railway

Kestra workflow engine. Login set at deploy, data on volumes, healthcheck

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kestra-or-just-updated-workflow-orchestr)

## About

Kestra is an open-source workflow orchestration engine. Flows are declared in YAML and triggered by
schedules, webhooks or events, and tasks can run shell commands, Python scripts, SQL, HTTP calls
and several hundred plugins.

This template runs Kestra 1.3 from a digest-pinned official image together with a PostgreSQL 17
service, with the web UI and API on a public Railway domain and both services on volumes.

- **The UI and API are behind a login from the first request.** An admin password is generated per
  deploy (`KESTRA_PASSWORD`, user `admin@kestra.io`). An anonymous API call returned 401; the
  same call with the generated credentials returned 200.
- **Shell and Python tasks run without Docker.** Kestra's default task runner starts a container,
  which needs a Docker socket that Railway does not provide. Here the shell and Python task types
  default to the in-process runner, and a `Commands` flow ran to SUCCESS on a fresh deploy.
- **State survives redeploys.** Flows, executions and logs live in PostgreSQL on a volume, and
  task outputs live in Kestra's internal storage on a second volume. A flow created before a
  redeploy and its execution history were both present after it.
- **Storage is writable.** Railway mounts volumes as root, and Kestra's image runs as a non-root
  user, so a plain mount is read-only to it. The template runs the service as root so the storage
  directory can be written.
- **A healthcheck is set** on `/ping`, so a deploy that does not start is reported as failed
  instead of looking live.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-trixie` | Database |
| kestra | `kestra/kestra:v1.3.41@sha256:9f47a6fc9172aa388f40140feebecca3f7efe1df1cbc66467af9b29cf6883059` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `KESTRA_PASSWORD` | kestra | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'export KESTRA_CONFIGURATION="{datasources: {postgres: {url: \"jdbc:postgresql://$PGHOST:5432/postgres\", driverClassName: org.postgresql.Driver, username: postgres, password: \"$PGPASSWORD\"}}, kestra: {server: {basic-auth: {username: \"admin@kestra.io\", password: \"$KESTRA_PASSWORD\"}}, queue: {type: postgres}, repository: {type: postgres}, storage: {type: local, local: {basePath: /app/storage}}, plugins: {defaults: [{type: io.kestra.plugin.scripts.shell.Commands, forced: false, values: {taskRunner: {type: io.kestra.plugin.core.runner.Process}}},{type: io.kestra.plugin.scripts.shell.Script, forced: false, values: {taskRunner: {type: io.kestra.plugin.core.runner.Process}}},{type: io.kestra.plugin.scripts.python.Commands, forced: false, values: {taskRunner: {type: io.kestra.plugin.core.runner.Process}}},{type: io.kestra.plugin.scripts.python.Script, forced: false, values: {taskRunner: {type: io.kestra.plugin.core.runner.Process}}}]}}}"; echo "[railway] cores=$(nproc) storage=$(test -w /app/storage && echo writable || echo READONLY) uid=$(id -u)"; exec docker-entrypoint.sh server standalone'`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/kestra-or-just-updated-workflow-orchestr)
