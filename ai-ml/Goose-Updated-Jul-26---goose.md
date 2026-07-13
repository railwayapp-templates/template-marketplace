# Deploy Goose [Updated Jul '26] on Railway

Goose [Jul '26] (Extensible AI Agent that Codes, Runs & Tests) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/goose)

## About

goose is an open-source, extensible AI agent that goes beyond code suggestions: it installs dependencies, executes commands, edits files, and tests changes on your behalf with any LLM. Built in Rust by Block and stewarded by the Agentic AI Foundation at the Linux Foundation, goose connects to 15+ providers including Anthropic, OpenAI, Google Gemini, Ollama, and Amazon Bedrock, and extends through 70+ Model Context Protocol (MCP) extensions. It is a self-hosted alternative to GitHub Copilot, Cursor, and Devin.

Self hosting goose means your code, API keys, session history, and agent configuration stay on infrastructure you control. There is no per-seat SaaS subscription and no vendor usage cap. On Railway, the full goose stack deploys automatically: the official Rust CLI runs inside a browser terminal (ttyd) over HTTPS, with a persistent volume for sessions and workspace, private networking, and a generated domain. Bring your own model key and the agent is ready in minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| goose | [Shinyduo/goose-railway](https://github.com/Shinyduo/goose-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GOOSE_MODEL` | gpt-4o |
| `GOOSE_PROVIDER` | openai |
| `GOOSE_WEB_USER` | (secret) |
| `OPENAI_API_KEY` | (secret) |
| `GOOSE_WEB_PASSWORD` | (secret) |
| `GOOSE_DISABLE_KEYRING` | 1 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/goose)
