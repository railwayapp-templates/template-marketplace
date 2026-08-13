# Deploy OpenHands — Autonomous GitHub Issue Resolver on Railway

Self-host OpenHands — assign a GitHub issue, get a pull request

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands-issue-resolver)

## About

OpenHands is an open-source autonomous coding agent that resolves GitHub issues end to end — assign it an issue, and it reads the context, writes the fix, runs the tests, and opens a pull request, without step-by-step direction. Built by All Hands AI and topping the SWE-bench Verified leaderboard among open systems, it's a self-hosted, model-agnostic engineer you fully control. This template deploys OpenHands with a persistent workspace and bring-your-own-key LLM configuration, so you can hand real engineering tasks to an AI agent on your own infrastructure in minutes.
---

OpenHands is a genuinely autonomous engineer, and a couple of Railway specifics make it deploy cleanly for real work — both handled here.

**Assign a GitHub issue, get a pull request — the core workflow.** Connect a GitHub personal access token (repo scope), hand OpenHands an issue URL, and it clones the repo, creates a branch, reads the surrounding code, writes the fix, runs the tests, and pushes a pull request for your review. It plans and executes the whole task, iterating until tests pass. This autonomous issue-to-PR loop, backed by top SWE-bench scores, is what sets OpenHands apart.

**Runs in local-runtime mode on Railway.** OpenHands normally spawns a fresh Docker sandbox per task, which needs a Docker socket that Railway doesn't expose. This template runs the agent in local-runtime mode — the agent executes inside the Railway container itself — so it boots fast and works without Docker-in-Docker. This is ideal for trusted single-user or small-team use; because the agent runs in the app container, treat it as you would any tool with shell access and keep it access-controlled.

**Bring your own model — any provider.** OpenHands is model-agnostic through LiteLLM: set `LLM_MODEL` and `LLM_API_KEY` for Anthropic, OpenAI, Google, Bedrock, OpenRouter, or a local Ollama/vLLM endpoint via `LLM_BASE_URL`. Claude Sonnet is recommended for the strongest results, with cheaper models fine for simpler tasks. You bring your own key and pay the provider directly — no per-task subscription.

**Your workspace and history persist.** The agent's workspace and multi-conversation chat history live on the mounted volume, so tasks and context survive redeploys. Update by bumping the image tag and redeploying; your volume data is unaffected.

**A code-native agent, not a chatbot.** OpenHands has shell, file editor, web fetch, and git tools built in, plus GitHub PR creation, so it does real engineering work — refactors, migrations, feature scaffolding, test writing — rather than just answering questions, leading the open field on measured benchmarks.

Typical cost: **~$5–10/month** on Railway for the agent, plus your LLM provider usage per task. OpenHands is MIT-licensed and free — versus Devin's subscription.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenHands | [praveen-ks-2001/openhands-railway](https://github.com/praveen-ks-2001/openhands-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `RUNTIME` | local | Runtime mode |
| `LLM_MODEL` | - | Optional: pre-fill default model name (e.g. claude-sonnet-4-6) |
| `FILE_STORE` | local | - |
| `LLM_API_KEY` | (secret) | Optional: pre-fill LLM provider API key |
| `LLM_BASE_URL` | - | Optional: pre-fill custom LLM endpoint URL |
| `INTERNAL_PORT` | 3001 | - |
| `ENABLE_BROWSER` | false | - |
| `SERVE_FRONTEND` | true | - |
| `BASIC_AUTH_USER` | (secret) | - |
| `FILE_STORE_PATH` | /.openhands | - |
| `SANDBOX_USER_ID` | 0 | - |
| `PYTHONUNBUFFERED` | 1 | - |
| `RUN_AS_OPENHANDS` | false | - |
| `BASIC_AUTH_PASSWORD` | (secret) | - |
| `SKIP_DEPENDENCY_CHECK` | 1 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/.openhands`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/openhands-issue-resolver)
