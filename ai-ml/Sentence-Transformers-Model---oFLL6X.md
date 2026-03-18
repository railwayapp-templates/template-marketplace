# Deploy Sentence Transformers Model on Railway

FastAPI server to serve sentence-transformer embeddings

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oFLL6X)

## About

Given any sentence transformer model, this template will deploy a quick and easy FastAPI server to serve embeddings for that model.

Setup requires you to choose which model to run, and choose the number of workers. Be careful using models that are too large, since a) they'll be expensive since the weights will be loaded into memory N times (i.e. depending on number of workers you chose during setup), and b) they'll be running on CPU so inference isn't overly quick compared to GPUs.

Usage is simple, just post {"texts":["hello","world"]} to /embed on the exposed server, and you'll get back the embeddings in JSON.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Sentence Transformers API | [morgangallant/sentence-transformers-railway](https://github.com/morgangallant/sentence-transformers-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | - |
| `MODEL` | all-MiniLM-L6-v2 | The model name you want to use |
| `WEB_CONCURRENCY` | 4 | Number of workers |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/oFLL6X)
