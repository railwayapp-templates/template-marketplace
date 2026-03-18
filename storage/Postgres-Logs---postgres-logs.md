# Deploy Postgres Logs on Railway

Postgres with structured logs and correct severity levels

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/postgres-logs)

## About

Postgres Logs is a Railway-ready template that deploys a fully managed PostgreSQL 17 instance with structured JSON logs automatically streamed to Railway’s Logs tab. It converts Postgres JSON logs into structured log lines with proper severity levels - so informational, warning, and error messages are clearly separated instead of all appearing as "error".

Hosting Postgres Logs on Railway means you get a persistent PostgreSQL database backed by a mounted volume and a clean TCP socket connection. This template automatically configures JSON logging, replaces the default file log with a named pipe, and relays output to stdout in a structured format. Railway’s log viewer then correctly recognizes each message level. The setup avoids false "error" classifications and provides real-time observability without external logging services, making debugging and monitoring smoother and more reliable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres Logs | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `POSTGRES_DB` | railway |
| `POSTGRES_USER` | (secret) |
| `POSTGRES_PASSWORD` | (secret) |

## Configuration

- **Start command:** `bash -c 'log() { echo "[Relay] $1" > /proc/1/fd/1; }; log "Starting DB";wrapper.sh postgres -p 5432 -c listen_addresses=* -c log_destination=jsonlog -c logging_collector=on -c log_directory=log -c log_filename=postgresql.log -c log_rotation_age=0 -c log_rotation_size=0 -c log_truncate_on_rotation=off & pid=$!;LOG_FILE="$PGDATA/log/postgresql.json";log "Preparing pipe $LOG_FILE";if [ -p "$LOG_FILE" ]; then log "Pipe already exists";else while true; do if [ -f "$LOG_FILE" ]; then log "Replacing logfile with a pipe";mv -f "$LOG_FILE" "$LOG_FILE.prev";mkfifo "$LOG_FILE";chown postgres:postgres "$LOG_FILE";chmod 600 "$LOG_FILE";log "Pipe created";break;else log "Waiting for $LOG_FILE to exist...";sleep 1;fi;done;fi;log "Starting log streaming";cat "$LOG_FILE" | tee /tmp/pglog.raw | while IFS= read -r line;do line=${line//error_severity/level};printf "%s\n" "$line" > /proc/1/fd/1 || true;done & wait $pid'`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/postgres-logs)
