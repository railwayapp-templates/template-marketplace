# Deploy Lithic-UK-Remote — WebDAV Sync for TiddlyWiki on Railway

Self-host WebDAV sync for TiddlyWiki — no Node.js, no database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lithic-uk-remote-webdav-tiddlywiki)

## About

Lithic-UK-Remote is a lightweight, self-hosted WebDAV server purpose-built for **Lithic: Unitary Knowledge** and any single-file TiddlyWiki. It serves your wiki strictly over WebDAV — no Node.js, no database, no backend logic — so your local-first "digital brain" stays exactly as it is, while gaining secure, automatic sync across every device. Edit in your browser on any machine; changes save straight back to the server over standard WebDAV.

---

The elegance here is what *isn't* running. A single-file TiddlyWiki is a self-contained HTML application: it holds your notes, your interface, and its own save logic. The one thing it can't do on its own is persist changes to a remote location — and that's the entire job of this template.

**TiddlyWiki is its own WebDAV client.** When a modern TiddlyWiki (created after February 2016) is loaded from a WebDAV URL, it automatically detects that it's on a WebDAV server and saves every change back over HTTP — no plugin, no saver script, no Node.js runtime. Lithic-UK-Remote provides exactly that WebDAV target and nothing more: it serves your HTML file and accepts the writes TiddlyWiki sends back. That's why it's so lightweight — the intelligence lives in the wiki, and the server just needs to store and serve a file faithfully.

This mirrors the local-first experience precisely. There's no separate app to log into, no proprietary sync layer, no vendor holding your notes. You open your wiki's URL, edit as you always have, and it saves to a server you own — reachable from your laptop, phone, or any browser.

**The `/data` volume is your notebook.** Your entire knowledge base is that one HTML file on the mounted volume. It persists across restarts and redeploys, and because it's a plain file, backing it up is as simple as downloading it. Protect the WebDAV endpoint with authentication, since anyone who can reach it can read and write your notes.

Typical cost: **~$5/month or less** on Railway for the single lean container — and because there's no heavy runtime, it can idle cheaply when you're not actively syncing. Lithic-UK-Remote is free; you pay only for minimal infrastructure.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lithic-UK | [Xyvir/Lithic-UK](https://github.com/Xyvir/Lithic-UK) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LITHIC_USER` | (secret) | Choose a username for WebDAV access. |
| `LITHIC_PASSWORD` | (secret) | - |

**Category:** Other · **Languages:** HTML, Shell, JavaScript, Dockerfile, Rust, PowerShell

[View on Railway →](https://railway.com/deploy/lithic-uk-remote-webdav-tiddlywiki)
