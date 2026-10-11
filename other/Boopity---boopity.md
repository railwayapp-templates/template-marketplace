# Deploy Boopity on Railway

Bookings, clients, pets and payments for independent pet sitters

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/boopity)

## About

Boopity is free, open-source software for independent pet sitters. Manage clients, pets, bookings and payments on a website with your own business name, logo and colors. Each installation belongs to one pet-care business; invited clients can book through its portal.

This template runs the published Boopity 1.0.2 Docker image, pinned to its immutable digest. It includes a persistent volume and an automatic HTTPS address. Boopity creates its SQLite database and private keys itself; you do not need a separate database or a connection string.

After deployment, open the Boopity service, view its deployment logs and open the private **Finish setup** link. Keep that link private. The wizard guides you through your account, email delivery, business details and inbox verification. Google sign-in is optional.

Railway charges for hosting. Its Hobby plan currently starts at $5 per month, including $5 of resource usage; extra usage costs more. Email, domains and payment-processing fees are separate. Check [Railway pricing](https://railway.com/pricing) before deploying. Boopity may receive Railway template referral credit or commission when you deploy through this template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Boopity | `ghcr.io/artwork-not-final/boopity@sha256:70407d584f7d8fc9b3df673996e4fcdf82a194ecd3bff07a44c2f118ecec763a` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | Internal app port. Leave this as 3000. |
| `APP_URL` | - | Your website address, filled in automatically by Railway. |
| `DATA_DIR` | /data/boopity | Where Boopity saves records on the included data volume. Leave unchanged. |

## Configuration

- **Start command:** `node --input-type=module -e 'import {constants,mkdirSync,openSync,fchownSync,fchmodSync,closeSync} from "node:fs";const d="/data/boopity";if(process.env.DATA_DIR!==d)throw Error("Unexpected data directory");if(process.getuid()===0){try{mkdirSync(d,{mode:448})}catch(e){if(e.code!=="EEXIST")throw e}const fd=openSync(d,constants.O_RDONLY|constants.O_DIRECTORY|constants.O_NOFOLLOW);try{fchownSync(fd,1000,1000);fchmodSync(fd,448)}finally{closeSync(fd)}process.setgroups([]);process.setgid(1000);process.setuid(1000)}if(process.getuid()!==1000||process.getgid()!==1000)throw Error("Boopity must run as UID/GID 1000");await import("/app/dist/server/index.mjs");'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/boopity)
