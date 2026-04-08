# Deploy CareerOps Hub on Railway

Automate your job hunt with Claude Code in one click! 🌐🤖

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/careerops-hub)

## About

CareerOps Hub is a centralized, AI-powered command center designed to automate the most tedious parts of job hunting. By leveraging Claude Code and an Ubuntu-based web terminal, it analyzes job descriptions, scores opportunities (A-F), and generates tailored, ATS-friendly CVs in real-time; all through a single, secure browser-based interface.

Hosting CareerOps Hub on Railway involves deploying a customized Ubuntu container pre-configured with a full DevOps-ready stack. The deployment includes Node.js 20 LTS for the core application logic, Playwright for automated PDF rendering (Chromium), and `ttyd` for secure web terminal access. By using Railway’s persistent volumes, your CVs, tailored profiles, and AI logs remain safe across redeployments. This cloud-native approach ensures your AI agent stays active 24/7, allowing you to scan job portals and prepare applications from any device without the need for local processing power or complex setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| career-ops-hub | [codestorm-official/career-ops-hub](https://github.com/codestorm-official/career-ops-hub) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7681 |
| `NODE_ENV` | production |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |
| `CLAUDE_MODEL` | claude-3-5-sonnet-latest |
| `ANTHROPIC_API_KEY` | (secret) |

## Configuration

- **Volume:** `/root/workspace`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/careerops-hub)
