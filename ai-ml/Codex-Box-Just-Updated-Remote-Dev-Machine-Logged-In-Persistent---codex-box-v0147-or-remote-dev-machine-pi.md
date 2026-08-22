# Deploy Codex Box | (Just Updated) Remote Dev Machine Logged In, Persistent on Railway

Remote dev machine that stays logged in, with the workspace persisted

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/codex-box-v0147-or-remote-dev-machine-pi)

## About

Codex Box is a persistent remote development machine for the OpenAI Codex CLI. Deploy it,
connect over Railway SSH (or from the Codex desktop app's SSH connection), and work from
one environment that keeps your Codex login, sessions, repositories and installed tools
across every redeploy.

The image is prebuilt and the Codex CLI version is pinned, so a deploy is an image pull
rather than a full Ubuntu + Node + toolchain build, and redeploying never swaps the agent
version underneath you.

The service runs one Ubuntu 24.04 container with the Codex CLI `0.147.0`, Node 22, the
Railway CLI (agent support enabled), GitHub CLI, git, git-lfs, tmux, ripgrep, fd, Python 3
and `uv`. A volume mounted at `/data` holds everything durable: `$HOME` and `/root` both
resolve to `/data/home/user`, Codex state lives in `/data/home/user/.codex`, and projects
live in `/data/workspace`. The container repairs the volume's ownership on boot, because
Railway mounts volumes as uid 0, and it refuses to start at all if no volume is attached —
without one, a redeploy silently erases your Codex login and your repositories.

Set `OPENAI_API_KEY` and the box authenticates itself before you ever connect. This matters
more than it sounds: Codex `0.147.0` does not read that environment variable at request
time, so a box that merely has the variable exported sends no credentials, retries five
times, and reports `401 Unauthorized: Missing bearer or basic authentication in header`.
Codex Box writes the credential into `auth.json` at boot instead. If you would rather sign
in with your ChatGPT account, leave the variable unset and run `codex login` over SSH — an
existing interactive login is detected and never overwritten.

There is no public HTTP domain. The only way in is Railway SSH, which Railway
authenticates against your account and your registered key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| codex-box | `ghcr.io/bon5co/codex-box-railway:latest` | Database |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/codex-box-v0147-or-remote-dev-machine-pi)
