# Deploy Nginx RTMP on Railway

A simple self-hosted streaming live room.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nginx-rtmp)

## About

Nginx RTMP is an Nginx-based media streaming server for live video delivery. It supports RTMP publishing and HLS playback, making it suitable for receiving live streams from tools such as OBS and serving them to compatible video players. The nginx-rtmp-module also supports H264/AAC streaming and other live-media features.

Hosting Nginx RTMP on Railway involves deploying the `tiangolo/nginx-rtmp:latest` Docker image as a Railway service. The configuration listens for RTMP streams on port `1935` and serves the HLS output and web content over HTTP on port `80`. Railway provides the networking layer needed to expose both endpoints publicly. HLS segments are generated under `/tmp/hls`, so persistent storage is not required for the documented configuration. No database or runtime environment variables are required. Once deployed, you can generate a Railway domain for HTTP access and use a TCP proxy for RTMP publishing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nginx-rtmp | `tiangolo/nginx-rtmp:latest` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1935

**Category:** Other

[View on Railway →](https://railway.com/deploy/nginx-rtmp)
