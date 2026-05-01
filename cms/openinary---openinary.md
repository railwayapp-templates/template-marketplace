# Deploy openinary on Railway

Self-hosted Cloudinary alternative. Image & video transforms via URL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openinary)

## About

[Openinary](https://openinary.dev) is a self-hosted, open-source media processing platform — the free alternative to
   Cloudinary. Transform images and videos on-the-fly using simple URL parameters, with built-in S3-compatible storage and an
   admin dashboard.

   ## About Hosting Openinary

   Openinary runs as a single Docker container that bundles Nginx, a Node.js API with FFmpeg for media processing, and a Next.js
   admin dashboard. It connects to any S3-compatible bucket (AWS S3, Cloudflare R2, Wasabi, MinIO, DigitalOcean Spaces) for
   persistent media storage. A Railway persistent volume at /app/data stores the SQLite database for admin accounts and API
   keys. No external database is required — just your S3 credentials and you're live.

   ## Common Use Cases

   - Replace Cloudinary in your app with a zero-cost-per-transformation media pipeline
   - Serve optimized WebP/AVIF images and compressed videos from your own S3 bucket
   - Build a media CDN for SaaS products that need image resizing and video thumbnails

   ## Dependencies for Openinary Hosting

   - **S3-compatible storage bucket** — AWS S3, Cloudflare R2, Wasabi, MinIO, or DigitalOcean Spaces
   - **Railway Persistent Volume** — mounted at /app/data to persist the SQLite database across deploys

   ### Deployment Dependencies

   - [Openinary Documentation](https://docs.openinary.dev)
   - [Openinary GitHub Repository](https://github.com/openinary/openinary)
   - [S3-compatible Storage Setup Guide](https://docs.openinary.dev)

   ### Implementation Details

   Once deployed, Openinary exposes a URL-based transformation API:

   ```
   # Resize image to 800×600, convert to WebP
   GET /t/w_800,h_600,f_webp,q_80/photo.jpg

   # Extract video thumbnail at 5 seconds
   GET /t/w_800,h_450,so_5,f_avif/video.mp4

   # Compress video for web
   GET /t/w_1280,h_720,q_75/video.mp4
   ```

   Visit /setup after first deploy to create your admin account and generate API keys.

   ## Why Deploy Openinary on Railway?

   Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have
   to deal with configuration, while allowing you to vertically and horizontally scale it.

   By deploying Openinary on Railway, you are one step closer to supporting a complete full-stack application with minimal
   burden. Host your servers, databases, AI agents, and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openinary-railway-template | [TheAlexRamirez/openinary-railway-template](https://github.com/TheAlexRamirez/openinary-railway-template) | Worker |

**Category:** CMS

[View on Railway →](https://railway.com/deploy/openinary)
