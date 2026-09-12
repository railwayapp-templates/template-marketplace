# Deploy 🪰 Fruit Fly Brain on Railway

Deploy and host your own 🪰 Fruit Fly Brain on Railway!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fruit-fly-brain)

## About

🪰 Fruit Fly Brain is a live spiking simulation of an entire fruit-fly connectome — 139,255 neurons and ~2.7M synapses from FlyWire FAFB v783 — that deploys a real multi-service app. Pending infrastructure appears as *food* on a canvas; when the fly smells it, walks over and eats it, a Railway GraphQL mutation fires and a service is born beside it.

It deploys as one Node 22 container built from the repo's `Dockerfile` — zero npm dependencies, with the 12.4 MB connectome baked into the image. The server runs the single authoritative simulation in a `worker_thread` and fans state out over SSE, so browsers are pure renderers and hundreds of spectators cost you one process and zero extra API calls. `railway.json` wires up a `/api/health` healthcheck and on-failure restarts for you. Setup is two variables: a project-scoped `RAILWAY_TOKEN`, minted from the project after the first deploy, and an `ADMIN_PASSWORD` gating the public URL. You can skip the token entirely and run the full demo with `DRY_RUN=1`. Mount a volume at `/data` to keep best times across redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 🪰 Fruit Fly | [kadumedim/fly-brain-railway](https://github.com/kadumedim/fly-brain-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTO_LOOP` | 1 | 0 to stop at first cycle, 1 to loop forever 🪰 |
| `WEB_IMAGE` | ghcr.io/kadumedim/fly-web:latest | Web app image 🪰 |
| `ADMIN_PASSWORD` | (secret) | For admin commands in dashboard 🪰 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/fruit-fly-brain)
