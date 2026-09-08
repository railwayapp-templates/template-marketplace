# Deploy OpenSEO on Railway

Open-source SEO platform for keyword research and site audits

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-seo)

## About

OpenSEO is an open-source SEO platform — keyword research, rank tracking, backlink and competitor analysis, site audits and AI-visibility tracking — built as an alternative to Semrush, Ahrefs and Ubersuggest. Instead of a per-seat subscription it runs on your own DataForSEO API key, so you pay the data vendor directly for the queries you make. It is MIT-licensed, ships first-class MCP support so agents like Claude Code and Codex can pull SEO data themselves, and is aimed at founders and small teams.

Self-host OpenSEO on Railway and this template gives you two services. `open-seo` is the application, built from upstream's self-host image with the client and worker bundle already compiled, so a container starts serving in seconds. `gateway` is a Caddy reverse proxy holding the only public domain and HTTP basic auth. That split matters: OpenSEO's Docker self-host mode has no authentication of its own, just a single injected admin user, and upstream's docs say to run it behind an auth-protected proxy. Requests hit `gateway`, the credential is checked, and the call is forwarded over the private network to `open-seo`, which has no public domain.

![Diagram of the OpenSEO app and Caddy gateway services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788805253/openseo-architecture.png)

Commercial SEO suites bundle data and interface into one agency-priced subscription. OpenSEO separates them: the interface is yours to run, the data comes from DataForSEO at wholesale rates, and your keyword lists and crawl results stay in your own database.

Key features:

- Keyword research with volume, difficulty and CPC, plus clustering and saved lists
- Rank tracking across domains, with position history
- Backlink and competitor analysis, and domain overviews
- Site audits: an in-app crawler that reads `robots.txt`, stays on the audited origin, and reports broken links, redirect chains, missing tags, thin content and indexability problems
- AI visibility: brand lookup and a prompt explorer
- Search Console and Analytics connections, an MCP server, and packaged SEO skills

The app is one Cloudflare Worker bundle running under workerd. Its database, key-value stores, object storage, durable objects and background workflows all write to a single directory, which is why the template mounts a volume rather than provisioning Postgres or Redis. Caddy is the only piece with a public address, and serves an unauthenticated `/healthz` so Railway can probe it without the credential.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | [gridalpha/openseo-railway](https://github.com/gridalpha/openseo-railway) | Web service |
| open-seo | [gridalpha/openseo-railway](https://github.com/gridalpha/openseo-railway) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | gateway | 8080 | Public HTTP port for the proxy |
| `GATEWAY_PASSWORD` | gateway | (secret) | Password you sign in with. This is the deployment's only credential. |
| `GATEWAY_USERNAME` | gateway | (secret) | Username you sign in with |
| `OPENSEO_UPSTREAM` | gateway | - | Private address of the OpenSEO app service |
| `PORT` | open-seo | 3001 | HTTP port the app serves on |
| `ALLOWED_HOST` | open-seo | .railway.app | Host allow-list; a leading dot covers subdomains. Set your own domain in the same form if you attach one. |
| `DATAFORSEO_API_KEY` | open-seo | (secret) | base64 of your DataForSEO login:password. Keyword, backlink, domain and rank data stay unavailable until it is set; site audits work without it. |
| `OPENROUTER_API_KEY` | open-seo | (secret) | Set this only if you want SAM, the in-app SEO agent. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/health`
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/open-seo)
