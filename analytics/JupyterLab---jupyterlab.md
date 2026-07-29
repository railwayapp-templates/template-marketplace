# Deploy JupyterLab on Railway

Interactive notebooks and development environment for data science.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyterlab)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyterlab)

**Published on the Railway marketplace:** https://railway.com/deploy/jupyterlab (category: Analytics).

JupyterLab is Project Jupyter's web-based environment for notebooks, code, and data. It combines notebooks, terminals, text editors, file browsing, rich outputs, and extensible workflows in one interface for interactive computing, exploratory analysis, reproducible research, teaching, and software development.

> **Security:** JupyterLab can execute arbitrary code. This deployment requires a fresh generated token and never exposes an unauthenticated notebook, terminal, or file interface. Keep the Railway service and token private, rotate the token if it is disclosed, and do not use this single-user template as a multi-user JupyterHub replacement.

This deployment runs the official `quay.io/jupyter/base-notebook:lab-4.6.2` image as one public service on port 8888. Railway HTTPS fronts the server, `/api` provides the supported unauthenticated version/readiness response, and all code-capable routes remain behind Jupyter's token login. A Railway volume at `/home/jovyan/work` persists notebooks and project files. Railway mounts volumes as root, so the documented `RAILWAY_RUN_UID=0` setting lets Jupyter's startup script change that mount to the `jovyan` notebook user before dropping privileges. Railway supports only one volume per service, so Conda environments and changes outside the work directory are not persisted.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| JupyterLab | `quay.io/jupyter/base-notebook:lab-4.6.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8888 |
| `CHOWN_EXTRA` | /home/jovyan/work |
| `JUPYTER_PORT` | 8888 |
| `JUPYTER_TOKEN` | (secret) |

## Configuration

- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan/work`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/jupyterlab)
