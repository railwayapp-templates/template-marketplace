# Deploy Deploy and Host SnapOtter Image Toolkit on Railway on Railway

Self-host 52 image tools + local AI. No per-image fees. Images never leave.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/snapotter)

## About

![SnapOtter self-hosted image processing dashboard](https://raw.githubusercontent.com/snapotter-hq/SnapOtter/main/branding/social-preview.png)

SnapOtter is the open-source image toolkit with **1.1k+ GitHub stars** that makes paid tools
nervous — **52 image tools**, 16 local AI features, a visual pipeline builder, and a REST API
packed into a single Docker container with no Redis, no PostgreSQL, and no external services.
Background removal, upscaling, OCR, face enhancement, photo restoration, object erasing, and
canvas AI fill all run entirely on your hardware. No internet required. No image ever leaves
your server.

Self-host on Railway for ~$2–5/month — versus remove.bg at $0.05/image or Cloudinary at
$89/month — with unlimited operations, full data ownership, and GDPR/HIPAA compliance.

---

Cloud image processing services like Cloudinary, remove.bg, and TinyPNG route your images
through external servers — every API call sends your files to a third-party system. For
teams handling sensitive product images, client assets, medical imagery, or internal
documents, that's a compliance and privacy problem. Self-hosting solves it, but typically
means configuring multiple services, managing dependencies, and setting up SSL manually.

Railway provisions HTTPS, volume management, and container lifecycle automatically.
SnapOtter's entire toolkit including local AI inference runs inside your container.

Typical cost: **~$2–5/month** on Railway's Hobby plan. remove.bg charges $0.05 per image
— 1,000 background removals costs $50 in API fees. SnapOtter runs unlimited removals at flat
compute pricing with zero external API calls.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Snapotter | `snapotter/snapotter:1.16.0` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 1349 | - |
| `DB_PATH` | /data/snapotter.db | - |
| `DEFAULT_PASSWORD` | (secret) | User set the password |
| `FILES_STORAGE_PATH` | data/files | - |

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/snapotter)
