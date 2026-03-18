# Deploy Rust Image API on Railway

Fast image manipulation API in Rust

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zHlq1G)

## About

A fast image manipulation API that can modify images on the fly.

### Usage

```
GET /v1/resize/w/?url=
    resize image `` pixels wide, without changing the aspect ratio

GET /v1/resize/h/?url=
    resize image to `` pixels tall, without changing the aspect ratio

GET /v1/crop////?url=
    crop image to ``x`` pixels, starting from position (``, ``)

GET /v1/convert/?url=
    convert image to `` format
    format: png, jpeg, webp

GET /v1/flip/?url=
    flip image  to `` orientation
    orientation: horizontal, vertical

GET /v1/grayscale?url=
    convert image to grayscale

GET /v1/invert?url=
    invert image

GET /v1/brighten/?url=
    brighten image by ``, negative values decrease the brightness and positive values increase it

GET /v1/blur/?url=
    blur image with `` sigma (this is a slow endpoint and could potentially timeout)

GET /v1/rotate/?url=
    rotate image by `` degrees, degree can be 90, 180, 270

GET /v1/unsharpen//?url=
    unsharpen image, sigma is the amount to blur the image by, threshold is a control of how much to sharpen.
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| image-server | [arjunkomath/rust-image-api](https://github.com/arjunkomath/rust-image-api) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Rust, HTML, Dockerfile

[View on Railway →](https://railway.com/template/zHlq1G)
