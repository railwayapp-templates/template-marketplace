# Deploy Orca Server | Parallel Coding Agents in the Cloud on Railway

Orca's agent IDE on Railway: Claude Code, Codex, OpenCode from any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/orca-server)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/orca-server?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=orca-server)

[Orca](https://github.com/stablyai/orca) is the open-source IDE for running a fleet of coding agents in parallel: Claude Code, Codex, OpenCode and 40 more CLI agents, each in its own git worktree, with terminals, diffs, source control and GitHub checks in one window. This template runs Orca's headless server (`orca serve`) on Railway, so your agents keep working with the laptop closed and you drive them from a browser, the Orca desktop app or the Orca phone app.

One service, one volume. The pinned Orca release (v1.4.225, checksum-verified at build) runs headless behind nginx on your Railway domain. It serves the Orca web client and the WebSocket that the browser, the desktop app and the phone app connect to.

- **Use it from any browser.** The template runs Orca's full runtime, the one that ships the browser client, so a laptop, tablet or phone with a browser is enough. No install, no Tailscale.
- **Locked by Orca's own pairing.** Every connection needs a paired device token. Someone who finds the URL sees only an empty "Connect to Orca" form. The desktop and phone apps connect through this same lock. A basic-auth gateway in front would have locked them out.
- **A pairing page instead of digging through logs.** Open `https:///railway-pair` and sign in with the generated `ORCA_SETUP_PASSWORD`. The page has a one-click browser sign-in, the link for the desktop app, a QR code for the phone app, and a button that revokes every paired device. The pairing credential Orca prints at startup is kept out of the deploy logs.
- **Agents preinstalled and pinned:** Claude Code 2.1.300, Codex 0.162.1 and OpenCode 1.19.0, next to `git`, `gh`, Node 22, Python 3 + `uv`, `build-essential`, `ripgrep`, `jq` and `tmux`. Install any other agent from an Orca terminal.
- **A normal user with sudo.** Agents run as user `orca`, so Claude Code's skip-permissions mode works (it refuses that mode as root). Passwordless `sudo` is there for `apt-get`.
- **Everything persists.** `/home/orca` is the volume: Orca's state, paired devices and agent sessions (`~/.config/orca`), agent logins (`~/.claude`, `~/.codex`), your repos in `~/projects`, and dotfiles.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Orca | [two-workspaces/orca](https://github.com/two-workspaces/orca) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port of the web app. Do not change. |
| `GH_TOKEN` | (secret) | Optional. GitHub token so agents can clone private repos, push and open PRs, and Orca can show PRs and checks. |
| `OPENAI_API_KEY` | (secret) | Optional. Logs Codex in with an API key on first boot. Or run `codex login --device-auth` in an Orca terminal. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Claude Code with an API key instead of a subscription login (claude auth login in an Orca terminal). |
| `ORCA_SETUP_PASSWORD` | (secret) | Password for https://<your-domain>/railway-pair, the page with your pairing links for the browser, desktop and phone apps. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. Long-lived Claude subscription token from `claude setup-token` on any machine. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/orca`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell, Python

[View on Railway →](https://railway.com/deploy/orca-server)
