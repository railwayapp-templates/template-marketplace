# Deploy Supermemory on Railway

Self-hosted memory and context engine for AI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/supermemory)

## About

Supermemory is a memory and context engine for AI. It automatically extracts facts from conversations, builds user profiles, resolves contradictions, and auto-forgets stale information, then serves it back through hybrid RAG + memory search. This template runs the official self-hosted `supermemory-server` binary — one process, no external database, the full Memory API.

Supermemory doesn't publish a Docker image for self-hosting — it ships as a single statically-linked binary from GitHub Releases, installed by a shell script on your own machine. This template reproduces that install step inside a plain `debian:bookworm-slim` container: on first boot it downloads the pinned `supermemory-server` release, verifies its sha256 checksum, and runs it, caching the binary on the attached volume so every later restart or redeploy skips the download entirely. There's no separate database — the binary embeds its own encrypted graph engine and writes everything to that same volume, so your data, API key, and cached model survive redeploys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| supermemory | `debian:bookworm-slim` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 6767 | Port the supermemory-server binary listens on. Fixed - also used by the generated public domain and healthcheck. |
| `GROQ_API_KEY` | (secret) | Groq API key - alternative LLM provider, lowest latency of the four supported. |
| `GEMINI_API_KEY` | (secret) | Google AI Studio (Gemini) API key - alternative LLM provider. Also required (or GOOGLE_VERTEX_PROJECT_ID) for image, video, and high-fidelity PDF understanding beyond plain text, regardless of which provider you use for text. |
| `OPENAI_API_KEY` | (secret) | OpenAI API key used for memory extraction, summarization, and contextual chunking. This is the recommended default LLM provider - supermemory uses the first provider it finds in this order: OpenAI, Anthropic, Gemini, Groq. Required: the server refuses to boot with no LLM provider key configured (there's no TTY on Railway for the interactive setup wizard). If you'd rather use a different provider, put any placeholder value here and set ANTHROPIC_API_KEY, GEMINI_API_KEY, or GROQ_API_KEY for real after deploying. |
| `ANTHROPIC_API_KEY` | (secret) | Anthropic API key - alternative LLM provider to OPENAI_API_KEY. Only used if OPENAI_API_KEY isn't a valid key. |
| `SUPERMEMORY_DATA_DIR` | /data/supermemory | Directory (on the attached volume) where the embedded graph engine stores its encrypted data, auth secret, and local embedding model cache. Keep this under /data so it survives restarts and redeploys. |
| `SUPERMEMORY_SERVER_VERSION` | 0.0.5 | Pinned supermemory-server release version (tag server-v<VERSION> on supermemoryai/supermemory GitHub Releases) to download and run on first boot. Bump this to upgrade - the new binary is downloaded and cached on the volume alongside the old one; nothing is deleted automatically. |
| `SUPERMEMORY_DISABLE_TELEMETRY` | - | Set to '1' to disable the self-hosted binary's internal AI SDK telemetry instrumentation. The binary already sends no analytics by default regardless of this setting - it only silences local OpenTelemetry-style trace spans. |
| `SUPERMEMORY_EMBEDDING_PROVIDER` | local | Embedding provider: 'local' (default - runs Xenova/bge-base-en-v1.5 on-CPU inside the container, no API key needed), 'openai', 'gemini', or an OpenAI-compatible remote endpoint. |
| `SUPERMEMORY_EMBEDDING_RAM_LIMIT` | 1gb | Max extra memory (above post-boot baseline) the ingestion queue may use before new document adds pause until usage drops back down. Accepts '1gb', '512mb', or a bare number in GB. Raise this on larger Railway instance sizes for faster bulk imports. |

## Configuration

- **Start command:** `sh -c 'set -e
VERSION="${SUPERMEMORY_SERVER_VERSION:-0.0.5}"
BIN_DIR="/data/bin"
BIN="$BIN_DIR/supermemory-server-$VERSION"
mkdir -p "$BIN_DIR" "$SUPERMEMORY_DATA_DIR"
if [ ! -x "$BIN" ]; then
  echo "supermemory-server v$VERSION not cached on volume - downloading..."
  command -v curl >/dev/null 2>&1 || (export DEBIAN_FRONTEND=noninteractive && apt-get update -qq && apt-get install -y -qq --no-install-recommends curl ca-certificates >/dev/null)
  ARCH="$(uname -m)"
  case "$ARCH" in
    x86_64) PLATFORM="linux-x64" ;;
    aarch64) PLATFORM="linux-arm64" ;;
    *) echo "unsupported architecture: $ARCH" >&2; exit 1 ;;
  esac
  BASE="https://github.com/supermemoryai/supermemory/releases/download/server-v$VERSION"
  curl -fsSL "$BASE/supermemory-server-$PLATFORM" -o "$BIN.download"
  curl -fsSL "$BASE/supermemory-server-$PLATFORM.sha256" -o "$BIN.download.sha256"
  EXPECTED="$(cut -d " " -f1 "$BIN.download.sha256")"
  ACTUAL="$(sha256sum "$BIN.download" | cut -d " " -f1)"
  if [ "$EXPECTED" != "$ACTUAL" ] || [ -z "$EXPECTED" ]; then
    echo "checksum verification failed for supermemory-server-$PLATFORM" >&2
    rm -f "$BIN.download" "$BIN.download.sha256"
    exit 1
  fi
  chmod +x "$BIN.download"
  mv "$BIN.download" "$BIN"
  rm -f "$BIN.download.sha256"
  echo "installed supermemory-server v$VERSION -> $BIN"
fi
exec "$BIN"'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/supermemory)
