# Deploy NoteDiscovery — Self-Hosted Notion Alternative with MCP on Railway

Self-host a Markdown knowledge base with MCP for Claude & Cursor.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/notediscovery-knowledge-base)

## About

NoteDiscovery is a lightweight, self-hosted knowledge base that keeps your notes as plain
Markdown files you fully own — wikilinks, an interactive graph view, LaTeX math, Mermaid
diagrams, an in-app drawing editor, and full-text search in a fast, modern interface. MIT
licensed, free forever, and built around a folder of `.md` files, so there's no proprietary
database and no lock-in: back up with `cp`, migrate by taking your files, grep your whole vault.

Its standout feature for 2026: a **built-in MCP server** that lets Claude, Cursor, and other AI
assistants search, create, and organize your notes directly. Self-host on Railway for ~$5/month —
an Obsidian/Notion alternative that's web-based, AI-connected, and entirely yours.

---

NoteDiscovery stores everything as plain Markdown in a folder — the whole point is that your
knowledge base is portable files, not a locked database. Hosting it means a Node.js server, a
persistent volume for your notes, and a public HTTPS endpoint. Railway provisions all of it with
automatic SSL and a volume that keeps your notes across redeploys.

> **Security note — important on Railway:** NoteDiscovery ships with authentication **disabled by
> default** and a default password of `admin`, because it's designed for local/home-network use.
> Railway deployments are public by default, so **enable authentication and set a strong password
> before or immediately after deploy** — otherwise your notes are open to anyone with the URL.
> Configure it in `config.yaml` (`authentication.enabled: true`) per the project's AUTHENTICATION
> guide. Treat this as a required step, not optional.

Typical cost: **~$5/month** on Railway's Hobby plan — NoteDiscovery is free and open source, so
you pay only compute. Notion charges $10–15/user/month; Obsidian Sync is $4–8/month per vault.
NoteDiscovery on Railway is flat compute with no per-user or per-vault fees.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| NoteDiscovery | `gamosoft/notediscovery:latest` | Worker |

**Category:** CMS

[View on Railway →](https://railway.com/deploy/notediscovery-knowledge-base)
