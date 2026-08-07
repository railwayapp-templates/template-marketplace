# Deploy celld on Railway

Cloudflare Workers Durable Objects runtime, one SQLite DB per object

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celld)

## About

# celld on Railway

One-click deploy of [celld](https://celld.dev) — self-hosted, distributed
Durable Objects from the Deno team. celld runs Cloudflare Workers and Durable
Objects on machines you control. Each object is its own SQLite database,
replicated to an S3-compatible bucket; nodes coordinate through that bucket
alone, with no control plane and no consensus service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/celld)

## What one click gets you

- a **celld node** running the official `ghcr.io/denoland/celld:0.0.2` image
- a **Railway Bucket** (S3-compatible) created in your project — deployments,
  cell state, and fleet coordination all live there
- storage credentials wired service→bucket entirely with reference variables
  (`${{celld-cells.ACCESS_KEY_ID}}` etc.) — **zero prompts, zero secrets to
  paste, nothing to configure**
- a volume at `/var/lib/celld` for local cell state, a public domain, and a
  restart policy tuned for celld's boot behavior

```
internet ──► Railway edge (TLS) ──► celld node ──► celld-cells bucket
                                    (your service)   (source of truth)
```

## After deploying

The node **self-seeds**: on first boot against the fresh empty bucket it
auto-deploys a small welcome page, so the service URL shows
"hello from celld" within a couple of minutes of clicking deploy — no setup.

**Known Railway platform race (not a template bug):** Railway sometimes
creates the service before its bucket finishes provisioning, so the storage
variables bake in empty (`CELLD_BUCKET=s3://`). Railway's own example bucket
template has the same exposure; there is no ordering primitive in the
template format. When it happens, this template's bootstrap prints a
plain-English banner in the deploy logs:

> celld template: storage variables are EMPTY … NOTHING IS BROKEN — just
> click Redeploy on this service.

One click on **Redeploy** re-resolves the variables and the welcome page
appears. Verified end-to-end on real deploys (including via the actual
marketplace deploy button).

## Pushing your own app

celld loads applications from the bucket. Replace the welcome page whenever
you're ready:

