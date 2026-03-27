# Deploy repo2txt on Railway

An open-source tool to convert a GitHub repo into a structured text file.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/repo2txt)

## About

repo2txt is an open-source, browser-based tool that converts a GitHub repository's contents into a single structured text file — making it easy to feed an entire codebase into an LLM like ChatGPT or Claude. It runs entirely client-side with no backend or database required.

repo2txt is a static Vite application — all processing happens in the browser via the GitHub API. Hosting your own instance gives you a permanent, private URL with no dependency on the public deployment, and lets you pre-configure a GitHub personal access token to avoid the 60 req/hour anonymous API rate limit.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| repo2txt | [alphasecio/repo2txt](https://github.com/alphasecio/repo2txt) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, HTML, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/repo2txt)
