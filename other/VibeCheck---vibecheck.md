# Deploy VibeCheck on Railway

A quiz on every pull request, so you understand the code you're merging

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vibecheck)

## About

It's so tempting to vibe-code a thousand lines and ship them — but do you actually understand what you just merged? **VibeCheck makes sure _you_ understand what's going into _your_ codebase.** It drops a quick AI-generated quiz on every pull request, right in the comment thread; you answer inline, and a commit status reports the result — a human stays in the loop, no one gets slowed down.

VibeCheck is a small self-hosted Node/TypeScript server that generates and grades the quizzes with your own Anthropic API key. This template deploys that server on Railway with a public URL and a health check. Your code never leaves your infrastructure — the GitHub Action sends only the PR diff to your server, and requests are authenticated with GitHub Actions OIDC (no shared secret to manage).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vibecheck | [boJackEden/vibecheck](https://github.com/boJackEden/vibecheck) (root: server/) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ANTHROPIC_API_KEY` | (secret) | Your Anthropic API key (make sure you have some token credits!) |
| `VIBECHECK_ALLOWED_OWNERS` | - | Your GitHub username or org, e.g. boJackEden |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/vibecheck)
