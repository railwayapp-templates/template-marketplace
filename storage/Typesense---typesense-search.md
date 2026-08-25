# Deploy Typesense on Railway

Search engine that powers fast, typo-tolerant search boxes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-search)

## About

Typesense is an open-source, typo-tolerant search engine built for instant search-as-you-type experiences. It keeps its index in memory and answers queries over a plain REST/JSON API, so a search box backed by Typesense returns results in single-digit milliseconds without the weight of an Elasticsearch cluster. Teams use it for storefront product search, documentation search, in-app search over records, and — since it stores vectors too — semantic and hybrid search. It is the open-source answer to Algolia, with the same ergonomics and no per-search billing.

Deploy Typesense on Railway and you get two services wired together: the `typesense` search server, holding its index on a persistent volume at `/data` and reachable over HTTPS with an API key, and `typesense-dashboard`, a browser admin interface for creating collections, importing documents, running searches and minting scoped keys. The dashboard is a static single-page app that talks to the server from your browser, which is why cross-origin requests are enabled. Both services come up with working defaults, so you can self-host Typesense and be indexing minutes after the deploy finishes.

![Diagram of the Typesense and dashboard services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787424278/typesense-architecture.png)

Typesense is a single C++ binary that loads collections into RAM and persists them to an on-disk store, which is what makes its latency predictable: no JVM to tune, no shard planning, no query DSL. You define a schema, POST JSON documents, and search with query parameters. Self-host it when search is core to your product and you would rather own the data and the cost curve than pay per search.

- Typo tolerance, prefix search and configurable ranking by default
- Faceting, filtering, grouping and sorting in one query
- Vector and hybrid search, so semantic results sit beside keyword results
- Synonyms, curated pins, stopwords and stemming for editorial control
- Scoped API keys, including keys carrying a filter for multi-tenant search
- Clients for JavaScript, Python, Ruby, PHP, Go and Java, plus InstantSearch.js

The Railway architecture is deliberately small. The `typesense` service is the entire data layer — no database, cache or object storage, because the volume at `/data` holds the index and write-ahead log. The `typesense-dashboard` service holds no state; it serves static files behind Caddy, and its requests to the search server all happen in your browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense | `typesense/typesense:30.2` | Web service |
| typesense-dashboard | `ghcr.io/bfritscher/typesense-dashboard:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | typesense | 8108 | Port Railway health-checks |
| `TYPESENSE_API_KEY` | typesense | (secret) | Bootstrap admin API key |
| `TYPESENSE_API_PORT` | typesense | 8108 | Search API listening port |
| `TYPESENSE_DATA_DIR` | typesense | /data | Index location on the volume |
| `TYPESENSE_ENABLE_CORS` | typesense | true | Allow browser clients |
| `PORT` | typesense-dashboard | 8080 | Static file server port |
| `TYPESENSE_HOST` | typesense-dashboard | - | Search server the UI targets |

## Configuration

- **Start command:** `/bin/sh -c 'C=4; if [ -r /sys/fs/cgroup/cpu.max ]; then read Q P < /sys/fs/cgroup/cpu.max; if [ "$Q" != "max" ] && [ -n "$P" ]; then C=$(( (Q + P - 1) / P )); fi; fi; if [ "$C" -lt 1 ]; then C=1; fi; if [ -z "$TYPESENSE_THREAD_POOL_SIZE" ]; then TYPESENSE_THREAD_POOL_SIZE=$((C * 8)); fi; if [ -z "$TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD" ]; then TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD=$((C * 4)); fi; export TYPESENSE_THREAD_POOL_SIZE TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD; echo "[railway] cgroup cpus=$C thread-pool=$TYPESENSE_THREAD_POOL_SIZE parallel-load=$TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD"; exec /opt/typesense-server'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c 'printf "{\"node\":{\"host\":\"%s\",\"port\":\"443\",\"protocol\":\"https\",\"path\":\"\",\"tls\":true}}\n" "$TYPESENSE_HOST" > /srv/config.json; if [ -n "$TYPESENSE_HOST" ]; then P=0; for f in /srv/assets/node-*.js; do if grep -q "host:\`localhost\`,port:8108,protocol:\`http\`" "$f" 2>/dev/null; then sed -i "s|host:\`localhost\`,port:8108,protocol:\`http\`|host:\`$TYPESENSE_HOST\`,port:443,protocol:\`https\`|g" "$f"; P=1; fi; done; if [ "$P" = 1 ]; then echo "[railway] login form defaults patched to https://$TYPESENSE_HOST"; else echo "[railway] default node literal not found - enter host $TYPESENSE_HOST port 443 protocol https at the login screen"; fi; fi; printf "{\n\tservers {\n\t\ttrusted_proxies static 100.64.0.0/10 fd00::/8\n\t}\n}\n:%s {\n\troot * /srv\n\tencode gzip\n\theader {\n\t\tX-Frame-Options \"SAMEORIGIN\"\n\t\tX-Content-Type-Options \"nosniff\"\n\t\tReferrer-Policy \"strict-origin-when-cross-origin\"\n\t}\n\ttry_files {path} /index.html\n\tfile_server\n}\n" "${PORT:-8080}" > /etc/caddy/Caddyfile; caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile; exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/typesense-search)
