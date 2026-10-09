# Deploy code-server on Railway

VS Code in the browser with Claude Code and Codex, a password and a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/code-server-4)

## About

[code-server](https://github.com/coder/code-server) runs VS Code in your browser: the same editor, extensions and terminal, on a server you can open from any device. This template runs code-server 4.141.0 with Node.js 22 and the Claude Code and Codex CLIs ready in its terminal.

The editor and its terminal give full control of the container, so the login is set before anything else: `PASSWORD` is generated at deploy, and the start step won't run code-server without it.

The whole home directory (`/home/coder`) is a volume, so extensions, settings, terminal history, CLI logins and your projects survive redeploys. The official image runs as the `coder` user while Railway mounts volumes as root; the start step hands the volume to `coder` before starting the editor, which is what keeps it writable.

Claude Code and Codex are installed in the image. Run `claude` or `codex` in the terminal and sign in with your Claude or ChatGPT account, or set `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` on the service.

Before publishing I tested it on Railway. `/healthz` answered, the editor sent visitors to the login page, `PASSWORD` signed in and the workbench loaded. The start log showed Node.js 22.23.3, Claude Code 2.1.295 and Codex 0.162.0, and a new home directory on the volume. After a restart the log found the same home directory, with the date it was created, and sign-in worked again.

Idle, it used 0.06 to 0.10 GB of RAM, under $1 a month on Railway's usage pricing. Builds and agents use more while they run.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /code-server) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes to |
| `PASSWORD` | (secret) | Login password (generated) |
| `OPENAI_API_KEY` | (secret) | Optional: for Codex in the terminal (or sign in with ChatGPT) |
| `CODE_SERVER_URL` | - | Open this and sign in with PASSWORD |
| `ANTHROPIC_API_KEY` | (secret) | Optional: for Claude Code in the terminal (or sign in with your Claude account) |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder`

**Category:** Other · **Tags:** code-server, vscode, ide, claude-code, codex, remote-development · **Languages:** JavaScript, Shell, Dockerfile, TypeScript

[View on Railway →](https://railway.com/deploy/code-server-4)
