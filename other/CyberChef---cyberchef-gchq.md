# Deploy CyberChef on Railway

Web app for encoding, encryption and data analysis in your browser

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cyberchef-gchq)

## About

CyberChef is the "Cyber Swiss Army Knife" — a browser-based workbench, open-sourced by GCHQ, that chains 504 operations into repeatable recipes for encryption, encoding, compression and data analysis. Analysts, incident responders, CTF players and developers use it to decode obfuscated payloads, parse certificates and protocol dumps, convert character sets and timestamps, and pull structure out of awkward data. Every operation runs in the visitor's own browser, so no server ever sees your input — which is why teams handling sensitive material want their own instance rather than a shared public one.

Self-host CyberChef on Railway with a single service. The template deploys **CyberChef**, an nginx container serving the official GCHQ build, and nothing else — no database, no queue, no volume, because the application keeps no server-side state. What it adds is the production configuration the stock image leaves out: pre-compressed assets so the 12 MB JavaScript bundle ships as 3.6 MB, security response headers including HSTS and a Content-Security-Policy, cache headers matched to CyberChef's filenames, nginx workers sized from the container's real CPU quota, and optional HTTP basic auth.

![Diagram of the single CyberChef nginx service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788757128/cyberchef-architecture.png)

Data arrives base64-wrapped inside a gzip stream inside a URL-encoded parameter, and unpicking it by hand across three tools is slow and error-prone. CyberChef turns that into a recipe you build once and reuse.

- **Encoding** — Base64/32/85, hex, URL, HTML entities, character encodings, punycode
- **Cryptography** — AES, DES, Blowfish, RSA, PGP, JWT signing and verification, X.509 parsing
- **Hashing** — MD5, the SHA family, BLAKE, bcrypt, CRC, and hash identification
- **Compression** — gzip, zlib, bzip2, LZMA, raw deflate, and archive extraction
- **Analysis** — entropy plots, file-type detection, regular expressions, `strings`, x86 disassembly, hexdumps
- **Magic** — automatic detection of how data was encoded, with suggested recipes
- **Flow control** — Fork, Merge, Jump, Label and Register for branching multi-step recipes

Every operation runs client-side in a Web Worker, so the Railway service does nothing but serve static files — one container, and your data never touches it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| CyberChef | [gridalpha/cyberchef-railway](https://github.com/gridalpha/cyberchef-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port nginx listens on. Matches the image's own EXPOSE; leave as-is. |
| `CSP_CONNECT_SRC` | * blob: data: | Content-Security-Policy connect-src. The default lets every operation work. Set it to "'self' blob: data:" for an instance that cannot send anything you paste to another host, which disables the HTTP request and DNS over HTTPS operations. |
| `CSP_FRAME_ANCESTORS` | 'none' | Content-Security-Policy frame-ancestors. Default blocks framing entirely; set an origin to embed CyberChef in another site. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cyberchef-gchq)
