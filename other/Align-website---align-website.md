# Deploy Align website on Railway

Deploy and Host Align website with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/align-website)

## About

**What is Align website?**  
Align is the public site for the ALIGN initiative. It’s a Next.js app: marketing pages, team and publications, plus password-protected **training** and a separate **admin** area to edit copy and images. Content lives on disk under **`DATA_DIR`**, not in the repo, so deploys don’t bake in your live text.

You’re basically running a normal Next.js app: install deps, **`next build`**, **`next start`**, and set env vars on the host. The extra piece is **storage**: Align reads and writes JSON and team images under **`DATA_DIR`**, so production needs a **writable folder that survives restarts** (e.g. a Railway volume mounted at something like `/data`, with **`DATA_DIR`** pointing at that same path). Set the **admin** and **training** passwords and **cookie secrets** in the platform’s secrets UI—no need to commit them. Back up that data separately; it isn’t in git.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| align-website | [hridyanshdugar/align-website](https://github.com/hridyanshdugar/align-website) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATA_DIR` | /data |
| `ADMIN_COOKIE_SECRET` | (secret) |
| `ADMIN_PAGE_PASSWORD` | (secret) |
| `TRAINING_COOKIE_SECRET` | (secret) |
| `TRAINING_PAGE_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/align-website)
