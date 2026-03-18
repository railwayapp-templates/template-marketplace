# Deploy gpt-vLLM on Railway

Deploy and host your own LLM with VLLM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gpt-vllm)

## About

Host your own Large Language Model (LLM) instance for scalable, efficient AI infrastructure. Railway automates deployment, resource scaling, and provides easy API access. Just set your model name (must be [vLLM-compatible](https://docs.vllm.ai/en/stable/models/supported_models.html)) in your environment variables.

---

Railway makes it easy to run inference servers, caching layers (like Redis), and API gateways with minimal setup. Persistent storage and private networking work out-of-the-box, so your AI stack can scale automatically and is always accessible via OpenAI-compatible API paths.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vLLM-server | `jellydeck/vllm-server:latest` | Database |
| Redis | `bitnami/redis:8.2` | Database |
| api-gateway | [jellydeck/gpt-oss](https://github.com/jellydeck/gpt-oss) (root: api-gateway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HF_HOME` | vLLM-server | /root/.cache/huggingface | - |
| `MODEL_NAME` | vLLM-server | - | model name, check https://docs.vllm.ai/en/stable/models/supported_models.html for more details |
| `VLLM_LOGGING_LEVEL` | vLLM-server | INFO | - |
| `VLLM_CPU_KVCACHE_SPACE` | vLLM-server | 5 | Sets the amount of RAM (in GiB) allocated to key-value (KV) cache for CPU inference, modify to get better performance |
| `VLLM_CPU_OMP_THREADS_BIND` | vLLM-server | auto | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `API_KEY` | api-gateway | (secret) | secret key for authentication, so use something hard to guess |
| `VLLM_URL` | api-gateway | - | the url from our vLLM server |
| `CACHE_TTL` | api-gateway | 3600 | - |

## Configuration

- **Volume:** `/root/.cache/huggingface`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/gpt-vllm)
