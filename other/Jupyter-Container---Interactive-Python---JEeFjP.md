# Deploy Jupyter Container - Interactive Python on Railway

Python Jupyter Notebooks Server. Customizable Dockerfile! By Justin Mitchel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/JEeFjP)

## About

The goal of this template is two fold:

- Customizable Jupyter environment
- Shell-like interactivity with Railway resources (private and public)

The official JupyterLab template is great but... it's overly complex for simple Jupyter tasks. That's what this template is for.

The code is open source so feel free to fork and customize as you see fit. In our case, we can use it to:

- Verify private Railway resource connections -- such as calling non-internet connected APIs
- Run various analytics with private databases
- Use numpy, pandas, scikit-learn, and many other Data Science tools

Do you have ideas to improve? Please share them with me https://x.com/justinmitchel or on the GitHub Repo attached to this template. 

All code is available at: https://github.com/jmitchel3/jupyter-container

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jupyter-container | [jmitchel3/jupyter-container](https://github.com/jmitchel3/jupyter-container) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8888 | - |
| `JUPYTER_IP` | 0.0.0.0 | Use `0.0.0.0` to allow public access. Use `::` to bind to the internal IPv6 Network. |
| `GITHUB_REPO` | https://github.com/jmitchel3/jupyter-container | Automatically pull a GitHub repo in your build process. Add the variable GITHUB_TOKEN with a GitHub Personal Access token for private repos |
| `GITHUB_BRANCH` | main | Branch to pull for the GITHUB_REPO variable |
| `NOTEBOOKS_DIR` | /notebooks | The location where your Jupyter server will start. Use this same location for the mounted volume for data persistence. |
| `PY_REQUIREMENTS` | langgraph,langchain,openai | If you want the environment to have pre-installed Python packages. |
| `JUPYTER_PASSWORD` | (secret) | Add a super secret password. If it sucks, someone will probably hack this. |
| `VOLUME_MOUNT_PATH` | /notebooks/volume | For persistent storage on railway, we need to ensure we have the correct permissions on our Jupyter Container server. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/notebooks/volume`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/JEeFjP)
