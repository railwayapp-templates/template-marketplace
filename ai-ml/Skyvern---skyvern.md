# Deploy Skyvern on Railway

AI agents that drive a real browser to fill forms and scrape sites.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/skyvern)

## About

Skyvern is an open-source AI agent that operates a real browser for you. Give it a plain-English goal and it navigates sites, fills forms, downloads files and extracts data, using an LLM plus computer vision instead of brittle XPath selectors that break whenever a page changes.

This template runs the four pieces Skyvern needs: a Postgres database, the API (which drives a headless Chromium under Xvfb), the React dashboard, and a small Caddy proxy that is the only service with a public domain. That single public origin is required rather than cosmetic: the dashboard mints its browser session through a same-origin request, so splitting the UI and API across two Railway domains breaks sign-in.

First boot is slow. The API image ships Playwright, Chromium and a full Tesseract language set, and it also runs database migrations and creates its organization before answering health checks, so allow several minutes. The dashboard waits for the API to mint its organization key and logs that it is waiting until it succeeds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| skyvern-ui | `public.ecr.aws/skyvern/skyvern-ui:v1.0.51` | Worker |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| proxy | `caddy:2-alpine` | Web service |
| skyvern | `public.ecr.aws/skyvern/skyvern:v1.0.51` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | skyvern-ui | 8080 | Port localServer.js binds and the healthcheck probes; both are 8080. |
| `VITE_ENVIRONMENT` | skyvern-ui | local | Deployment mode. Leave as local for self-hosting. |
| `VITE_API_BASE_URL` | skyvern-ui | - | Browser-facing API origin, routed through the proxy. |
| `VITE_WSS_BASE_URL` | skyvern-ui | - | Websocket origin for live browser streaming. |
| `SKYVERN_API_BASE_URL` | skyvern-ui | - | Private API address the dashboard itself calls to mint browser sessions. |
| `SKYVERN_CREDENTIAL_URL` | skyvern-ui | (secret) | Private URL polled at startup until the API has minted its org key. |
| `VITE_ENABLE_CODE_BLOCK` | skyvern-ui | true | Must match ENABLE_CODE_BLOCK on the skyvern service. |
| `VITE_ARTIFACT_API_BASE_URL` | skyvern-ui | - | Bare origin for artifacts; the app appends /artifact/... itself. |
| `VITE_BROWSER_STREAMING_MODE` | skyvern-ui | cdp | Must match BROWSER_STREAMING_MODE on the skyvern service. |
| `POSTGRES_DB` | postgres | skyvern | Database Skyvern migrates into. |
| `DATABASE_URL` | postgres | - | Standard connection string. Skyvern uses DATABASE_STRING instead. |
| `POSTGRES_USER` | postgres | (secret) | Postgres superuser name. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Postgres superuser password. Generated per deploy. |
| `PORT` | proxy | 8080 | Port Caddy listens on and the public domain targets. |
| `UI_HOST` | proxy | - | Private address backing every other route. |
| `API_HOST` | proxy | - | Private address backing the /api/* and /v1/* routes. |
| `CADDYFILE` | proxy | {
	admin off
	auto_https off
}

:{$PORT} {
	handle /proxy-healthz {
		respond 200
	}
	handle /api/* {
		reverse_proxy {$API_HOST}
	}
	handle /v1/* {
		reverse_proxy {$API_HOST}
	}
	handle /artifact/* {
		reverse_proxy {$ARTIFACT_HOST}
	}
	handle {
		reverse_proxy {$UI_HOST}
	}
}
 | Caddy routing config, written to disk at start so it can read the hosts below. |
| `ARTIFACT_HOST` | proxy | - | Private address backing the /artifact/* routes. |
| `ENV` | skyvern | local | Deployment mode. Leave as local for self-hosting. |
| `PORT` | skyvern | 8000 | Port the API binds and the healthcheck probes; the two must match. |
| `LLM_KEY` | skyvern | OPENAI_GPT5_5 | Model Skyvern plans and acts with, for example OPENAI_GPT5_5. |
| `SECRET_KEY` | skyvern | (secret) | Signs the organization API token. Generated per deploy. |
| `BROWSER_TYPE` | skyvern | chromium-headful | Headful Chromium under Xvfb, required for live browser streaming. |
| `ENABLE_OPENAI` | skyvern | true | Enables the OpenAI provider. Swap for another ENABLE_* to change provider. |
| `OPENAI_API_KEY` | skyvern | (secret) | Your OpenAI API key. Skyvern cannot run a task without an LLM key. |
| `DATABASE_STRING` | skyvern | - | Postgres URL using the postgresql+psycopg driver Skyvern requires. |
| `ENABLE_CODE_BLOCK` | skyvern | true | Enables code blocks in workflows. Must match the dashboard. |
| `CREDENTIAL_VAULT_TYPE` | skyvern | (secret) | Uses the built-in vault rather than Bitwarden or 1Password. |
| `BROWSER_STREAMING_MODE` | skyvern | cdp | How the live browser is streamed. Must match the dashboard. |
| `SKYVERN_CREDENTIALS_FILE` | skyvern | (secret) | Organization key file, kept on the volume so it survives redeploys. |
| `ENABLE_LOCAL_CREDENTIAL_VAULT` | skyvern | (secret) | Stores site credentials on the volume. |

## Configuration

- **Start command:** `sh -c 'cat > /tmp/skyvern-token.mjs <<"TOKEOF"
const res = await fetch(process.env.SKYVERN_CREDENTIAL_URL);
if (res.ok) process.stdout.write((await res.text()).trim());
TOKEOF
for i in $(seq 1 60); do
  KEY=$(node /tmp/skyvern-token.mjs 2>/dev/null || true)
  if [ -n "$KEY" ]; then
    export SKYVERN_API_KEY="$KEY"
    echo "picked up skyvern org API key"
    break
  fi
  echo "waiting for the skyvern API to mint its org key..."
  sleep 5
done
exec /bin/bash /app/entrypoint-skyvernui.sh'`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/proxy-healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'cat > /tmp/skyvern-aux.mjs <<"AUXEOF"

import { createServer } from "node:http";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, resolve } from "node:path";

// Exactly the three directories that compose shares with the UI container.
// Anything wider is a public read primitive: /data also holds the file
// .skyvern/credentials.toml (the permanent org API key), the local credential
// vault and saved browser sessions. No apostrophes below this line: the whole
// script ships as a single-quoted sh -c argument.
const ROOTS = ["/data/artifacts", "/data/videos", "/data/har"];
const CREDS = process.env.SKYVERN_CREDENTIALS_FILE || "/data/.skyvern/credentials.toml";
const TYPES = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml",
};

function safePath(raw) {
  if (!raw) return null;
  const abs = resolve(raw);
  return ROOTS.some((root) => abs.startsWith(root + "/")) ? abs : null;
}

createServer((req, res) => {
  let url;
  try {
    url = new URL(req.url, "http://localhost");
  } catch {
    res.writeHead(400);
    return res.end("bad request");
  }
  const path = safePath(url.searchParams.get("path"));
  if (!path || !existsSync(path)) {
    res.writeHead(404);
    return res.end("not found");
  }
  if (url.pathname === "/artifact/recording") {
    const size = statSync(path).size;
    const start = req.headers.range ? Number(req.headers.range.replace(/\D/g, "")) : 0;
    const end = Math.min(start + 1000000, size - 1);
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + size,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });
    return createReadStream(path, { start, end }).pipe(res);
  }
  if (url.pathname === "/artifact/image") {
    res.writeHead(200, { "Content-Type": TYPES[extname(path).toLowerCase()] || "application/octet-stream" });
    return createReadStream(path).pipe(res);
  }
  if (url.pathname === "/artifact/json") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(readFileSync(path));
  }
  if (url.pathname === "/artifact/text") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(readFileSync(path));
  }
  res.writeHead(404);
  res.end("not found");
}).listen(9090, "0.0.0.0");

createServer((req, res) => {
  let token = "";
  try {
    const found = readFileSync(CREDS, "utf8").match(/cred\s*=\s*"([^"]*)"/);
    if (found) token = found[1];
  } catch {}
  if (!token) {
    res.writeHead(503);
    return res.end("");
  }
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(token);
}).listen(9091, "0.0.0.0");

AUXEOF
node /tmp/skyvern-aux.mjs &
exec /bin/bash /app/entrypoint-skyvern.sh'`
- **Healthcheck:** `/api/v1/heartbeat`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/skyvern)
