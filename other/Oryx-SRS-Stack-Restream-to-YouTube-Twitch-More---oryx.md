# Deploy Oryx (SRS Stack) | Restream to YouTube, Twitch & More on Railway

Live streaming server: RTMP in, HLS out, restream, 24/7 virtual live, DVR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oryx)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/oryx?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=oryx)

[Oryx](https://github.com/ossrs/oryx) (formerly SRS Stack) is the all-in-one live streaming server from the team behind [SRS](https://ossrs.io/). Stream into it from OBS over RTMP and play the stream back as HLS or HTTP-FLV. You can also restream to YouTube, Twitch, Facebook and others at the same time, loop a video file as a 24/7 virtual live stream, or record streams to MP4. It all runs from one web console.

It's one service, a Railway volume, and a TCP proxy for RTMP.

- **Locked from the first second.** Oryx normally asks whoever opens it first to set the console password. Here the password comes from the `MGMT_PASSWORD` variable, so the console asks you to log in from the start.
- **The right RTMP address.** On Railway, OBS has to stream to the TCP proxy, which is on a different host than the console. The console's Streaming page shows that proxy address, so you can copy it straight into OBS.
- **Playback on your domain.** HLS (`.m3u8`) and HTTP-FLV (`.flv`) are served over HTTPS on the service's Railway domain, ready for a web player or a page you embed it in.
- **Survives redeploys.** Stream keys, restream targets, virtual-live playlists and recordings live on the volume. On a redeploy Oryx saves its settings first.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Oryx | [two-workspaces/oryx](https://github.com/two-workspaces/oryx) (root: /) | TCP service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 2022 | Port of the Oryx console and HLS/FLV playback behind the Railway domain - leave as is |
| `MGMT_PASSWORD` | (secret) | Password for the Oryx console - to change it, edit this variable and redeploy |
| `REACT_APP_LOCALE` | en | Console language: en or zh |

## Configuration

- **Healthcheck:** `/terraform/v1/host/versions`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1935
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/oryx)
