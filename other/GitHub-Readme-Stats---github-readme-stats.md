# Deploy GitHub Readme Stats on Railway

Get dynamically generated GitHub stats on your READMEs!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/github-readme-stats)

## About

GitHub Readme Stats is a popular open-source tool that dynamically generates customizable SVG cards displaying your GitHub profile statistics, such as total stars, commits, pull requests, contributions, top languages, and more. Embed these eye-catching cards directly into your README for an impressive, always-up-to-date profile showcase.

![](https://github-readme-stats-selfhosted-production.up.railway.app/api?username=anuraghazra)

![](https://res.cloudinary.com/anuraghazra/image/upload/v1595174536/grs-themes_l4ynja.png)

This Railway template deploys a self-hosted instance of GitHub Readme Stats using a lightweight Docker image that automatically fetches the latest code from the original repository on startup. The container runs a Node.js server exposing endpoints to generate stats cards via simple URL queries (e.g., `/api?username=yourname`). To operate reliably, you'll need to provide a GitHub Personal Access Token (PAT) to bypass public API rate limits, and strongly consider whitelisting usernames to prevent abuse on your public endpoint. The setup is stateless by design—no persistent volumes needed on /repo—for smooth deploys and restarts. Once live, access your instance at the Railway-provided domain for private or shared stats generation.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| github-readme-stats-selfhosted | `ghcr.io/utkuozdemir/github-readme-stats-selfhosted:latest` | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `PAT_1` | Github Classic Token with 'repo' and 'read:user' scopes |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/github-readme-stats)
