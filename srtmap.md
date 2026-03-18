# Deploy SRTmap on Railway

GPS track viewer and fixer for DJI drone SRT subtitle files.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/srtmap)

## About

SRTmap is an open-source GPS track viewer and fixer for DJI drone SRT subtitle files. It provides an interactive map with flight visualization, zero-coordinate repair, GPX export, multi-file comparison, measurement tools, and optional cloud sync — all powered by SQLite with no external database required.

Deploying SRTmap on Railway takes under a minute with this template. The app runs as a single Node.js service with an embedded SQLite database — no separate database service needed. A persistent volume stores both the database file and uploaded SRT files. The template pre-configures all environment variables and volume mounts. Once deployed, users can upload DJI SRT files directly in the browser, view GPS tracks on a map, fix broken coordinates, and export clean GPX files. Optional cloud sync lets users back up files and access them across devices using a simple token-based link.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SRTmap | [srtmap/SRTmap](https://github.com/srtmap/SRTmap) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `NODE_ENV` | production |
| `DATA_PATH` | /app/data |
| `STORAGE_PATH` | /app/data/uploads |

## Configuration

- **Start command:** `node src/index.js`
- **Healthcheck:** `/api/health`
- **Volume:** `/app/data`

**Category:** Other · **Languages:** HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/template/srtmap)
