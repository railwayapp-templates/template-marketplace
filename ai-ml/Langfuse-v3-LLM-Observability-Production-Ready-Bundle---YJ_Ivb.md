# Deploy Langfuse v3 — LLM Observability (Production-Ready Bundle) on Railway

Self-host alternative to LangSmith and DataDog LLM Observability

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/YJ_Ivb)

## About

![Langfuse GitHub Banner](https://langfuse.com/images/docs/github-readme/github-banner.png)

Langfuse is an **open source LLM engineering** platform. It helps teams collaboratively
**develop, monitor, evaluate,** and **debug** AI applications. Langfuse can be **self-hosted in minutes** and is **battle-tested**.

[![Langfuse Overview Video](https://github.com/user-attachments/assets/3926b288-ff61-4b95-8aa1-45d041c70866)](https://langfuse.com/watch-demo)

## ✨ Core Features

![Langfuse Overview](https://langfuse.com/images/docs/github-readme/github-feature-overview.png)

- [LLM Application Observability](https://langfuse.com/docs/tracing): Instrument your app and start ingesting traces to Langfuse, thereby tracking LLM calls and other relevant logic in your app such as retrieval, embedding, or agent actions. Inspect and debug complex logs and user sessions. Try the interactive [demo](https://langfuse.com/docs/demo) to see this in action.

- [Prompt Management](https://langfuse.com/docs/prompts/get-started) helps you centrally manage, version control, and collaboratively iterate on your prompts. Thanks to strong caching on server and client side, you can iterate on prompts without adding latency to your application.

- [Evaluations](https://langfuse.com/docs/scores/overview) are key to the LLM application development workflow, and Langfuse adapts to your needs. It supports LLM-as-a-judge, user feedback collection, manual labeling, and custom evaluation pipelines via APIs/SDKs.

- [Datasets](https://langfuse.com/docs/datasets/overview) enable test sets and benchmarks for evaluating your LLM application. They support continuous improvement, pre-deployment testing, structured experiments, flexible evaluation, and seamless integration with frameworks like LangChain and LlamaIndex.

- [LLM Playground](https://langfuse.com/docs/playground) is a tool for testing and iterating on your prompts and model configurations, shortening the feedback loop and accelerating development. When you see a bad result in tracing, you can directly jump to the playground to iterate on it.

- [Comprehensive API](https://langfuse.com/docs/api): Langfuse is frequently used to power bespoke LLMOps workflows while using the building blocks provided by Langfuse via the API. OpenAPI spec, Postman collection, and typed SDKs for Python, JS/TS are available.

## 🔌 Integrations

![Langfuse Integrations](https://langfuse.com/images/docs/github-readme/github-integrations.png)

### Main Integrations:

| Integration                                                                  | Supports                   | Description                                                                                                                                      |
| ---------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| [SDK](https://langfuse.com/docs/sdk)                                         | Python, JS/TS              | Manual instrumentation using the SDKs for full flexibility.                                                                                      |
| [OpenAI](https://langfuse.com/docs/integrations/openai)                      | Python, JS/TS              | Automated instrumentation using drop-in replacement of OpenAI SDK.                                                                               |
| [Langchain](https://langfuse.com/docs/integrations/langchain)                | Python, JS/TS              | Automated instrumentation by passing callback handler to Langchain application.                                                                  |
| [LlamaIndex](https://langfuse.com/docs/integrations/llama-index/get-started) | Python                     | Automated instrumentation via LlamaIndex callback system.                                                                                        |
| [Haystack](https://langfuse.com/docs/integrations/haystack)                  | Python                     | Automated instrumentation via Haystack content tracing system.                                                                                   |
| [LiteLLM](https://langfuse.com/docs/integrations/litellm)                    | Python, JS/TS (proxy only) | Use any LLM as a drop in replacement for GPT. Use Azure, OpenAI, Cohere, Anthropic, Ollama, VLLM, Sagemaker, HuggingFace, Replicate (100+ LLMs). |
| [Vercel AI SDK](https://langfuse.com/docs/integrations/vercel-ai-sdk)        | JS/TS                      | TypeScript toolkit designed to help developers build AI-powered applications with React, Next.js, Vue, Svelte, Node.js.                          |
| [API](https://langfuse.com/docs/api)                                         |                            | Directly call the public API. OpenAPI spec available.                                                                                            |

### Packages integrated with Langfuse:

| Name                                                                    | Type               | Description                                                                                                             |
| ----------------------------------------------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Instructor](https://langfuse.com/docs/integrations/instructor)         | Library            | Library to get structured LLM outputs (JSON, Pydantic)                                                                  |
| [DSPy](https://langfuse.com/docs/integrations/dspy)                     | Library            | Framework that systematically optimizes language model prompts and weights                                              |
| [Mirascope](https://langfuse.com/docs/integrations/mirascope)           | Library            | Python toolkit for building LLM applications.                                                                           |
| [Ollama](https://langfuse.com/docs/integrations/ollama)                 | Model (local)      | Easily run open source LLMs on your own machine.                                                                        |
| [Amazon Bedrock](https://langfuse.com/docs/integrations/amazon-bedrock) | Model              | Run foundation and fine-tuned models on AWS.                                                                            |
| [AutoGen](https://langfuse.com/docs/integrations/autogen)               | Agent Framework    | Open source LLM platform for building distributed agents.                                                               |
| [Flowise](https://langfuse.com/docs/integrations/flowise)               | Chat/Agent&nbsp;UI | JS/TS no-code builder for customized LLM flows.                                                                         |
| [Langflow](https://langfuse.com/docs/integrations/langflow)             | Chat/Agent&nbsp;UI | Python-based UI for LangChain, designed with react-flow to provide an effortless way to experiment and prototype flows. |
| [Dify](https://langfuse.com/docs/integrations/dify)                     | Chat/Agent&nbsp;UI | Open source LLM app development platform with no-code builder.                                                          |
| [OpenWebUI](https://langfuse.com/docs/integrations/openwebui)           | Chat/Agent&nbsp;UI | Self-hosted LLM Chat web ui supporting various LLM runners including self-hosted and local models.                      |
| [Promptfoo](https://langfuse.com/docs/integrations/promptfoo)           | Tool               | Open source LLM testing platform.                                                                                       |
| [LobeChat](https://langfuse.com/docs/integrations/lobechat)             | Chat/Agent&nbsp;UI | Open source chatbot platform.                                                                                           |
| [Vapi](https://langfuse.com/docs/integrations/vapi)                     | Platform           | Open source voice AI platform.                                                                                          |
| [Inferable](https://langfuse.com/docs/integrations/other/inferable)     | Agents             | Open source LLM platform for building distributed agents.                                                               |
| [Gradio](https://langfuse.com/docs/integrations/other/gradio)           | Chat/Agent&nbsp;UI | Open source Python library to build web interfaces like Chat UI.                                                        |
| [Goose](https://langfuse.com/docs/integrations/goose)                   | Agents             | Open source LLM platform for building distributed agents.                                                               |
| [smolagents](https://langfuse.com/docs/integrations/smolagents)         | Agents             | Open source AI agents framework.                                                                                        |
| [CrewAI](https://langfuse.com/docs/integrations/crewai)                 | Agents             | Multi agent framework for agent collaboration and tool use.                                                             |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redis | `bitnamilegacy/redis:7.2.5` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| langfuse-web | `langfuse/langfuse:3` | Web service |
| clickhouse | `clickhouse/clickhouse-server:24` | Database |
| minio | `minio/minio` | Database |
| langfuse-worker | `langfuse/langfuse-worker:3` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | redis | 6379 |
| `REDISUSER` | redis | default |
| `REDISPASSWORD` | redis | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `REDIS_RDB_POLICY` | redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | redis | yes |
| `POSTGRES_DB` | postgres | railway |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `CLICKHOUSE_USER` | langfuse-web | (secret) |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | us-east-1 |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | us-east-1 |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) |
| `PORT` | clickhouse | 8123 |
| `PUBLIC_PORT` | clickhouse | 443 |
| `CLICKHOUSE_DB` | clickhouse | default |
| `INTERNAL_PORT` | clickhouse | 9000 |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_PRIVATE_PORT` | minio | 9000 |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | us-east-1 |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | us-east-1 |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) |

## Configuration

- **Volume:** `/bitnami`
- **Volume:** `/var/lib/postgresql/data`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/YJ_Ivb)
