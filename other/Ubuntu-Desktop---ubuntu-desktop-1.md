# Deploy Ubuntu Desktop on Railway

Ubuntu desktop in your browser with Claude Code, Codex, Chrome and VS Code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ubuntu-desktop-1)

## About

A full Ubuntu desktop (XFCE) that runs on Railway and streams to your browser, set up for development: Claude Code, Codex, Node.js 22, git, Google Chrome and VS Code are installed. It's built on [linuxserver's webtop](https://github.com/linuxserver/docker-webtop) image, which streams the desktop with Selkies over WebSockets, so it works through Railway's normal HTTPS domain.

A desktop in the browser is a whole computer behind one URL, so the login comes first. `PASSWORD` is generated at deploy, and the start step refuses to run without `CUSTOM_USER` and a password of 12 or more characters. Railway's healthcheck uses a separate route that needs no login and follows the stream server, so a desktop whose stream is down doesn't look healthy.

Two changes keep it workable in a container. The upstream image reserves a 15360x8640 virtual screen, which holds hundreds of MB of RAM for the framebuffer alone; this template caps it at 4K, and the desktop still resizes to your browser window. Chrome and VS Code start with `--no-sandbox`, because their sandbox needs kernel features containers don't get; Chrome shows a warning bar about it.

The home directory (`/config`) is a volume, so your files, browser profile, VS Code settings and CLI logins survive redeploys. Run `claude` or `codex` in a terminal (Ctrl+Alt+T) and open the sign-in link it gives you in Chrome on the desktop. An API key works too: set `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` on the service.

Before publishing I tested it on Railway. The health route answered, the desktop page returned 401 without the login and loaded with it, and the stream's WebSocket opened with the login. In Chromium I opened the desktop, started a terminal with Ctrl+Alt+T, wrote the versions of Claude Code (2.1.302), Codex (0.163.0) and Chrome (155) to a file, and launched Chrome, which loaded a page inside the desktop. After a restart, in a new container, that file was still in the home directory. I didn't sign in to Claude or ChatGPT in the test.

With Chrome open it used 0.73 GB of RAM, about $7 a month on Railway's usage pricing. That leaves little room on the trial's 1 GB; the Hobby plan is the comfortable one if you run builds and a browser together.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ubuntu Desktop | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /ubuntu-desktop) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Time zone, e.g. Europe/Berlin |
| `PGID` | 1000 | Group id the desktop runs as |
| `PORT` | 3000 | Port Railway routes to |
| `PUID` | 1000 | User id the desktop runs as |
| `TITLE` | Ubuntu Desktop | Browser tab title |
| `PASSWORD` | (secret) | Login password (generated). The desktop won't start without one |
| `CUSTOM_USER` | (secret) | Login name for the desktop |
| `DESKTOP_URL` | - | Open this and sign in with CUSTOM_USER and PASSWORD |
| `OPENAI_API_KEY` | (secret) | Optional: for Codex (or sign in with ChatGPT from the desktop) |
| `ANTHROPIC_API_KEY` | (secret) | Optional: for Claude Code (or sign in with your Claude account from the desktop) |

## Configuration

- **Healthcheck:** `/railway-health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Tags:** ubuntu, desktop, linux-desktop, webtop, claude-code, vscode · **Languages:** Shell, Dockerfile, JavaScript, TypeScript

[View on Railway →](https://railway.com/deploy/ubuntu-desktop-1)
