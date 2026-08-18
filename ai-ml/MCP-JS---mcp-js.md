# Deploy MCP JS on Railway

mcp js gives a snapshottable javascript repl connected to your tools for ai

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mcp-js)

## About

mcp js is a sandboxed code execution runtime for javascript with heap and filesystem snapshotting. connect any javascript tools, or multiplex and compose mcp tool calls together in a node js and browser compatible runtime

Hosting MCP JS means running a single Rust binary that serves the MCP Streamable HTTP endpoint at `/mcp` and a REST sidecar at `/api/exec`. This template builds the server from source with Docker, attaches a volume at `/data` for heap snapshots, the persistent `/work` filesystem, and the session database, and health-checks `/api/version`. Railway injects `PORT` automatically; host-header protection is scoped to the service's Railway domains. The template deploys sandboxed by default: scripts run in a V8 isolate with no network, filesystem, or subprocess access, and a kernel-enforced (Landlock) OS sandbox confines the whole process beneath that. Optional JWT auth is one `JWKS_URL` variable away.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mcp-js-p1ze | [r33drichards/mcp-js](https://github.com/r33drichards/mcp-js) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `MCP_V8_FS_DIR` | /data/fs | Directory where /work filesystem snapshots are written. Keep it on the volume so files survive redeploys. |
| `MCP_V8_FS_STORE` | dir | Storage backend for the persistent /work filesystem exposed to scripts. dir persists content-addressed snapshots to disk. |
| `MCP_V8_HEAP_DIR` | /data/heaps | Directory where V8 heap snapshots are written. Keep it on the volume so agent state survives redeploys. |
| `MCP_V8_HEAP_STORE` | dir | Storage backend for V8 heap snapshots. dir persists heaps to disk so agents keep state across calls (stateful mode). Remove the three heap/fs variables for a stateless, WASM-capable server. |
| `MCP_V8_ALLOWED_HOSTS` | - | Host-header allowlist for the /mcp endpoint (DNS-rebinding protection). Defaults to this service's Railway domains; append extra hostnames comma-separated if you attach a custom domain. |
| `MCP_V8_SESSION_DB_PATH` | /data/sessions | sled session db storage path |
| `MCP_V8_SANDBOX_MANIFEST` | {"version":"0.1.0","network":{"mode":"unrestricted"}} | kernel level sandbxing config |

**Category:** AI/ML · **Languages:** Rust, Nix, Shell, Python, TypeScript, JavaScript, Open Policy Agent, TLA, Dockerfile, CSS, Opa

[View on Railway →](https://railway.com/deploy/mcp-js)
