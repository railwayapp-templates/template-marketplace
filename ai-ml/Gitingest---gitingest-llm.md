# Deploy Gitingest on Railway

Turns a Git repository into one text file you can paste into an LLM

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gitingest-llm)

## About

Gitingest turns any Git repository into a single, prompt-friendly text file. Paste a repository URL and it clones the code, walks the tree, and returns one digest: a directory listing plus the contents of every file that matters, with a token estimate so you know whether it fits your model's context window. Developers use it to hand a codebase to Claude, ChatGPT or Gemini in one paste, to build retrieval corpora, and to read unfamiliar projects without cloning them. Self-host Gitingest when you want that on repositories you would rather not send through someone else's server, or when you want an API endpoint your own tools can call without a shared rate limit.

Deploy Gitingest on Railway and you get the whole product in one service. The template runs the official `ghcr.io/coderamp-labs/gitingest` image as a service named **gitingest**, on a public HTTPS domain, health-checked at `/health`. A request arrives at Railway's edge, the FastAPI app clones the repository into container-local scratch space, builds the digest, deletes the clone, and returns the result — inline in the browser and as a downloadable `.txt`. No database, queue or object storage to configure: every digest is derived from a commit and rebuilt in seconds.

![Diagram of the single Gitingest service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788821687/gitingest-architecture.png)

Gitingest is an open-source (MIT) Python project from Coderamp Labs that ships three ways: a web app, a JSON API, and a `gitingest` CLI and library on PyPI. The problem it solves is mundane but constant — models take text, and a repository is a tree whose structure matters. Copying files by hand loses the layout; uploading an archive wastes context on lockfiles and vendored dependencies. Gitingest applies default ignore rules, respects your patterns and per-file size cap, and emits one deterministic document with the tree at the top.

Key features:

- One-paste digests from GitHub, GitLab, Bitbucket, Gitea, Codeberg and self-hosted Git hosts
- Include/exclude glob patterns and a maximum file-size slider
- Token estimate and file count before you spend model context
- URL-hack ingestion: replace `hub` with your host in any GitHub URL
- JSON API with an OpenAPI schema, plus a CLI and Python package
- Private repositories via a personal access token supplied per request

This deployment is one stateless FastAPI service behind Railway's HTTPS edge. Digests are written to container-local storage and served from an unguessable UUID path, so links resolve for the life of the deployment and are regenerated on demand afterwards.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gitingest | `ghcr.io/coderamp-labs/gitingest:v0.3.1` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP port the app listens on |
| `ALLOWED_HOSTS` | * | Host allow-list; image default rejects Railway domains |
| `FORWARDED_ALLOW_IPS` | * | Trust proxy headers for real client IP |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/gitingest-llm)
