# Deploy Text Embeddings Inference on Railway

Self-hosted embeddings and reranking API, behind an API key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/text-embeddings-inference)

## About

Text Embeddings Inference turns text into vectors. Send it a sentence, a paragraph or a batch of
documents over HTTP and it returns the embeddings a search index or a retrieval pipeline needs. It
runs the model on your own instance, so there is no per-token bill and the text does not leave your
infrastructure. It also speaks OpenAI's `/v1/embeddings`, so most clients work without changes. This
is a community-maintained template; it is not affiliated with Hugging Face.

It is the lightest service of its kind to host: a single Rust binary, no database, no queue, no
interpreter. The only state is the model, which is downloaded on the first start and kept on a
volume, so later deploys start in seconds.

The one thing that needs care is the key. Upstream's own documentation says the server "responds to
every request" unless an API key is set, and nothing sets it for you. On a platform that gives every
service a public address the moment it deploys, that means an open endpoint running on your CPU.
What upstream gets right is which routes the key covers: the health and metrics probes stay open so
a platform can watch the service, and everything that does work needs the token. This template
generates the key, requires it, and refuses to start without one.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tei | `ghcr.io/youssefsiam38/tei-railway:1.0.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the API listens on. Railway probes its healthcheck here, so keep it equal to the domain's target port, and clear of the metrics listener on 9000. |
| `API_KEY` | (secret) | Bearer token every working route requires. Without it the server answers every request, which is upstream's own default. At least 16 characters, no spaces. |
| `MODEL_ID` | BAAI/bge-small-en-v1.5 | Model from the Hugging Face hub. The default is small, fast and English; a larger or multilingual one means a longer first start and more memory. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/text-embeddings-inference)
