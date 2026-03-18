# Deploy RetroAssembly on Railway

The personal retro game collection cabinet in your browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/retroassembly)

## About

![retroassembly](https://raw.githubusercontent.com/arianrhodsandlot/retroassembly/main/public/assets/screenshots/library.jpeg)

RetroAssembly is a self-hostable, browser-based retro game library and emulator cabinet. It allows users to upload, organize, and play ROMs from dozens of classic gaming platforms directly in the browser, with save states, rewind support, metadata enrichment, and a controller-friendly interface powered by modern WebAssembly emulation.

Hosting RetroAssembly involves deploying a TypeScript-based web application that serves a unified frontend, API layer, and emulation runtime. The application manages user authentication, ROM uploads, metadata indexing, save-state persistence, and emulator orchestration via WebAssembly. A persistent storage layer is required for ROM files and save data, along with a lightweight database for metadata and user state. While RetroAssembly can be run locally or via Docker, deploying on Railway simplifies environment configuration, networking, and scaling, allowing you to focus on managing your game library rather than infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RetroAssembly | `arianrhodsandlot/retroassembly:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | Application port. |
| `RETROASSEMBLY_RUN_TIME_SKIP_HOME` | false | Skip home page. Runtime-specific (false in dev). |
| `RETROASSEMBLY_RUN_TIME_MSLEUTH_HOST` | https://msleuth.arianrhodsandlot.workers.dev/ | MSLeuth primary host. |
| `RETROASSEMBLY_RUN_TIME_STORAGE_HOST` | - | External storage host (optional). |
| `RETROASSEMBLY_RUN_TIME_SUPABASE_URL` | - | Supabase project URL. |
| `RETROASSEMBLY_RUN_TIME_ALLOW_CRAWLER` | false | Allow crawlers (runtime-specific). |
| `RETROASSEMBLY_RUN_TIME_MAX_ROM_COUNT` | - | Max ROM count. Default: empty on Node, 1000 on Workers. |
| `RETROASSEMBLY_RUN_TIME_DATA_DIRECTORY` | data | Data directory (e.g., SQLite DB). Resolved at runtime. |
| `RETROASSEMBLY_RUN_TIME_STORAGE_DIRECTORY` | data/storage | Storage directory. Resolved at runtime. |
| `RETROASSEMBLY_RUN_TIME_SUPABASE_ANON_KEY` | - | Supabase anonymous public key. |
| `RETROASSEMBLY_RUN_TIME_MAX_ROM_COUNT_2026` | - | Max ROM count (2026). Default: empty on Node, 200 on Workers. |
| `RETROASSEMBLY_RUN_TIME_MAX_UPLOAD_AT_ONCE` | 1000 | Max concurrent uploads. Default: 1000 on Node, 100 on Workers. |
| `RETROASSEMBLY_RUN_TIME_SUPERVISER_USER_IDS` | - | Supervisor user IDs (comma-separated). |
| `RETROASSEMBLY_RUN_TIME_MSLEUTH_FALLBACK_HOST` | https://msleuth.fly.dev/ | MSLeuth fallback host. |
| `RETROASSEMBLY_RUN_TIME_SKIP_HOME_IF_LOGGED_IN` | true | Skip home if logged in. Default: true on Node, false on Workers. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/template/retroassembly)
