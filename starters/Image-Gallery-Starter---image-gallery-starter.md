# Deploy Image Gallery Starter on Railway

Prompt archive. Model notes. Hosted media.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/image-gallery-starter)

## About

Image Gallery Starter is a public creator gallery for hosted generative media. It ships as a polished one-page Next.js app with hero previews, featured masonry groups, archive cards, collection stacks, protected image interactions, and a lightbox for prompt, model, and size metadata.

Use it when you want a deployable image portfolio rather than a private dashboard or managed SaaS product. Image Gallery Starter serves Cloudflare Images delivery URLs from a single source file, keeps gallery data easy to replace, and includes static security headers, CSP, deploy configs, and optional Sentry observability.

Image Gallery Starter runs as a public gallery with no database, auth, billing, server actions, or private workspace state. Visitors can browse the homepage, open images in a lightbox, inspect prompt and model metadata, and move through the archive without signing in.

The app reads image records from `lib/gallery/source-gallery-images.ts`. Hero, featured, archive, and collection views all derive from that shared source so you can replace the starter media once and keep every gallery surface consistent.

Cloudflare Images handles the hosted media delivery. The app builds image URLs from `NEXT_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH`, the image ID, and the variant or options string. You can use the default `https://imagedelivery.net` origin or a custom Cloudflare Images delivery domain with the `cdn-cgi/imagedelivery` path.

For production posture, Image Gallery Starter includes static security headers and a small CSP through `lib/security/csp.ts` and `next.config.ts`. Sentry is optional: leave `NEXT_PUBLIC_SENTRY_DSN` blank for a no-op runtime, or set it when you want browser and server error reporting with source-map upload configured through CI secrets.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| image-gallery-starter | [babysea-community/image-gallery-starter](https://github.com/babysea-community/image-gallery-starter) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SENTRY_AUTH_TOKEN` | (secret) |
| `NEXT_PUBLIC_CLOUDFLARE_IMAGES_DELIVERY_ORIGIN` | https://imagedelivery.net |

**Category:** Starters · **Languages:** TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/image-gallery-starter)
