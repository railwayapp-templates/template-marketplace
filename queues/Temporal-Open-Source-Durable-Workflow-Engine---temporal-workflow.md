# Deploy Temporal | Open Source Durable Workflow Engine on Railway

Durable execution on Postgres — no Elasticsearch, console behind a password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/temporal-workflow)

## About

Temporal is a durable execution engine: you write ordinary code, and Temporal makes it survive crashes, restarts and week-long waits without you writing a state machine or a retry table. This template runs a complete Temporal cluster with its web console, backed by PostgreSQL and nothing else.

This template runs the official `temporalio/auto-setup` image on a pinned stable tag, with the schema created and the `default` namespace registered on the first boot, plus the official web console and a PostgreSQL 18 database on a persistent Railway volume. Nothing is rebuilt or forked, so upstream releases and upstream security fixes are what you get.

Three decisions shape this deployment, and all three go the other way in most self-hosted Temporal setups.

**There is no Elasticsearch.** Visibility — the index behind workflow search and the console's list view — lives in Postgres. Temporal's SQL visibility store supports the same list filters, so `WorkflowType = "..."` and `ExecutionStatus = "Running"` queries work out of the box. Adding Elasticsearch would roughly triple the memory footprint of the deployment for search features most self-hosted clusters never reach for.

**All four Temporal roles run in one container.** Frontend, history, matching and worker are separate processes in a large cluster; splitting them here would mean four billed services coordinating over the network to do what one process does over loopback. When you outgrow a single node, the `SERVICES` variable is how you split them.

**The console is behind a password.** Temporal's web UI ships no authentication short of wiring up an OIDC provider, and it can read every workflow's full history and terminate anything running. Publishing it on an open domain is not an option, so a Caddy gateway sits in front of it with HTTP basic auth and a generated password. That gateway holds the public domain; the console itself has none.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Temporal UI | `temporalio/ui:2.53.1` | Worker |
| Auth Gateway | `caddy:2.11.4-alpine` | Web service |
| Temporal | `temporalio/auto-setup:1.29.7` | Worker |
| Postgres | `postgres:18.4-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Temporal UI | 8080 | Same port again — Railway routes and health-checks by this variable. |
| `TEMPORAL_ADDRESS` | Temporal UI | - | Frontend the console talks to, over the private network. |
| `TEMPORAL_UI_PORT` | Temporal UI | 8080 | Port the console listens on. |
| `TEMPORAL_CORS_ORIGINS` | Temporal UI | - | Origin the browser actually sends. It is the gateway's domain, not the console's own, because the console has no public domain of its own. |
| `TEMPORAL_DEFAULT_NAMESPACE` | Temporal UI | default | Namespace the console opens on. |
| `TEMPORAL_DISABLE_NEWS_FETCH` | Temporal UI | true | Stops the console calling out to temporal.io for release notes on every page load. |
| `PORT` | Auth Gateway | 8080 | Port the gateway listens on and that the public domain points at. |
| `UPSTREAM` | Auth Gateway | - | Private address of the console this gateway proxies to. |
| `CADDYFILE` | Auth Gateway | :{$PORT} {
	handle /healthz {
		respond "ok" 200
	}
	handle {
		basic_auth {
			{$GATEWAY_USERNAME} {$CADDY_HASH}
		}
		reverse_proxy {$UPSTREAM}
	}
}
 | Caddy configuration, written to disk at boot. `/healthz` is answered without a password so Railway's healthcheck can pass; everything else sits behind basic auth. Edit it to add IP allow-lists, rate limits or your own routes. |
| `GATEWAY_PASSWORD` | Auth Gateway | (secret) | Password for that prompt, generated once. Change it here and redeploy to rotate — the bcrypt hash Caddy uses is derived from it at boot, so there is nothing else to update. |
| `GATEWAY_USERNAME` | Auth Gateway | (secret) | Username for the login prompt in front of the Temporal console. |
| `DB` | Temporal | postgres12 | Name of Temporal's SQL plugin, not a server version. `postgres12` is the correct value for every PostgreSQL from 12 to 18; anything else aborts the boot with "Unsupported driver". |
| `PORT` | Temporal | 7233 | gRPC port the frontend listens on, for workers inside the project. |
| `DB_PORT` | Temporal | 5432 | Port of the Postgres service. |
| `ENABLE_ES` | Temporal | false | Elasticsearch for the visibility store. Off: visibility lives in Postgres, which is what keeps this deployment to four small services instead of six large ones. Turning it on requires an Elasticsearch service and its own environment variables. |
| `BIND_ON_IP` | Temporal | :: | Address every Temporal role binds to. Railway's private network is IPv6-only, so this has to be the wildcard `::` — with `0.0.0.0` nothing in the project can reach the frontend, including the console. |
| `POSTGRES_PWD` | Temporal | - | Password for that user, taken straight from the Postgres service. |
| `POSTGRES_USER` | Temporal | (secret) | User Temporal connects to Postgres as. |
| `POSTGRES_SEEDS` | Temporal | - | Private hostname of the Postgres service. |
| `TEMPORAL_ADDRESS` | Temporal | 127.0.0.1:7233 | Where this container's own CLI reaches the frontend while registering the default namespace on the first boot. |
| `DEFAULT_NAMESPACE` | Temporal | default | Namespace registered on the first boot. Your workers and clients connect to it. |
| `NUM_HISTORY_SHARDS` | Temporal | 512 | Shard count. It is written into the database on the first boot and CANNOT be changed afterwards — a different value means a new cluster. 512 is Temporal's production recommendation; the 4 used by the upstream docker-compose is a development value that caps throughput permanently. |
| `TEMPORAL_BROADCAST_ADDRESS` | Temporal | 127.0.0.1 | Address the roles advertise to each other through ringpop membership. All four run in this one container, so loopback is both correct and stable — unlike the container's own IPv6 address, which changes on every deploy. |
| `DEFAULT_NAMESPACE_RETENTION` | Temporal | 72h | How long closed workflow histories stay queryable in that namespace before Temporal deletes them. Longer retention costs database volume. |
| `SKIP_DEFAULT_NAMESPACE_CREATION` | Temporal | false | Set to true if you would rather create every namespace yourself. |
| `PORT` | Postgres | 5432 | Port Railway routes to. Postgres listens on 5432. |
| `POSTGRES_DB` | Postgres | railway | Database the image creates for itself. Temporal does not store anything here — it gets its own two databases — but the name must differ from the user name, or auto-setup skips the CREATE and finds nothing. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser Temporal connects as. It needs permission to create databases: Temporal's auto-setup creates `temporal` and `temporal_visibility` itself on the first boot. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once and read by Temporal over the private network. Nothing else uses it. |

## Configuration

- **Start command:** `sh -c 'export CADDY_HASH="$(caddy hash-password --plaintext "$GATEWAY_PASSWORD")"; printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile; exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/temporal-workflow)
