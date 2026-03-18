# Deploy marimo on Railway

Deploy marimo - a next-generation reactive notebook for Python and SQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/iX6puU)

## About

### marimo 

A reactive Python notebook that's reproducible, git-friendly, and deployable as scripts or apps.

**marimo** is a reactive Python notebook: run a cell or interact with a UI
element, and marimo automatically runs dependent cells (or marks them as stale), keeping code and outputs
consistent. marimo notebooks are stored as pure Python, executable as scripts,
and deployable as apps.

**Highlights**.

- **reactive**: run a cell, and marimo automatically runs all dependent cells
- **interactive**: bind sliders, tables, plots, and more to Python — no callbacks required
- **reproducible**: no hidden state, deterministic execution
- **executable**: execute as a Python script, parametrized by CLI args
- **shareable**: deploy as an interactive web app, or run in the browser via WASM
- **data-centric**: built-in SQL support and data sources panel
- **git-friendly**: stored as `.py` files

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| marimo-team/marimo:latest-sql | `ghcr.io/marimo-team/marimo:latest-sql` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MARIMO_SKIP_UPDATE_CHECK` | 1 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/iX6puU)
