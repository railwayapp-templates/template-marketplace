# Deploy T3 Code | Always-On Cloud Agent Box for Claude Code & Codex on Railway

Run Claude Code, Codex and OpenCode 24/7; drive them from T3 web or mobile

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/t3-code-cloud)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/t3-code-cloud?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=t3-code-cloud)

[T3 Code](https://github.com/pingdotgg/t3code) is the open-source "agent harness control surface": a server that runs coding agents (Claude Code, Codex, OpenCode and more) on a machine, and web, desktop and mobile apps that drive them from anywhere. This template makes that machine a Railway service: an always-on cloud agent box with Claude Code, Codex and OpenCode preinstalled, so your agents keep working with the laptop closed and you check in from your phone.

One service, one volume. The pinned `t3` server (v0.1.0, checksum-verified at build) runs behind nginx on your Railway domain. It serves the T3 web app and the API that the [iOS](https://apps.apple.com/us/app/t3-code-remote-claude-more/id6787819824) and [Android](https://play.google.com/store/apps/details?id=com.t3tools.t3code) apps, the desktop app and [app.t3.codes](https://app.t3.codes) connect to.

- **Locked by default, with T3's own auth.** Every API call, WebSocket and terminal needs a T3 session, and a device only gets one by pairing with a one-time link. Nothing is open to whoever finds the URL. The mobile apps, the desktop app and app.t3.codes connect through this same lock. A basic-auth gateway in front would have blocked them.
- **A pairing page instead of digging through logs.** Open `https:///railway-pair` and sign in with the generated `T3_SETUP_PASSWORD`. The page mints a one-time pairing link that lasts 15 minutes, with a QR code for the phone app. The one-time admin token `t3 serve` prints at boot is redacted from the logs.
- **T3 Code 0.1 (Orchestrator V2), the first stable release.** Agents can hand work to child agents on any provider (`delegate_task`: Claude plans, Codex implements), fork threads, and queue messages on the server. Interrupted threads continue after a redeploy.
- **Agents preinstalled and pinned:** Claude Code 2.1.302, Codex 0.163.0 and OpenCode 2.0.32, next to `git`, `gh`, Node 22, Python 3 + `uv`, `build-essential`, `ripgrep`, `jq` and `tmux`.
- **A normal user with sudo.** Agents run as user `t3`, so Claude Code's full-access mode works (it refuses that mode as root). Passwordless `sudo` is there for `apt-get`.
- **Everything persists.** `/home/t3` is the volume: agent logins (`~/.claude`, `~/.codex`), T3 state and threads (`~/.t3`), repos in `~/workspace`, dotfiles.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| T3 Code | [nomideusz/t3code-railway](https://github.com/nomideusz/t3code-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port of the web app. Do not change. |
| `GH_TOKEN` | (secret) | Optional. GitHub token so agents can clone private repos, push and open PRs. |
| `OPENAI_API_KEY` | (secret) | Optional. Logs Codex in with an API key on first boot. Or use Continue with ChatGPT in T3. |
| `ANTHROPIC_API_KEY` | (secret) | Optional. Claude Code with an API key instead of a subscription login (claude auth login in the T3 terminal). |
| `T3_SETUP_PASSWORD` | (secret) | Password for https://<your-domain>/railway-pair, the page that pairs browsers, phones and desktop apps with this server. |
| `CLAUDE_CODE_OAUTH_TOKEN` | (secret) | Optional. Long-lived Claude subscription token from `claude setup-token` on any machine. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/t3`

**Category:** AI/ML · **Languages:** JavaScript, Dockerfile, Shell, Python

[View on Railway →](https://railway.com/deploy/t3-code-cloud)
