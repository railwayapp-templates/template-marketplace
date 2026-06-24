# Deploy Filestash — Web File Manager for S3, SFTP, SMB & 20+ Backends on Railway

Self-host a web UI for S3, SFTP & 20+ storage backends. No migration.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/filestash-file-manager)

## About

![Filestash universal file manager web interface](https://openalternative.co/cdn-cgi/image/width=1024,quality=75,format=avif,metadata=none/https%3A%2F%2Fassets.openalternative.co%2Ftools%2Ffilestash%2Fscreenshot.webp%3Fv%3D1738071695582)

Filestash is the open-source, storage-agnostic file manager that puts a Dropbox-style web
interface on top of any storage you already have — **S3, SFTP, FTP, SMB, WebDAV, NFS, MinIO,
Backblaze, Azure Blob, Google Drive, Dropbox, Git, and 20+ more protocols**, all through one
clean UI. Built-in viewers for 50+ file types (PDF, PSD, RAW, CAD, DICOM, 3D models), LDAP /
SAML / OIDC SSO, RBAC, and gateways that re-expose any backend as SFTP, S3, or MCP.

Give non-technical users a familiar file browser on top of your existing S3 buckets or SFTP
servers — no data migration, no new storage to pay for. Self-host on Railway for ~$5/month
versus Dropbox Business at $15/user/month or a managed file gateway costing far more.

---

Most teams already have storage — an S3 bucket, an SFTP server, a SMB share, a MinIO instance —
but no friendly way for non-technical staff to browse and manage files in it. Filestash solves
exactly that: it's a web front-end that connects to your existing storage and gives users a
Dropbox-like experience without moving a single file or paying for new storage.

Running it in production means a persistent Go service, a config volume, SSO integration, and a
public HTTPS endpoint. Railway provisions all of it — single container, persistent volume,
automatic HTTPS, zero server administration.

![Filestash connecting to S3, SFTP, and SMB backends](https://res.cloudinary.com/asset-cloudinary/image/upload/v1778608355/d05e1290-1c20-4daf-a2c4-059cdae9c37a.png)

Typical cost: **~$5/month** on Railway's Hobby plan. Dropbox Business costs $15/user/month and
locks you into Dropbox storage. Filestash on Railway is a flat compute cost regardless of user
count, and it sits on top of storage you already own and control.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Filestash | `machines/filestash:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8334 |
| `CANARY` | true |
| `LOG_LEVEL` | INFO |

## Configuration

- **Volume:** `/app/data/state`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/filestash-file-manager)
