# Deploy Digital Twin AI on Railway

Browser-based VS Code with Claude Code CLI pre-installed

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/digital-twin-ai)

## About

Digital Twin AI is a browser-based VS Code development environment with Claude Code CLI pre-installed. It gives you a full
cloud IDE accessible from any device, with AI-assisted coding powered by Anthropic's Claude ready out of the box. Deploy in
60 seconds and start coding with AI anywhere.

Hosting Digital Twin AI involves deploying a Docker container running code-server (VS Code in the browser) with Claude Code
CLI baked in. The template handles user setup, persistent storage for extensions and projects, and secure non-root execution
automatically. A Railway volume mounted at /home/digital-twin ensures your workspace, installed tools, API keys, and VS
Code extensions survive redeploys. The only required configuration is setting a login password — everything else works with
sensible defaults. The entrypoint script manages user permissions, shell profiles, and environment verification on each
startup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| digital-twin | [mantasdigital/digital-twin](https://github.com/mantasdigital/digital-twin) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Fill in your password for access to Digital Twin AI server. |
| `RUN_AS_USER` | (secret) | Set to `root` for root execution |
| `DIGITAL_TWIN_HOME` | `/home/digital-twin | Volume mount path |

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile, HTML, CSS, HCL, JavaScript, Mustache

[View on Railway →](https://railway.com/deploy/digital-twin-ai)
