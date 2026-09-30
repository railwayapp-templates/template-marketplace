# Deploy Typesense Dart on Railway

community Dart client against Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/typesense-dart)

## About

The moment you add search to a Dart app, you hit the wall: pay per keystroke to a hosted API, or run your own engine. Typesense Dart is the community Dart client that talks to a self-hosted Typesense server — GPL-3.0 instant search on port 8108. On Railway you deploy the pinned `typesense/typesense:30.2` image with a volume on `/data` and a real API key. Flutter, CLI, or Dart backend then indexes and queries over HTTP. Host the node carefully; the client is the easy half.

Typesense keeps the index in RAM for low-latency typo-tolerant search. The Railway service is stateful: fast disk for snapshots, enough memory for your dataset. Pin `typesense/typesense:30.2` — skip `latest` unless you enjoy breaking changes at 2 a.m. Start with `--data-dir /data --api-key=$TYPESENSE_API_KEY --enable-cors`. CORS matters for Flutter web; mobile and server Dart don't need it, but leaving it on during UI iteration is fine.

Attach a volume at `/data`, set the API key in Railway secrets, expose 8108, and health-check `/health` (it returns `{"ok":true}`). Restarts keep the index if the volume survives. The self-hosted pattern is boring on purpose: one service, one volume, one secret, pinned image. No Redis sidecar, no Compose novel for a single-node search backend.

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

[View on Railway →](https://railway.com/deploy/typesense-dart)
