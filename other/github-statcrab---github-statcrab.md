# Deploy github-statcrab on Railway

GitHub profile stats for Readme file generated on the fly!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/github-statcrab)

## About

github-statcrab is a Rust-based web server that generates dynamic SVG cards displaying GitHub user statistics and programming language usage. It leverages the GitHub API to present data in visually appealing formats for embedding in README files or web pages.

Hosting github-statcrab involves deploying a Rust web server that connects to the GitHub API to fetch user data and generate SVG cards. The service requires a GitHub Personal Access Token for API authentication and includes built-in caching to optimize performance. The server exposes REST endpoints that return dynamic SVG cards displaying user statistics and top programming languages, making it perfect for embedding in GitHub profiles.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| github-statcrab | `ghcr.io/samgozman/github-statcrab/server:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GITHUB_TOKEN` | (secret) | GitHub Personal Access Token: https://github.com/settings/tokens. Generate new token (classic) with repo and user scopes |
| `ALLOWED_USERNAMES` | (secret) | Comma-separated list of GitHub usernames allowed to use the API. Leave empty to allow all users  |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/github-statcrab)
