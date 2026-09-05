# Deploy JupyterHub on Railway

Multi-user Jupyter notebook server with per-user workspaces

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyterhub)

## About

JupyterHub is the multi-user front door to Jupyter notebooks. Rather than everyone running `jupyter lab` on their own laptop against their own half-installed Python, it gives each person a login, a home directory and a JupyterLab server the hub starts on demand and stops when they go idle. Project Jupyter maintains it under a BSD licence; it runs course servers, research clusters and internal data platforms.

Self-host JupyterHub with this template and the parts that normally take an afternoon are already wired together. The `jupyterhub` service runs the hub, its `configurable-http-proxy` router and every notebook server in one container, built from [gridalpha/jupyterhub-railway](https://github.com/gridalpha/jupyterhub-railway) on `quay.io/jupyterhub/jupyterhub:5`. A managed `Postgres` service holds the hub database; a 5 GB volume at `/home` holds user files. Deploy JupyterHub on Railway and you get sign-up with admin approval, JupyterLab with the SciPy stack, and idle servers stopped automatically.

![Diagram of the JupyterHub and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788508684/jupyterhub-architecture.png)

A single-user Jupyter server has no concept of accounts: whoever reaches the port owns the kernel and the filesystem. JupyterHub adds the missing tier. `configurable-http-proxy` owns the public port, routing `/hub/*` to the hub and `/user//*` to that person's server; the hub keeps no state on disk, so a redeploy leaves everyone signed in and only notebook files need the volume.

- Per-user JupyterLab servers, started and stopped on demand
- Password accounts with an approval queue, strength rules and lockout on repeated failures
- Home directories on a persistent volume, isolated by UNIX permissions
- An admin console for listing users and stopping servers
- Idle culling, so an abandoned notebook stops billing memory
- JupyterLab, Notebook 7, NumPy, pandas, Matplotlib, SciPy and ipywidgets preinstalled

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| jupyterhub | [gridalpha/jupyterhub-railway](https://github.com/gridalpha/jupyterhub-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `PORT` | jupyterhub | 8000 | Port the proxy binds and Railway probes |
| `DATABASE_URL` | jupyterhub | - | Hub database connection string |
| `JPY_COOKIE_SECRET` | jupyterhub | (secret) | Session cookie signing key, 32 bytes hex |
| `JUPYTERHUB_HOME_ROOT` | jupyterhub | /home | Volume mount holding home directories |
| `JUPYTERHUB_ADMIN_USER` | jupyterhub | (secret) | First admin's username |
| `JUPYTERHUB_CULL_EVERY` | jupyterhub | 600 | Seconds between idle-culler runs |
| `CONFIGPROXY_AUTH_TOKEN` | jupyterhub | (secret) | Hub-to-proxy shared secret |
| `JUPYTERHUB_DEFAULT_URL` | jupyterhub | /lab | Landing app; /tree for classic |
| `JUPYTERHUB_IDLE_TIMEOUT` | jupyterhub | 3600 | Seconds idle before a server stops |
| `NATIVE_AUTH_OPEN_SIGNUP` | jupyterhub | false | Require admin approval for signups |
| `JUPYTERHUB_ADMIN_PASSWORD` | jupyterhub | (secret) | First admin's password, min 8 characters |
| `NATIVE_AUTH_ENABLE_SIGNUP` | jupyterhub | true | Serve the self-registration page |
| `NATIVE_AUTH_MIN_PASSWORD_LENGTH` | jupyterhub | (secret) | Minimum account password length |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/hub/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home`

**Category:** Analytics · **Languages:** Python, Dockerfile, Jupyter Notebook, Shell

[View on Railway →](https://railway.com/deploy/jupyterhub)
