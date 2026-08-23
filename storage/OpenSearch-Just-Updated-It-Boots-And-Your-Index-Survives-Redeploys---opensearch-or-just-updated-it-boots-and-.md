# Deploy OpenSearch | (Just Updated) It Boots, And Your Index Survives Redeploys on Railway

Single-node OpenSearch that boots, keeps its index, and needs a password

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opensearch-or-just-updated-it-boots-and-)

## About

OpenSearch is the Apache-2.0 search and analytics engine forked from Elasticsearch 7.10 — a
distributed index for full-text search, log analytics, vector search and dashboards, with the
same REST API most Elasticsearch clients already speak.

This template runs a single node with its index on a Railway volume and its API behind HTTP
Basic authentication, generated fresh per deploy.

OpenSearch does not run on Railway out of the box, and the fixes are not obvious:

- **Railway mounts volumes owned by root, while OpenSearch runs as an unprivileged user.** An
  unmodified image dies during startup with `AccessDeniedException` on its own data directory,
  before it ever serves a request. This template's entrypoint takes ownership of the volume as
  root and then hands the process to the `opensearch` user, which is required — OpenSearch
  refuses to run as root.
- **Railway terminates TLS at its edge and speaks plain HTTP to your container.** OpenSearch's
  security plugin defaults to HTTPS on the HTTP layer, so the edge cannot reach it. Here the
  plugin's transport encryption stays on and its HTTP-layer TLS is off, which is the shape
  Railway expects — authentication is untouched.
- **A search index on a public URL must not be anonymous.** The admin password is generated per
  deploy as a Railway secret, and the container refuses to start if it is ever unset rather than
  coming up as an open cluster.
- **Production bootstrap checks need privileges Railway does not grant.** `discovery.type` is set
  to `single-node`, which skips them, so no `memlock` or `nofile` ulimit changes and no
  `vm.max_map_count` sysctl are required.

The healthcheck points at `/_plugins/_security/health`, the one endpoint the security plugin
answers without credentials. Every other path returns `401 Unauthorized` to an anonymous caller.

**Memory:** the default heap is `-Xms512m -Xmx512m`, measured stable at roughly **900 MiB**
resident, so it fits Trial's 1 GB with little to spare and does not fit Free's 0.5 GB. Raise
`OPENSEARCH_JAVA_OPTS` and the plan together for real indexing volume — 2 GB is a comfortable
starting point.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| opensearch | `ghcr.io/bon5co/opensearch-railway@sha256:37c828b0f49a76fcf880928b417fdb7661562ad67eeef700684fc0ec76d41820` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9200 | Port OpenSearch listens on. Leave at 9200. |
| `OPENSEARCH_JAVA_OPTS` | -Xms512m -Xmx512m | JVM heap. 512m keeps the container near 900 MiB so it fits a 1 GB plan; raise it with the plan for real indexing volume. |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | (secret) | Password for the 'admin' user. Must contain upper, lower, digit and a special character; the container refuses to start without it. |

## Configuration

- **Healthcheck:** `/_plugins/_security/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/opensearch/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/opensearch-or-just-updated-it-boots-and-)
