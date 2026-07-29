# Deploy midee - Virtual Piano on Railway

A lag-free MIDI visualizer and recorder that runs in-browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/midee)

## About

midee is a free, open-source, browser-native MIDI studio for visualizing, practicing, recording, and exporting MIDI performances. Built with Vite and TypeScript, it combines real-time MIDI playback, Web MIDI controller support, WebCodecs video export, and a customizable piano visualizer—all running entirely in the browser without uploads or backend services.

Hosting midee on Railway provides a fast, globally accessible platform for serving the application's static web assets over HTTPS. Railway automatically builds the project from the included repository and deploys it without requiring server management.

Because midee is a fully client-side application, all MIDI playback, recording, rendering, and MP4 export happen directly within the user's browser. No uploaded files, backend APIs, databases, or persistent storage are required. Railway simply hosts the compiled static application while providing automatic HTTPS, deployment previews, custom domains, and scalable infrastructure. This makes Railway an ideal deployment target for midee's privacy-first, local-only architecture.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| midee | [bilalnawaz072/midee](https://github.com/bilalnawaz072/midee) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/midee)
