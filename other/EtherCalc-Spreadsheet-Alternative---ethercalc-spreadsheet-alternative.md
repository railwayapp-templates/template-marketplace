# Deploy EtherCalc – Spreadsheet Alternative on Railway

Self-hosted collaborative spreadsheet application with persistent storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ethercalc-spreadsheet-alternative)

## About

EtherCalc is an open-source, self-hosted collaborative spreadsheet application that enables multiple users to edit spreadsheets in real time. It provides instant synchronization, browser-based editing, and easy sharing without requiring desktop spreadsheet software, making it ideal for teams, classrooms, and collaborative projects.

Hosting EtherCalc on Railway provides a simple way to run your own collaborative spreadsheet server without managing infrastructure. Railway automatically builds and deploys the application from the official repository, provides HTTPS, networking, and persistent storage, and makes scaling straightforward. The template uses the latest standalone EtherCalc architecture with built-in storage, eliminating the need for Redis in new deployments. Once deployed, users can instantly create and share spreadsheets through a public URL while maintaining full control over their data.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ethercalc | [kaviarahul123/ethercalc](https://github.com/kaviarahul123/ethercalc) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ETHERCALC_PORT` | 8000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** TypeScript, JavaScript, CSS, Shell, MDX, HTML, Cap'n Proto, Dockerfile, Sass, Go Template, Dafny, Lean, Makefile

[View on Railway →](https://railway.com/deploy/ethercalc-spreadsheet-alternative)
