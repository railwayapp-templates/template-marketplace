# Deploy Typesense Java on Railway

community Java client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-java)

## About

You've got a Spring Boot checkout service hitting 300 searches a second during lunch rush, and the last thing you want is a SaaS bill spiking from a bot crawl. So you run Typesense on Railway and wire your Java app to it with the community client. First gotcha: port. Railway exposes your service on 443 with TLS, but the Java client defaults to `http://localhost:8108`. Point it at your Railway domain with `https` scheme and port 443, or every query hangs on a dead socket.

Second gotcha: key drift. You need the same `TYPESENSE_API_KEY` in the Typesense service and your Java app. Losing it after redeploy means reindexing from scratch. Keep it in a shared Railway variable or secret store, never in a commit. Once those two are sorted, the community Java client is a thin HTTP wrapper around Typesense's REST API that fits JVM apps cleanly.

Typesense is a single Go binary storing an inverted index in memory with periodic disk snapshots. The Java client isn't hosted separately; it lives inside your Spring Boot, Micronaut, or plain JVM app. What you host on Railway is the Typesense server container plus a volume for persistence. Your Java service talks to that container over the private Railway network.

Railway's template path typically means deploying the official `typesense/typesense:30.2` image with a volume at `/data`, then adding your Java app as a second service in the same project. Since both share a private network, the Java client uses the internal hostname and port 8108 without exposing Typesense publicly. That avoids CORS and keeps the API key out of browser traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typesense-railway | [Shinyduo/typesense-railway](https://github.com/Shinyduo/typesense-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | PORT |
| `TYPESENSE_URL` | - | TYPESENSE_URL |
| `TYPESENSE_API_KEY` | (secret) | TYPESENSE_API_KEY |
| `TYPESENSE_DATA_DIR` | - | TYPESENSE_DATA_DIR |
| `TYPESENSE_PUBLIC_URL` | - | TYPESENSE_PUBLIC_URL |
| `TYPESENSE_THREAD_POOL_SIZE` | 64 | TYPESENSE_THREAD_POOL_SIZE |
| `TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD` | 32 | TYPESENSE_NUM_COLLECTIONS_PARALLEL_LOAD |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/typesense-java)
