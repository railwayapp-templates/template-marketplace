# Deploy render-api-server on Railway

Async API to render longform videos from multiple audio and backgrounds.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/render-api-server)

## About

render-api-server is an async FastAPI service that converts multiple audio tracks plus image or video backgrounds into longform videos (up to 2 hours), returning a shareable S3-compatible URL. It is built for background video rendering with job polling and a separate result endpoint so clients don’t have to wait on long-running HTTP requests.

Hosting render-api-server on Railway involves deploying a FastAPI/Uvicorn service that performs CPU-intensive FFmpeg operations and writes rendered videos to an S3-compatible bucket. You’ll connect a Railway Storage bucket or AWS S3 bucket, set the storage credentials and API key in Railway variables, and then expose the service via Railway Networking. Clients submit jobs with audio and background URLs, poll a status endpoint while processing happens asynchronously, and finally call a result endpoint to fetch the final video URL and metadata such as duration and processing time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| render-longform-vid | [juppfy/render-longform-vid](https://github.com/juppfy/render-longform-vid) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |
| `SECRET_ACCESS_KEY` | (secret) |

**Category:** Other · **Languages:** Python, Procfile

[View on Railway →](https://railway.com/deploy/render-api-server)
