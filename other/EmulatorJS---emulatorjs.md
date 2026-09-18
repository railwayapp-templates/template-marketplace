# Deploy EmulatorJS on Railway

Browser-based emulator for retro consoles, powered by RetroArch

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/emulatorjs)

## About

EmulatorJS is a browser-based frontend for RetroArch: dozens of libretro emulator cores compiled to WebAssembly, wrapped in a touch-friendly player with save states, shaders, cheats and gamepad support. It covers roughly forty systems — NES, SNES, Nintendo 64, Game Boy through GBA, Nintendo DS, PlayStation, Sega through Saturn, Atari, Commodore, arcade boards and DOS — and every core runs on the client. Developers embed it to demo retro builds, archivists use it for interactive exhibits, and hobbyists use it to play their own cartridge dumps without installing anything. Upstream ships it as a library rather than a website, so no official container has ever existed.

This template gives you both halves. Deploy EmulatorJS on Railway and one `emulatorjs` service serves the complete library at `/data/` — every core, the minified bundle, the compression helpers and the localisations — with the CORS and `Cross-Origin-Resource-Policy` headers a page on another domain needs to load it. The same service serves a player at `/` where you pick a file from your own device and it starts. Nothing is uploaded and nothing is stored: no database, queue, object storage or volume, because save states and the core cache live in your browser's IndexedDB. Self-host EmulatorJS and your pages stop depending on the public CDN.

![Diagram of the single EmulatorJS service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789607046/emulatorjs-architecture.webp)

EmulatorJS solves a narrow problem well: running a real emulator in a web page without asking the visitor to install anything. Every core is WebAssembly executing on the client, so the server does no emulation work — it only hands out static files. Self-hosting is worth it for three reasons: you stop depending on a third party's CDN, you control the headers that unlock the multithreaded cores, and you serve the library from your own domain.

Key features:

- Around forty systems, each backed by a mainstream libretro core
- Save states, battery saves, rewind, fast-forward and slow motion
- Configurable keyboard and gamepad maps, plus an on-screen pad for mobile
- Shaders, screen capture and screen recording from the control bar
- Cheat entry, a cache manager for downloaded cores, and localisations

The architecture is deliberately flat. The `emulatorjs` service runs Caddy over the extracted release and splits traffic three ways: `/data/*` is the library, sent with `Access-Control-Allow-Origin: *` and `Cross-Origin-Resource-Policy: cross-origin`; `/healthz` is an anonymous liveness route; everything else is the player page, sent with `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| emulatorjs | [gridalpha/emulatorjs-railway](https://github.com/gridalpha/emulatorjs-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port Caddy listens on |
| `AUTH_USER` | (secret) | Optional basic-auth username; blank is public |
| `EJS_VERSION` | - | Pin an EmulatorJS release; blank tracks stable |
| `AUTH_PASSWORD` | (secret) | Optional basic-auth password, hashed at boot |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/emulatorjs)
