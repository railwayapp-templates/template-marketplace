# Deploy LlamaIndex Apps on Railway

Sample LlamaIndex apps for chatting with PDFs and URL summaries.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/GpZ0J4)

## About

### Overview
This template deploys a collection of Streamlit apps that utilize the [LlamaIndex](https://www.llamaindex.ai) framework for interacting with large language models (LLMs). LlamaIndex is an open-source project that provides a simple interface between LLMs and external data sources like APIs, PDFs, SQL etc. It provides indices over structured and unstructured data, helping to abstract away the differences across data sources.

###Pre-requisites
You'll need API keys from [OpenAI](https://platform.openai.com/api-keys) and [LlamaCloud](https://cloud.llamaindex.ai/api-key) for this project.

###Learn More
* [Chat with PDF using LlamaIndex and LlamaParse](https://alphasec.io/chat-with-pdf-using-llamaindex-and-llamaparse)
* [Blinkist for URLs with LlamaIndex and OpenAI](https://alphasec.io/blinkist-for-urls-with-llama-index-and-openai)
* [llama-index](https://github.com/alphasecio/llama-index) GitHub repo

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

[View on Railway →](https://railway.com/template/GpZ0J4)
