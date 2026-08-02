# Deploy typesense [Updated Aug '26] on Railway

Typesense [Aug '26] (Open-Source Typo-Tolerant Search) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense)

## About

Typesense is the open-source search engine built from the ground up for speed and typo tolerance. Product search, docs search, in-app search, whatever you're building, Typesense handles it fast, forgives spelling mistakes by default, and doesn't bill you per query.

Algolia's Grow plan includes 10,000 search requests and 100,000 records a month, then charges $0.50 per 1,000 additional requests and $0.40 per 1,000 additional records beyond that. A growing catalog or a popular docs site blows past those numbers fast, and the bill scales with your success, not a flat cost you can plan around. Typesense self-hosted on Railway has no per-request or per-record fee at all.

The bigger reason teams move off Algolia isn't only pricing. It's the lock-in of a closed-source, fully-managed product: your index, query patterns, and increasingly your product's core UX depend on infrastructure you don't control or can't inspect. Self-hosting Typesense keeps the whole thing, index, ranking logic, data, on infrastructure you own.

It's worth being specific about what makes Typesense different from "just another Elasticsearch alternative." It's a single binary written in C++, with typo tolerance, faceting, and sub-50ms search built in as defaults, not features to configure after the fact. Elasticsearch can do most of the same things but usually needs real tuning, JVM memory config, analyzer setup, cluster coordination. Typesense ships fast and forgiving out of the box.

This also isn't a small or unproven project. Typesense has real production adoption across e-commerce, SaaS, and documentation search, with official client libraries for every major language and community ones covering the rest. That maturity matters for search specifically, a user-facing, latency-sensitive feature, not something you want rough edges in.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [shruti060701/typesense-railway](https://github.com/shruti060701/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Railway routes external traffic to. This is Caddy's port (the reverse proxy in front of Typesense), not Typesense's own internal port (8118). Must be an explicit Railway variable, this project has confirmed the hard way on multiple prior templates that a Dockerfile-only default alone doesn't reliably get picked up by Railway's edge routing. |
| `TYPESENSE_API_KEY` | (secret) | **Required for every request, confirmed via Typesense's own docs.** Never mark this optional or leave it blank on a service with a public domain |
| `TYPESENSE_DATA_DIR` | /data | Directory where search indexes are stored. Must match the Railway volume mount path exactly. Typesense reads this natively from the env var, no CLI flag needed. |
| `TYPESENSE_ENABLE_CORS` | false | Whether browser-side JavaScript can call the API directly. Off by default for a more secure starting point; a deployer building a browser-facing search UI without a backend proxy will need to turn this on. |
| `TYPESENSE_THREAD_POOL_SIZE` | 32 | *Critical, confirmed via a real deploy crash and a matching upstream GitHub issue (typesense/typesense#1278, filed by this reference template's own original author).** Without this, Typesense defaults to 8x the detected CPU core count for its thread pool, which crashes on Railway specifically since Railway's containers report the host's full core count rather than the container's real allocation, aborting with "Resource temporarily unavailable." Never remove this variable. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense)
