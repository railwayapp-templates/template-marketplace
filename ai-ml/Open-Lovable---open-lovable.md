# Deploy Open Lovable on Railway

Deploy and host Open Lovable on Railway with ComputeSDK

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-lovable)

## About

Open Lovable is an open source project created by Firecrawl that allows you to instantly clone web pages into a working React app. With ComputeSDK, you can easily host Open Lovable and create sandboxes all within your Railway project.

Use this Open Lovable template to host your own AI website builder.

Enter a URL and your AI model will instantly recreate it in a small React app running in your Railway sandbox. Then chat with your selected AI model to redesign or reimagine the page. Then you can download the working React app and run it locally and develop it further.

All you need is a Firecrawl API key, a ComputeSDK API key, a Gemini/OpenAI/Anthropic/Groq API key, and a Railway project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-lovable | [dtice25/open-lovable](https://github.com/dtice25/open-lovable) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GROQ_API_KEY` | (secret) | Get from https://console.groq.com (Fast inference - Kimi K2 recommended) |
| `MORPH_API_KEY` | (secret) | Get yours at https://morphllm.com/ |
| `GEMINI_API_KEY` | (secret) | Get from https://aistudio.google.com/app/apikey |
| `OPENAI_API_KEY` | (secret) | Get from https://platform.openai.com (GPT-5) |
| `ANTHROPIC_API_KEY` | (secret) | Get from https://console.anthropic.com |
| `FIRECRAWL_API_KEY` | (secret) | Required for crawling: www.firecrawl.dev |
| `AI_GATEWAY_API_KEY` | (secret) | Get from: https://vercel.com/dashboard/ai-gateway/api-keys |
| `COMPUTESDK_API_KEY` | (secret) | Required for sandbox creation. Get from: https://www.computesdk.com/ |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/open-lovable)
