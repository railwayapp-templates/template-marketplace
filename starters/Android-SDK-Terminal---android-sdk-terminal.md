# Deploy Android SDK Terminal on Railway

Android SDK terminal in your browser — Java 17, ADB, Gradle, no setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/android-sdk-terminal)

## About

Android SDK Terminal gives you a full browser-accessible development environment running Android SDK 34 on Ubuntu 24.04 LTS — no local installation, no Android Studio, no configuration needed. Build APKs, run SDK tools, and use ADB from anywhere. Files and projects you create persist across restarts thanks to a built-in volume mounted at /root.

Hosting Android SDK Terminal on Railway spins up an Ubuntu 24.04 Docker container with Java 17, Gradle, Android SDK 34, and a ttyd web terminal exposed over HTTP. Railway handles the HTTPS proxy, domain, and container lifecycle automatically. A persistent volume is mounted at /root, meaning your projects and scripts survive redeploys. You simply set your username and password, deploy, and access your Android build environment from any browser.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| android-railway | [Amritasha/android-railway](https://github.com/Amritasha/android-railway) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7681 |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/root`

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/android-sdk-terminal)
