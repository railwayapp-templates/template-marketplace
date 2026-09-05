# Deploy Livebook on Railway

Interactive notebooks for Elixir code, data and charts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/livebook)

## About

Livebook is an interactive notebook for Elixir, built by Dashbit. It mixes prose, runnable code and rich output — charts, maps, tables, forms — into a single `.livemd` file that is plain Markdown, so notebooks read well on GitHub and diff cleanly in review. Teams reach for it to replace one-off scripts and stale runbooks: data exploration with Explorer, machine-learning inference with Bumblebee and Nx, live debugging against a production node, and small internal tools deployed straight from a notebook as an app. Dependencies are declared per notebook with `Mix.install/1`, so anyone who opens the file gets the versions you had.

Deploy Livebook on Railway and you get a working authoring instance, not a bare container. The `livebook` service runs the official `ghcr.io/livebook-dev/livebook` image behind a password, with a 5 GB volume holding your notebooks, Livebook's settings and the compiled dependency cache, so a redeploy does not re-download every package. A second small service, `iframe`, serves the sandboxed frame Livebook's interactive outputs render inside — that content must come from a different origin, so it needs its own hostname. A managed bucket, `livebook-storage`, is created and pre-wired so notebooks can also live in S3-compatible storage.

![Diagram of the Livebook and iframe services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788504764/livebook-architecture.png)

Self-hosting Livebook puts it next to the systems it needs to reach — a private database, an internal API, a cluster you attach a remote runtime to — without exposing any of them to a hosted notebook service.

- Notebooks stored as `.livemd`, a Markdown subset that versions like code
- Smart cells for database queries, charts and data transforms, no boilerplate
- Kino for interactive output: inputs, forms, tables, maps and VegaLite charts
- Real-time collaborative editing, with connected users shown in the sidebar
- Deploy any notebook as a web app from the Application pane
- Attach a runtime to an existing Elixir node to inspect it live
- Python cells alongside Elixir ones

The deployment has two services. `livebook` serves the UI on port 8080, keeps all mutable state on the volume at `/data`, and starts a separate Elixir runtime for each notebook you open. `iframe` is a small Caddy reverse proxy in front of the app's second internal port, which serves only the static sandbox document interactive outputs load — nothing else.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| iframe | `caddy:2-alpine` | Web service |
| livebook | `ghcr.io/livebook-dev/livebook:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | iframe | 8080 | Port Caddy binds and Railway health-checks |
| `CADDY_CONFIG` | iframe | {"apps":{"http":{"servers":{"iframe":{"listen":[":{env.PORT}"],"routes":[{"match":[{"path":["/healthz"]}],"handle":[{"handler":"static_response","status_code":200,"body":"ok"}]},{"handle":[{"handler":"reverse_proxy","upstreams":[{"dial":"livebook.railway.internal:8081"}]}]}]}}}}} | Caddy JSON: /healthz plus a proxy to Livebook's frame endpoint |
| `PORT` | livebook | 8080 | Port Railway health-checks |
| `HEX_HOME` | livebook | /data/hex | Hex registry and package cache |
| `AWS_REGION` | livebook | - | Bucket placement region |
| `LIVEBOOK_HOME` | livebook | /data/notebooks | Notebook browser root, on the volume |
| `LIVEBOOK_PORT` | livebook | 8080 | Port Livebook binds; keep equal to PORT |
| `S3_BUCKET_URL` | livebook | - | Paste into File Storages; unread by Livebook |
| `LIVEBOOK_COOKIE` | livebook | - | Erlang distribution cookie |
| `MIX_INSTALL_DIR` | livebook | /data/mix-install | Compiled notebook dependency cache |
| `AWS_ACCESS_KEY_ID` | livebook | - | Bucket access key |
| `LIVEBOOK_PASSWORD` | livebook | (secret) | Instance password, minimum 12 characters |
| `IFRAME_PUBLIC_HOST` | livebook | - | Origin serving the output sandbox frame |
| `LIVEBOOK_DATA_PATH` | livebook | /data/livebook | Settings, secrets and autosaves |
| `LIVEBOOK_LOG_LEVEL` | livebook | info | Log verbosity; upstream default is warning |
| `AWS_SECRET_ACCESS_KEY` | livebook | (secret) | Bucket secret key |
| `LIVEBOOK_APP_SERVICE_URL` | livebook | - | Manage-instance link in the UI |
| `LIVEBOOK_AWS_CREDENTIALS` | livebook | (secret) | Read bucket keys from the environment |
| `LIVEBOOK_SECRET_KEY_BASE` | livebook | (secret) | Session cookie signing key |
| `LIVEBOOK_APP_SERVICE_NAME` | livebook | Livebook on Railway | Instance label shown in the UI |

## Configuration

- **Start command:** `/bin/sh -c 'printf %s "$CADDY_CONFIG" > /etc/caddy/config.json; caddy validate --config /etc/caddy/config.json || exit 1; exec caddy run --config /etc/caddy/config.json'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'for d in "$LIVEBOOK_HOME" "$LIVEBOOK_DATA_PATH" "$MIX_INSTALL_DIR" "$HEX_HOME"; do [ -n "$d" ] && mkdir -p "$d"; done; C=/sys/fs/cgroup/cpu.max; if [ -r "$C" ]; then Q=$(cut -d" " -f1 "$C"); P=$(cut -d" " -f2 "$C"); if [ "$Q" != "max" ] && [ "$P" -gt 0 ]; then N=$(( Q / P )); [ "$N" -lt 1 ] && N=1; export ERL_AFLAGS="+S $N:$N +SDcpu $N:$N +SDio $N $ERL_AFLAGS"; fi; fi; if [ -z "$LIVEBOOK_IFRAME_URL" ] && [ -n "$IFRAME_PUBLIC_HOST" ]; then V=$(gzip -cd /app/lib/livebook-*/priv/static/assets/*.js.gz 2>/dev/null | grep -ho "iframe/v[0-9]*.html" | head -1); if [ -n "$V" ]; then export LIVEBOOK_IFRAME_URL="https://$IFRAME_PUBLIC_HOST/$V"; fi; fi; echo "livebook-boot: ERL_AFLAGS=[$ERL_AFLAGS] LIVEBOOK_IFRAME_URL=[$LIVEBOOK_IFRAME_URL] MIX_INSTALL_DIR=[$MIX_INSTALL_DIR]"; exec /app/bin/server'`
- **Healthcheck:** `/public/health`
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/livebook)
