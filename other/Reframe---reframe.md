# Deploy Reframe on Railway

Self Hosted video editor in your browser. No login, no uploads, no ads.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/reframe)

## About

Reframe is a free, open-source video editor that runs entirely in the browser using WebAssembly and FFmpeg. Users can resize, trim, rotate, convert, and export videos without creating an account or uploading files to a server. Built with Next.js and TypeScript, Reframe delivers a fast, privacy-first editing experience while keeping all media processing on the user's device.

Hosting Reframe on Railway provides a simple way to deploy the application's static frontend without managing infrastructure manually. Railway automatically builds the Next.js project, serves the generated static assets over HTTPS, and provides public networking through a custom Railway domain. Since Reframe performs all video processing locally in the browser using FFmpeg WebAssembly, no server-side rendering, background workers, databases, or persistent storage are required for normal operation. Railway also streamlines deployments through Git-based workflows, making it easy to publish updates while providing reliable global hosting and automatic HTTPS for end users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| reframe | [iqbalexperience/reframe](https://github.com/iqbalexperience/reframe) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/reframe)
