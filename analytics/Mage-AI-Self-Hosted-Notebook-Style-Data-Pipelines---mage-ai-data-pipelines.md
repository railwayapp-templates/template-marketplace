# Deploy Mage AI — Self-Hosted Notebook-Style Data Pipelines on Railway

Self-host Mage — notebook-style data pipelines, Airflow alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mage-ai-data-pipelines)

## About

Mage AI is an open-source data pipeline tool for building, scheduling, and monitoring data workflows — a modern, notebook-style alternative to Airflow. Each pipeline step is a block of Python, SQL, or R whose output you preview as you write it, chained into a pipeline the built-in scheduler runs on a cron with retries and per-run logs. This template deploys the official Mage image with PostgreSQL for orchestration state, a persistent volume for your pipelines, authentication on, and the numpy boot fix that makes it actually start on Railway.

---

Mage is powerful, and three specifics decide whether it deploys cleanly and securely on Railway — all handled here.

**The numpy boot fix — why this template starts where a plain deploy doesn't.** Every published `mageai/mageai` image ships a numpy build that mis-registers its ufuncs on the hardware Railway runs on: Mage imports scikit-learn on startup, scipy falls over on the broken numpy, and the server dies before it ever binds a port. This template reinstalls numpy from PyPI at boot, which is why it starts reliably where a plain `docker run` of the same image crashes on Railway — the difference between a Mage that deploys here and one that doesn't.

**Authentication is on — Mage executes arbitrary code.** This is critical: a Mage instance is a web UI that runs arbitrary Python, SQL, and shell commands, with a built-in terminal, on a public domain. Mage's own default requires authentication, yet some Railway templates turn it back off — leaving an open remote-code-execution surface. This template keeps `REQUIRE_USER_AUTHENTICATION` on and creates an owner from `DEFAULT_OWNER_EMAIL`/`DEFAULT_OWNER_PASSWORD`, so your instance is behind a login from the first deploy. Change the password after signing in.

**Two things persist — pipelines and orchestration state.** Mage stores your pipelines and project as code files on a volume at `/home/src`, while orchestration data (triggers, runs, block runs, encrypted secrets) lives in PostgreSQL via `MAGE_DATABASE_CONNECTION_URL`. Both matter: without the volume you lose pipeline code, and without Postgres (the default SQLite is ephemeral on a PaaS) you lose run history. This template wires both, so your work and history survive redeploys.

**Blocks run in the server container — size for your heaviest pipeline.** Mage executes block code in the same container as the server, so memory should be sized for the largest pipeline you expect, not the UI. Pipelines loading large pandas frames are the usual reason to raise RAM. The image is around 1.3 GB, so the first deploy spends a few minutes pulling it.

**Preview output as you build.** Mage's signature is the interactive, notebook-style editor: each block previews its output as you write, so a broken join is visible in the editor rather than three tables downstream. Blocks connect into a pipeline the scheduler runs, and Mage integrates dbt, connectors, and custom blocks.

Typical cost: **~$10–20/month** on Railway for Mage, Postgres, and Redis, scaling with pipeline memory. Mage is Apache-2.0 and free — no seat, run, or connector limits.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mage | [gridalpha/mage-railway](https://github.com/gridalpha/mage-railway) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mage | 6789 | PORT |
| `REDIS_URL` | Mage | - | REDIS_URL |
| `SERVER_VERBOSITY` | Mage | info | Application and Tornado log level |
| `DEFAULT_OWNER_EMAIL` | Mage | admin@example.com | Email of the first owner user |
| `DEFAULT_OWNER_PASSWORD` | Mage | (secret) | Password of the first owner user |
| `DEFAULT_OWNER_USERNAME` | Mage | (secret) | Username of the first owner user |
| `DISABLE_AUTO_BROWSER_OPEN` | Mage | 1 | Do not open a browser at startup |
| `SCHEDULER_TRIGGER_INTERVAL` | Mage | 10 | Seconds between scheduler ticks |
| `REQUIRE_USER_AUTHENTICATION` | Mage | 1 | Require sign-in for the UI and API |
| `MAGE_DATABASE_CONNECTION_URL` | Mage | - | Metadata database connection string |
| `MAGE_ACCESS_TOKEN_EXPIRY_TIME` | Mage | (secret) | Session token lifetime in seconds |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/mage-ai-data-pipelines)
