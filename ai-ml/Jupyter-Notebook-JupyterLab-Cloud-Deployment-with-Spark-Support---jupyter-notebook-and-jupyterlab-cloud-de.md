# Deploy Jupyter Notebook & JupyterLab Cloud Deployment (with Spark Support) on Railway

[May '26] One-click JupyterLab hosting for big data, and ML workflows.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyter-notebook-and-jupyterlab-cloud-de)

## About

This template gives you a ready-to-use JupyterLab environment that runs entirely in the cloud—no setup headaches, no local installs, no worrying about lost notebooks. It includes password authentication, optional Spark support, persistent storage, and automatic Python package installation. The goal is simple: a fast, reliable, production-grade Jupyter environment that you can deploy in under a minute and use for data analysis, ML experiments.

Running Jupyter remotely usually means dealing with tokens, SSL, ports, and Docker wiring.
This template removes all of that by giving you a ready-to-run JupyterLab server that starts with one command.
Railway handles the rest: restarts, infrastructure, storage mounts, and scaling when needed.

### What this setup gives you
- Secure login with a password instead of tokens
- Persistent notebooks stored in your Railway volume
- Auto-installation of Python packages
- Spark capabilities for big-data workflows

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jupyter | `jupyter/all-spark-notebook` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8888 | Port Jupyter listens on |
| `RESTARTABLE` | yes | Allows Jupyter to auto-restart if it crashes. |
| `JUPYTER_PASSWORD` | (secret) | login password - generated automatically |
| `EXTRA_PIP_PACKAGES` | pandas openai | Space-separated list of pip packages to auto-install at startup |
| `JUPYTER_ENABLE_LAB` | yes | Enables JupyterLab interface instead of the classic notebook. |

## Configuration

- **Start command:** `/bin/sh -c " \     if [ -n \"${EXTRA_PIP_PACKAGES}\" ]; then \         echo \"Installing extra pip packages: ${EXTRA_PIP_PACKAGES}\"; \         pip install --no-cache-dir ${EXTRA_PIP_PACKAGES}; \     else \         echo \"No extra pip packages to install\"; \     fi && \     (echo ${JUPYTER_PASSWORD}; echo ${JUPYTER_PASSWORD}) | jupyter server password 2>&1 && \     chown ${NB_UID} /home/jovyan/.jupyter/jupyter_server_config.json && \     rm -rf ${RAILWAY_VOLUME_MOUNT_PATH}/lost+found && \     chown -R ${NB_UID} ${RAILWAY_VOLUME_MOUNT_PATH} && \     start.sh run-one-constantly jupyter lab 2>&1 \ "`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan/work`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/jupyter-notebook-and-jupyterlab-cloud-de)
