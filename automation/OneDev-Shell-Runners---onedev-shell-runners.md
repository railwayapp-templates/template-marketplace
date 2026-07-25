# Deploy OneDev Shell Runners on Railway

OneDev with trusted Railway shell runners and optional autoscaling.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onedev-shell-runners)

## About

This template combines OneDev's integrated Git, pull request, issue, package, and CI orchestration features with trusted shell-based agents running on Railway. It includes PostgreSQL, persistent OneDev storage, a prebuilt runner toolchain, reusable agent-token leasing, and optional demand-driven replica scaling.

OneDev stores relational metadata in PostgreSQL and repositories, attachments, artifacts, and server state under `/opt/onedev`. The bundled agent connects over Railway's private network and executes jobs through OneDev's Remote Shell Executor. A separate autoscaler configures the executor, manages unique agent-token leases, and monitors waiting, pending, and running builds.

The default deployment keeps one runner available without requiring Railway API credentials. Users can add an environment-scoped Railway project token to enable queue-based scaling and cooldown scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Shell Runner | [monotykamary/railway-template-onedev-shell-runners](https://github.com/monotykamary/railway-template-onedev-shell-runners) (root: /runner) | Worker |
| Runner Autoscaler | [monotykamary/railway-template-onedev-shell-runners](https://github.com/monotykamary/railway-template-onedev-shell-runners) (root: /autoscaler) | Database |
| OneDev | [monotykamary/railway-template-onedev-shell-runners](https://github.com/monotykamary/railway-template-onedev-shell-runners) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created at initialization. |
| `DATABASE_URL` | Postgres | - | Private PostgreSQL URL. |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL superuser. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public PostgreSQL URL. |
| `AUTOSCALER_URL` | Shell Runner | - | Private runner-token lease endpoint. |
| `RUNNER_LEASE_SECRET` | Shell Runner | (secret) | Lease endpoint authentication reference. |
| `PORT` | Runner Autoscaler | 3000 | Autoscaler HTTP port. |
| `ONEDEV_URL` | Runner Autoscaler | - | Private OneDev API URL. |
| `STATE_FILE` | Runner Autoscaler | /data/state.json | Persistent token-lease state file. |
| `LEASE_TTL_MS` | Runner Autoscaler | 300000 | Pending runner-token lease lifetime. |
| `MAX_REPLICAS` | Runner Autoscaler | 5 | Maximum runner replicas. |
| `MIN_REPLICAS` | Runner Autoscaler | 1 | Minimum warm runner replicas; Railway requires at least one. |
| `EXECUTOR_NAME` | Runner Autoscaler | railway-shell | Automatically configured OneDev executor name. |
| `ONEDEV_AGENT_URL` | Runner Autoscaler | - | Private URL supplied to OneDev agents. |
| `POLL_INTERVAL_MS` | Runner Autoscaler | 5000 | OneDev queue polling interval in milliseconds. |
| `ONEDEV_ADMIN_USER` | Runner Autoscaler | (secret) | OneDev administrator account used for bootstrap. |
| `RUNNER_LEASE_SECRET` | Runner Autoscaler | (secret) | Generated secret authenticating runner lease requests. |
| `SCALE_DOWN_DELAY_MS` | Runner Autoscaler | 60000 | Idle cooldown before returning to the minimum. |
| `ONEDEV_ADMIN_PASSWORD` | Runner Autoscaler | (secret) | OneDev administrator credential used only by the autoscaler. |
| `PORT` | OneDev | 6610 | Railway routing and health-check target for OneDev HTTP. |
| `initial_user` | OneDev | (secret) | Initial administrator username. |
| `initial_email` | OneDev | admin@example.com | Initial administrator email; change after first login. |
| `initial_password` | OneDev | (secret) | Generated initial administrator password. |
| `hibernate_dialect` | OneDev | io.onedev.server.persistence.PostgreSQLDialect | OneDev PostgreSQL dialect. |
| `initial_server_url` | OneDev | - | Canonical public OneDev URL. |
| `hibernate_connection_url` | OneDev | - | Private PostgreSQL JDBC URL. |
| `hibernate_connection_password` | OneDev | (secret) | PostgreSQL password reference. |
| `hibernate_connection_username` | OneDev | (secret) | PostgreSQL user reference. |
| `hibernate_connection_driver_class` | OneDev | org.postgresql.Driver | PostgreSQL JDBC driver. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/onedev`

**Category:** Automation · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/onedev-shell-runners)
