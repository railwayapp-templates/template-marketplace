# Deploy LlamaIndex Apps | Streamlit on the Port the Platform Assigns on Railway

Streamlit apps that bind the assigned port. The stock one never does.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/llamaindex-apps-or-1)

## About

Two small LlamaIndex apps on Streamlit, deployed as separate services: one chats with a PDF, the other summarizes a URL. Both listen on the port the platform assigns.

The existing LlamaIndex Apps template reports **0% health**: no deployment of it succeeds. The cause is one line, and it is in the template rather than the code.

Its start command is a bare `streamlit run streamlit_app.py`. Streamlit then listens on its own default port, which is not the port the platform assigns and routes to. The template does set a `PORT` variable, but Streamlit does not read `PORT`; it wants `--server.port` or `STREAMLIT_SERVER_PORT`, so that variable changes nothing.

Here the start command passes it explicitly:

```
streamlit run streamlit_app.py --server.port $PORT --server.address 0.0.0.0 --server.headless true
```

`--server.headless true` matters in a container too: without it Streamlit tries to open a browser and prompts for an email on first run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chat-with-pdf | [ak40u/llama-index-railway](https://github.com/ak40u/llama-index-railway) (root: /chat-with-pdf) | Web service |
| summarize-url | [ak40u/llama-index-railway](https://github.com/ak40u/llama-index-railway) (root: /summarize-url) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | chat-with-pdf | 8080 |
| `PORT` | summarize-url | 8080 |

## Configuration

- **Start command:** `streamlit run streamlit_app.py --server.port $PORT --server.address 0.0.0.0 --server.headless true`
- **Healthcheck:** `/_stcore/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python

[View on Railway →](https://railway.com/deploy/llamaindex-apps-or-1)
