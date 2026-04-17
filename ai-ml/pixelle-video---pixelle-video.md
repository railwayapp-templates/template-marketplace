# Deploy pixelle-video on Railway

AI short-video studio with web UI and flexible model pipelines

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pixelle-video)

## About

This template runs Pixelle-Video as a single Streamlit web service on Railway using a Docker image source, so users can open a browser and start configuring AI video generation immediately.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `xiaosong233/pixelle-video-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8501 |
| `STREAMLIT_SERVER_PORT` | 8501 |
| `STREAMLIT_SERVER_ADDRESS` | 0.0.0.0 |
| `STREAMLIT_BROWSER_GATHER_USAGE_STATS` | false |

## Configuration

- **Start command:** `sh -c 'exec uv run streamlit run web/app.py --server.port 8501 --server.address 0.0.0.0 --server.headless true'`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/pixelle-video)
