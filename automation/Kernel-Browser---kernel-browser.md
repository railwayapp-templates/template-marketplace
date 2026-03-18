# Deploy Kernel Browser on Railway

Crazy Fast Browser Infrastructure

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kernel-browser)

## About

Kernel Browser is a cloud-native, sandboxed Chromium environment built for browser automation and AI agents. It exposes a REST API for screen recording, screenshots, keyboard/mouse control, file system access, and process execution — all backed by a full X11 desktop with Chrome DevTools Protocol support.

Deploying Kernel Browser involves running a multi-service Docker container that orchestrates Xorg, Mutter (window manager), D-Bus, Chromium, and a Go-based API server via Supervisord. The container starts a virtual display, launches a headful Chromium instance with remote debugging enabled, and exposes two network interfaces: a REST API on port 10001 for automation commands and a WebSocket proxy on port 9222 for direct Chrome DevTools Protocol access. The image requires running as root with `--no-sandbox` and `--disable-dev-shm-usage` flags due to container constraints. A health check on `/spec.yaml` confirms full stack readiness.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kernel-images | [serkanhaslak/kernel-images](https://github.com/serkanhaslak/kernel-images) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 10001 | API server port. |
| `DISPLAY_NUM` | 1 | X11 display number |
| `RUN_AS_ROOT` | true | Run container as root (required on Railway) |
| `CHROMIUM_FLAGS` | --no-sandbox --no-zygote --disable-dev-shm-usage | Chromium launch flags (required for containerized env) |
| `KERNEL_IMAGES_API_PORT` | 10001 | API port (used by supervisor) |
| `KERNEL_IMAGES_API_FRAME_RATE` | 10 | Recording frame rat |
| `KERNEL_IMAGES_API_OUTPUT_DIR` | /home/kernel/recordings | Recording output directory |
| `KERNEL_IMAGES_API_MAX_SIZE_MB` | 500 | Max recording size |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/kernel`

**Category:** Automation · **Languages:** Go, Shell, TypeScript, Vue, Makefile, JavaScript, C, Dockerfile, Python, SCSS, M4, HTML

[View on Railway →](https://railway.com/template/kernel-browser)
