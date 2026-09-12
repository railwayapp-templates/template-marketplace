# Deploy TiddlyWiki on Railway

Personal web notebook that stores notes as small linked cards

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tiddlywiki)

## About

TiddlyWiki is a personal web notebook that stores everything as small linked notes called tiddlers rather than pages in folders. Jeremy Ruston released it in 2004 and rewrote it as TiddlyWiki 5 in 2013; it is still actively developed under a BSD licence. People run it as a zettelkasten, a project journal or a bug tracker, because any tiddler can be transcluded into another and pulled back out with a filter. That answers the problem every note app hits: something written for one purpose belongs somewhere else too.

Deploy TiddlyWiki on Railway and you get the Node.js client-server edition rather than the single-file version, so the browser saves each edit straight to the server the moment you click the tick. This template runs one service, `tiddlywiki`, built from [github.com/gridalpha/tiddlywiki-railway](https://github.com/gridalpha/tiddlywiki-railway) on top of the official `tiddlywiki` npm package. A volume is mounted at `/data`, the wiki folder lives at `/data/wiki`, and every tiddler is written there as its own plain-text file. A small companion process in the same container answers the platform health check, so the wiki itself can stay behind a password. Self-host TiddlyWiki this way and there is no database to run and no external storage to wire up.

![Diagram of the TiddlyWiki service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1789020498/tiddlywiki-architecture.png)

TiddlyWiki is a wiki you can reprogram from inside itself. Notes, configuration, themes and the interface are all tiddlers, so a filter that lists notes works identically on the toolbar buttons. People self-host it for that flexibility, and because one text file per note means nothing is locked in.

- **Transclusion** — write a fact once, pull it into as many notes as you like
- **Filters** — a small query language driving lists, tag clouds and dashboards
- **Wikitext or Markdown** — the Markdown plugin ships in the box
- **Plugin library** — KaTeX maths, CodeMirror editing, highlighting and maps, installed from inside the app
- **Themes and palettes** — restyle the wiki from the Control Panel
- **Plain-file storage** — each tiddler is a `.tid` file you can grep, diff or commit

The architecture is deliberately small. The `tiddlywiki` service runs TiddlyWiki's own Node.js server, serving the wiki over HTTP and writing each save to the attached volume. Because that server treats the wiki folder as its single source of truth, the deployment runs one replica by design, with no second writer to disagree with the first.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tiddlywiki | [gridalpha/tiddlywiki-railway](https://github.com/gridalpha/tiddlywiki-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8081 | Health endpoint port probed by Railway |
| `TW_GZIP` | yes | Gzip responses |
| `TW_READERS` | - | Set to (anon) for public read access |
| `TW_WRITERS` | - | Extra usernames allowed to write |
| `TW_PASSWORD` | (secret) | Password for that account |
| `TW_USERNAME` | (secret) | The wiki's single account |
| `TW_SITE_TITLE` | My TiddlyWiki | Wiki title, seeded on first boot |
| `TW_DEBUG_LEVEL` | - | Set to full to log every request |
| `TW_PATH_PREFIX` | - | Serve the wiki under a sub-path |
| `TW_BROWSER_CACHE` | yes | Send ETag and revalidate |
| `TW_SITE_SUBTITLE` | a non-linear personal web notebook | Wiki subtitle, seeded on first boot |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/tiddlywiki)
