# Deploy Mage AI | Open Source Airflow Alternative for Data Pipelines on Railway

Open-source Airflow alternative for data pipelines, auth on by default

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mage-ai)

## About

Mage is an open-source data pipeline tool: you write blocks of Python, SQL or R in a notebook-style editor, wire them into a pipeline, and Mage schedules them, runs them, keeps every run's logs and output, and retries what fails. It covers the ground Airflow covers, without the DAG boilerplate.

This template runs the official `mageai/mageai` image on a pinned release with its metadata in PostgreSQL 18 and its project directory on a persistent Railway volume. Nothing is rebuilt or forked, so upstream releases are what you get.

Three things here differ from the other Mage templates on Railway, and all three are the reason this one works.

**The login screen is on.** Mage's own default is to require authentication, and the popular Railway template explicitly turns it back off. A Mage instance is a web UI that executes arbitrary Python, SQL and shell commands, with a built-in terminal, on a public domain. This template leaves authentication where upstream put it and generates the owner password, the OAuth signing secret and the download-token secret per deployment, so no two installs share a key.

**The image tag is pinned in full.** A floating tag means the next upstream release lands on your running project at its next restart, which for a data platform means new behaviour arriving unannounced in the middle of a scheduled run.

**It starts at all.** Every published `mageai/mageai` image — `latest` and every version tag back to 0.9.73 — ships a numpy that mis-registers its ufuncs on the hardware Railway runs on. Mage imports scikit-learn on the way up, scipy falls over on top of the broken numpy, and the server dies before it ever binds a port. This template reinstalls numpy from PyPI at boot, which is why it starts where a plain `docker run` of the same image does not.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mage | `mageai/mageai:0.9.79` | Web service |
| Postgres | `postgres:18.4-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Mage | 6789 | Port Mage listens on. `mage start` takes it from its own default rather than from this variable, so changing it here only changes where Railway routes. |
| `JWT_SECRET` | Mage | (secret) | Signs the session cookie. Upstream ships the literal default "materia", which means anyone can mint a valid session against a deployment that never set it. |
| `MAGE_DATA_DIR` | Mage | /home/src/mage_data | Where Mage writes each block's output variables and each run's logs. Also on the volume, and the directory that grows — `mage clean-variables` and `mage clean-logs` are what reclaim it. |
| `USER_CODE_PATH` | Mage | /home/src/railway_pipeline | Directory holding your Mage project — pipelines, blocks, dbt models and requirements.txt. It is on the volume, so your code survives redeploys. Rename the last path segment to rename the project; keep it under /home/src. |
| `MAGE_PUBLIC_HOST` | Mage | - | Public URL of this deployment. Mage builds the API-trigger examples and notification links from it. |
| `DEFAULT_OWNER_EMAIL` | Mage | admin@example.com | Email of the owner account created on the first boot — this is what you log in with. Change it to your own address before deploying. |
| `JWT_DOWNLOAD_SECRET` | Mage | (secret) | Signs file-download links. Left unset, Mage generates a new one per process, so every restart invalidates outstanding download links. |
| `PREINSTALL_PACKAGES` | Mage | numpy==1.26.4 | Installed with pip before the server starts. It is here for one reason: every published mageai image, `latest` included, carries a numpy that mis-registers its ufuncs on this hardware, so scipy fails on import and Mage dies before binding a port (upstream issue #6103). Reinstalling the same version from PyPI fixes it. Empty this once an upstream image boots on its own. |
| `DEFAULT_OWNER_PASSWORD` | Mage | (secret) | Password for the owner account, generated once. Change it from inside Mage after the first login; editing it here only affects a fresh deployment. |
| `DEFAULT_OWNER_USERNAME` | Mage | (secret) | Username of that owner account. |
| `DISABLE_AUTO_BROWSER_OPEN` | Mage | 1 | Stops Mage trying to open a desktop browser tab at boot, which makes no sense in a container. |
| `REQUIRE_USER_AUTHENTICATION` | Mage | 1 | Keeps the login screen on. This UI executes arbitrary Python, SQL and shell commands and has a built-in terminal, so on a public domain turning this off hands all of that to anyone who finds the URL. |
| `MAGE_DATABASE_CONNECTION_URL` | Mage | - | Metadata database: pipeline runs, schedules, users and tokens. Without it Mage falls back to SQLite inside the container and loses all of that on every deploy. |
| `PORT` | Postgres | 5432 | Port Postgres listens on. |
| `POSTGRES_DB` | Postgres | mage | Database the image creates on the first boot. Mage runs its migrations here. |
| `POSTGRES_USER` | Postgres | (secret) | Superuser Mage connects as. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated once and read by Mage over the private network. The alphabet is alphanumeric on purpose: the default character set can emit `/` or `@`, either of which breaks the connection URL this password is substituted into. |

## Configuration

- **Start command:** `sh -c 'if [ -n "$PREINSTALL_PACKAGES" ]; then pip install --no-cache-dir -q --force-reinstall --no-deps $PREINSTALL_PACKAGES; fi; exec /app/run_app.sh'`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/src`
- **Volume:** `/var/lib/postgresql`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/mage-ai)
