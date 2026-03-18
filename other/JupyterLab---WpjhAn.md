# Deploy JupyterLab on Railway

JupyterLab Is A Next-Generation Notebook Interface

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/WpjhAn)

## About

JupyterLab is a web-based development environment for working with notebooks, code, and data. It provides an interface for creating computational documents that combine code execution, text, and visualizations in a browser-based environment.

Hosting JupyterLab involves running and maintaining a web server that provides computational notebook environments to users. The server requires ongoing management of Python kernels, memory usage, and disk space as users create notebooks and process data. You'll need to monitor resource consumption since computational workloads can consume significant CPU and memory. The server maintains active user sessions, manages file uploads and downloads, and handles kernel restarts when code execution fails. Regular maintenance includes updating packages, managing storage growth from saved notebooks and datasets, and ensuring adequate compute resources for concurrent users.

![JupyterLab Interface](https://res.cloudinary.com/h5kvzw/image/upload/v1704861136/2024-01-09_23_26_36-Project_Jupyter___Home_elipks.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| JupyterLab | `quay.io/jupyter/scipy-notebook` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8888 | The port that jupyter runs on |
| `RESTARTABLE` | yes | Runs Jupyter in a loop so that quitting Jupyter does not cause the container to exit. This may be useful when installing extensions that require restarting Jupyter. |
| `JUPYTER_PASSWORD` | (secret) | Password used to log into Jupyter |

## Configuration

- **Start command:** `/bin/sh -c "(echo ${JUPYTER_PASSWORD}; echo ${JUPYTER_PASSWORD}) | jupyter server password 2>&1 && chown ${NB_UID} /home/jovyan/.jupyter/jupyter_server_config.json && rm -rf ${RAILWAY_VOLUME_MOUNT_PATH}/lost+found && chown -R ${NB_UID} ${RAILWAY_VOLUME_MOUNT_PATH} && start.sh run-one-constantly jupyter lab 2>&1"`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan/work`

**Category:** Other

[View on Railway →](https://railway.com/deploy/WpjhAn)
