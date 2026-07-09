# Deploy GPT Researcher on Railway

Autonomous agent that conducts deep research on data using LLM providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gpt-researcher)

## About

GPT Researcher is an open-source AI-powered deep research agent that automates comprehensive web and document research. It combines planning, web search, crawling, retrieval, and report generation to produce detailed, factual, and citation-backed research reports. With support for multiple AI providers, local documents, and customizable workflows, GPT Researcher is ideal for developers, researchers, and organizations seeking reliable AI-assisted research.

Hosting GPT Researcher on Railway provides a production-ready environment for running an AI-powered research platform without managing infrastructure. Railway automatically builds the application using the included Dockerfile, provisions HTTPS, manages deployments, and scales your service as needed. Configure your preferred AI provider using environment variables, optionally attach a persistent volume for local document research, and deploy a fully functional research application in minutes. GPT Researcher supports multiple AI providers, web search, local document analysis, LangSmith tracing, and AI-generated images, making Railway an ideal platform for self-hosting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gpt-researcher | [iqbalexperience/gpt-researcher](https://github.com/iqbalexperience/gpt-researcher) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DOC_PATH` | /app/my-docs | By Default path. |
| `OPENAI_API_KEY` | (secret) | Please add your key. |
| `TAVILY_API_KEY` | (secret) | Please add your key. |
| `OPENAI_BASE_URL` | https://api.openai.com/v1 | - |
| `LANGCHAIN_API_KEY` | (secret) | You can skip it also |
| `LANGCHAIN_PROJECT` | gpt-researcher | - |
| `LANGCHAIN_TRACING_V2` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/my-docs`

**Category:** AI/ML · **Languages:** Python, TypeScript, JavaScript, CSS, HCL, HTML, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/gpt-researcher)
