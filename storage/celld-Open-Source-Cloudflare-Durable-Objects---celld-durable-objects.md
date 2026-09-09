# Deploy celld | Open Source Cloudflare Durable Objects on Railway

Self-hosted Cloudflare Durable Objects: two-node fleet on your bucket

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celld-durable-objects)

## About

celld is Deno's open-source daemon for running Cloudflare Workers and Durable Objects on infrastructure you own. Every object is a cell: a named server with its own SQLite database, durable in object storage that belongs to you, with no control plane and no consensus service to operate.

This template deploys a **two-node celld fleet** on the newest stable release, pinned to `ghcr.io/denoland/celld:v0.4.1` — the upstream image, not a fork.

A Railway object storage bucket is provisioned as part of the deploy and holds the fleet's durable state: the deployments, the SQLite replicas, the ownership records and the peer secret. It is verified to satisfy celld's storage contract — `celld diagnose` reports `bucket conditional write: create, reject-create, update, reject-stale` against it — which is the requirement that rules out Backblaze B2, Hetzner and DigitalOcean Spaces.

The second node is not decoration. celld acknowledges a write once a peer holds it on disk (`CELLD_DURABILITY=fleet`, the default); a single node has nobody to send to, so **every acknowledged write waits for a full round trip to object storage**, which upstream describes as "much slower". On this template a write is confirmed by the peer in a measured 2–6 ms over Railway's private network. Both nodes carry a volume for their local SQLite and replication log, so a restart does not force every cell to restore from the bucket.

The public node takes the domain and serves everything: a request for a cell the peer owns is routed over celld's versioned peer tunnel, so one domain covers the whole fleet and there is no load balancer to configure. The peer's listener stays private, which matters — celld's operator API is unauthenticated by design and must never face the internet.

