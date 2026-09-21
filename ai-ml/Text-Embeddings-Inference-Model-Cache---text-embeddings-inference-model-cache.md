# Deploy Text Embeddings Inference + Model Cache on Railway

Hugging Face TEI embeddings API with API key auth and model cache

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/text-embeddings-inference-model-cache)

## About

Text Embeddings Inference (TEI) is Hugging Face's Rust inference server for embedding, reranking and sequence classification models. It turns any of the thousands of models tagged `text-embeddings-inference` on the Hugging Face Hub into a fast HTTP API with an OpenAI compatible `/v1/embeddings` route, token aware dynamic batching, Prometheus metrics and Swagger docs, so you can drop it in wherever you would otherwise pay per token for embeddings.

Hosting TEI is a single container with a single volume. This template pins the official CPU image `ghcr.io/huggingface/text-embeddings-inference:cpu-1.9.4`, because the default tags are CUDA builds and Railway has no GPUs. `PORT` is pinned to 3000 so Railway's healthcheck reaches `/health`, `HOSTNAME` is `::` so the public domain and other services in your project both reach the server over IPv6 private networking, and `HUGGINGFACE_HUB_CACHE` points at a volume mounted on `/data` so the model is downloaded once instead of on every redeploy. The healthcheck window is 600 seconds because the port only opens after the weights are downloaded and loaded. A generated `API_KEY` protects every inference route by default, while `/health` and `/metrics` stay public so the platform can probe the service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Text Embeddings Inference | `ghcr.io/huggingface/text-embeddings-inference:cpu-1.9.4` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Port the router listens on, read by the --port flag. Railway's healthcheck and edge proxy probe $PORT, so it must equal the public domain target port (3000). The image itself defaults to 80. |
| `API_KEY` | (secret) | Bearer token required on every inference route (/embed, /v1/embeddings, /rerank, /info, ...). Send it as 'Authorization: Bearer <API_KEY>'. /health, /, /ping and /metrics stay public so Railway's healthcheck works. Clear this variable only if you also remove the public domain. |
| `HOSTNAME` | :: | Bind address, read by the --hostname flag. '::' binds IPv6 dual-stack so the public domain AND other Railway services (tei.railway.internal:3000) both reach it. Must be an IP literal: a non-IP value makes the router log 'Invalid hostname' and fall back to IPv4-only 0.0.0.0, which breaks private networking. |
| `MODEL_ID` | BAAI/bge-small-en-v1.5 | Hugging Face model to serve, read by the --model-id flag. BAAI/bge-small-en-v1.5 is 33M parameters, 384 dimensions, 512 max tokens, about 133 MB of weights. Any model tagged text-embeddings-inference on the Hub works (embedding, reranker or classifier). Larger models need more RAM; this image runs on CPU only. |
| `AUTO_TRUNCATE` | true | Optional. Truncate inputs longer than the model's max sequence length instead of returning 413. Set false to make oversized inputs an explicit error. |
| `PAYLOAD_LIMIT` | 2000000 | Optional. Maximum request body size in bytes (2 MB). Raise it if you batch many long documents per call. |
| `MAX_BATCH_TOKENS` | (secret) | Optional. Total tokens the server packs into one inference batch. Higher is faster but raises peak memory; lower it to about 4096 if the service is memory constrained. |
| `RAYON_NUM_THREADS` | 8 | Optional. CPU threads used for inference. The image ships 8; match it to the vCPUs of your Railway plan to avoid oversubscription. |
| `HUGGINGFACE_HUB_CACHE` | /data | Hugging Face cache directory, read by the --huggingface-hub-cache flag. Must match the volume mount path (/data) so model weights survive redeploys instead of being downloaded again on every boot. |
| `MAX_CLIENT_BATCH_SIZE` | 32 | Optional. Maximum number of inputs one request may contain. Requests above this get 413. |
| `MAX_CONCURRENT_REQUESTS` | 512 | Optional. Queue depth. Requests beyond this are rejected with 429 instead of queueing forever. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/text-embeddings-inference-model-cache)
