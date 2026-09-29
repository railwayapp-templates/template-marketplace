# Deploy SketchForge 3D Editor on Railway

Forge ideas into 3D, right in your browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sketchforge-3d-editor)

## About

SketchForge is a browser-based 3D modeling and design editor for creating and editing 3D models without a local CAD installation. It supports primitives, boolean operations, groups, holes, chamfers, and fillets, with import and export support for formats including STL, OBJ, and STEP.

This Railway template runs SketchForge 3D Editor in a Docker container and exposes the web application on port `8080`. No separate database is required for the editor. A Railway persistent volume is mounted at `/data/projects` to retain shared SketchForge projects across container restarts and redeployments. Once deployed, Railway provides a public URL for accessing the 3D editor from a web browser. The template handles the container deployment, networking, and persistent project storage so you can focus on using and sharing the editor.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SketchForge | `ghcr.io/formsmith746/sketchforge-3d:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SKETCHFORGE_SHARED_PROJECTS_DIR` | /data/projects | Volume Directory |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/projects`

**Category:** Other

[View on Railway →](https://railway.com/deploy/sketchforge-3d-editor)
