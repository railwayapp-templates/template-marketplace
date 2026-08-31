# Deploy Code Server on Railway

VS Code running on a server, opened in a web browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codeserver)

## About

code-server is Visual Studio Code compiled to run as a server, so the full editor — extensions, terminal, debugger, source control — loads in a browser tab instead of on your laptop. Built by Coder under an MIT licence, it suits anyone wanting a real development environment on a machine other than the one in front of them: coding from a tablet, keeping a long build off a laptop battery, or having the same open files and shell history on every device.

Deploying code-server on Railway puts that environment on a URL, behind a password, with TLS at the edge. This template runs one service, built from a public GitHub repository on top of the official `codercom/code-server` image, with a persistent volume at `/home/coder`. That volume is the point: project files, extensions, settings, `~/.ssh` keys and `~/.gitconfig` live on it and survive every redeploy. The image also bakes in a toolchain — a C/C++ compiler, Python 3 with `venv` and `pip`, Node.js 22 LTS, `git`, `ripgrep`, `jq`, `tmux`, `sqlite3` — because anything installed later with `apt` lands in the container's temporary layer and is gone on the next deploy.

![Diagram of the code-server service and its home volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788068627/code-server-architecture.png)

code-server is the upstream VS Code source with the desktop shell swapped for a web front end and a small Node.js HTTP server. What reaches the browser is the real editor: the same keybindings, the same settings JSON, the same extension host, the same terminal on a genuine shell. The visible difference is the marketplace — Microsoft licenses theirs for their own products only, so code-server ships pointed at Open VSX.

- The complete VS Code editor in any modern browser, tablets too
- A real Linux shell, compilers and runtimes already installed
- Extensions, settings and workspace state stored server-side
- An authenticated port forwarder at `/proxy//`
- Password authentication built in, with an argon2 hash option


The editor's whole state is one home directory, so code-server is single-instance and single-user by design — no database, queue or worker tier to split out.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| code-server | [gridalpha/code-server-railway](https://github.com/gridalpha/code-server-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port code-server listens on |
| `PASSWORD` | (secret) | Login password for the editor |
| `WORKSPACE_DIR` | /home/coder/project | Folder opened after sign-in |
| `CODE_SERVER_APP_NAME` | code-server | Name shown in the browser |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/coder`

**Category:** Other · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/codeserver)
