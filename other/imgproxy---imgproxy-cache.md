# Deploy imgproxy on Railway

Image server that resizes and converts images straight from a URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/imgproxy-cache)

## About

imgproxy is a standalone image server that resizes, crops, converts and optimises images the moment they are requested. You keep one original — in object storage or on any host reachable over HTTP — and ask for a derivative by putting the transformation in the URL: a 400×400 smart crop, a blurred placeholder, an AVIF for browsers that accept one. Nothing is pre-generated, nothing is written back, and the URL is signed so only your application can request a transformation.

Deploy imgproxy on Railway and this template gives you two services rather than one. **imgproxy** does the processing on the private network with no public address of its own. **cache** is an nginx reverse-proxy cache in front of it, holding rendered images on a Railway volume and serving repeats without touching imgproxy again — imgproxy's internal cache is a paid feature, so an external cache is what upstream recommends for the open-source build. A managed object-storage bucket is wired in as an `s3://` source, and only the cache service is published, so every request enters through it and is answered from disk from the second hit onward.

![Diagram of the nginx cache and imgproxy services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788490991/imgproxy-architecture.png)

imgproxy makes every derivative a pure function of a URL and encodes to the best format the browser advertises. It is written in Go on top of libvips, which streams and shrinks on load rather than decoding whole images into memory, so a 2000×1400 JPEG becomes a thumbnail in tens of milliseconds on a small container.

- Resize, fit, fill, crop, pad, zoom, rotate, trim, blur and sharpen, all expressed in the URL path
- Smart gravity, which crops around the most salient region instead of the centre
- WebP, AVIF and JPEG XL negotiation from `Accept`, with `Vary: Accept` set correctly
- Sources over HTTP(S), S3-compatible storage, Google Cloud Storage, Azure Blob Storage and Swift
- URL signing, source allow-lists, resolution and file-size ceilings, metadata stripping by default
- Prometheus, OpenTelemetry, Datadog, New Relic and Sentry instrumentation built in

**imgproxy** holds the signing key and storage credentials and never receives traffic directly. **cache** terminates public requests, keys on the URL plus the `Accept` and client-hint headers, serves stale content while imgproxy redeploys, and collapses a burst of requests for one cold image into a single upstream call.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imgproxy | `darthsim/imgproxy:latest` | Worker |
| cache | [gridalpha/imgproxy-cache-railway](https://github.com/gridalpha/imgproxy-cache-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | imgproxy | 8080 | HTTP listen port, read by imgproxy itself |
| `IMGPROXY_KEY` | imgproxy | - | Hex HMAC key for URL signatures |
| `IMGPROXY_SALT` | imgproxy | - | Hex HMAC salt for URL signatures |
| `PRIVATE_ORIGIN` | imgproxy | imgproxy.railway.internal:8080 | Private host:port for the cache tier |
| `IMGPROXY_USE_S3` | imgproxy | true | Enables the s3:// source scheme |
| `AWS_ACCESS_KEY_ID` | imgproxy | - | Bucket access key, AWS SDK default chain |
| `IMGPROXY_AUTO_AVIF` | imgproxy | true | AVIF negotiation from Accept header |
| `IMGPROXY_AUTO_WEBP` | imgproxy | true | WebP negotiation from Accept header |
| `IMGPROXY_S3_REGION` | imgproxy | - | Bucket placement region |
| `IMGPROXY_S3_ENDPOINT` | imgproxy | - | Object storage endpoint URL |
| `AWS_SECRET_ACCESS_KEY` | imgproxy | (secret) | Bucket secret key |
| `IMGPROXY_PROMETHEUS_BIND` | imgproxy | :8081 | Private metrics listener, must differ from PORT |
| `IMGPROXY_S3_ALLOWED_BUCKETS` | imgproxy | - | Restrict reads to this bucket |
| `PORT` | cache | 8080 | nginx listen port |
| `CACHE_TTL` | cache | 30d | Freshness window for 200/301/302 |
| `CACHE_INACTIVE` | cache | 30d | Eviction window for unrequested entries |
| `CACHE_MAX_SIZE` | cache | 3g | Disk budget for cached images |
| `IMGPROXY_UPSTREAM` | cache | - | host:port of the processing service |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cache`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/imgproxy-cache)
