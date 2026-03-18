# Deploy Agents Anywhere on Railway

Run coding agents on Railway and connect via SSH

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/agents-anywhere)

## About

Agents Anywhere runs Claude Code inside a persistent SSH container on Railway. Deploy
   it once, then SSH in from any device and start coding with AI. Repos, settings, and
  history survive redeploys.

  ## About Hosting Agents Anywhere

  The template deploys an Ubuntu container with Claude Code and SSH access. A Railway
  volume mounted at `/data` stores your repos, config, and session history across
  redeploys. Thirteen Railway skills come pre-installed so Claude Code can manage your
  Railway services out of the box. Authentication supports SSH keys or passwords. The
  entrypoint handles config symlinks, skill syncing, and SSH daemon startup
  automatically. You deploy, connect, and code.

  ## Common Use Cases

  - SSH into a cloud dev environment from a laptop, phone, or tablet and resume where
  you left off
  - Start Claude Code in tmux, disconnect, reconnect hours later to check results

  ## Dependencies for Agents Anywhere Hosting

  - An SSH client (OpenSSH, Termius, Blink Shell)
  - An Anthropic account (Claude Code prompts you to log in on first run)

  ### Deployment Dependencies

  - [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — installed from npm
  at build time
  - [Railway volume](https://docs.railway.com/volumes) — persistent storage at `/data`
  - [Railway TCP proxy](https://docs.railway.com/networking/tcp-proxy) — exposes SSH to
   the internet

  ## Why Deploy Agents Anywhere on Railway?

  
  Railway is a singular platform to deploy your infrastructure stack. Railway will host
   your infrastructure so you don't have to deal with configuration, while allowing you
   to vertically and horizontally scale it.

  By deploying Agents Anywhere on Railway, you are one step closer to supporting a
  complete full-stack application with minimal burden. Host your servers, databases, AI
   agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Agents Anywhere | [m-abdelwahab/agents-anywhere](https://github.com/m-abdelwahab/agents-anywhere) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SSH_PASSWORD` | (secret) | Password for SSH access. Generated on deploy, but you can set your own. Note that the SSH port is exposed to the internet, so a weak password can be brute-forced, so use a strong password. Or use key-based auth instead. |

## Configuration

- **TCP Proxies:** 22
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/template/agents-anywhere)