A fleet with no application is not idle, it is down: each node exits with `read s3://…/deploy/current.json: no such key` and restarts. So this template ships a one-shot job that deploys an asset-only welcome page on first boot. The fleet comes up green, the URL serves a real page, and that page tells you how to deploy your own Worker.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| celld-peer | `ghcr.io/denoland/celld:v0.4.1` | Database |
| celld | `ghcr.io/denoland/celld:v0.4.1` | Web service |
| welcome-seed | `ghcr.io/denoland/celld:v0.4.1` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AWS_REGION` | celld-peer | - | Storage region of the fleet bucket. |
| `CELLD_WATCH` | celld-peer | /var/lib/celld | Local working directory for the live SQLite databases and the replication log. It sits on the attached volume, so a restart does not force every cell to restore from the bucket. |
| `S3_ENDPOINT` | celld-peer | - | S3 endpoint of the fleet bucket. |
| `CELLD_BUCKET` | celld-peer | - | The fleet bucket. It holds the deployments, the SQLite replicas, the ownership records and the peer secret — every node in the fleet must point at the same one. |
| `CELLD_ADVERTISE` | celld-peer | - | The address other nodes use to reach this one. Must resolve to the internal listener, and must stay on the private network. |
| `AWS_ACCESS_KEY_ID` | celld-peer | - | Bucket credentials. They give full control of the fleet — keep them safe. |
| `CELLD_INTERNAL_ADDR` | celld-peer | [::]:8081 | Peer and operator listener. The IPv6 wildcard is required: Railway's private network is IPv6-only, so 0.0.0.0 would make this node unreachable at its own advertised address. Never expose this port publicly — the operator API is unauthenticated. |
| `AWS_SECRET_ACCESS_KEY` | celld-peer | (secret) | Bucket credentials. They give full control of the fleet — keep them safe. |
| `PORT` | celld | 8080 | Railway routes public traffic and healthchecks by this port. celld does not read it, so it has to match CELLD_ADDR. |
| `AWS_REGION` | celld | - | Storage region of the fleet bucket. |
| `CELLD_ADDR` | celld | [::]:8080 | Public Worker listener. The IPv6 wildcard stays dual-stack in Rust, so it answers both the public edge and Railway's IPv4 healthcheck. |
| `CELLD_WATCH` | celld | /var/lib/celld | Local working directory for the live SQLite databases and the replication log. It sits on the attached volume, so a restart does not force every cell to restore from the bucket. |
| `S3_ENDPOINT` | celld | - | S3 endpoint of the fleet bucket. |
| `CELLD_BUCKET` | celld | - | The fleet bucket. It holds the deployments, the SQLite replicas, the ownership records and the peer secret — every node in the fleet must point at the same one. |
| `CELLD_ADVERTISE` | celld | - | The address other nodes use to reach this one. Must resolve to the internal listener, and must stay on the private network. |
| `AWS_ACCESS_KEY_ID` | celld | - | Bucket credentials. They give full control of the fleet — keep them safe. |
| `CELLD_INTERNAL_ADDR` | celld | [::]:8081 | Peer and operator listener. The IPv6 wildcard is required: Railway's private network is IPv6-only, so 0.0.0.0 would make this node unreachable at its own advertised address. Never expose this port publicly — the operator API is unauthenticated. |
| `AWS_SECRET_ACCESS_KEY` | celld | (secret) | Bucket credentials. They give full control of the fleet — keep them safe. |
| `CELLD_TRUST_FORWARDED_HEADERS` | celld | 1 | Let Railway's edge set the scheme and host, so request.url inside a Worker is the real https://<your-domain>/… instead of http://[::]:8080/…. Correct here because the edge replaces both headers; set 0 if you put an untrusted proxy in front. |
| `AWS_REGION` | welcome-seed | - | Storage region of the fleet bucket. |
| `CELLD_WATCH` | welcome-seed | /var/lib/celld | Local working directory for the live SQLite databases and the replication log. It sits on the attached volume, so a restart does not force every cell to restore from the bucket. |
| `S3_ENDPOINT` | welcome-seed | - | S3 endpoint of the fleet bucket. |
| `CELLD_BUCKET` | welcome-seed | - | The fleet bucket. It holds the deployments, the SQLite replicas, the ownership records and the peer secret — every node in the fleet must point at the same one. |
| `WELCOME_HTML` | welcome-seed | <!doctype html>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>celld is running</title>
<style>
  :root { color-scheme: light dark; }
  body { margin: 0; padding: 3rem 1.5rem; font: 16px/1.6 ui-sans-serif, system-ui, sans-serif; }
  main { max-width: 42rem; margin: 0 auto; }
  code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.9em; }
  pre { padding: 0.9rem 1rem; border-radius: 8px; overflow-x: auto; background: rgba(127,127,127,0.14); }
  h1 { font-size: 1.6rem; margin-bottom: 0.25rem; }
  p.sub { margin-top: 0; opacity: 0.7; }
</style>
<main>
  <h1>celld is running</h1>
  <p class="sub">Self-hosted Durable Objects. This page is the placeholder application that the template deployed for you.</p>
  <h2>Deploy your own Worker</h2>
  <p>Install the CLI, then point it at this fleet's bucket. The storage variables are on the <code>celld</code> service in your Railway project.</p>
  <pre><code>curl -fsSL https://celld.dev/install.sh | sh

export CELLD_BUCKET=...        # s3://&lt;name&gt;, from the celld service
export S3_ENDPOINT=...
export AWS_REGION=...
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

git clone https://github.com/denoland/celld
celld deploy celld/examples/counter</code></pre>
  <p>Nodes adopt the new deployment within 30 seconds, without restarting. Set <code>SEED_WELCOME_APP=0</code> on the <code>welcome-seed</code> service so a redeploy of it never replaces your application.</p>
  <p><a href="https://celld.dev/docs">Documentation</a></p>
</main>
 | The placeholder landing page. Edit it freely — it is replaced the moment you deploy your own Worker. |
| `WRANGLER_JSON` | welcome-seed | {
  "name": "celld-welcome",
  "compatibility_date": "2026-08-01",
  "assets": {
    "directory": "./public"
  }
} | Wrangler configuration of the placeholder application. Asset-only, so it needs no esbuild. |
| `SEED_WELCOME_APP` | welcome-seed | 1 | Deploy the placeholder welcome application on first boot, so the fleet comes up serving a real page instead of crash-looping on an empty bucket. Set this to 0 once you deploy your own Worker — `celld deploy` replaces the fleet's single deployment pointer, so re-running this job would otherwise overwrite your application. |
| `AWS_ACCESS_KEY_ID` | welcome-seed | - | Bucket credentials. They give full control of the fleet — keep them safe. |
| `CELLD_INTERNAL_ADDR` | welcome-seed | [::]:8081 | Peer and operator listener. The IPv6 wildcard is required: Railway's private network is IPv6-only, so 0.0.0.0 would make this node unreachable at its own advertised address. Never expose this port publicly — the operator API is unauthenticated. |
| `AWS_SECRET_ACCESS_KEY` | welcome-seed | (secret) | Bucket credentials. They give full control of the fleet — keep them safe. |

## Configuration

- **Volume:** `/var/lib/celld`
- **Healthcheck:** `/.well-known/celld/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'if [ "$SEED_WELCOME_APP" != "1" ]; then echo "SEED_WELCOME_APP is not 1 - leaving the fleet deployment untouched"; exit 0; fi; mkdir -p /tmp/welcome/public; printf "%s" "$WRANGLER_JSON" > /tmp/welcome/wrangler.jsonc; printf "%s" "$WELCOME_HTML" > /tmp/welcome/public/index.html; exec /usr/local/bin/celld deploy /tmp/welcome'`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/celld-durable-objects)
