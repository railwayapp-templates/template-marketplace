# Deploy Lavalink on Railway

Deploy and Host Lavalink with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/lavalink-1)

## About

Lavalink is designed to be deployed as a standalone audio node. Running it separately from your bot improves stability, scalability, and performance, especially for multi-server usage.

Lavalink can be hosted on VPS, dedicated servers, or container platforms such as Docker. It requires a stable network connection and sufficient CPU and memory for audio encoding and streaming.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Lavalink 2026 | `ghcr.io/lavalink-devs/lavalink:4-alpine` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `JAVA_TOOL_OPTIONS` | -Xmx768m -Xms256m -XX:+UseG1GC | Just Change the "768m" to 3/4 your ram resource, to prevent restart and OOM. |
| `LOGGING_REQUEST_ENABLED` | true | - |
| `LAVALINK_SERVER_PASSWORD` | (secret) | Fill with password that you used for .env |
| `METRICS_PROMETHEUS_ENABLED` | false | - |
| `LAVALINK_PLUGINS_0_SNAPSHOT` | false | - |
| `LAVALINK_SERVER_GC_WARNINGS` | true | - |
| `LAVALINK_SERVER_SOURCES_HTTP` | true | - |
| `LAVALINK_SERVER_SOURCES_NICO` | false | - |
| `LAVALINK_PLUGINS_0_DEPENDENCY` | dev.lavalink.youtube:youtube-plugin:1.16.0 | Atleast use latest plugin |
| `LAVALINK_SERVER_SOURCES_LOCAL` | false | - |
| `LAVALINK_SERVER_SOURCES_VIMEO` | true | - |
| `LAVALINK_SERVER_FILTERS_VOLUME` | true | - |
| `LAVALINK_SERVER_SOURCES_TWITCH` | false | - |
| `LAVALINK_SERVER_FILTERS_KARAOKE` | true | - |
| `LAVALINK_SERVER_FILTERS_TREMOLO` | true | - |
| `LAVALINK_SERVER_FILTERS_VIBRATO` | true | - |
| `LAVALINK_SERVER_SOURCES_YOUTUBE` | false | - |
| `LOGGING_REQUEST_INCLUDE_HEADERS` | true | - |
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

[View on Railway →](https://railway.com/template/lavalink-1)
