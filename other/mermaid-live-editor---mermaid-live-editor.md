# Deploy mermaid-live-editor on Railway

JavaScript based diagramming and charting tool

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mermaid-live-editor)

## About

**mermaid‑live‑editor** is an open‑source, browser‑based IDE for the Mermaid diagramming language that provides a split‑pane markdown editor and real‑time rendered preview. It lets individuals and teams design flowcharts, sequence diagrams, ERDs, and more, then export to PNG/SVG or embed directly in docs and wikis—all without installing native graphing tools.

Running mermaid‑live‑editor onRailway gives you a stateless, auto‑scaling service that serves a pre‑built static SPA plus a lightweight Node/Express back‑end for on‑the‑fly diagram rendering (via the `@mermaid-js/mermaid-cli`).  Deployment typically involves cloning the upstream repository, installing Node&nbsp;≥&nbsp;18 LTS dependencies, executing `pnpm run build`, and configuring Railway to expose port&nbsp;9000.  Because the editor is pure front‑end and uses browser storage for drafts, no persistent database is required, keeping costs minimal and cold‑starts fast.  Environment variables are optional—set `BASE_PATH` if you want the app to live under a custom sub‑path.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mermaid-live-editor | `ghcr.io/mermaid-js/mermaid-live-editor` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/mermaid-live-editor)
