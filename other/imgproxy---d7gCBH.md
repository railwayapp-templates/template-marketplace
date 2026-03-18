# Deploy imgproxy on Railway

Fast and secure standalone server for resizing and converting remote images

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/d7gCBH)

## About

<center>
<img src="https://cdn.derock.dev/imgproxy-large.svg">
</center>

## Overview
Imgproxy is a performant 1-container server for resizing, converting, cropping, and manipulating images on-the-fly. The guiding principles behind imgproxy are security, speed, and simplicity.

Imgproxy was built with security in mind. This template will automatically set the imgproxy key and salt. Make sure your application use these key or else imgproxy will refuse to serve the request.

## Highlights
- Fast and performant: Imgproxy was built using `libvips`, the most efficient image processing library available.
- Feature rich: You can crop, resize, zoom, enlarge, rotate, add backgrounds, and add watermarks all for free. [Pro](https://imgproxy.net/#pro) version comes with even more features for advanced users.
- Stability: This template is automatically configured with a health check to make sure your imgproxy instance is always up and running.

## Configuration
By default, this template will generate the `IMGPROXY_KEY`, `IMGPROXY_SALT`, `IMGPROXY_USE_ETAG`, and `IMGPROXY_TTL` to a sensible default value. For further customization, please take a look at the [documentation](https://docs.imgproxy.net/configuration)

### Generating key and salt
imgproxy expects the `IMGPROXY_KEY` and `IMGPROXY_SALT` to be hex-encoded. The template will automatically configure this for you.

If you want to generate your own, run the following on a linux machine:

```
echo $(xxd -g 2 -l 64 -p /dev/random | tr -d '\n')
```

See [this page](https://docs.imgproxy.net/configuration?id=url-signature) for more info.

## Updating
This template currently deploys imgproxy version 3.18.2 which is the latest version as of August 4th, 2023. You can edit the docker image version manually if a newer version is available.

## License and Links
imgproxy is distributed with the [MIT License](https://github.com/imgproxy/imgproxy/blob/master/LICENSE). A "pro" version of imgproxy is available and may be licensed under a different license.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imgproxy | `darthsim/imgproxy:v3.18.2` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `IMGPROXY_KEY` | - | Key used to verify signed URLs. |
| `IMGPROXY_TTL` | 31536000 | Cache-Control header length in seconds. Default is 1 year. |
| `IMGPROXY_SALT` | - | Salt to use for signed URLs. |
| `IMGPROXY_USE_ETAG` | true | Enables ETag for HTTP cache control. |
| `IMGPROXY_MAX_SRC_RESOLUTION` | 16.8 | Images larger than this will be rejected. Default is 16.8 megapixels. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/d7gCBH)
