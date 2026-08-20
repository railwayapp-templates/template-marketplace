# Deploy Couchdb Obsidian Livesync on Railway

CouchDB server that syncs your Obsidian notes between devices

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/couchdb-obsidian-livesync)

## About

Deploy Apache CouchDB as the sync server for Obsidian's Self-hosted LiveSync plugin. Obsidian and the plugin both run on your own devices — what runs on Railway is the database they replicate into, so your notes live on infrastructure you control instead of behind a paid Obsidian Sync subscription. The plugin splits each note into chunks and syncs only what changed, so two devices editing the same note merge cleanly rather than leaving `.sync-conflict` copies, and everything is end-to-end encrypted with a passphrase the server never sees.

A stock CouchDB will not do. To self-host Obsidian LiveSync the server needs auth on every request, CORS opened for the Obsidian app origins, a 4 GB request ceiling and a 50 MB document ceiling. This template applies all of that to a single `couchdb` service on a persistent volume, creates the vault database on first boot, and generates the admin credentials at deploy time. TLS is terminated at Railway's edge, so the reverse proxy and certificate manager you would otherwise run are the platform's job.

![CouchDB service and its data volume backing Obsidian LiveSync](https://res.cloudinary.com/rroe4rtk/image/upload/v1787131760/obsidian-livesync-architecture.png)

Obsidian stores notes as Markdown files on disk — excellent for ownership, awkward for synchronisation, since file-level tools resolve a simultaneous edit by keeping both copies for you to merge by hand. LiveSync instead stores content-addressed chunks as CouchDB documents and replicates only what changed, which is why it merges concurrent edits sensibly and stays responsive on a patchy connection. The server is deliberately plain: one CouchDB node, one database, one volume.

Key features:

- Near real-time sync across desktop, iOS and Android through the official plugin
- End-to-end encryption with a passphrase held only on your devices
- Chunk-level merging instead of whole-file conflict copies
- Optional path obfuscation, hidden-file and customisation sync
- Notes stay in a database you control, on infrastructure you own

Architecture: the `couchdb` service is the whole backend. It stores every chunk on a volume at `/opt/couchdb/data`, serves the replication API Obsidian talks to, and hosts Fauxton on the same URL. A process in the container applies the LiveSync settings and creates the vault database at boot, so there is no manual step after the click.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| couchdb | [gridalpha/obsidian-livesync-railway](https://github.com/gridalpha/obsidian-livesync-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Health endpoint port, keep private |
| `COUCHDB_USER` | (secret) | CouchDB admin username |
| `COUCHDB_SECRET` | (secret) | Session cookie signing key |
| `COUCHDB_DATABASE` | obsidiannotes | Vault database created at boot |
| `COUCHDB_PASSWORD` | (secret) | Admin password, also used by the plugin |
| `COUCHDB_CORS_ORIGINS` | app://obsidian.md,capacitor://localhost,http://localhost | Obsidian desktop and mobile origins |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/opt/couchdb/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/couchdb-obsidian-livesync)
