# Deploy Foldergram [Aug '26] (Photo Gallery) on Railway

Folder-based photo and video gallery. Upload, browse.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/foldergram-aug-26-photo-gallery)

## About

Foldergram turns a folder of photos and videos into a browsable gallery. Upload files through the web UI and it builds thumbnails, video previews, and an Instagram-style grid automatically.

Single Docker container, no database. All data lives on a volume at /app/data — gallery files, thumbnails, and the SQLite index. Uses ffmpeg for video processing and Node.js for the web server.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| foldergram | [foldergram/foldergram](https://github.com/foldergram/foldergram) | Worker |

**Category:** Other · **Languages:** TypeScript, Vue, CSS, HTML, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/foldergram-aug-26-photo-gallery)
