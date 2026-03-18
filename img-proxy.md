# Deploy imgproxy [Updated Mar ’26] (On-the-Fly Image Processing Server) on Railway

ImgProxy [Mar ’26] (Fast Resizing & CDN Alternative), Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/img-proxy)

## About

Imgproxy is a fast, secure, and high-performance image processing server built specifically for modern web applications. It allows developers to resize, crop, compress, convert, and optimize images on the fly, directly at request time. Imgproxy is widely used as a backend service for image delivery in production systems where speed, security, and scalability matter.

Imgproxy is open source, written in Go, and designed to be extremely efficient. It is commonly used behind CDNs and works perfectly with object storage like S3, GCS, or any HTTP-accessible image source.

With Railway, deploying Imgproxy becomes effortless. You can run a production-ready Imgproxy service with one click, without worrying about Docker configs, ports, or infrastructure setup.

Self hosting Imgproxy gives you full control over how images are processed, cached, and delivered. Unlike SaaS image CDNs, you are not locked into usage-based pricing models or restricted feature sets.

Traditionally, self hosting Imgproxy requires:

*   Setting up Docker  
      
    
*   Managing environment variables  
      
    
*   Exposing ports securely  
      
    
*   Handling restarts and scaling  
      
    

Railway removes all of this complexity.

With Railway, Imgproxy runs inside a managed container environment. Railway handles deployment, restarts, logs, and networking automatically, so you can focus on image delivery, not infrastructure.

In short: click deploy → get a live Imgproxy URL → start serving optimized images.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| imgproxy/imgproxy | `ghcr.io/imgproxy/imgproxy` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `IMGPROXY_TTL` | 31536000 | - |
| `IMGPROXY_USE_ETAG` | true | - |
| `IMGPROXY_ALLOW_ORIGIN` | - | Enables CORS headers for the specified origin. Default: not set. |
| `IMGPROXY_ALLOWED_SOURCES` | - | Comma separated list of allowed source image URL prefixes with optional * wildcards. When not set, all source image URLs are allowed. Default: not set. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/img-proxy)
