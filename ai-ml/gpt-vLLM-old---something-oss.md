# Deploy gpt-vLLM (old) on Railway

Deploy and Host LLM with VLLM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/something-oss)

## About

[What is something-oss? Your description in roughly ~50 words.]

something-oss is an open-source platform designed for scalable, efficient deployment of AI models and infrastructure. It provides easy-to-use APIs, powerful inference engines, and seamless integration with modern cloud technologies to enable rapid development and deployment of AI-powered applications.

Hosting something-oss involves setting up the inference servers, caching layers, and API gateways on cloud infrastructure such as Railway. This includes managing dependencies, configuring environment variables, mounting persistent storage, and ensuring the services communicate correctly through private networking. With Railway, much of this complexity is streamlined, allowing you to deploy your entire AI service stack with minimal configuration and automatic scaling.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:8.2` | Database |
| api-gateway | [jellydeck/gpt-oss](https://github.com/jellydeck/gpt-oss) (root: api-gateway) | Worker |
| vLLM-server | `jellydeck/vllm-server:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `API_KEY` | api-gateway | (secret) | - |
| `CACHE_TTL` | api-gateway | 3600 | - |
| `HF_HOME` | vLLM-server | /root/.cache/huggingface | - |
| `MODEL_NAME` | vLLM-server | - | model name, check https://docs.vllm.ai/en/stable/models/supported_models.html for more details |
| `VLLM_LOGGING_LEVEL` | vLLM-server | INFO | - |
| `VLLM_CPU_KVCACHE_SPACE` | vLLM-server | 5 | Sets the amount of RAM (in GiB) allocated to key-value (KV) cache for CPU inference, modify to get better performance |
| `VLLM_CPU_OMP_THREADS_BIND` | vLLM-server | auto | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Volume:** `/root/.cache/huggingface`

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/template/something-oss)
