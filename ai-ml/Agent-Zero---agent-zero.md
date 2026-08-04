# Deploy Agent Zero on Railway

Self-hosted general-purpose AI agent with terminal & code exec

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/agent-zero)

## About

Agent Zero is an open-source, general-purpose AI agent framework packaged as a Docker image. Instead of shipping pre-built tasks, it gives an LLM direct access to a terminal, code execution, browsing, and persistent memory — letting the agent write and use its own tools to accomplish whatever it's asked.

Hosting Agent Zero means running its official Docker image (`agent0ai/agent-zero`) as a long-lived web service with a persistent volume attached. The container serves a Web UI on port 80 and needs `/a0/usr` mounted to a volume so settings, chats, memory, and knowledge survive restarts and redeploys. Because the agent can execute arbitrary code and shell commands, it should always run in an isolated container (as it does on Railway) and be protected with login credentials before being exposed on a public URL. Once deployed, you add your own LLM provider API key from the Settings panel to start using it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agent-zero | `agent0ai/agent-zero:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AUTH_LOGIN` | (secret) |
| `AUTH_PASSWORD` | (secret) |
| `A0_SET_chat_model_name` | claude-sonnet-4-5 |
| `A0_SET_utility_model_name` | claude-haiku-4-5 |
| `A0_SET_chat_model_provider` | anthropic |
| `A0_SET_utility_model_provider` | anthropic |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/a0/usr`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/agent-zero)
