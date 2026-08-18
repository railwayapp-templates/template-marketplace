# Deploy Trilium on Railway

Notion Alternative. Hierarchical notes, canvas, mind maps & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trilium)

## About

Trilium Notes is an open-source hierarchical knowledge base for people who outgrew flat note apps. Everything lives in one arbitrarily deep tree where a note can be cloned into several branches at once, with labels, relations and saved searches instead of rigid folders. Note types run from rich text and code to canvas, mind maps and spreadsheets, and it stays usable past 100,000 notes. Developers and second-brain builders self-host Trilium Notes instead of Notion or Evernote, for per-note encryption, revision history and an AGPL-3.0 licence.

Deploy Trilium Notes on Railway as a single service running the official `triliumnext/trilium` image behind a managed HTTPS domain, with a persistent volume at `/home/node/trilium-data`. No database is provisioned — Trilium is deliberately single-file, keeping notes, attachments, revisions, backups and even login sessions in one `document.db` SQLite database on that volume. Railway terminates TLS and forwards to port 8080, with the proxy trusted so rate limiting sees real client IPs. Keep the service at one replica: Railway stops the old container before starting the new one, so a redeploy never puts two writers on one file.

![Trilium Notes Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786976813/cff1de53-b682-4a47-adcf-61164397c63b.png)

Self-hosting Trilium Notes puts the knowledge base in a file you can copy, back up and encrypt, still reachable from any browser. Unlike Obsidian or Joplin, whose servers are only a sync layer, the Trilium server is the full application.

- **Cloned notes** — one note in many branches, no duplication
- **Attributes and relations** — labels, promoted attributes, saved searches
- **Collections** — notes shown as a table, board, calendar or dashboard
- **Note types** — text, Markdown, code, canvas, mind map, spreadsheet, geo map
- **Encryption and revisions** — per-note protection and automatic version history
- **Sharing, scripting and ETAPI** — read-only public subtrees; automation over REST
- **Import** — Evernote, OneNote, Notion, Obsidian, Google Keep and Markdown

The Railway architecture is intentionally one service: the `trilium` container holds the Node.js server, the web UI and the SQLite database, with the volume supplying durable storage. Attachments land in that same directory, so the volume is what to size and back up.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trilium | `triliumnext/trilium:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Health-check target port, keep identical |
| `NODE_OPTIONS` | --max-old-space-size=4096 | Cap Node heap below container limit |
| `TRILIUM_DATA_DIR` | /home/node/trilium-data | Data directory, matches volume mount |
| `TRILIUM_NETWORK_PORT` | 8080 | Application listen port |
| `TRILIUM_GENERAL_INSTANCENAME` | railway | Instance label for sync and title |
| `TRILIUM_NETWORK_TRUSTEDREVERSEPROXY` | 0.0.0.0/1,128.0.0.0/1,::/1,8000::/1 | Trust Railway edge proxy hops |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/trilium-data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/trilium)
