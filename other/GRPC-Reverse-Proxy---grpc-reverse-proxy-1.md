# Deploy GRPC Reverse Proxy on Railway

Caddy h2c proxy for private gRPC backends and REST-compatible clients

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/grpc-reverse-proxy-1)

## About

Deploy a compact Caddy `2.11.4` proxy that accepts HTTP/1.1 or h2c, exposes a dependency-free health endpoint, and forwards application traffic over h2c to a backend selected with `SERVICE_URL`.

The template uses the immutable `ghcr.io/monotykamary/grpc-reverse-proxy:v2.11.4-r3` image. Caddy listens on port `8080`, serves `GET /health`, and forwards every other request to a reachable backend in `host:port` form.

The proxy works on Railway, with an important public-ingress distinction: Railway-generated HTTPS domains currently forward HTTP/1.1 to service containers. Those domains work for HTTP/REST clients whose requests can be forwarded to an h2c-capable backend, such as the Milvus REST v2 API. They do not provide end-to-end HTTP/2 for native gRPC clients.

Native gRPC clients can use the proxy through Railway private networking, a raw TCP proxy, or an external edge that preserves HTTP/2. A raw TCP proxy does not add Railway-managed TLS, so provide your own TLS termination and authentication for public native gRPC traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| grpc-reverse-proxy | `ghcr.io/monotykamary/grpc-reverse-proxy:v2.11.4-r3@sha256:9b2f53b986dbb773043ca1fef5de79ca8cb73925e31a5ee80848397d9ede7a4f` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal Caddy listener port used by the Railway domain and health check. |
| `SERVICE_URL` | - | Backend h2c address in host:port form. Railway HTTPS supports REST traffic; native gRPC requires end-to-end HTTP/2. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/grpc-reverse-proxy-1)
