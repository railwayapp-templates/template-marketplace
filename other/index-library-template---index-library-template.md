# Deploy index-library-template on Railway

Railway template for index_library: of books and objects, phone scan + lend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/index-library-template)

## About

One service, one volume. The container runs the Flask app under gunicorn on port 8080 with SQLite on the volume; nothing else is needed. The owner signs in with `LIBRARY_PASSWORD`, which is generated for each deployment and can be changed under the service's variables. `LIBRARY_TIER` starts at `shared` (public tiers and private links on, AI off); switching to `full` on the Settings page and pasting an Anthropic API key there turns on cover reading and the librarian. Settings → History keeps every change in a Mercurial repository on the volume, and Download the repository saves it as one file for another computer. Updates are deliberate: the app shows a line when a newer version exists and never installs anything by itself; redeploy the service to move to the newest image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| library | `ghcr.io/cheewee2000/index-library:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | The port the app listens on. Keep 8080; the domain points at it. |
| `LIBRARY_DATA` | - | Where the database, photos and history live. Keep /data, the volume's mount path. |
| `LIBRARY_TIER` | - | shared: sharing on, AI off. full: AI on too (needs an API key). local: nothing for visitors. |
| `LIBRARY_PASSWORD` | (secret) |  The owner's sign-in password. Generated for you; change it here any time. |
| `LIBRARY_SECURE_COOKIE` | - | 1 marks the session cookie HTTPS-only. Keep 1 behind Railway's domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/index-library-template)
