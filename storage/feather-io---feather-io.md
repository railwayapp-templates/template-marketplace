# Deploy feather-io on Railway

A lightweight storage server compatible with S3 (and a web console)

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/feather-io)

## About

![Feather IO](https://raw.githubusercontent.com/Root-101/feather-io/refs/heads/main/docs/design/brand/images/social-preview.png)

**Feather IO** is your own Amazon S3, on your own volume. Point the AWS CLI, rclone, s3cmd, mc or any AWS/MinIO SDK at it and they work as they do against S3. Its web console lets you browse, upload and share files without touching a terminal:

* 🪣 **Buckets & objects** → Create buckets, upload (streamed, up to 5 GiB per object), download with `Range`, copy, delete, folders, multipart uploads.
* 🔐 **Real S3 auth** → AWS SigV4 signatures and presigned URLs (up to 7 days), like any S3 client expects.
* 🔑 **Access keys per bucket** → Read, write or both, on one bucket or all of them, with expiry.
* 🌍 **Anonymous access** → Open a prefix or a pattern (`public/*`, `images/*.png`) to the internet, without signing.
* 🖥️ **Web console** → Object browser (list and grid, previews, drag & drop, a background transfer queue), share links, in English and Spanish.

👉 Full docs, API walkthrough, benchmarks and everything else you need are in the official [GitHub Repo](https://github.com/Root-101/feather-io).

![The object browser of the console](https://raw.githubusercontent.com/Root-101/feather-io/refs/heads/main/docs/design/screens/08-objects-list.png)

Hosting Feather IO on Railway provisions the whole stack out-of-the-box. The deployment includes:

1. The **storage service**, which serves the S3 API and the admin API, with a **Railway volume** mounted at `/data` that holds the objects and the SQLite database (no external database needed).
2. The **web console**, a static Flutter Web app served by nginx, that talks to the service from your browser.

Both get a public domain: the service's is your **S3 endpoint**, the console's is where you log in with your root key. Railway's edge provides TLS for both.

📌 The service uses around **10 MB of RAM** and the console around **30 MB**, making it a very cheap way to have S3 storage of your own.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| feather-io console | [Root-101/feather-io](https://github.com/Root-101/feather-io) (root: /console) | Web service |
| feather-io storage | [Root-101/feather-io](https://github.com/Root-101/feather-io) (root: /service) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | feather-io console | 80 | The port of the running console |
| `SERVICE_URL` | feather-io console | - | URL of the backend service. |
| `PORT` | feather-io storage | 8080 | The port of the running storage |
| `JWT_SECRET` | feather-io storage | (secret) | Secret key used to sign the JWTs |
| `FEATHER_ACCESS` | feather-io storage | - | Access key used to authenticate requests |
| `FEATHER_SECRET` | feather-io storage | (secret) | Secret key used to authenticate requests |
| `STORAGE_VOLUME_PATH` | feather-io storage | /data | Local path of the volume where buckets, objects and the database are stored. Must match the path of attached volume |
| `KEYS_ENCRYPTION_SECRET` | feather-io storage | (secret) | Encrypts the secrets of the access keys in the database. Changing it makes the stored keys unusable. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/_admin/health`
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dart, Python, Shell, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/feather-io)
