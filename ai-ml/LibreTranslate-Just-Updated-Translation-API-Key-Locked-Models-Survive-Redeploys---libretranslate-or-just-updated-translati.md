# Deploy LibreTranslate | (Just Updated) Translation API, Key-Locked, Models Survive Redeploys on Railway

LibreTranslate translation API, key-locked. Models survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/libretranslate-or-just-updated-translati)

## About

LibreTranslate is a self-hosted machine translation API. It translates text, detects languages and
translates documents using open Argos Translate models, with no third-party translation service and
no per-character fee. It ships a small web UI and a JSON API that drops into any app that currently
calls a paid translation endpoint.

This template runs LibreTranslate 1.9.6 as a single service from a digest-pinned official image. The
API is locked behind a key that Railway generates for you, and the downloaded language models are
kept on a Railway volume.

- **API locked behind a generated key.** The stock image answers anyone who can reach the URL, so a
  public deployment is a free translation service for the whole internet, paid for by your Railway
  usage. This template creates a random `LIBRETRANSLATE_API_KEY` on deploy, runs the server in
  API-key-required mode and answers any translation request without a valid key with a 400. The web
  UI stays available: open it and paste the key into its API key box.
- **Models survive a redeploy.** On every boot LibreTranslate downloads its language models, which
  takes several minutes for the full set. The models live on the volume, so a redeploy starts from
  disk instead of the network.
- **Pinned to a release.** The image is pinned by digest, so a redeploy never changes the version
  underneath your integration.
- **Per-client rate limit.** Requests are limited per client address, taken from the first entry of
  `X-Forwarded-For`, which is the real caller on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libretranslate | `libretranslate/libretranslate:v1.9.6@sha256:1de2d7056bb8ad607a412f4563d9abe324ff632b43b5be9428bcc8e213aebb32` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `LIBRETRANSLATE_API_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; cd /app; D=/home/libretranslate/.local; DB=$D/api_keys.db; mkdir -p "$D"; ./venv/bin/python -c "import sys;from libretranslate.api_keys import Database;Database(sys.argv[1]).add(600, sys.argv[2])" "$DB" "$LIBRETRANSLATE_API_KEY"; L="${LT_LOAD_ONLY:-en,es,fr,de,pt,it,ja,zh,ko,ru,ar,hi}"; echo "[railway] api key loaded uid=$(id -u) data=$(stat -c %u:%g "$D") port=${PORT:-5000} languages=$L"; exec ./scripts/entrypoint.sh --host 0.0.0.0 --port "${PORT:-5000}" --api-keys --api-keys-db-path "$DB" --under-attack --req-limit 120 --load-only "$L"'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/libretranslate/.local`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/libretranslate-or-just-updated-translati)
