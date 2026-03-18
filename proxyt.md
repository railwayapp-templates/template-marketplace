# Deploy proxyt on Railway

Proxy the Tailscale control plane

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/proxyt)

## About

A reverse proxy server that enables using a **custom domain** as a Tailscale login server when Tailscale domains are blocked or restricted in your environment.

---

Hosting **proxyt** allows you to run your own reverse proxy for Tailscale authentication.
By hosting it on your own domain (for example, `login.example.com`), you can sign in to Tailscale even if access to `login.tailscale.com` is unavailable or blocked by your network.

This gives you full control over the login endpoint and provides a simple, reliable fallback for restricted environments.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxyt | [jaxxstorm/proxyt](https://github.com/jaxxstorm/proxyt) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PROXYT_BIND` | - | The address proxyt will bind to, it should almost always be left at the default of `0.0.0.0` |
| `PROXYT_PORT` | 8080 | The port proxy will listen on. Defaults to the railway standard port of 8080 |
| `PROXYT_DEBUG` | - | Enable debug logging. Valid values are `true` or `false` |
| `PROXYT_EMAIL` | - | If you using `tcp` forwarding and allow proxy to issues its won certificate via lets encrypt, this email is the one used for the lets encrypt API. It is not needed by default |
| `PROXYT_ISSUE` | - | Determine whether proxyt will issue a lets encrypt certificate for HTTPs. It is not needed if you're running inside Railway usually unless tcp mode is used |
| `PROXYT_DOMAIN` | - | The domain proxy is listening on. Can usually be left alone, and by default is set to the domain Railway has issued to your app |
| `PROXYT_CERT_DIR` | - | The local directory on disk that is used to store the cert. Can almost always be left empty |
| `PROXYT_HTTP_ONLY` | true | If behind a TLS reverse proxy, you only need the HTTP endpoint. This is the default in railway |
| `PROXYT_HTTPS_PORT` | - | If you choose to handle HTTPS yourself, this is the port proxy will listen on for https connections |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/proxyt)
