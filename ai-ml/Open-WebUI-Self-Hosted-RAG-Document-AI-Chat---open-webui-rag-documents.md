# Deploy Open WebUI — Self-Hosted RAG & Document AI Chat on Railway

Self-host Open WebUI — chat with your PDFs & docs, privately

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-webui-rag-documents)

## About

Open WebUI is a self-hosted AI interface with a powerful built-in RAG engine — upload your PDFs, Word docs, and text files, and chat with them privately, with source citations. Beyond document chat it adds web search, knowledge-base collections, custom assistants, and a polished ChatGPT-style UI, all connected to the AI provider of your choice. This template deploys it in API mode, so you bring an OpenAI, Anthropic, OpenRouter, or Groq key and get a private, self-hosted "chat with your documents" workspace on your own infrastructure — no GPU required.

---

Open WebUI is best known as a ChatGPT-style front end, but its document-RAG capabilities are the standout, and this template is set up around them.

**Chat with your documents — the built-in RAG engine.** Upload PDFs, DOCX, TXT, and Markdown, and Open WebUI chunks, embeds, and stores them in a vector database, so you can ask questions and get answers grounded in your files, with source citations. Group documents into knowledge-base collections (say, "Company Financials" or "Product Docs") and reference them in any chat. Your documents never leave your infrastructure — private RAG without a third-party service.

**Run it in API mode — no GPU needed.** Railway has no GPU, so instead of slow local models, this template connects Open WebUI to a hosted AI provider over its API — OpenAI, Anthropic, OpenRouter, Groq, or any OpenAI-compatible endpoint. You get fast responses and strong models, pay the provider directly for usage, and Open WebUI handles the interface, documents, and RAG. This is the right fit for Railway: the heavy inference runs on the provider, the lightweight UI and RAG run here.

**Web search built in.** Open WebUI can query a search provider per conversation — 15+ options including self-hosted SearXNG — injecting fresh results into the context, so answers reflect current information alongside your documents.

**Persist the volume — it holds your documents and history.** Your uploaded files, embeddings, conversations, and settings live on the mounted volume. Without it, a redeploy wipes your knowledge base and chat history. This template mounts it so everything persists.

**Multi-user with the first account as admin.** The first account you create becomes the administrator; set `WEBUI_SECRET_KEY` to a stable value so sessions and tokens stay valid. Add team members with role-based access, each with their own private chats and documents, and no per-user fees.

**Custom assistants and workflows.** Define reusable personas with fixed system prompts — a document summarizer, a contract reviewer, a research assistant — and pair them with your knowledge bases for repeatable, document-grounded workflows.

Typical cost: **~$5–10/month** on Railway for the interface and storage, plus what you pay your AI provider for usage. Open WebUI is free and open source.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-webui | `ghcr.io/open-webui/open-webui:main` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OLLAMA_BASE_URL` | https://ollama.com |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-webui-rag-documents)
