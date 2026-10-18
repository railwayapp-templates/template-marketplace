# Deploy NSFW API on Railway

Self-hosted image moderation API: nudity, weapons, gore and drugs.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nsfw-api)

## About

NSFW API is a self-hosted image moderation API. Send an image to `POST /classify` and get back whether it is safe: nudity scores from nsfwjs's MobileNetV2, plus weapons, gore and drugs detection with Apple's MobileCLIP-S0. Both models run on CPU with ONNX Runtime: no GPU, no third-party service.

The service builds from the repository's Dockerfile into a small distroless image (~122 MB compressed) with both models inside, so nothing is downloaded at boot. The models load in under a second and the healthcheck only turns green once they are ready. On 1 vCPU it answers in ~75 ms per image with ~125 MB of RAM at rest. An API key is generated for you, and a playground at `/playground` lets you try it from a browser. Turn on App Sleeping to pay almost nothing while it is idle.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nsfw-api | [openinary/nsfw-api](https://github.com/openinary/nsfw-api) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port the API listens on. Keep 8080: the public domain points to it. |
| `API_KEY` | (secret) | Key required on /classify (Bearer or x-api-key). Generated for you; clear it for an open API. |
| `NSFW_CLASSES` | Porn,Hentai,Sexy | Classes summed into the nudity score. Use Porn,Hentai to tolerate suggestive images. |
| `CLIP_THRESHOLD` | 0.5 | Score (0 to 1) above which a weapon, gore or drugs category is flagged. |
| `NSFW_THRESHOLD` | 0.7 | Nudity score (0 to 1) above which an image is flagged as nsfw. |
| `CLIP_CATEGORIES` | weapon,gore,drugs | Extra categories checked with MobileCLIP: weapon, gore, drugs. Set to none to turn them off. |
| `MAX_FILE_SIZE_MB` | 10 | Maximum upload size, in MB. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/nsfw-api)
