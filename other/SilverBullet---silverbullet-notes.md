# Deploy SilverBullet on Railway

Note-taking app that stores every page as a Markdown file

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/silverbullet-notes)

## About

SilverBullet is an open-source, browser-based personal knowledge base that keeps everything you write as ordinary Markdown files. It gives you a live-preview editor, bi-directional wiki links, an index that turns notes into queryable objects, and Space Lua — a dialect you embed in a page to generate content, define commands or render live widgets. Writers, developers and research teams use it as a self-hosted alternative to Notion and Obsidian Sync, because the notes stay in a folder they own — readable by any editor, `grep` or `git` long after the app is gone.

This template lets you deploy SilverBullet on Railway in one click. A single `silverbullet` service runs the official image, serves the web client on its public domain and keeps its data on a persistent volume at `/data`. There is no external database to configure — SilverBullet indexes your Markdown itself. Before the server accepts its first request the template provisions an administrator account and your first space, so the deployment is never briefly open to whoever finds the URL, a real risk when you self-host a first-run wizard on the public internet.

![Diagram of the SilverBullet service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788501288/silverbullet-architecture.png)

SilverBullet is one Rust binary serving a CodeMirror-based client over a folder of Markdown files called a space. Everything you type is parsed into objects — pages, tasks, tags, headers, links, front matter — and held in an index the client queries as you browse. That is what makes a directory of text files behave like a database.

Self-host it when you want the notes to outlive the tool: no proprietary format to export from, no per-seat pricing, no vendor holding the sync endpoint.

Key features:

- Live-preview Markdown editing that formats in place, no split pane
- Bi-directional `[[wiki links]]`, tags and a picker that searches them all
- SLIQ, an integrated query language turning pages and tasks into live tables
- Space Lua scripting for custom commands, widgets and generated content
- Offline-capable progressive web app that syncs the space into the browser
- Named accounts, per-space access, API tokens and git-backed revisions

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| silverbullet | `ghcr.io/silverbulletmd/silverbullet:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | HTTP port served and health-checked |
| `SB_FOLDER` | /data/space | Server root, one level below the volume |
| `SB_SPACE_NAME` | My Space | Name of the first space, bound at / |
| `SB_ADMIN_PASSWORD` | (secret) | First administrator account password |
| `SB_ADMIN_USERNAME` | (secret) | First administrator account username |

## Configuration

- **Start command:** `/sbin/tini -s -- /bin/sh -c 'F="${SB_FOLDER:-/data/space}"; [ -f "$F/users.json" ] || [ -z "${SB_ADMIN_PASSWORD:-}" ] || /silverbullet setup "$F" --admin "${SB_ADMIN_USERNAME:-admin}:${SB_ADMIN_PASSWORD}" --space "${SB_SPACE_NAME:-My Space}" --at /; exec /silverbullet'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/silverbullet-notes)
