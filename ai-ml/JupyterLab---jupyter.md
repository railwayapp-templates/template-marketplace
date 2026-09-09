# Deploy JupyterLab on Railway

JupyterLab notebooks, terminal and file browser in one hosted workspace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyter)

## About

JupyterLab is the web-based interactive development environment behind Project Jupyter — notebooks, a code editor, a terminal, a file browser and a spreadsheet viewer arranged in one browser tab. Data scientists, analysts and ML engineers use it to explore data, prototype models and write reports where code, output and prose live in one document. Self-host JupyterLab when your notebooks need a private database, an internal API or data that cannot leave your infrastructure.

Deploy JupyterLab on Railway and you get a single `jupyterlab` service built from the official `quay.io/jupyter/scipy-notebook` image, with a 5 GB volume at `/data`. Traffic arrives over HTTPS at Railway's edge; the server checks the login token, serves the interface and opens a WebSocket per running kernel. Everything that must survive a restart is on the volume: `/data/notebooks` is the file-browser root and `/data/home` is the server's home directory, so installed packages, changed settings and IPython history all persist across redeploys.

![Diagram of the JupyterLab service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788829221/jupyterlab-architecture.png)

A notebook is only useful next to the data it analyses. Hosted services solve setup but put a third party between your code and your database; a laptop keeps the data close but sleeps and cannot be shared as a URL. Self-hosted JupyterLab is the middle path: one long-lived server you control, reachable from any browser.

Key features:

- Notebooks, a code editor, a Linux terminal, CSV/JSON viewers and Markdown preview in one tabbed workspace
- Over 40 kernels available, including Python, R and Julia
- Inline charts from matplotlib, seaborn, plotly and bokeh, stored inside the `.ipynb` file
- Git integration and notebook diffing via the bundled `jupyterlab-git` and `nbdime` extensions
- Token or password authentication on every route, with no anonymous access

This template runs one service. JupyterLab is a single-user server — its state is files, not rows — so there is no database, queue or worker, and the volume is the whole persistence story. The image is the `scipy-notebook` build of the official Jupyter Docker Stacks, which arrives with NumPy, pandas, Matplotlib, SciPy, scikit-learn, SymPy, Numba, Dask, Bokeh and ipywidgets installed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jupyterlab | `quay.io/jupyter/scipy-notebook:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8888 | Port the server binds and Railway health-checks |
| `CHOWN_EXTRA` | /data | Volume path the image takes ownership of |
| `JUPYTER_TOKEN` | (secret) | Login token for the JupyterLab UI |
| `NOTEBOOK_ARGS` | --ServerApp.root_dir=/data/notebooks --ServerApp.trust_xheaders=True --ServerApp.allow_remote_access=True --MappingKernelManager.cull_idle_timeout=3600 --MappingKernelManager.cull_interval=300 --MappingKernelManager.cull_busy=False --MappingKernelManager.cull_connected=False | File-browser root, proxy awareness, idle-kernel culling |
| `CHOWN_EXTRA_OPTS` | -R | Chown the volume recursively |

## Configuration

- **Start command:** `/usr/bin/tini -s -g -- /usr/local/bin/start.sh /bin/bash -c 'export HOME=/data/home; mkdir -p $HOME /data/notebooks; if [ ! -e $HOME/.bashrc ]; then cp -a /home/jovyan/. $HOME/; fi; export PATH=$HOME/.local/bin:$PATH; q=max; p=1; read -r q p < /sys/fs/cgroup/cpu.max 2>/dev/null; case $q in max) C=2;; *) C=$((q/p));; esac; if [ $C -lt 1 ]; then C=1; fi; export OMP_NUM_THREADS=$C MKL_NUM_THREADS=$C OPENBLAS_NUM_THREADS=$C NUMEXPR_NUM_THREADS=$C; echo [railway] HOME=$HOME cpu_threads=$C; exec /usr/local/bin/start-notebook.py'`
- **Healthcheck:** `/api`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/jupyter)
