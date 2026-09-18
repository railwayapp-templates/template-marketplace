# Deploy YaCy on Railway

Search engine that crawls and indexes the sites you choose

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yacy)

## About

Self-host YaCy to run a search engine you own end to end. YaCy is a free, GPL-licensed search engine in Java that does the whole job itself: it crawls the sites you point it at, parses what it finds — HTML, PDF, Office documents, RSS — indexes the text into an embedded Apache Solr, and serves a search interface with ranking, faceting and snippets over it. There is no third-party search API, no key to rotate and no per-query bill.

Deploy YaCy on Railway and this template gives you a single `yacy` service holding the web interface, the crawler and the Solr index, with a persistent volume at `/opt/yacy_search_server/DATA` for the index, crawl queues and configuration. The public domain routes to YaCy's own port, while the health check watches a separate endpoint that queries Solr directly, so a container that runs but cannot answer queries is reported unhealthy.

![The YaCy service and its data volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789646705/yacy-architecture.webp)

Developed since 2003, YaCy is one of the few open-source projects shipping a complete search stack rather than one layer of it. Self-host it when you want search over content you choose, with no query quotas and no data leaving your infrastructure.

Key features:

- A polite crawler with `robots.txt` obedience, per-host delays, depth limits and scheduling
- Parsers for HTML, PDF, Office formats, archives and RSS, so a PDF becomes full text
- An embedded Apache Solr index with faceting, ranking profiles and a JSON/XML search API
- A search portal UI, plus OpenSearch and RSS output
- Blacklists, crawl profiles, an index browser and a re-crawl scheduler
- An optional peer-to-peer mode joining YaCy's public network

This template runs YaCy as a standalone portal: one service, one volume, no peer-to-peer exchange, which keeps the index yours and its size predictable. Jetty, the crawler, the parsers and Solr all live in one container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| yacy | [gridalpha/yacy-railway](https://github.com/gridalpha/yacy-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Health-check port serving /healthz |
| `YACY_HTTP_PORT` | 8090 | Port YaCy serves on; public domain target |
| `YACY_ADMIN_USER` | (secret) | Administrator login name |
| `YACY_ADMIN_REALM` | YaCy-AdminUI | HTTP Digest realm for the login |
| `YACY_NETWORK_UNIT` | defaults/yacy.network.webportal.unit | Standalone portal; freeworld unit joins P2P |
| `YACY_PUBLIC_SEARCH` | false | true publishes search to anonymous visitors |
| `YACY_ADMIN_PASSWORD` | (secret) | Administrator password, min 8 chars |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/yacy_search_server/DATA`

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/yacy)
