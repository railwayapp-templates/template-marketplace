# Deploy JupyterLab | (Just Updated) Notebooks and pip Installs Survive Redeploys on Railway

Hosted JupyterLab whose notebooks and pip installs survive every redeploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyterlab-or-just-updated-notebooks-and)

## About

JupyterLab is the browser-based notebook and data-science workspace from Project Jupyter: notebooks,
a terminal, a file browser and an editor over a full SciPy stack (NumPy, pandas, scikit-learn,
matplotlib, SciPy, and the rest of the `scipy-notebook` image).

This template runs it as one service on one volume, with the two things a hosted notebook actually
has to do: **your notebooks are still there after a redeploy, and so are the packages you pip
installed.**

JupyterLab keeps everything in the home directory of the user it runs as — `/home/jovyan` in the
official Jupyter Docker Stacks image. That is the file-browser root, that is where a new notebook is
saved, and that is where `pip install --user` puts packages.

On Railway that matters more than it does locally, because the container filesystem is discarded on
every redeploy. A volume mounted anywhere narrower than the home directory persists only the part of
your work that happens to be underneath it, and packages installed from a notebook go to the image's
own `site-packages`, which is not on any volume at all.

This template mounts the volume at `/home/jovyan` itself and restores the image's home skeleton for
anything the volume does not already carry, so both the default save location and the user
site-packages directory are on persistent disk. It also honours Railway's injected `PORT`, repairs
the root-owned volume mount before the server drops privileges, and refuses to start without a
password — JupyterLab runs arbitrary code, so an unauthenticated public URL is not an option.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jupyterlab | `ghcr.io/bon5co/jupyterlab-railway:2026.09.03` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `JUPYTER_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan`

**Category:** Other

[View on Railway →](https://railway.com/deploy/jupyterlab-or-just-updated-notebooks-and)
