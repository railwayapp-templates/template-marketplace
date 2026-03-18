# Deploy Thumbor (Image Optimisation & Transformation Service) on Railway

Thumbor [Mar ’26] (Cloudinary, Imgix & Imgproxy alternative) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/thumbor)

## About

Thumbor is a free, open-source **image optimization and processing service** available on GitHub. It allows developers and businesses to resize, crop, filter, and optimize images on-the-fly, making it a powerful **Cloudinary alternative**. With Thumbor, you gain complete control over your image pipelines, caching, and optimization strategies while benefiting from a strong open-source community on the Thumbor GitHub repository.

You can **self host Thumbor** to manage your image optimization and transformations entirely under your control, with zero third-party involvement. With Thumbor image optimisation, you can:

* Resize images on-the-fly without pre-processing.
* Apply Thumbor filters such as blur, brightness, contrast, watermark, and more.
* Use Thumbor cache to improve performance by storing frequently requested images.
* Run Thumbor as a standalone service or integrate with your apps.

Self-hosting Thumbor on Railway makes it simple to deploy, scale, and manage image optimization pipelines without server management headaches.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| thumbor | [Shinyduo/thumbor](https://github.com/Shinyduo/thumbor) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8888 |
| `LOG_LEVEL` | info |
| `LOADER_CLASS` | thumbor.loaders.http_loader |
| `STORAGE_CLASS` | thumbor.storages.file_storage |
| `ALLOWED_SOURCES` | ['.*'] |
| `ALLOW_UNSAFE_URL` | False |
| `THUMBOR_NUM_PROCESSES` | 4 |
| `FILE_STORAGE_ROOT_PATH` | /data |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Smarty, Dockerfile, Shell

[View on Railway →](https://railway.com/template/thumbor)
