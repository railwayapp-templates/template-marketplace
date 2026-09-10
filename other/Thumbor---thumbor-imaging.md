# Deploy Thumbor on Railway

Image CDN that crops, resizes and filters photos from a URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/thumbor-imaging)

## About

Thumbor is an open-source imaging service that crops, resizes, filters and optimises images on demand, straight from a URL. Instead of generating every thumbnail ahead of time, you ask for `/300x200/smart/` and Thumbor fetches the original, finds the faces in it, crops around them and returns that image. Wikipedia, Globo.com, Square, Forbes and Vox Media run it in front of user-generated photography, where nobody can hand-crop a million uploads and a centred crop cuts heads off.

Self-host Thumbor on Railway with the production shape already wired up. The `thumbor` service answers requests on a public URL; `remotecv` is a separate OpenCV worker that runs detection off the request path, as upstream's own documentation asks; `Redis` carries the detection queue and the focal points the two share; and a managed bucket holds the fetched originals and the rendered results, so no service needs a volume. Every URL is HMAC-signed, so the deployment is not an open image proxy.

![Thumbor, remotecv and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788974166/thumbor-architecture.png)

Thumbor serves one uploaded photo at a dozen sizes and aspect ratios with no designer in the loop. Self-host it when image URLs are part of the product, when the sources are private, or when a CDN's pricing stops adding up.

- Smart cropping driven by OpenCV face, eye and feature detection
- Resize, fit-in, flip, rotate and manual crop from the URL
- Filters for grayscale, blur, brightness, watermarking, rounded corners and format
- Automatic WebP and AVIF when the browser advertises support
- Pluggable loaders, storages, filters and detectors through a plugin API
- Signed URLs, so only holders of the key can request a transformation

The Railway architecture splits that across three services. `thumbor` validates the signature, fetches the source, transforms it and returns the result. `remotecv` takes detection jobs off a Redis queue, runs OpenCV against the source and writes the focal points back — detection is CPU-heavy, and doing it in the request blocks the server under load. `Redis` is both that queue and the shared store for those focal points. The bucket caches originals under `st/` and renders under `rs/`, so a repeat request is one object read.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| remotecv | [gridalpha/thumbor-railway](https://github.com/gridalpha/thumbor-railway) | Worker |
| Redis | `redis:8.2` | Database |
| thumbor | [gridalpha/thumbor-railway](https://github.com/gridalpha/thumbor-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | remotecv | 8080 | Health check listening port |
| `ROLE` | remotecv | worker | Selects the OpenCV detection worker role |
| `REDIS_URL` | remotecv | - | Detection queue and focal-point store |
| `DETECTOR_TIMEOUT` | remotecv | 60 | Seconds one detection job may run |
| `THUMBOR_LOG_LEVEL` | remotecv | info | Worker log level |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | thumbor | 8888 | HTTP listening port |
| `ROLE` | thumbor | server | Selects the HTTP image server role |
| `MAX_AGE` | thumbor | 86400 | Cache-Control max-age on renders |
| `QUALITY` | thumbor | 80 | JPEG quality for rendered images |
| `AUTO_AVIF` | thumbor | false | Serve AVIF when the browser accepts it |
| `AUTO_WEBP` | thumbor | true | Serve WebP when the browser accepts it |
| `MAX_WIDTH` | thumbor | 0 | Maximum requested width, 0 unlimited |
| `REDIS_URL` | thumbor | - | Detection queue and focal-point store |
| `S3_BUCKET` | thumbor | - | Bucket for source and result caches |
| `S3_REGION` | thumbor | - | Bucket placement region |
| `MAX_HEIGHT` | thumbor | 0 | Maximum requested height, 0 unlimited |
| `S3_ENDPOINT` | thumbor | - | S3 API endpoint |
| `SECURITY_KEY` | thumbor | - | HMAC key that signs every image URL |
| `DETECTION_MODE` | thumbor | queued | queued, local or none |
| `UPLOAD_ENABLED` | thumbor | false | Keep the unauthenticated upload endpoint off |
| `ALLOWED_SOURCES` | thumbor | - | Comma-separated hosts the loader may fetch |
| `ALLOW_UNSAFE_URL` | thumbor | false | Reject unsigned /unsafe/ URLs |
| `S3_ACCESS_KEY_ID` | thumbor | - | Bucket access key id |
| `THUMBOR_LOG_LEVEL` | thumbor | info | Application log level |
| `S3_SECRET_ACCESS_KEY` | thumbor | (secret) | Bucket secret key |
| `STORAGE_EXPIRATION_SECONDS` | thumbor | 2592000 | Cache lifetime for originals and results |
| `ACCESS_CONTROL_ALLOW_ORIGIN_HEADER` | thumbor | * | CORS origin header on responses |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/thumbor-imaging)
