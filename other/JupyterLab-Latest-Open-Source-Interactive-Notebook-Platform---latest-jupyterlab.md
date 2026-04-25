# Deploy JupyterLab Latest (Open-Source Interactive Notebook Platform) on Railway

JupyterLab [May ’26] (Code, Analyze & Visualize Data Easily) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/latest-jupyterlab)

## About

JupyterLab is the next-generation, open-source web-based interactive development environment (IDE) for data science, machine learning, and scientific computing. Built by the Jupyter community, it provides a flexible and powerful interface for creating and sharing documents that combine live code, equations, visualizations, and narrative text.

* * *

Self-hosting JupyterLab on Railway means you get your own, private, cloud-based development environment that runs in your browser. Unlike third-party hosted solutions, **you control the infrastructure, configurations, and dependencies**, ensuring complete data privacy and customization.

* * *

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| scipy-notebook | `quay.io/jupyter/scipy-notebook` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8888 |
| `RESTARTABLE` | yes |
| `JUPYTER_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/jovyan/work`

**Category:** Other

[View on Railway →](https://railway.com/deploy/latest-jupyterlab)
