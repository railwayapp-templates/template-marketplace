# Deploy Cobalt | (Just Updated) Media Downloader No Stranger Can Use on Your Bill on Railway

Self-hosted media downloader: API-key auth enforced, YouTube poToken server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-or-just-updated-media-downloader-)

## About

Cobalt is an open-source media downloader from [imput](https://github.com/imputnet/cobalt): give
it a link from YouTube, TikTok, Instagram, X, Reddit, SoundCloud, Twitch clips, Vimeo, Bluesky and
about twenty other sites, and it returns a clean file — no ads, no trackers, no remuxing service in
the middle. This template deploys the Cobalt **API** (the part that does the work and that apps,
scripts and the public cobalt frontend talk to), with the API key already generated and enforced.

Cobalt's API is a small Node service that resolves a media URL and then either hands back a direct
link or tunnels the stream through itself, remuxing on the fly when the site serves video and audio
separately. That makes it bandwidth- and CPU-resident rather than storage-heavy: there is no
database, no volume, and nothing to migrate — but every request costs the instance real egress. The
consequence people miss when self-hosting is that an instance with no authentication is a public
service, and the bill is the deployer's.

This deployment pins Cobalt 11.7.1, turns authentication **on** (`API_AUTH_REQUIRED`), generates a
UUID API key for you at deploy time, writes the key file the API expects, and runs a
`poToken` provider alongside the API so that YouTube requests keep working if Google starts
challenging the datacenter address your instance runs on.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pot | `brainicism/bgutil-ytdlp-pot-provider:1.3.1-node` | Worker |
| cobalt | `ghcr.io/imputnet/cobalt:11.7.1` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `COBALT_API_KEY` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; : ${COBALT_API_KEY:?COBALT_API_KEY_is_required}; d=$HOME; [ -w $d ] || d=/tmp; printf {\\042%s\\042:{\\042name\\042:\\042owner\\042,\\042limit\\042:\\042unlimited\\042}} $COBALT_API_KEY > $d/keys.json; export API_KEY_URL=file://$d/keys.json API_AUTH_REQUIRED=1 API_PORT=$PORT API_LISTEN_ADDRESS=0.0.0.0; echo [railway] api key file at $d/keys.json; exec node src/cobalt'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/cobalt-or-just-updated-media-downloader-)
