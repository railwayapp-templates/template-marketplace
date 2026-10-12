# Deploy JupyterLab 4 Data Science Workstation on Railway

Notebooks with a Python data stack, persistent storage and password login.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyterlab-4-data-science-workstation)

## About

JupyterLab 4 in your browser with a ready Python data stack: pandas, NumPy, SciPy, scikit-learn, matplotlib, seaborn, statsmodels, Dask and more. Your notebooks, installed packages, conda environments and settings live on a persistent volume, and the server is protected by a generated password and API token.

A notebook server needs more than a running container. It needs storage that survives redeploys, authentication that is on from the first request, and a way to add packages without rebuilding the image. This community template runs the official Jupyter Docker Stacks `scipy-notebook` image at a pinned weekly build, mounts the whole `/home/jovyan` directory on a Railway volume, and hashes the login password at start so it never appears inside notebooks or terminals. `pip install` and new conda environments go to the volume, so they are still there after an upgrade. Jupyter restarts itself inside the container if you shut it down from the menu.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| JupyterLab | [baranberkay96/jupyterlab-railway](https://github.com/baranberkay96/jupyterlab-railway) (branch: main) (root: /services/jupyterlab) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone for notebooks and terminals (e.g. Europe/Istanbul). |
| `PORT` | 8888 | Port Jupyter Server listens on. Railway routes the domain and the healthcheck here. |
| `PIP_USER` | (secret) | pip and %pip install into ~/.local on the volume, so packages survive redeploys. Set 0 to install into the image (lost on redeploy). |
| `GRANT_SUDO` | no | Set yes to give the jovyan user passwordless sudo (apt installs). System changes are lost on redeploy; only /home/jovyan persists. |
| `RESTARTABLE` | yes | Restart Jupyter inside the container when it exits (e.g. File > Shut Down or after installing an extension) instead of stopping the service. |
| `JUPYTER_TOKEN` | (secret) | API token for IDEs and scripts (Authorization: token ...). Also accepted on the login page. Leave empty for a random token printed in the logs. |
| `JUPYTER_PASSWORD` | (secret) | Login password for the web UI. Generated at deploy; hashed at start and never exposed to notebooks or terminals. |
| `JUPYTER_KERNEL_CULL_IDLE_TIMEOUT` | 0 | Shut down kernels idle for this many seconds (no browser tab attached) to free RAM. 0 keeps kernels running. |

## Configuration

- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan`

**Category:** AI/ML · **Tags:** jupyter, jupyterlab, notebook, python, data-science · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/jupyterlab-4-data-science-workstation)
