# Deploy ParrotOS Security | (Just Updated) Browser Terminal, Files Survive Redeploys on Railway

ParrotOS security shell in your browser; files in /root survive redeploys.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/parrotos-security-or-just-updated-browse)

## About

A full **ParrotOS Security Edition** shell in your browser, one click, no SSH keys
and no local setup. It is served by [ttyd](https://github.com/tsl0922/ttyd) behind
HTTP basic auth, and your home directory `/root` lives on a Railway volume — so
files, scripts, cloned repositories, wordlists and dotfiles survive a redeploy
instead of vanishing with the container.

The service runs a single container: a pinned ParrotOS Security base with its
security toolset plus a working command-line toolbox (git, curl/wget, vim/nano,
tmux, htop, jq and more) and the ttyd terminal server. ttyd listens on the port
Railway injects and every request is gated by basic auth. The template generates a
random password per deploy and the container refuses to start without one, so the
terminal is never exposed with empty credentials. The `/root` home directory is
mounted on a volume; the image's home skeleton is restored on top of the volume at
boot so a fresh mount still has working shell configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| parrotos-terminal | `ghcr.io/bon5co/parrotos-terminal-railway:security` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root`

**Category:** Starters

[View on Railway →](https://railway.com/deploy/parrotos-security-or-just-updated-browse)
