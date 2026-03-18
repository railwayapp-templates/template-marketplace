# Deploy FFmpeg REST API on Railway

FFmpeg REST API with S3-compatible Storage Support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/ffmpeg-rest-api)

## About

A REST API that wraps FFmpeg for media processing operations. Convert videos to MP4, convert to animated GIF, extract audio tracks, extract frames, convert audio to MP3/WAV, convert images to JPG, resize images, and probe media metadata. Built with Node.js, Hono, and BullMQ for reliable async job processing.

<p align="center">
  <img width="800" alt="FFmpeg REST API Test Output" src="https://github.com/crisog/ffmpeg-rest/blob/main/docs-preview.png?raw=true">
</p>

Hosting FFmpeg REST API requires a Node.js environment with FFmpeg binaries and Redis for job queue management. The API processes media files asynchronously using BullMQ workers and supports two storage modes configured via the `STORAGE_MODE` environment variable:

- **`stateless`** (default) - Files returned directly in HTTP responses
- **`s3`** - Files uploaded to S3-compatible storage, URLs returned

### Stateless Mode (Default)

Files are processed and returned directly in the HTTP response. Simple and straightforward for immediate consumption.

**Cost Consideration**: On Railway, stateless mode is cheaper than running S3 Mode unless you have free egress at your S3-storage provider (like Cloudflare R2). Railway charges **$0.05/GB egress** vs S3's typical **$0.09/GB**, but you trade off file persistence - processed files aren't stored for later retrieval.

#### Stateless Binary Cache

Stateless mode can optionally cache binary conversion outputs using `cacache` to avoid rerunning FFmpeg on identical inputs + params.

- Cache scope: binary conversion endpoints only (not `/.../url` S3 responses, not `/media/info`)
- Cache key: SHA-256 of input bytes + job type + normalized processing params
- Retention: TTL + size cap (enforced on startup, reads, and writes)
- Storage: local filesystem (ephemeral by default)

### S3 Mode

Processed files are uploaded to S3-compatible storage and a URL is returned. This mode significantly reduces egress bandwidth costs since users download the processed files directly from S3 rather than through your API server. Ideal for production deployments where bandwidth costs matter.

**Why Cloudflare R2?** R2 is S3-compatible and offers **no egress fees**, which dramatically lowers costs when serving processed media from your bucket via Cloudflare's global network. While any S3-compatible storage works, R2 is the only major provider with zero egress charges - making it the optimal choice for media delivery.

Configure S3 mode by setting `STORAGE_MODE=s3` and providing S3 credentials in your environment variables (see **Environment Configuration** below).

The API is production-ready with OpenAPI documentation, type-safe validation, and configurable concurrency for optimal resource utilization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:7-alpine` | Database |
| FFmpeg REST | `ghcr.io/crisog/ffmpeg-rest-standalone:1.2.0` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `PORT` | FFmpeg REST | 3000 | - |
| `NODE_ENV` | FFmpeg REST | production | - |
| `TEMP_DIR` | FFmpeg REST | /tmp/ffmpeg-rest | - |
| `CACHE_DIR` | FFmpeg REST | /tmp/ffmpeg-rest/cache | Cache directory (defaults to <TEMP_DIR>/cache) |
| `AUTH_TOKEN` | FFmpeg REST | (secret) | - |
| `STORAGE_MODE` | FFmpeg REST | stateless | Set to `s3` if you want to enable S3 mode. You'll need to configure S3 variables. |
| `CACHE_ENABLED` | FFmpeg REST | true | Enable/disable stateless binary cache |
| `MAX_FILE_SIZE` | FFmpeg REST | 104857600 | - |
| `S3_PUBLIC_URL` | FFmpeg REST | - | Publicly accessible URL to the S3 bucket |
| `S3_PATH_PREFIX` | FFmpeg REST | - | Subdirectory where files will be stored within the bucket |
| `CACHE_TTL_HOURS` | FFmpeg REST | 2160 | Entry TTL in hours (90 days) |
| `S3_DEDUP_ENABLED` | FFmpeg REST | true | - |
| `CACHE_MAX_SIZE_MB` | FFmpeg REST | 1024 | Max cache size on disk in MiB (1 GiB) |
| `S3_DEDUP_TTL_DAYS` | FFmpeg REST | 90 | - |
| `S3_SECRET_ACCESS_KEY` | FFmpeg REST | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/ffmpeg-rest-api)
