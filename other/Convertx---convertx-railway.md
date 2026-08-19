# Deploy Convertx on Railway

CloudConvert Alternative. Convert 1000+ File Formats on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convertx-railway)

## About

ConvertX is a self-hosted file converter that turns one format into another on your own server: a PNG into a WebP, Markdown into a typeset PDF, a HEIC photo into a JPEG, a video into an MP3. Over a thousand format pairs are covered, because ConvertX is a clean web interface over the tools people already trust — FFmpeg, ImageMagick, libvips, LibreOffice, Calibre, Pandoc, Inkscape and more. Teams reach for it when a third-party converter is not acceptable: legal documents, medical scans, unreleased product art. Self-host ConvertX and nothing leaves infrastructure you control.

Deploy ConvertX on Railway and you get one service built from the `gridalpha/convertx-railway` source repository, which layers a first-boot account seeder on the official `ghcr.io/c4illin/convertx` image. A volume at `/app/data` holds the SQLite database, your uploads and every result, so history survives redeploys. Traffic arrives at Railway's edge over HTTPS and reaches the container on port 3000; conversions run as child processes there and write straight to the volume. There is no separate database, queue or worker — ConvertX keeps its own state, which is why the template is one service and one volume.

![ConvertX Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1787075839/fbb09248-f482-4b25-a3ff-976fae034981.png)

Online converters are convenient and quietly expensive: you upload a contract or an unreleased design to a stranger's server, accept a retention policy buried in their terms, and hit a paywall as soon as the work gets real. ConvertX removes the third party — a Bun and Elysia application that drives the standard open-source conversion toolchain behind a login.

- **Over a thousand format pairs** across documents, images, raw photos, e-books, audio, video and 3D
- **Batch conversion** — drop many files into one job and convert them together
- **Choice of engine** — when several tools produce a format, ConvertX shows each so you pick the encoder
- **Accounts and private history** — every job belongs to the user who created it
- **Automatic cleanup** — results older than a configurable age are deleted on a timer
- **Previews and archive downloads** — inspect a result or pull a whole job as a tar

The architecture is deliberately simple: one container runs the web app and every converter binary, and one volume at `/app/data` holds the SQLite database plus `uploads/` and `output/`. That is also why it runs a single replica — a Railway volume attaches to exactly one service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| convertx | [gridalpha/convertx-railway](https://github.com/gridalpha/convertx-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for displayed timestamps |
| `PORT` | 3000 | HTTP listening port |
| `JWT_SECRET` | (secret) | Signs session cookies, keep stable |
| `HTTP_ALLOWED` | false | Keep false, marks cookie Secure |
| `ACCOUNT_REGISTRATION` | false | Allow visitor self-registration |
| `CONVERTX_ADMIN_EMAIL` | admin@example.com | Seeded account email |
| `ALLOW_UNAUTHENTICATED` | false | Allow anonymous use |
| `CONVERTX_ADMIN_PASSWORD` | (secret) | Seeded account password |
| `AUTO_DELETE_EVERY_N_HOURS` | 24 | Purge age for uploads and results |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/convertx-railway)
