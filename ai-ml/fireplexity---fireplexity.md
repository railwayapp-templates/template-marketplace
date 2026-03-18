# Deploy fireplexity on Railway

Fast AI search engine with citations and streaming responses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fireplexity)

## About

**Fireplexity** is a blazing-fast AI search engine that delivers real-time citations, streaming responses, and access to live data, all powered by Firecrawl. Built primarily with TypeScript, Fireplexity integrates advanced AI capabilities to provide instant search results enhanced by real-time web information, making it ideal for powerful search and data retrieval applications.

Hosting and deploying Fireplexity involves setting up an efficient Node.js environment where the application can connect to its required APIs and serve requests via a modern web server. The process includes cloning the project repository, installing its dependencies, configuring API keys for Firecrawl and Groq (its LLM provider), and running the server. Railway streamlines infrastructure management and deployment, allowing you to focus on launching Fireplexity with minimal overhead—just push your code and environment configuration, and Railway handles the rest. This approach is suitable for individual developers or teams looking to minimize setup pain and scale easily as usage grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| fireplexity-v2 | [chinpeerapat/fireplexity-v2](https://github.com/chinpeerapat/fireplexity-v2) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GROQ_API_KEY` | (secret) |
| `FIRECRAWL_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/fireplexity)
