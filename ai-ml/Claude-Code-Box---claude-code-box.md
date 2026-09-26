# Deploy Claude Code Box on Railway

Ubuntu with Claude Code, Codex and Gemini CLI. Browser terminal and SSH

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/claude-code-box)

## About

An Ubuntu 24.04 box with Claude Code, Codex and Gemini CLI installed. You get a password-protected terminal in the browser plus SSH, your home directory lives on a Railway volume, and a tmux session keeps an agent working after you close the tab.

I made it because the most deployed Claude box on Railway has no volume, so your Claude login and every file you created are gone after a redeploy. Here the home directory is the volume. This is a community template; it isn't made by Anthropic, OpenAI or Google.

When the deploy finishes, open `BOX_URL` from the Variables tab and log in as `dev` with `BOX_PASSWORD`. You land in a tmux session. Then log in to the agents you use:

```bash
claude                      # log in with your Claude subscription, or set ANTHROPIC_API_KEY
codex login --device-auth   # or set OPENAI_API_KEY
gemini                      # pick a login method, or set GEMINI_API_KEY
```

Close the tab and whatever runs in tmux keeps running. Open `BOX_URL` again and you're back in the same session. The terminal is a web page, so a phone browser can open it too.

For SSH, copy `SSH_COMMAND` (it looks like `ssh -p 12345 dev@something.proxy.rlwy.net`). It accepts `BOX_PASSWORD`, or put your public key in `SSH_AUTHORIZED_KEYS` and set `SSH_PASSWORD_AUTH` to `no`. Commands over SSH find the agents too, so `ssh ... claude -p "fix the failing test"` works from a script.

What I tested before publishing: the page returns 401 without the password; in the browser terminal `claude`, `codex`, `gemini` and `gh` all run; SSH with a key runs `claude`; and a file I wrote in the home directory was still there after the image was rebuilt and redeployed twice. A fresh deploy took about two and a half minutes, most of it building the image. Idle, the box used 6 MB of RAM. An agent uses more while it works, and I don't have a measured number for that.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| coding-box | [dektionstudio/railway-template-images](https://github.com/dektionstudio/railway-template-images) (root: /coding-box) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7681 | Port of the browser terminal |
| `BOX_URL` | - | Open this and log in as dev with BOX_PASSWORD |
| `SSH_COMMAND` | - | Connect over SSH with BOX_PASSWORD or a key from SSH_AUTHORIZED_KEYS |
| `BOX_PASSWORD` | (secret) | Password for the browser terminal and SSH, user dev (generated) |
| `GITHUB_TOKEN` | (secret) | Optional: GitHub token. gh and git push over HTTPS use it |
| `GEMINI_API_KEY` | (secret) | Optional: Gemini API key. Or log in with Google from gemini |
| `OPENAI_API_KEY` | (secret) | Optional: OpenAI API key for Codex. Or run codex login --device-auth |
| `ANTHROPIC_API_KEY` | (secret) | Optional: Claude API key. Or run claude and log in with your subscription |
| `SSH_PASSWORD_AUTH` | (secret) | Set to no after adding SSH_AUTHORIZED_KEYS to allow key logins only |
| `SSH_AUTHORIZED_KEYS` | - | Optional: your SSH public key(s), one per line |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 22
- **Volume:** `/home/dev`

**Category:** AI/ML · **Tags:** claude-code, codex, gemini-cli, ubuntu, ssh, terminal, ai-agents · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/claude-code-box)
