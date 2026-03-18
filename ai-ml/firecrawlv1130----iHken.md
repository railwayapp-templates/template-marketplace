# Deploy firecrawl:v1.13.0 on Railway

Scrape, crawl and extract with a single API.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/-iHken)

## About

<h3 align="center">
  <a name="readme-top"></a>
  <img height="200" src="https://raw.githubusercontent.com/mendableai/firecrawl/main/img/firecrawl_logo.png">
</h3>
<div align="center">
    <a href="https://github.com/mendableai/firecrawl/blob/main/LICENSE">
  <img alt="License" src="https://img.shields.io/github/license/mendableai/firecrawl">
</a>
    <a href="https://pepy.tech/project/firecrawl-py">
  <img alt="Downloads" src="https://static.pepy.tech/badge/firecrawl-py">
</a>
<a href="https://GitHub.com/mendableai/firecrawl/graphs/contributors">
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/mendableai/firecrawl.svg">
</a>
<a href="https://firecrawl.dev">
  <img alt="Visit firecrawl.dev" src="https://img.shields.io/badge/Visit-firecrawl.dev-orange">
</a>
</div>
<div>
  <p align="center">
    <a href="https://twitter.com/firecrawl_dev">
      <img alt="Follow on X" src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&amp;logo=x&amp;logoColor=white">
    </a>
    <a href="https://www.linkedin.com/company/104100957">
      <img alt="Follow on LinkedIn" src="https://img.shields.io/badge/Follow%20on%20LinkedIn-0077B5?style=for-the-badge&amp;logo=linkedin&amp;logoColor=white">
    </a>
    <a href="https://discord.com/invite/gSmWdAkdwd">
      <img alt="Join our Discord" src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&amp;logo=discord&amp;logoColor=white">
    </a>
  </p>
</div>

# 🔥 Firecrawl

Empower your AI apps with clean data from any website. Featuring advanced scraping, crawling, and data extraction capabilities.

_This repository is in development, and we’re still integrating custom modules into the mono repo. It's not fully ready for self-hosted deployment yet, but you can run it locally._

## What is Firecrawl?

[Firecrawl](https://firecrawl.dev?ref=github) is an API service that takes a URL, crawls it, and converts it into clean markdown or structured data. We crawl all accessible subpages and give you clean data for each. No sitemap required. Check out our [documentation](https://docs.firecrawl.dev).

_Pst. hey, you, join our stargazers :)_

<a href="https://github.com/mendableai/firecrawl">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/mendableai/firecrawl.svg?style=social&amp;label=Star&amp;maxAge=2592000">
</a>

## How to use it?

We provide an easy to use API with our hosted version. You can find the playground and documentation [here](https://firecrawl.dev/playground). You can also self host the backend if you'd like.

Check out the following resources to get started:
- [x] **API**: [Documentation](https://docs.firecrawl.dev/api-reference/introduction)
- [x] **SDKs**: [Python](https://docs.firecrawl.dev/sdks/python), [Node](https://docs.firecrawl.dev/sdks/node), [Go](https://docs.firecrawl.dev/sdks/go), [Rust](https://docs.firecrawl.dev/sdks/rust)
- [x] **LLM Frameworks**: [Langchain (python)](https://python.langchain.com/docs/integrations/document_loaders/firecrawl/), [Langchain (js)](https://js.langchain.com/docs/integrations/document_loaders/web_loaders/firecrawl), [Llama Index](https://docs.llamaindex.ai/en/latest/examples/data_connectors/WebPageDemo/#using-firecrawl-reader), [Crew.ai](https://docs.crewai.com/), [Composio](https://composio.dev/tools/firecrawl/all), [PraisonAI](https://docs.praison.ai/firecrawl/), [Superinterface](https://superinterface.ai/docs/assistants/functions/firecrawl), [Vectorize](https://docs.vectorize.io/integrations/source-connectors/firecrawl)
- [x] **Low-code Frameworks**: [Dify](https://dify.ai/blog/dify-ai-blog-integrated-with-firecrawl), [Langflow](https://docs.langflow.org/), [Flowise AI](https://docs.flowiseai.com/integrations/langchain/document-loaders/firecrawl), [Cargo](https://docs.getcargo.io/integration/firecrawl), [Pipedream](https://pipedream.com/apps/firecrawl/)
- [x] **Others**: [Zapier](https://zapier.com/apps/firecrawl/integrations), [Pabbly Connect](https://www.pabbly.com/connect/integrations/firecrawl/)
- [ ] Want an SDK or Integration? Let us know by opening an issue.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playwright-service | `ghcr.io/hilltop-tech/firecrawl-playwright-ts:20250702` | Worker |
| api | `ghcr.io/hilltop-tech/firecrawl-api:20250702` | Web service |
| Redis | `bitnami/redis:7.2.5` | Database |
| worker | `ghcr.io/hilltop-tech/firecrawl-api:20250619` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | playwright-service | 3000 | - |
| `PROXY_PASSWORD` | playwright-service | (secret) | - |
| `PROXY_USERNAME` | playwright-service | (secret) | - |
| `HOST` | api | 0.0.0.0 | - |
| `PORT` | api | 3002 | - |
| `TEST_API_KEY` | api | (secret) | Use if you've set up authentication and want to test with a real API key |
| `BULL_AUTH_KEY` | api | (secret) | This key lets you access the queue admin panel. Change this if your deployment is publicly accessible. |
| `LOGGING_LEVEL` | api | INFO | - |
| `OPENAI_API_KEY` | api | (secret) | Provide your OpenAI API key here to enable AI features |
| `FLY_PROCESS_GROUP` | api | app | - |
| `NUM_WORKERS_PER_QUEUE` | api | 8 | - |
| `USE_DB_AUTHENTICATION` | api | false | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `HOST` | worker | 0.0.0.0 | - |
| `PORT` | worker | 3002 | - |
| `TEST_API_KEY` | worker | (secret) | Use if you've set up authentication and want to test with a real API key |
| `BULL_AUTH_KEY` | worker | (secret) | This key lets you access the queue admin panel. Change this if your deployment is publicly accessible. |
| `LOGGING_LEVEL` | worker | INFO | - |
| `OPENAI_API_KEY` | worker | (secret) | Provide your OpenAI API key here to enable AI features |
| `FLY_PROCESS_GROUP` | worker | worker | - |
| `NUM_WORKERS_PER_QUEUE` | worker | 8 | - |
| `USE_DB_AUTHENTICATION` | worker | false | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/-iHken)
