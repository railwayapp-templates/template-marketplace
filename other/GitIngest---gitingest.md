# Deploy GitIngest on Railway

Turn any Git repository into a prompt-friendly text ingest for LLMs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitingest)

## About

Gitingest is a developer tool that turns any Git repository into a prompt-friendly text digest for Large Language Models (LLMs). It analyzes project structures, calculates token counts, and formats codebases for easy ingestion by AI systems, serving developers, prompt engineers, and AI application builders.
![Gitingest](https://raw.githubusercontent.com/coderamp-labs/gitingest/refs/heads/main/docs/frontpage.png)

Deploying Gitingest on Railway involves hosting a web application container running Python and FastAPI. Railway builds the runtime environment using the project's Dockerfile or pulls the official container image to manage application execution seamlessly.

Railway simplifies hosting by automatically handling HTTPS certificates, managing public domain routing, and exposing internal service networking. The application requires HTTP proxy routing to direct incoming web traffic to the application's internal listening port.

Because Gitingest processes repositories on demand, it runs as a stateless container that scales vertically or horizontally without mandatory database or persistent volume attachments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Gitingest | `ghcr.io/coderamp-labs/gitingest:main` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GITHUB_TOKEN` | (secret) | Get token here https://github.com/settings/personal-access-tokens |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/gitingest)
