# Deploy OpenHands + DeepSeek AI Coding Agent on Railway

AI coding agent with DeepSeek, GitHub integration, and persistent workspace

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openhands-deepseek-ai-coding-agent)

## About

OpenHands runs in local-runtime mode on Railway—the agent executes in the container itself (fast, fine for single-user or trusted use). Your workspace is stored on a persistent 5GB volume. Railway provides automatic HTTPS, HTTP basic auth, and environment-variable-based configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| deepseek-api | `ghcr.io/railwayapp/function-bun:1.4.0` | Web service |
| openhands-deepseek | `ghcr.io/openhands/agent-canvas:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DEEPSEEK_API_KEY` | deepseek-api | (secret) | Your DeepSeek API key. Get it from https://platform.deepseek.com |
| `RUNTIME` | openhands-deepseek | local | Agent runtime mode (local for Railway) |
| `LLM_MODEL` | openhands-deepseek | deepseek-chat | DeepSeek model name (e.g., deepseek-chat) |
| `LLM_API_KEY` | openhands-deepseek | (secret) | Your DeepSeek API key from https://platform.deepseek.com |
| `GITHUB_TOKEN` | openhands-deepseek | (secret) | GitHub personal access token with repo scope for cloning, branching, and creating PRs |
| `LLM_BASE_URL` | openhands-deepseek | https://api.deepseek.com/v1 | DeepSeek API base URL |
| `BASIC_AUTH_USER` | openhands-deepseek | (secret) | Username for basic auth to protect the web UI |
| `OH_PERSISTENCE_DIR` | openhands-deepseek | ~/.openhands | Workspace persistence directory |
| `BASIC_AUTH_PASSWORD` | openhands-deepseek | (secret) | Password for basic auth to protect the web UI |

## Configuration

- **Start command:** `./run.sh aW1wb3J0IEhvbm8gZnJvbSAiaG9ubyI7Cgpjb25zdCBhcHAgPSBuZXcgSG9ubygpOwoKY29uc3QgREVFUFNFRUtfQVBJX0tFWSA9IHByb2Nlc3MuZW52LkRFRVBTRUVLX0FQSV9LRVk7CmNvbnN0IERFRVBTRUVLX0FQSV9VUkwgPSAiaHR0cHM6Ly9hcGkuZGVlcHNlZWsuY29tL2NoYXQvY29tcGxldGlvbnMiOwoKYXBwLnBvc3QoIi9jaGF0IiwgYXN5bmMgKGMpID0+IHsKICB0cnkgewogICAgY29uc3QgeyBtZXNzYWdlIH0gPSBhd2FpdCBjLnJlcS5qc29uKCk7CgogICAgaWYgKCFtZXNzYWdlKSB7CiAgICAgIHJldHVybiBjLmpzb24oeyBlcnJvcjogIk1lc3NhZ2UgaXMgcmVxdWlyZWQiIH0sIDQwMCk7CiAgICB9CgogICAgaWYgKCFERUVQU0VFS19BUElfS0VZKSB7CiAgICAgIHJldHVybiBjLmpzb24oeyBlcnJvcjogIkRFRVBTRUVLX0FQSV9LRVkgbm90IGNvbmZpZ3VyZWQiIH0sIDUwMCk7CiAgICB9CgogICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChERUVQU0VFS19BUElfVVJMLCB7CiAgICAgIG1ldGhvZDogIlBPU1QiLAogICAgICBoZWFkZXJzOiB7CiAgICAgICAgIkNvbnRlbnQtVHlwZSI6ICJhcHBsaWNhdGlvbi9qc29uIiwKICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7REVFUFNFRUtfQVBJX0tFWX1gLAogICAgICB9LAogICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7CiAgICAgICAgbW9kZWw6ICJkZWVwc2Vlay1jaGF0IiwKICAgICAgICBtZXNzYWdlczogWwogICAgICAgICAgewogICAgICAgICAgICByb2xlOiAidXNlciIsCiAgICAgICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UsCiAgICAgICAgICB9LAogICAgICAgIF0sCiAgICAgICAgdGVtcGVyYXR1cmU6IDAuNywKICAgICAgfSksCiAgICB9KTsKCiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7CiAgICAgIGNvbnN0IGVycm9yID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpOwogICAgICByZXR1cm4gYy5qc29uKHsgZXJyb3I6IGBEZWVwU2VlayBBUEkgZXJyb3I6ICR7ZXJyb3J9YCB9LCByZXNwb25zZS5zdGF0dXMpOwogICAgfQoKICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7CiAgICByZXR1cm4gYy5qc29uKHsKICAgICAgc3VjY2VzczogdHJ1ZSwKICAgICAgcmVwbHk6IGRhdGEuY2hvaWNlc1swXS5tZXNzYWdlLmNvbnRlbnQsCiAgICAgIHVzYWdlOiBkYXRhLnVzYWdlLAogICAgfSk7CiAgfSBjYXRjaCAoZXJyb3IpIHsKICAgIHJldHVybiBjLmpzb24oCiAgICAgIHsgZXJyb3I6IGBTZXJ2ZXIgZXJyb3I6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAiVW5rbm93biJ9YCB9LAogICAgICA1MDAKICAgICk7CiAgfQp9KTsKCmFwcC5nZXQoIi9oZWFsdGgiLCAoYykgPT4gewogIHJldHVybiBjLmpzb24oeyBzdGF0dXM6ICJvayIgfSk7Cn0pOwoKYXBwLmdldCgiLyIsIChjKSA9PiB7CiAgcmV0dXJuIGMuanNvbih7CiAgICBtZXNzYWdlOiAiRGVlcFNlZWsgQVBJIFNlcnZpY2UiLAogICAgZW5kcG9pbnRzOiB7CiAgICAgICJQT1NUIC9jaGF0IjogIlNlbmQgYSBtZXNzYWdlIHRvIERlZXBTZWVrIiwKICAgICAgIkdFVCAvaGVhbHRoIjogIkhlYWx0aCBjaGVjayIsCiAgICB9LAogICAgdXNhZ2U6ICdQT1NUIC9jaGF0IHdpdGggSlNPTiBib2R5OiB7ICJtZXNzYWdlIjogInlvdXIgcXVlc3Rpb24gaGVyZSIgfScsCiAgfSk7Cn0pOwoKZXhwb3J0IGRlZmF1bHQgYXBwOw==`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/health`
- **Volume:** `/home/openhands/.openhands`

**Category:** AI/ML · **Tags:** ai, coding-agent, deepseek, openhands, github, autonomous

[View on Railway →](https://railway.com/deploy/openhands-deepseek-ai-coding-agent)
