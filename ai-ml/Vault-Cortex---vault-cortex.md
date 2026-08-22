# Deploy Vault Cortex on Railway

MCP server for your Obsidian vault: search, memory, tasks, files, OAuth 2.1

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vault-cortex)

## About

**[Vault Cortex](https://github.com/aliasunder/vault-cortex)** is a standalone MCP server that gives any AI agent **hybrid search, task management, structured memory, and read/write access** to your [Obsidian](https://obsidian.md) vault. No plugins, no running Obsidian, no separate bridge. One container, your vault, a full tool suite + guided prompts — secured with OAuth 2.1 and reachable from your phone, claude.ai, Claude Desktop, Claude Code, Cursor, or any remote MCP client.

- **Hybrid search** — FTS5 keyword matching + vector semantic similarity via RRF fusion, refined by cross-encoder reranking. Keywords stay precise on exact terms and jargon; vectors find notes even when your words differ from the vault's.
- **Structured memory** — dated, append-only entries accumulate into a personal knowledge layer. Topic recall answers "what do I think about X?" with the current take and the dated history behind it.
- **Tasks** — Kanban-aware task queries and updates: triage by status, dates, or priority, then complete, reprioritize, or move tasks between lanes in one call. Parses both Tasks-plugin emoji and Dataview inline-field formats.
- **Link graph** — backlinks, outgoing links, and orphan detection across the vault.
- **Files, not just notes** — images arrive as actual images, PDFs as structured text or rendered pages, canvases as readable outlines, data files as text. Their contents are indexed and searchable alongside your notes.
- **Obsidian-native** — understands frontmatter, wikilinks, tags, headings, and daily notes. Anything that mirrors an Obsidian concept behaves the way Obsidian does.
- **Guided workflows** — built-in prompts for vault health, memory review, and daily reconciliation, assembled from live vault data each time.

**One container, one volume.** The template runs the **vault-cortex:remote** image, which bundles [Obsidian Sync](https://obsidian.md/sync) and the MCP server. One persistent volume holds your vault, the search index, and Sync's device state.

**You supply three values:**

- Your Obsidian Sync token
- Your vault name
- Your timezone

Railway generates the MCP auth token and the public HTTPS domain; the template sets everything else.

**First start, in order:**

1. Logs in to Obsidian Sync and registers a device
2. Downloads your vault
3. Builds the search index
4. Goes live

**Sync runs both ways.** Edits made in Obsidian reach the server within seconds; tool writes show up on every device you sync.

**Built to protect your notes.** Vault Cortex writes to personal notes, so the file-safety layer is built to prevent corruption, not just errors: every write is atomic, concurrent edits are serialized per file, and Obsidian's **.obsidian/** folder is off-limits to every tool. Mechanism details: [README → Data Integrity](https://github.com/aliasunder/vault-cortex#data-integrity).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vault-cortex | `ghcr.io/aliasunder/vault-cortex:remote` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | - | Your timezone as an IANA name, like America/Toronto (list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) — decides what "today" means for daily notes, task due dates, and memory timestamps. Leave empty for UTC |
| `PORT` | 8000 | The port the image listens on. Leave as is. |
| `SYNC_MODE` | bidirectional | Sync direction: bidirectional, pull-only, or push-only |
| `VAULT_NAME` | - | Your vault's name, exactly as it appears in Obsidian Sync |
| `DEVICE_NAME` | vault-cortex | The device name Obsidian Sync shows for this container |
| `STORAGE_ROOT` | /persist | Where the volume is mounted — vault, search index, Sync device state, and logs live under it. Leave as is. |
| `READONLY_MODE` | false | Set true to hide every tool that changes the vault — clients can only read and search |
| `MCP_AUTH_TOKEN` | (secret) | Generated for you — the token your MCP client enters on the consent page |
| `MEMORY_ENABLED` | true | The About Me/ memory layer and its tools. Set false to hide them and skip creating the folder |
| `VAULT_PASSWORD` | (secret) | Only if your vault uses end-to-end encryption; otherwise leave empty |
| `TRUST_PROXY_HOPS` | 2 | Railway proxies between a visitor and the container, so the server sees the visitor's real address |
| `EMBEDDING_ENABLED` | true | Semantic search. Set false to skip the models and use keyword search only — fits in much less memory |
| `FILE_TOOLS_ENABLED` | true | vault_read_file and vault_list_files. Set false when Obsidian Sync has attachment syncing off |
| `OBSIDIAN_AUTH_TOKEN` | (secret) | Obsidian Sync login token. Getting it takes one command in a terminal on your computer — step by step: https://github.com/aliasunder/vault-cortex/blob/main/deploy/railway/README.md#getting-your-obsidian-sync-token |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/persist`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/vault-cortex)
