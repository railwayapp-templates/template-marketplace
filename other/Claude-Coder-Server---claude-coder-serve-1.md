# Deploy Claude Coder Server on Railway

VSCode with Claude Code in Browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-coder-serve-1)

## About

Claude Code Server is a browser-based VS Code IDE with Claude Code CLI pre-installed. It provides instant cloud development environment with AI-powered coding assistance, persistent extensions, and secure non-root execution. Deploy in 60 seconds and start coding with Claude right in your browser.

Hosting Claude Code Server on Railway gives you a full VS Code development environment accessible from any browser. The template handles all the complexity: it installs code-server (the browser VS Code), pre-installs Claude Code CLI, sets up proper user permissions with the `clauder` user, and configures persistent storage for your extensions and authentication. The container starts as root to fix volume permissions, then switches to a non-root user for security. Just set your password, attach a volume, and you're ready to code.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Claude Coder | [sphinxcode/claude-code-server](https://github.com/sphinxcode/claude-code-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GIT_REPO` | - | Github repo .git address |
| `PASSWORD` | (secret) | Login password |
| `RUN_AS_USER` | (secret) | Set to `root` for admin user, `clauder` for non-admin user |
| `CLAUDER_HOME` | /home/clauder | Volume mount path |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/clauder`

**Category:** Other · **Languages:** TypeScript, Shell, Dockerfile, HTML, CSS, HCL, JavaScript, Mustache, Nix

[View on Railway →](https://railway.com/deploy/claude-coder-serve-1)
