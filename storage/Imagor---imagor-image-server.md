# Deploy Imagor on Railway

Image processing server that resizes and converts images from a URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/imagor-image-server)

## About

Imagor is an open-source image processing server written in Go on top of libvips, the engine behind many commercial image CDNs. Every transformation lives in the URL — `fit-in/800x600/filters:format(webp):quality(85)/photo.jpg` — so your front-end never pre-generates thumbnails or stores a dozen variants of one asset. It speaks the thumbor URL syntax, making it a drop-in replacement for a thumbor install, and teams self-host Imagor for Cloudinary-style on-the-fly resizing without per-image pricing.

This template runs Imagor as a public HTTP service backed by two Railway object storage buckets. `imagor` is the only service with a domain: it takes a signed request, loads the original from the `imagor-source` bucket (or fetches it over HTTP when the path is a remote URL), renders the variant with libvips, and writes the result to the `imagor-result` bucket so the next identical request is served from cache. Remote originals are saved into `imagor-source` too, so each source is fetched once. The app tier keeps nothing on disk, which is what lets you raise the replica count later.

![Railway diagram of the single public imagor service](https://res.cloudinary.com/rroe4rtk/image/upload/f_auto,q_auto/v1789635083/imagor-architecture.webp)

Self-hosting Imagor makes sense as soon as image delivery becomes a real line item. A commercial image CDN charges per transformation and owns the URL your pages point at; Imagor puts that layer in your own infrastructure, in front of storage you control, for the cost of the container rendering the images.

- Resize, crop, fit-in, stretch, pad, rotate and flip from URL parameters
- Content-aware smart cropping that keeps a photo's subject in frame
- Filters for quality, format, fill, blur, sharpen, grayscale, hue, rounded corners and watermarks
- JPEG, PNG, WebP, AVIF, GIF and TIFF output with automatic WebP/AVIF negotiation, animation included
- HMAC URL signing (SHA1, SHA256 or SHA512), and storage backends for S3, Google Cloud Storage, local disk or plain HTTP

The topology is three pieces. `imagor` is the stateless renderer. `imagor-source` holds originals and caches remote fetches. `imagor-result` holds rendered variants keyed by a digest of the request and is safe to empty at any time, so clearing the derived cache never touches your originals.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imagor | `shumc/imagor:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8000 | HTTP server listening port |
| `AWS_REGION` | - | Region for source bucket |
| `S3_ENDPOINT` | - | Object storage endpoint |
| `IMAGOR_SECRET` | (secret) | HMAC key for URL signature |
| `PROMETHEUS_BIND` | :5000 | Private metrics listener address |
| `PROMETHEUS_PATH` | /metrics | Metrics path on that listener |
| `IMAGOR_AUTO_AVIF` | 1 | Serve AVIF when browser accepts |
| `IMAGOR_AUTO_WEBP` | 1 | Serve WebP when browser accepts |
| `S3_LOADER_BUCKET` | - | Bucket originals are read from |
| `VIPS_CONCURRENCY` | 1 | libvips threads per operation |
| `AWS_ACCESS_KEY_ID` | - | Source bucket access key |
| `S3_STORAGE_BUCKET` | - | Bucket originals are written to |
| `SERVER_ACCESS_LOG` | 1 | One structured log line per request |
| `HTTP_LOADER_ACCEPT` | image/* | Accepted Content-Type from origin |
| `S3_LOADER_BASE_DIR` | source | Key prefix for reading originals |
| `IMAGOR_LOAD_TIMEOUT` | 20s | Source fetch timeout, under request timeout |
| `S3_FORCE_PATH_STYLE` | 1 | Path-style S3 addressing |
| `S3_STORAGE_BASE_DIR` | source | Key prefix for writing originals |
| `VIPS_STRIP_METADATA` | 1 | Strip EXIF and GPS from output |
| `AWS_SECRET_ACCESS_KEY` | (secret) | Source bucket secret key |
| `IMAGOR_REQUEST_TIMEOUT` | 30s | Overall per-request timeout |
| `IMAGOR_CACHE_HEADER_TTL` | 168h | Cache-Control max-age on success |
| `S3_RESULT_STORAGE_BUCKET` | - | Bucket for rendered variants |
| `AWS_RESULT_STORAGE_REGION` | - | Region for result bucket |
| `IMAGOR_PROCESS_QUEUE_SIZE` | 200 | Queued requests before returning 429 |
| `HTTP_LOADER_BLOCK_NETWORKS` | 100.64.0.0/10 | Extra blocked CIDRs for remote fetches |
| `HTTP_LOADER_DEFAULT_SCHEME` | https | Scheme for bare remote hostnames |
| `IMAGOR_PROCESS_CONCURRENCY` | 16 | Max simultaneous libvips operations |
| `S3_RESULT_STORAGE_BASE_DIR` | result | Key prefix for rendered variants |
| `S3_RESULT_STORAGE_ENDPOINT` | - | Endpoint for result bucket |
| `HTTP_LOADER_MAX_ALLOWED_SIZE` | 20971520 | Byte ceiling on a remote fetch |
| `S3_RESULT_STORAGE_EXPIRATION` | 720h | How long a cached variant is reused |
| `IMAGOR_DISABLE_PARAMS_ENDPOINT` | 1 | Hide unsigned params debug endpoint |
| `AWS_RESULT_STORAGE_ACCESS_KEY_ID` | - | Result bucket access key |
| `IMAGOR_RESULT_STORAGE_PATH_STYLE` | digest | Hash result keys instead of full path |
| `HTTP_LOADER_BLOCK_PRIVATE_NETWORKS` | 1 | Block fetches to private addresses |
| `HTTP_LOADER_BLOCK_LOOPBACK_NETWORKS` | 1 | Block fetches to loopback addresses |
| `AWS_RESULT_STORAGE_SECRET_ACCESS_KEY` | (secret) | Result bucket secret key |
| `HTTP_LOADER_BLOCK_LINK_LOCAL_NETWORKS` | 1 | Block fetches to link-local addresses |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/imagor-image-server)
