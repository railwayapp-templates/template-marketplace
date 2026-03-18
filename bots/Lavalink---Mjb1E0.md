# Deploy Lavalink on Railway

Standalone audio sending node based on Lavaplayer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Mjb1E0)

## About

# Lavalink

<img alt="Lavalink logo" width="200" src="https://raw.githubusercontent.com/lavalink-devs/Lavalink/refs/heads/master/branding/lavalink.svg" align="right">

A standalone audio sending node based on [Lavaplayer](https://github.com/lavalink-devs/lavaplayer) and [Koe](https://github.com/KyokoBot/koe).
Allows for sending audio without it ever reaching any of your shards.

Being used in production by FredBoat, Dyno, LewdBot, and more.

[__**Learn more here →**__](https://github.com/lavalink-devs/Lavalink)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lavalink 4 | `ghcr.io/lavalink-devs/lavalink:4-alpine` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LOGGING_REQUEST_ENABLED` | true | - |
| `LAVALINK_SERVER_PASSWORD` | (secret) | Your lavalink access password. This is used for client to authenticate to the server. |
| `METRICS_PROMETHEUS_ENABLED` | false | - |
| `LAVALINK_SERVER_GC_WARNINGS` | true | - |
| `LAVALINK_SERVER_SOURCES_HTTP` | true | - |
| `LAVALINK_SERVER_SOURCES_NICO` | false | - |
| `LAVALINK_SERVER_SOURCES_LOCAL` | false | - |
| `LAVALINK_SERVER_SOURCES_VIMEO` | true | - |
| `LAVALINK_SERVER_FILTERS_VOLUME` | true | - |
| `LAVALINK_SERVER_SOURCES_TWITCH` | false | - |
| `LAVALINK_SERVER_FILTERS_KARAOKE` | true | - |
| `LAVALINK_SERVER_FILTERS_TREMOLO` | true | - |
| `LAVALINK_SERVER_FILTERS_VIBRATO` | true | - |
| `LAVALINK_SERVER_SOURCES_YOUTUBE` | false | - |
| `LOGGING_REQUEST_INCLUDE_HEADERS` | false | - |
| `LOGGING_REQUEST_INCLUDE_PAYLOAD` | true | - |
| `LAVALINK_SERVER_FILTERS_LOW_PASS` | true | - |
| `LAVALINK_SERVER_FILTERS_ROTATION` | true | - |
| `LAVALINK_SERVER_SOURCES_BANDCAMP` | true | - |
| `LAVALINK_SERVER_FILTERS_EQUALIZER` | true | - |
| `LAVALINK_SERVER_FILTERS_TIMESCALE` | true | - |
| `LAVALINK_SERVER_USE_SEEK_GHOSTING` | true | - |
| `LAVALINK_DEFAULT_PLUGIN_REPOSITORY` | https://maven.lavalink.dev/releases | - |
| `LAVALINK_SERVER_BUFFER_DURATION_MS` | 400 | - |
| `LAVALINK_SERVER_FILTERS_DISTORTION` | true | - |
| `LAVALINK_SERVER_RESAMPLING_QUALITY` | LOW | - |
| `LAVALINK_SERVER_SOURCES_SOUNDCLOUD` | true | - |
| `LOGGING_REQUEST_MAX_PAYLOAD_LENGTH` | 1000 | - |
| `LAVALINK_SERVER_FILTERS_CHANNEL_MIX` | true | - |
| `LOGGING_REQUEST_INCLUDE_CLIENT_INFO` | true | - |
| `LOGGING_REQUEST_INCLUDE_QUERY_STRING` | true | - |
| `LAVALINK_SERVER_OPUS_ENCODING_QUALITY` | 10 | - |
| `LAVALINK_SERVER_PLAYER_UPDATE_INTERVAL` | 5 | - |
| `LAVALINK_SERVER_YOUTUBE_SEARCH_ENABLED` | true | - |
| `LAVALINK_SERVER_FRAME_BUFFER_DURATION_MS` | 5000 | - |
| `LAVALINK_SERVER_TRACK_STUCK_THRESHOLD_MS` | 10000 | - |
| `LAVALINK_SERVER_SOUNDCLOUD_SEARCH_ENABLED` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/Mjb1E0)
