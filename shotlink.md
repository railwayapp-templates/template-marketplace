# Deploy Shotlink on Railway

Shotlink is a REST API service that allows capture websites screenshots.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/shotlink)

## About

**Shotlink** is a lightweight and efficient REST API service written in Go that allows you to capture high-quality screenshots of websites programmatically. It uses Chrome Headless via `chromedp` to render dynamic pages with JavaScript, custom styles, and interactivity. Ideal for developers and automation workflows.

Hosting Shotlink involves running a Go-based web service that interfaces with Chrome Headless to process screenshot requests. Once deployed, Snaptor exposes an HTTP API endpoint where clients can send URLs and receive rendered screenshots in return. The service is stateless and lightweight, making it well-suited for deployment on container-based platforms like Railway. You’ll need to ensure a headless browser environment is available and accessible by the Go application.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Shotlink | [Gausix/Shotlink](https://github.com/Gausix/Shotlink) | Worker |

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/shotlink)
