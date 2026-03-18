# Deploy Mirotalk on Railway

A simple, secure, and fast browser-based real-time video calling solution

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mirotalk)

## About

## Overview

MiroTalk is a free browser-based, real-time video calling service. Start your next video call with a single click.

This template will create a Railway deployment with MiroTalk already installed.

## Highlights

- Screen sharing
- WebCam streaming
- Chat room
- Meeting recording
- Interactive whiteboard
- File sharing
- Total privacy
- Maximum security

## Learn More

- [MiroTalk p2p](https://p2p.mirotalk.com/)
- [GitHub](https://github.com/miroslavpejic85/mirotalk)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mirotalk-webrtc-p2p | [miroslavpejic85/mirotalk](https://github.com/miroslavpejic85/mirotalk) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3000 | - |
| `API_KEY_SECRET` | (secret) | API |
| `STUN_SERVER_URL` | stun:stun.l.google.com:19302 | - |
| `STUN_SERVER_ENABLED` | true | https://bloggeek.me/webrtcglossary/stun/ |
| `TURN_SERVER_ENABLED` | false | https://bloggeek.me/webrtcglossary/turn/ |
| `TURN_SERVER_USERNAME` | (secret) | - |
| `TURN_SERVER_CREDENTIAL` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Tags:** javascript, webrtc, video call · **Languages:** JavaScript, HTML, CSS, PHP, Python, Shell, Dockerfile

[View on Railway →](https://railway.com/template/mirotalk)