From your machine (Worker code needs [esbuild](https://esbuild.github.io) on
`PATH`; asset-only projects don't; celld accepts `wrangler.jsonc` only, it
rejects `wrangler.toml`):

```sh
curl -fsSL https://celld.dev/install.sh | sh

# grab your bucket credentials (Railway CLI, linked to the new project)
eval "$(railway bucket credentials --bucket celld-cells)"
export CELLD_BUCKET="s3://$AWS_S3_BUCKET_NAME"   # adjust to the printed names

# try the official example
git clone https://github.com/denoland/celld
cd celld/examples/counter
celld deploy . --bucket "$CELLD_BUCKET" --endpoint "$AWS_ENDPOINT_URL" --region auto
```

The crash-looping node picks the deployment up on its next automatic restart
(within ~a minute). Open the service's Railway domain — your Worker is live.

**Redeploys:** as of celld 0.0.2, nodes load a deployment **at startup only**.
After pushing a new version, restart the Railway service to serve it.

Check fleet health any time:

```sh
celld diagnose --bucket "$CELLD_BUCKET" --endpoint "$AWS_ENDPOINT_URL" --region auto
```

## How the template is wired (for maintainers)

The template was generated programmatically from a verified live project
(`templateGenerate` via the public GraphQL API). Key decisions, all
empirically verified on Railway:

| piece | value | why |
|---|---|---|
| start command | `/usr/local/bin/celld --listen [::]:8080` | Railway execs the start command directly (no shell, entrypoint discarded) — full binary path required. `[::]` binds IPv6+IPv4 so the edge and private network both reach it |
| `CELLD_BUCKET` | `s3://${{celld-cells.BUCKET}}` | bucket reference — each deployer's copy points at their own bucket |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `S3_ENDPOINT` / `AWS_REGION` | `${{celld-cells.*}}` | same; REGION tracks whatever region the deployer's bucket lands in |
| `CELLD_ADVERTISE` | `${{RAILWAY_PRIVATE_DOMAIN}}:8080` | peers reach the node over the project-private network only |
| `CELLD_WATCH` | `/var/lib/celld/${{RAILWAY_ENVIRONMENT_NAME}}` | work dir on the volume; per-environment subdirs, and the embedded reference survives template generation (literal values get stripped to prompts) |
| restart policy | `ALWAYS` | a node against an empty bucket exits; ALWAYS turns that into "wait for first deploy". The default ON_FAILURE(10) gives up permanently |
| volume | `/var/lib/celld` | SQLite + replication scratch; state is recoverable from the bucket, volume makes restarts fast |

Template-generation gotchas learned the hard way:

- `templateGenerate` strips every **literal** variable value (anti-secret-leak)
  and keeps only values containing `${{…}}` references. Statics must live in
  the start command or be expressed as references.
- Railway's start command is exec'd raw: no shell, no env-var syntax, image
  entrypoint ignored. `/bin/sh -c "…"` works if you need shell features.
- `railway redeploy` re-runs the previous deployment's **config snapshot** —
  config/variable changes need a fresh deploy (`serviceInstanceDeployV2`),
  not a redeploy.

## Scaling to more nodes

Do **not** use Railway replicas — replicas share one private domain and one
volume; every celld node needs its own advertise address and work directory.
Duplicate the service in the same project instead (same variables — the
references resolve identically — plus its own volume). Each service gets its
own `RAILWAY_PRIVATE_DOMAIN`, so `CELLD_ADVERTISE` is automatically distinct;
nodes discover each other through leases in the bucket. No join step.

Under load, opt into pressure shedding per node, e.g.
`CELLD_MAX_RESIDENT_CELLS=1000` and `CELLD_RESIDENT_LOW_WATER=800`.

## Security notes

- **Bucket access = fleet-admin access.** The bucket holds deployments, all
  cell SQLite state, ownership records, and the fleet's peer-auth secret.
- celld's peer protocol doesn't terminate TLS; upstream says keep the peer
  port off the public internet. Here peers talk over Railway's private
  network, and the public domain (needed to serve your app) exposes the same
  port — peer requests on it are versioned, HMAC-authenticated,
  clock-bounded, and replay-protected with the fleet secret, so exposure is
  authenticated-only. For strict parity with upstream's advice, disable
  public networking and front the node with your own ingress in-project.
- Rotate storage credentials with
  `railway bucket credentials --bucket celld-cells --reset --yes` — reference
  variables pick the new ones up on the next deploy.

## Files in this directory

| file | purpose |
|---|---|
| `Dockerfile` + `railway.json` | repo-based fallback of the same service (image pin + config-as-code), kept for reference; the published template is image-sourced and needs no repo |
| `.env.example` | the variable set, documented |
| `check.sh` | self-check for these assets |

## Upgrading celld

New celld release → update the image tag on the template's service (and the
`Dockerfile` pin here). Releases are on
[GitHub](https://github.com/denoland/celld/releases), each with a build
attestation. The bucket format is the contract; nodes are replaceable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| celld | `ghcr.io/denoland/celld:0.0.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AWS_SECRET_ACCESS_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'C=/usr/local/bin/celld; if [ "$CELLD_BUCKET" = "s3://" ] || [ -z "$CELLD_BUCKET" ]; then echo; echo "celld template: storage variables came up EMPTY (a Railway bucket-provisioning race, not a bug in this template). FIX: open this service -> Variables tab -> re-save each storage variable (open it, click save), then Redeploy the service. Railway caches the empty value per-variable until each one is re-saved."; echo; sleep 45; exit 1; fi; $C --listen [::]:8080 2>&1 | tee /tmp/boot.log; if grep -q NoSuchKey /tmp/boot.log; then mkdir -p /w/public && printf "<h1>hello from celld</h1><p>Your node is live and this placeholder page was auto-deployed to your bucket. Replace it any time: install celld on your machine and run celld deploy against this project&#39;s bucket. Docs: celld.dev/docs</p>" > /w/public/index.html && printf "{\"name\":\"welcome\",\"compatibility_date\":\"2026-01-01\",\"assets\":{\"directory\":\"./public\"}}" > /w/wrangler.jsonc && $C deploy /w && exec $C --listen [::]:8080; fi; exit 1'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/celld`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/celld)
