# Deploy RepoIntel on Railway

Turn any GitHub repo into a searchable    intelligence layer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/repointel-1)

## About

RepoIntel is a self-hosted platform that indexes documents from any GitHub repository, automatically extracts entities like decisions, gaps, dependencies, and stakeholders, detects relationships between them, and tracks changes over time. Surfaces everything through a searchable dashboard with risk tracking and RAG-powered chat. Deploys as a single container with Ollama, ChromaDB, and SQLite included.

Deploying RepoIntel requires a GitHub personal access token with repo scope and an admin password for the dashboard. Railway provisions a single container that bundles Next.js, Ollama, ChromaDB, and SQLite with no external databases to configure. On first boot, a startup script launches each service and the app becomes available on port 3000. Point it at any GitHub repository and trigger indexing from the dashboard. Data persists on a Railway volume so redeployments preserve your index. Optionally add a Mistral API key for faster entity extraction or a GitHub webhook secret for automatic re-indexing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RepoIntel | [boomerfreak1/RepoIntel](https://github.com/boomerfreak1/RepoIntel) | Worker |

**Category:** AI/ML · **Languages:** TypeScript, Shell, Dockerfile, JavaScript, SCSS

[View on Railway →](https://railway.com/deploy/repointel-1)
