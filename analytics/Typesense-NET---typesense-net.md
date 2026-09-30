# Deploy Typesense .NET on Railway

community .NET client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-net)

## About

Typesense .NET is the community NuGet client your ASP.NET Core or worker service uses to talk to a Typesense node on port 8108. What you deploy on Railway is the engine itself — the pinned `typesense/typesense:30.2` image with a volume on `/data` and a real API key. Once that service is healthy, C# indexes and searches over HTTP without raw REST boilerplate. Host the node carefully; the client is the easy half. NuGet plus a healthy `/health` endpoint is most of the integration.

The first time I pointed an ASP.NET Core app at Typesense, latency dropped so hard users thought we put a CDN in front of search. That’s the pitch: an in-memory, typo-tolerant engine answering in milliseconds. Typesense .NET wraps the REST API in idiomatic C#. On Railway you run one container, attach a volume, set `TYPESENSE_API_KEY`, and point the client at the internal hostname.

Pin `typesense/typesense:30.2` — `latest` has broken snapshot compatibility before. Start with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. CORS matters for Blazor WebAssembly or InstantSearch.js; a pure server-side .NET backend on Railway’s private network doesn’t need it. Keep the API key in Railway encrypted variables, never in committed `appsettings.json`.

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

[View on Railway →](https://railway.com/deploy/typesense-net)
