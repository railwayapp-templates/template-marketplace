# Deploy mem0-chatbot on Railway

Personalised AI chatbot that retains information with the help of Mem0

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mem0-chatbot)

## About

Mem0(pronounced as 'mem-zero') is an intelligent memory layer that remembers users preference and continuously learns over time to adapt to individual needs.

Every memory is timestamped and versioned so you can see what your AI knows.

Mem0 works by integrating OpenAI LLM with the default  `gpt-4o-mini` model, though you're free to use other supported LLMs as well.

With BYOK policy, your data stays secure and audit-ready.

Mem0 lets you deploy anywhere with a consistent API that behaves the same, whether that's Kubernetes or a private cloud.

Hosting Mem0 is extremely easy. Add your Mem0 and OpenAI API Keys as your variables. Click on Settings-&gt;Network.Under Public Networking, enter the port for your application(8080) and Railway will automatically generate a domain for your application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mem0-chatbot | [devandop/mem0-basic-app](https://github.com/devandop/mem0-basic-app) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MEMO_API_KEY` | (secret) |
| `OPENAI_API_KEY` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/mem0-chatbot)
