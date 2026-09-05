# Deploy Filestash on Railway

Web file manager for SFTP, S3, FTP, WebDAV and SMB storage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filestash-collabora)

## About

An open-source web file manager, Filestash stores nothing itself. It is a browser front end speaking the protocols your data already lives on — SFTP, FTP, S3, Backblaze B2, WebDAV, SMB, NFS, Git, Dropbox and about twenty more — with one Dropbox-style interface over all of them. IT teams and agencies use it to give colleagues a normal file browser for a legacy FTP share or S3 bucket, with no access keys handed out.

Self-host Filestash on Railway: this template wires up the two services upstream's own compose file runs. The `filestash` service is the app, on a persistent volume holding its configuration, SQLite metadata, search index and a ready-to-use storage folder. The `collabora` service is Collabora Online, the LibreOffice document server that opens Word, Excel and PowerPoint files from any connected backend: Filestash hands the browser a Collabora iframe, which fetches the file back over WOPI.

![Filestash and Collabora services on Railway with a volume](https://res.cloudinary.com/rroe4rtk/image/upload/v1788529725/filestash-architecture.png)

Most file-sharing platforms want to own your data: you migrate everything into their storage layer and are then responsible for backing it up. Filestash inverts that. It authenticates a user, opens a connection to storage you already run, and streams bytes. Its only state is its configuration, a small SQLite database for share links and tags, and a thumbnail cache — so one modest volume suffices however many terabytes sit behind it.

Key features:

- Around twenty-five storage backends: SFTP, FTP, S3, Backblaze B2, Storj, WebDAV, SMB, NFS, Git, Dropbox, Google Drive
- Shareable links with expiry, passwords and read-only or read-write access
- In-browser viewers for images, video, audio, Markdown, code, PDF, CSV and office formats
- Pluggable auth — LDAP, OpenID Connect, SAML, htpasswd or a built-in user list — with path-scoped authorization
- Gateways re-exporting a connected backend over SFTP, S3, FTP or WebDAV

The Railway architecture is small. `filestash` serves the UI and API on port 8334 and owns the volume. `collabora` runs `coolwsd` on port 9980 with a public domain of its own, because the browser loads the editor iframe directly rather than through the app. WOPI joins them: Filestash reads Collabora's discovery document for the extensions it opens, and Collabora calls back to read and write the file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| collabora | `collabora/code:latest` | Web service |
| filestash | [gridalpha/filestash-railway](https://github.com/gridalpha/filestash-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | collabora | 9980 | HTTP port coolwsd listens on |
| `aliasgroup1` | collabora | https://.*:443 | WOPI hosts this editor will serve |
| `server_name` | collabora | - | Hostname written into the discovery document |
| `extra_params` | collabora | --o:ssl.enable=false --o:ssl.termination=true --o:num_prespawn_children=1 --o:logging.level=warning | TLS ends at the edge; sized for the container |
| `DONT_GEN_SSL_CERT` | collabora | 1 | No certificate needed behind the edge |
| `PORT` | filestash | 8334 | HTTP port Filestash listens on |
| `OFFICE_URL` | filestash | - | WOPI discovery endpoint |
| `APPLICATION_URL` | filestash | - | Public hostname, no scheme |
| `OFFICE_REWRITE_URL` | filestash | - | Editor URL the browser loads |
| `OFFICE_FILESTASH_URL` | filestash | - | WOPI callback origin for Collabora |
| `FILESTASH_ADMIN_PASSWORD` | filestash | (secret) | Password for /admin and the file browser |

## Configuration

- **Healthcheck:** `/hosting/discovery`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/healthz`
- **Volume:** `/app/data`

**Category:** Storage · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/filestash-collabora)
