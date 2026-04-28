# Deploy LlamaIndex Apps on Railway

Sample LlamaIndex apps for chatting with PDFs and URL summaries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/GpZ0J4)

## About

LlamaIndex is an open-source framework for building LLM-powered applications over your own data. This template deploys two Streamlit apps — one for chatting with PDFs using LlamaParse, and one for summarizing URLs using Google Gemini — each demonstrating a core LlamaIndex pattern: document ingestion, indexing, and retrieval-augmented generation (RAG).

Both apps are single-service Streamlit deployments with no persistent storage or database required. The PDF chat app uses LlamaParse to parse uploaded PDFs and OpenAI to answer queries over the indexed content. The URL summarizer uses Google Gemini to generate summaries of web pages fetched at runtime. API keys are entered via the sidebar at runtime — nothing is stored server-side. Railway handles HTTPS and port binding automatically via the `railway.toml` start command in each app.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chat-with-pdf | [alphasecio/llama-index](https://github.com/alphasecio/llama-index) (root: /chat-with-pdf) | Web service |
| summarize-url | [alphasecio/llama-index](https://github.com/alphasecio/llama-index) (root: /summarize-url) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | chat-with-pdf | 8501 |
| `PORT` | summarize-url | 8501 |

## Configuration

- **Start command:** `streamlit run streamlit_app.py`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/GpZ0J4)
