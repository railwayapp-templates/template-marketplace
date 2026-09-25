# Deploy ConvertX on Railway

ConvertX 0.18: convert files between 1000+ formats in your browser.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convertx-1)

## About

ConvertX is a self-hosted online file converter. It converts between more than a thousand formats using FFmpeg, LibreOffice, Pandoc, ImageMagick, libvips, Inkscape, Calibre and other tools, with batch conversions, per-user history and automatic cleanup. It is a private alternative to online converter websites, so your files never leave your server.

This template runs the official `c4illin/convertx:v0.18.0` image as one service. ConvertX makes the first account an admin, so on first boot a script registers `CONVERTX_ADMIN_EMAIL` with a generated password; with registration off, nobody else can sign up, and downloads need a login. Accounts, history and converted files live on a Railway volume at `/app/data`, and files older than 24 hours are deleted automatically. The image is large (about 1.5 GB) because it bundles the converters, so the first deploy takes a few minutes. Video conversion is CPU-heavy; the Hobby plan works for documents and images.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| convertx | `c4illin/convertx:v0.18.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `JWT_SECRET` | (secret) |
| `CONVERTX_SEED` | // First boot only: register the admin account from env vars before anyone else can.
const base = 'http://127.0.0.1:' + (process.env.PORT || '3000');
for (let i = 0; i < 180; i++) {
  try {
    if ((await fetch(base + '/healthcheck')).ok) break;
  } catch {}
  await new Promise((r) => setTimeout(r, 1000));
}
const root = await fetch(base + '/', { redirect: 'manual' });
if (!(root.headers.get('location') || '').endsWith('/setup')) {
  console.log('seed: an account already exists, nothing to do');
} else {
  const body = new URLSearchParams({
    email: process.env.CONVERTX_ADMIN_EMAIL,
    password: process.env.CONVERTX_ADMIN_PASSWORD,
  });
  const r = await fetch(base + '/register', { method: 'POST', body, redirect: 'manual' });
  console.log('seed: register returned ' + r.status);
} |
| `ACCOUNT_REGISTRATION` | false |
| `CONVERTX_ADMIN_EMAIL` | admin@example.com |
| `ALLOW_UNAUTHENTICATED` | false |
| `CONVERTX_ADMIN_PASSWORD` | (secret) |
| `AUTO_DELETE_EVERY_N_HOURS` | 24 |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CONVERTX_SEED" > /tmp/seed.mjs; bun run dist/src/index.js & pid=$!; trap "kill -TERM $pid; wait $pid; exit 0" TERM INT; bun /tmp/seed.mjs & wait $pid'`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/convertx-1)
