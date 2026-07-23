# Deploy AnythingLLM — Private RAG & AI Agent Workspace on Railway

Self-hosted AI workspace: chat with your docs, agents, multi-user

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/anythingllm-rag-workspace)

## About

AnythingLLM is an all-in-one, open-source AI application by Mintplex Labs — a private workspace for chatting with your documents (RAG), running AI agents, and managing multiple users, all in one self-hosted instance. It connects to OpenAI, Anthropic, Ollama, and many other providers, keeps your documents and conversations on infrastructure you control, and is MIT-licensed with no usage caps or paid tier for self-hosting.

This template deploys AnythingLLM in a single click, with a persistent volume so your workspaces and data survive redeploys.

---

AnythingLLM is deliberately batteries-included. Upload PDFs, DOCX, CSV, or Markdown, and it embeds them for semantic search automatically. Point it at a model provider — cloud or local — and you have a private ChatGPT-style workspace over your own knowledge base. It supports multi-user mode with workspace-level access control, agent workflows, and a full developer API.

The one thing that matters most when hosting it: **all state lives in a single storage directory, and that directory must be on a persistent volume.** Workspaces, uploaded documents, vector embeddings, users, and settings all live under `/app/server/storage`. Without a volume mounted there, everything is wiped on every redeploy. This template mounts that volume for you, so your data persists.

Because AnythingLLM uses an embedded SQLite database, it runs as a single instance rather than scaling horizontally — which is exactly right for a self-hosted team workspace and keeps the deployment simple and cheap.

Typical cost: **~$5–10/month** on Railway's Hobby plan, plus whatever your chosen model provider charges. Connect a cloud LLM and no GPU is needed — Railway runs the app on CPU and the model does the heavy lifting on the provider's side.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AnythingLLM | `mintplexlabs/anythingllm:railway` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3001 |
| `SERVER_PORT` | 3001 |
| `STORAGE_DIR` | /storage |

## Configuration

- **Volume:** `/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/anythingllm-rag-workspace)
