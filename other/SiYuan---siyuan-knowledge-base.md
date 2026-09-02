# Deploy SiYuan on Railway

Knowledge workspace & note-taking app that stores your notes as Markdown

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/siyuan-knowledge-base)

## About

SiYuan is a privacy-first, open-source knowledge workspace built around content blocks. Every paragraph, list item, table and heading is an addressable block you can reference, embed, zoom into or query with SQL, and the notebook is stored as plain Markdown files on disk rather than in a proprietary format. Writers, researchers and engineering teams use it for long-form notes, project wikis and flashcards. Self-host SiYuan when you want Obsidian-style ownership of your files with a real server behind them, reachable from any browser instead of one desktop machine.

Deploy SiYuan on Railway and you get the official `b3log/siyuan` kernel as a single service on port 6806, with a persistent volume at `/siyuan/workspace` holding notes, assets, configuration and search index. There is no database to provision: the Go kernel writes Markdown to the volume and rebuilds its SQLite index from those files, so the volume is the entire state of the deployment. A lock screen password guards every route, the session cookie carries the `Secure` flag, and the kernel's WebSocket channel runs over the same domain so the editor stays live.

![Diagram of the single SiYuan service and its workspace volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788198636/siyuan-architecture.png)

SiYuan solves the problem most note apps create: your writing ends up locked inside someone else's sync service. It keeps every document as a Markdown file in a directory you control, adds a block layer so ideas can be linked and reused, and ships as one small Go binary with an embedded web UI. Teams self-host it for a searchable knowledge base without running a database cluster; individuals, to reach the same notes from any browser.

Key features:

- Block-level references, two-way links and backlinks between any two blocks
- Markdown WYSIWYG editing with tables, task lists, math, diagrams and code
- Full-text search across every block, plus embedded SQL queries over your own notes
- Database (table view) blocks, flashcards with spaced repetition, templates
- Web clipping, PDF annotation links and a marketplace of themes and plugins
- A documented HTTP API for scripting note creation, search and export

The architecture is deliberately flat. One service runs the kernel, serving the browser UI, the REST API and the WebSocket push channel on a single port. One volume holds `data/` (Markdown and assets), `conf/` (settings) and `temp/` (the SQLite index, rebuilt on boot). Because the kernel takes an exclusive lock on the workspace, the service runs at exactly one replica — a property of the application, not the platform.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| siyuan | `b3log/siyuan:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Timezone for daily notes and timestamps |
| `PORT` | 6806 | Port the platform health-checks |
| `SIYUAN_ACCESS_AUTH_CODE` | - | Lock screen password, applied every boot |

## Configuration

- **Start command:** `/opt/siyuan/entrypoint.sh serve --workspace=/siyuan/workspace --port=6806 --ssl`
- **Healthcheck:** `/api/system/version`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/siyuan/workspace`

**Category:** Other

[View on Railway →](https://railway.com/deploy/siyuan-knowledge-base)
