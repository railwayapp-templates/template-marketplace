# Deploy Manticore Search on Railway

Manticore Search 29.9 full-text and vector search with built-in auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/manticore-1)

## About

Manticore Search is a fast open-source search database for full-text, vector and hybrid search. It speaks SQL over the MySQL protocol and a JSON HTTP API with an Elasticsearch-compatible layer, supports real-time tables, faceting, fuzzy search and auto-embeddings, and is a lighter alternative to Elasticsearch and OpenSearch.

This template deploys Manticore Search 29.9.0 with its data on a Railway volume and the built-in authentication enabled. On first start, the service creates an administrator from the generated password, and every HTTP or SQL request then needs HTTP basic auth or a bearer token. The HTTP JSON API is on the public HTTPS domain. The MySQL protocol stays on the private network, because it sends passwords without TLS. There is no unauthenticated health endpoint, so Railway relies on the restart policy. The Hobby plan fits small and medium indexes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| manticore | `manticoresearch/manticore:29.9.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9308 |
| `searchd_auth` | 1 |
| `MANTICORE_ADMIN_USER` | (secret) |
| `MANTICORE_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `bash -c 'docker-entrypoint.sh searchd -c /etc/manticoresearch/manticore.conf.sh --nodetach & pid=$!; trap "kill -TERM $pid" TERM INT; for i in $(seq 90); do [ -s /run/manticore/searchd.pid ] && break; sleep 1; done; sleep 2; if ! grep -qs "$MANTICORE_ADMIN_USER" /var/lib/manticore/auth.json; then printf "%s\n%s\n%s\n" "$MANTICORE_ADMIN_USER" "$MANTICORE_ADMIN_PASSWORD" "$MANTICORE_ADMIN_PASSWORD" | gosu manticore searchd -c /etc/manticoresearch/manticore.conf.sh --auth-non-interactive && echo "created admin user $MANTICORE_ADMIN_USER"; fi; wait $pid'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/manticore`

**Category:** Other

[View on Railway →](https://railway.com/deploy/manticore-1)
