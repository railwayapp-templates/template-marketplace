# Deploy TencentDB Agent Memory on Railway

TencentDB Agent Memory is a team-level memory hub for AI Agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tencentdb-agent-memory)

## About

&gt; ## 在 Railway 上一键部署 TencentDB Agent Memory —— 让 Claude Code、CodeBuddy、DeepSeek、Codex 等编码智能体拥有可自托管的团队共享记忆
&gt; 三个服务(memory-core · memory-hub · memory-proxy)一键上线,把对话、文档和代码沉淀为可复用的团队记忆资产。

**Give Claude Code, Codex, DeepSeek CodeBuddy (and many others) a shared, self-hosted team memory — point their base URL at your own proxy and every agent remembers.**

[TencentDB Agent Memory](https://github.com/TencentCloud/TencentDB-Agent-Memory) is an open-source AI agent memory hub (25k+ GitHub stars) that turns conversations, docs, and code into four reusable memory assets — **Chat Memory, Skills, LLM-Wiki, and Code-Graph** — shared across agents, frameworks, and teammates. This Railway template deploys the full three-service stack (memory core, memory hub panel, and LLM proxy) in one click: fill in three LLM fields and you have persistent, self-hosted LLM memory for your whole team's coding agents.

Self hosting agent memory normally means wiring three services together: a private memory engine, a web panel + knowledge service, and an OpenAI/Anthropic-compatible proxy that injects memories into every request. This template ships all three as pinned Docker images with Railway-ready defaults baked in — private networking between services, volumes for persistence (SQLite, no external database needed), healthchecks, and secure-by-default networking (the memory core is never exposed publicly; the knowledge service stays internal unless you opt in). Cross-service credentials and LLM settings are prewired with reference variables: enter your LLM endpoint, key, and model once, and everything inherits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| memory-hub | [cmgeezy/TencentDB-Agent-Memory](https://github.com/cmgeezy/TencentDB-Agent-Memory) (root: /services/memory-hub) | Web service |
| memory-core | [cmgeezy/TencentDB-Agent-Memory](https://github.com/cmgeezy/TencentDB-Agent-Memory) (root: /services/memory-core) | Database |
| memory-proxy | [cmgeezy/TencentDB-Agent-Memory](https://github.com/cmgeezy/TencentDB-Agent-Memory) (root: /services/memory-proxy) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | memory-hub | 8125 | - |
| `MEMORY_LLM_MODEL` | memory-hub | - | Mirror of memory-core's LLM model. Keep the reference. |
| `MEMORY_LLM_API_KEY` | memory-hub | (secret) | Mirror of memory-core's LLM key. Keep the reference. |
| `MEMORY_LLM_BASE_URL` | memory-hub | - | Mirror of memory-core's LLM endpoint for the hub's Panel/Knowledge features. Keep the reference. |
| `MEMORY_LLM_PROTOCOL` | memory-hub | - | Mirror of memory-core's LLM protocol. Keep the reference. |
| `REMOTE_INSTANCE_KEY` | memory-hub | - | Key the hub uses to authenticate its calls to memory-core. Keep the default reference. |
| `REMOTE_INSTANCE_PROXY_URL` | memory-hub | - | Public URL of memory-proxy; powers the Panel's copy-paste client-access card. Keep the default reference. |
| `PORT` | memory-core | 8420 | - |
| `ADMIN_USERNAME` | memory-core | (secret) | Panel admin username. |
| `ADMIN_USER_KEY` | memory-core | - | Admin login key for the Panel. Created on first boot and persisted in the volume — changing this variable later does NOT rotate it. Create per-person keys in the Panel instead. |
| `MEMORY_LLM_MODEL` | memory-core | - | Model used for memory work, e.g. deepseek-chat. Cheap and fast beats big and smart here. |
| `MEMORY_LLM_API_KEY` | memory-core | (secret) | API key for the memory LLM endpoint. A cheap model's key is fine here. OpenRouter gives you all model options. |
| `MEMORY_PROMPT_MODE` | memory-core | chat | Memory extraction flavor: chat or code. |
| `MEMORY_LLM_BASE_URL` | memory-core | - | OpenAI-compatible LLM endpoint used for memory work (extraction, summaries, wiki ingest). e.g. https://openrouter.ai/api/v1 or https://api.deepseek.com/v1 |
| `MEMORY_LLM_PROTOCOL` | memory-core | openai | Protocol the endpoint speaks: openai or anthropic. |
| `PORT` | memory-proxy | 8096 | - |
| `PROXY_UPSTREAM_URL` | memory-proxy | - | LLM endpoint your coding-agent chats are forwarded to. Defaults to the memory group; override to use a stronger model for coding. |
| `PROXY_UPSTREAM_MODEL` | memory-proxy | - | Model name clients pass (e.g. claude --model <this>). Defaults to the memory-group model. |
| `PROXY_UPSTREAM_API_KEY` | memory-proxy | (secret) | API key for the upstream endpoint. Defaults to the memory-group key. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Volume:** `/data/tdai-memory`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/tencentdb-agent-memory)
