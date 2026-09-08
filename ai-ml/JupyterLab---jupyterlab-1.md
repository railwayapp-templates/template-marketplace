# Deploy JupyterLab on Railway

Persistent JupyterLab with scientific Python and generated token login.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyterlab-1)

## About

JupyterLab is a browser-based scientific Python workspace for notebooks, data exploration, and terminal access. This single-user template includes NumPy, pandas, SciPy, matplotlib, and scikit-learn, with persistent storage and a generated login token.

The template builds the public [wrapper repository](https://github.com/leoisadev1/railway-template-jupyterlab) over the official Jupyter scipy-notebook image, pinned by version and digest. Railway provides HTTPS and a volume mounted at `/home/jovyan`. The upstream startup helper repairs volume ownership, then runs Jupyter as jovyan, UID 1000. Runtime files use `/tmp/jupyter-runtime` with normal permission checks.

After the `/login` healthcheck passes, copy the generated `JUPYTER_TOKEN` from Railway's Variables panel, open the service domain, and paste the token into the login form. Create a Python notebook from the Launcher. The healthcheck verifies the web server, not notebook kernel execution.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| JupyterLab | [leoisadev1/railway-template-jupyterlab](https://github.com/leoisadev1/railway-template-jupyterlab) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JUPYTER_TOKEN` | (secret) |

## Configuration

- **Start command:** `/usr/local/bin/railway-start.sh`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/jupyterlab-1)
