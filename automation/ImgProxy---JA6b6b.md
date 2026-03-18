# Deploy ImgProxy on Railway

Easily resize images on the fly.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/JA6b6b)

## About

[imgproxy](https://imgproxy.net/) is a fast and secure standalone server for resizing, processing, and converting images. The guiding principles behind imgproxy are security, speed, and simplicity.

imgproxy is able to quickly and easily resize images on the fly, and it's well-equipped to handle a large amount of image resizing. imgproxy is a fast, secure replacement for all the image resizing code inside your web application (such as resizing libraries, or code that calls ImageMagick or GraphicsMagic). It's also an indispensable tool for processing images from a remote source. With imgproxy, you don’t need to repeatedly prepare images to fit your design every time it changes.

Learn about how to use imageproxy to prcess images or get images info.

https://docs.imgproxy.net/category/usage

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imgproxy | `ghcr.io/imgproxy/imgproxy:latest` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

**Category:** Automation

[View on Railway →](https://railway.com/deploy/JA6b6b)
