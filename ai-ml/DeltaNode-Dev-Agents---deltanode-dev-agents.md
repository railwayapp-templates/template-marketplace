# Deploy DeltaNode Dev Agents on Railway

AI agent workflow system with validation scoring and self-improvement loops

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deltanode-dev-agents)

## About

DeltaNode Dev Agents is an autonomous AI agent workflow system powered by Claude Code. It uses 6 specialized agents to take a task described in plain English, generate a structured spec, execute code in isolated git worktrees, and validate the output with adversarial scoring. Anything below 75/100 gets retried automatically.

Hosting DeltaNode Dev Agents on Railway gives you a persistent FastAPI server that orchestrates the full agent pipeline. The system runs a web dashboard for submitting tasks and approving specs, a LangGraph workflow engine coordinating 6 agents, a SQLite memory layer that persists across sessions, and scheduled jobs for weekly self-improvement and update scans. The only external dependency is an Anthropic API key for Claude.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| agents | [nodeglobal/agents](https://github.com/nodeglobal/agents) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ANTHROPIC_API_KEY` | (secret) |

**Category:** AI/ML · **Languages:** Python, HTML, Shell

[View on Railway →](https://railway.com/deploy/deltanode-dev-agents)
