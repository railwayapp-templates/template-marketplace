# Deploy Blazor WebAssembly Starter on Railway

Client-side Blazor WASM with C# - runs entirely in the browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/blazor-webassembly-starter)

## About

A production-ready Blazor WebAssembly template that runs entirely in the browser. Build interactive web applications with C# and .NET 9 without JavaScript. Perfect for SPAs, PWAs, and offline-capable apps with ultra-low hosting costs since everything executes client-side.

Blazor WebAssembly compiles your C# code to WebAssembly and runs entirely in the browser with no server dependency after initial download. Railway handles the Docker build process that compiles your .NET 9 application to WASM, then serves the static files via nginx on Alpine Linux. The multi-stage build optimizes image size and compilation speed. nginx is configured with proper MIME types for WebAssembly files, gzip compression for faster loading, and SPA routing to handle client-side navigation. Public networking is pre-configured with automatic SSL certificates. After deployment, your app downloads once to the browser and runs completely client-side with native-like performance.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| blazor-wasm-starter | [TrailBlazors/blazor-wasm-starter](https://github.com/TrailBlazors/blazor-wasm-starter) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** CSS, HTML, Dockerfile, C#

[View on Railway →](https://railway.com/template/blazor-webassembly-starter)
