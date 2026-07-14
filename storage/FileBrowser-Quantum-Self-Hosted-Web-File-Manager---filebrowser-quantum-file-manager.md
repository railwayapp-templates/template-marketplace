# Deploy FileBrowser Quantum — Self-Hosted Web File Manager on Railway

Self-host a modern web file manager: search, previews, sharing, 2FA. Own it

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filebrowser-quantum-file-manager)

## About

FileBrowser Quantum is a modern, self-hosted web file manager — a heavily upgraded fork of the
classic FileBrowser, written in Go and packed into a tiny single binary. Browse, upload,
download, preview, and edit files from any browser with real-time indexed search, rich previews
(images, video, PDFs, Office docs, 3D models, audio), a built-in code editor with 50+ languages,
and granular sharing links with passwords, expiry, and download limits. OIDC, LDAP, password +
2FA, and a full Swagger-documented REST API round it out.

Apache-2.0, free forever, and actively developed. Self-host on Railway for ~$5/month — a private
Dropbox-style file manager for storage you own, with no per-user fees and no cloud provider
holding your files.

---

FileBrowser Quantum gives a clean web interface to files on your server's disk — upload from a
browser, organize, preview, edit text, and share links, with real-time search across everything.
It's ideal for a private, browser-accessible file store you fully control rather than Dropbox.

Railway runs it as a single lightweight container with a persistent volume and automatic HTTPS.
Point it at the volume as its source, create your admin account, and you're online in minutes.

> **What it's for (and not for):** FileBrowser Quantum manages files on its own mounted storage —
> a Railway volume here — with fast local indexing. It is **not** primarily an S3/SFTP gateway;
> its remote-protocol support is limited, so if your main backend is object storage you'd want a
> different tool. For a private file manager on Railway-hosted storage, it's an excellent fit.

Typical cost: **~$5/month** on Railway's Hobby plan plus volume storage. FileBrowser Quantum is
free and open source — Dropbox charges $12/user/month, Google Workspace storage adds up per seat.
This is flat compute with no per-user fees and full data ownership.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Filebrowser-Quantum | [gtsteffaniak/filebrowser](https://github.com/gtsteffaniak/filebrowser) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `FILEBROWSER_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Volume:** `/folder/`

**Category:** Storage · **Languages:** Go, Vue, JavaScript, TypeScript, CSS, Makefile, HTML, Dockerfile, Slim, Shell

[View on Railway →](https://railway.com/deploy/filebrowser-quantum-file-manager)
