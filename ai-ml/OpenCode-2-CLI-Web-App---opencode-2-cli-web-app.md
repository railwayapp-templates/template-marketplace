# Deploy OpenCode 2 CLI + Web App on Railway

OpenCode 2 from day one: web app, your own TUI, or SSH. Free models.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-2-cli-web-app)

## About

<p align="center">
  <img width="860" alt="The OpenCode 2 web app on this template: an agent touring a repo on the free DeepSeek model" src="https://raw.githubusercontent.com/yuting1214/opencode-railway/147398795a20abc1d5ccf4669aa94594d0593f2b/assets/v2-session.png">
</p>

[OpenCode](https://opencode.ai) is **the open-source AI coding agent** — it reads your repo, writes
and edits code, runs commands, and opens pull requests. **OpenCode 2** rebuilt it around one shared
server that the terminal, web and desktop apps all connect to. This template runs that server on
Railway: the **OpenCode 2 web app** on a public domain — and when you'd rather work in a terminal,
**your own OpenCode 2** or **`railway ssh`** connects to the same server and the same sessions.

One container runs **`opencode serve`** — OpenCode 2's server, which serves both the web app and
its API — on a public Railway domain, with every API call password-protected. A `/workspace` volume
keeps sessions, credentials and repos across redeploys; `git` + the GitHub CLI are preinstalled.

**Three ways in, one set of sessions** — start a task in one, pick it up in another:

- **Browser** — open the public URL, choose **Use password**, and paste the password from the
  deploy logs (`[boot] opencode web auth → …`) or the `OPENCODE_PASSWORD` variable. It is
  generated for your deploy.
- **Your own OpenCode 2** — on any machine with OpenCode 2 installed:
  `OPENCODE_PASSWORD= opencode --server https://`. The TUI runs locally;
  the agent, repos and sessions stay in the cloud. It needs OpenCode 2 (a 1.x client cannot talk
  to a 2.x server), ideally the same version the box runs.
- **`railway ssh`** — then `opencode` for the TUI, with a real shell, `git` and `gh` on the box
  beside it.

Deploys come from a **prebuilt, version-pinned image** — no build to sit through, and every deploy
runs the exact OpenCode 2 build that was tested. OpenCode 2 is moving fast; pinning is what keeps a
bad upstream release from breaking your deploy. You can **start coding free with no API key**:
OpenCode's free models (such as DeepSeek) work as soon as the box boots.

<p align="center">
  <img width="860" alt="OpenCode 2 Review panel: side-by-side diff of an edit the agent made" src="https://raw.githubusercontent.com/yuting1214/opencode-railway/147398795a20abc1d5ccf4669aa94594d0593f2b/assets/v2-review.png">
</p>

Every edit the agent makes shows up in the web app's **Review** panel as a side-by-side diff, next
to the conversation that produced it, alongside a file browser for the repo.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenCode | `ghcr.io/yuting1214/opencode-railway:2.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPENAI_API_KEY` | (secret) | GPT models (optional). Free models work with no key at all, or run `opencode auth login` inside the box. |
| `ANTHROPIC_API_KEY` | (secret) | Claude models (optional). Free models work with no key at all, or run `opencode auth login` inside the box. |
| `OPENCODE_PASSWORD` | (secret) | Password for the web app (choose "Use password" when it opens). A strong one is generated for you; copy it from this service's Variables tab or the deploy logs. |
| `OPENROUTER_API_KEY` | (secret) | Many providers behind one key (optional). Free models work with no key at all. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/workspace`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opencode-2-cli-web-app)
