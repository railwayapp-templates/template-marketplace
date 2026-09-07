# Deploy notal on Railway

Git workspace for humans + agents — Markdown queue with receipts, MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/notal)

## About

What is Notal? Notal is a self-hosted editor for teams that already live in git. People and agents work in the same folder — Markdown plans become a claimable queue with receipts, chats live as files, and boards (`*.todo`) stay mergeable. Give it one folder, not your whole repo. Files agents can actually run.

Notal runs as one container with a persistent volume at `/config`. Nothing is baked into the image: on first boot you open `/config`, set a password, clone a repository, and define workspaces. Railway handles the public URL, HTTPS, and restarts; you keep git, attribution, and your own build pipeline. Mount `/config` so deploy keys, workspace registry, and OAuth secrets survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| notal | `ghcr.io/okvic77/notal` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `EDITOR_OAUTH` | - | https://<client_id>:<client_secret>@<issuer> — the whole sign-in config in one URL. Unset = no sign-in at all, and on a public Railway domain that means anyone can push to your repos, run your agents and spawn cloud sandboxes. |
| `EDITOR_TRUST_PROXY` | none | none. It's already the default once EDITOR_OAUTH is set, but set it explicitly: unset + no OAuth means any peer may send X-Forwarded-Email and be signed in as anybody. |
| `EDITOR_OAUTH_ISSUER` | - | https://<your>.up.railway.app — pins the redirect URI and discovery doc instead of deriving them from a request header. Worth setting on Railway since the public host is fixed. |
| `EDITOR_CONFIG_PASSWORD` | (secret) | Password for the /config admin page (HTTP Basic, user admin). If unset, /config is open to anyone with the URL — and /config can clone repos, write git credentials and read the deploy key. Never ship the template without it. |
| `OPENAI_COMPATIBLE_COMMIT` | - | https://api-key@api.openai.com/v1?model=gpt-4o-mini. Powers the assistant, the agents and AI commit messages. Unset = editor works, no assistant. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/notal)
