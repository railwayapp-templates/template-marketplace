# Deploy Perplexica on Railway

Open source alternative to Perplexity AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/perplexica)

## About

Perplexica is a privacy-focused AI answering engine that combines web search with AI intelligence. It supports both local LLMs through Ollama and cloud providers like OpenAI, Claude, and Groq, delivering accurate answers with cited sources. With built-in SearxNG search integration, specialized focus modes, and file upload capabilities, Perplexica offers a comprehensive search experience that respects your privacy.

Hosting Perplexica involves deploying a full-stack application that includes both the Perplexica search interface and an integrated SearxNG instance for private web searches. The bundled Docker image contains everything needed to run independently. You'll need to configure AI provider settings (API keys for OpenAI, Claude, etc., or local Ollama endpoints) through the web interface after deployment. Perplexica stores search history and uploaded files persistently, requiring proper volume management. The application runs on port 8080 by default and handles both frontend interface and backend API requests through Next.js, making it straightforward to expose to the internet while maintaining privacy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Perplexica | `itzcrazykns1337/perplexica:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/perplexica/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/perplexica)
