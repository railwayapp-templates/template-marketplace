# Deploy OpenVid on Railway

Video Editor, professional demos and 3D mockups in seconds, in your browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openvid)

## About

OpenVid is a browser-based video recording, editing, and demo creation application built with Next.js. It enables users to record their screen or upload videos, apply professional device mockups, cinematic zooms, 3D effects, custom backgrounds, and export high-quality videos—all without requiring desktop software.

Hosting OpenVid on Railway provides a simple way to deploy a production-ready Next.js application with automatic builds, HTTPS, and public networking. Railway manages the infrastructure while allowing you to configure the external services OpenVid relies on, including Supabase for backend services and media storage, GitHub authentication, and stock media providers such as Pexels, Pixabay, and Unsplash. Video rendering and editing are performed directly in the user's browser using FFmpeg.wasm and modern web technologies, significantly reducing server-side processing requirements. Railway also offers centralized environment variable management, automatic deployments from GitHub, and scalable infrastructure, making it an excellent platform for hosting OpenVid.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openvid | [iqbalexperience/openvid](https://github.com/iqbalexperience/openvid) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PEXELS_API_KEY` | (secret) | https://www.pexels.com/api/ |
| `PIXABAY_API_KEY` | (secret) | https://pixabay.com/api/docs/ |
| `UNSPLASH_ACCESS_KEY` | x.y.z | https://unsplash.com/developers |
| `UNSPLASH_SECRET_KEY` | (secret) | https://unsplash.com/developers |
| `NEXT_PUBLIC_GITHUB_TOKEN` | (secret) | https://github.com/settings/tokens |
| `NEXT_PUBLIC_SUPABASE_URL` | - | https://supabase.com/dashboard | Project -> Settings -> API -> anon public key |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | - | https://supabase.com/dashboard  | Project -> Settings -> API -> Project URL |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, Python, JavaScript

[View on Railway →](https://railway.com/deploy/openvid)
