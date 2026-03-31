# Deploy autofigure-edit on Railway

AutoFigure-edit turns paper methods into editable SVG figures

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autofigure-edit)

## About

AutoFigure-Edit runs as a single Dockerized FastAPI web application on Railway. Railway gives managed deployment, HTTPS domain, and variable management with no server operations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| autofigure-edit | `xiaosong233/autofigure-edit-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `HF_HOME` | /app/.cache/huggingface |
| `PYTHONUNBUFFERED` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/autofigure-edit)
