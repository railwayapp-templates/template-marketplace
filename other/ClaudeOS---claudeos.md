# Deploy ClaudeOS on Railway

Deploy and Host ClaudeOS with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claudeos)

## About

ClaudeOS is a browser-accessible operating environment for Claude Code. It wraps stock Claude Code in a VS Code-based UI (via code-server) with a modular extension system — everything is an extension, and the kernel just boots the system. ClaudeOS can even be prompted to build new extensions for itself at runtime.

ClaudeOS runs as a single Docker container that bundles a Node.js supervisor process, code-server, and Claude Code managed through tmux sessions. On first boot, a setup wizard on port 8080 guides you through Railway and Anthropic authentication — no manual env vars or CLI access required. After setup, the supervisor hands port 8080 off to code-server, which serves the full VS Code-based UI. Persistent data (extensions, sessions, secrets, and config) is stored at `/data`, so mounting a Railway volume ensures state survives container restarts. The supervisor also exposes an internal API on port 3100 for session management and extension installation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ClaudeOS | [aventre-labs/ClaudeOS](https://github.com/aventre-labs/ClaudeOS) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, TypeScript, CSS, Nix, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/claudeos)
