# Deploy ComposeYogi - Music Composer on Railway

The open-source Ableton-style music composer for the web.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/composeyogi)

## About

ComposeYogi is a free, open-source, browser-based digital audio workstation (DAW) inspired by Ableton Live. Built with Next.js, TypeScript, and Tone.js, it enables users to create beats, edit MIDI, record audio, and arrange multi-track compositions directly in the browser with local-first storage and offline support.

![1](https://raw.githubusercontent.com/bilalnawaz072/ComposeYogi/main/public/screenshots/EDM-Drop-ComposeYogi.gif)

Hosting ComposeYogi on Railway provides a production-ready environment for serving the web application over HTTPS without managing infrastructure manually. Railway automatically builds the application from its Dockerfile or repository, provisions networking, and deploys updates directly from your Git repository.

ComposeYogi is a client-first application that stores projects locally using IndexedDB, so no database or persistent server storage is required for its current feature set. Railway automatically provides secure HTTPS, public networking, deployment logs, and scaling capabilities while allowing you to add custom domains and environment variables if needed. Since application data remains in each user's browser, the deployment is stateless and simple to maintain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ComposeYogi | [bilalnawaz072/ComposeYogi](https://github.com/bilalnawaz072/ComposeYogi) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NEXT_TELEMETRY_DISABLED` | 1 |

## Configuration

- **Start command:** `node server.js`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Dockerfile

[View on Railway →](https://railway.com/deploy/composeyogi)
