# Deploy Jupyter Notebook on Railway

Deploy Jupyter Lab | Jupyter Notebook on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jupyter-notebook)

## About

Jupyter Notebook is an interactive web-based environment for writing and running code, analyzing data, creating visualizations, and documenting workflows. It is widely used by data scientists, researchers, students, and developers for machine learning, data analysis, experimentation, and educational projects through an intuitive browser interface.

Railway makes it easy to deploy a persistent Jupyter Notebook server without managing infrastructure. This template runs JupyterLab inside a Docker container and exposes it through a secure HTTPS endpoint. Notebook files are stored on a Railway Volume mounted at `/data`, ensuring your work persists across deployments and restarts. The service listens on port **8889** and is accessible through a generated Railway domain. Railway automatically manages networking, SSL certificates, and infrastructure, allowing you to focus on your notebooks while providing the ability to scale your deployment as your workloads grow.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Jupyter Notebook | `fuglelucas/juplabtest:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8889 |

## Configuration

- **Start command:** `jupyter-lab --ip=0.0.0.0 --port=8889 --allow-root --notebook-dir=/data --no-browser`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/jupyter-notebook)
