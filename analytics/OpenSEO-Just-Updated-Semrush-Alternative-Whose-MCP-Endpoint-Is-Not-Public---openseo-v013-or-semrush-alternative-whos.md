# Deploy OpenSEO | (Just Updated) Semrush Alternative Whose MCP Endpoint Is Not Public on Railway

Semrush alternative whose MCP endpoint is not exposed to the public

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openseo-v013-or-semrush-alternative-whos)

## About

OpenSEO is an open-source alternative to Semrush and Ahrefs: keyword research, rank tracking,
site audits, backlink analysis and SERP data on your own infrastructure, paying DataForSEO
per call instead of a flat subscription. It also ships an MCP server, so Claude, Cursor or
Codex can run the same research tools directly.

This template deploys it as **one service on a volume**, with a gate in front of the whole
surface — including the MCP endpoint, which OpenSEO's Docker mode authorizes for nobody.

**The MCP endpoint is the part that gets left open.** Docker self-hosting runs
`AUTH_MODE=local_noauth`: OpenSEO has no login of its own and treats every caller as the
admin. That is fine on a laptop and is exactly what upstream documents. On a public URL it
means anyone who knows the hostname can call `POST /mcp` and get 24 research tools bound to
your workspace — tools that spend **your** paid DataForSEO credits and can read and write your
projects. Putting a password page in front of the browser UI does not close it: the other
Railway listing that does gate the UI deliberately forwards `/mcp` unauthenticated, on the
assumption that MCP clients authorize against OpenSEO. In this mode there is nothing to
authorize against — reproduced anonymously through that exact gateway: `GET /` → 401,
`POST /mcp whoami` → 200 as `admin@localhost`.

This template gates all of it in a single container: the UI behind a password, `/mcp` behind a
bearer token that an agent can actually send, and only `/api/health` left open because
Railway's healthcheck is unauthenticated. Deployed with an empty password the container
refuses to start rather than publishing an open admin console.

**It also boots in seconds instead of minutes.** The stock self-host image runs the full
~7,400-module build at *container start* and keeps the output in the container filesystem, not
on the volume — so on Railway, where every deploy and restart is a fresh container, that build
runs every single time. Measured on identical hardware and env: 105 s to healthy and 3.16 GiB
peak for the stock image, **8 s and 0.63 GiB** here, because the build is baked into the image
along with the fingerprint upstream's entrypoint looks for. Change `AUTH_MODE` or any `VITE_*`
value and it still rebuilds correctly at boot.

**Everything that should persist, persists.** The volume mounts at `/app/.wrangler`, which is
where OpenSEO keeps its D1, KV and R2 state: projects, saved keywords, rank-tracking history
and the local admin workspace. Verified across a redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openseo | `ghcr.io/bon5co/openseo-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPENSEO_MCP_TOKEN` | (secret) |
| `BETTER_AUTH_SECRET` | (secret) |
| `OPENSEO_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.wrangler`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openseo-v013-or-semrush-alternative-whos)
