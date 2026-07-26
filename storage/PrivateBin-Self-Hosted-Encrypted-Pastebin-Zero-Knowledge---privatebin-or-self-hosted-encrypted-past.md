# Deploy PrivateBin | Self-Hosted Encrypted Pastebin, Zero Knowledge on Railway

Self-host PrivateBin on Railway — encrypted pastes with burn-after-reading.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/privatebin-or-self-hosted-encrypted-past)

## About

PrivateBin is a minimalist, open-source online pastebin where the server has zero knowledge of the data being posted. Text is encrypted and decrypted in your browser with 256-bit AES-GCM, and the decryption key never leaves the URL fragment — so the server only ever stores ciphertext it cannot read.

Hosting PrivateBin yourself means the things your team pastes — a credential handed to a contractor, a stack trace containing customer data, a config snippet — never touch someone else's service. This template runs the official `privatebin/nginx-fpm-alpine` image (nginx and PHP-FPM in a single container) with a persistent Railway volume mounted at `/srv/data`, so pastes survive restarts and redeploys. No database, no object storage, no external dependencies to wire up.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| privatebin/nginx-fpm-alpine:2.0.5 | `privatebin/nginx-fpm-alpine:2.0.5` | Web service |

## Configuration

- **Start command:** `/bin/sh -c "sed -i 's|php-fpm85$|php-fpm85 -R|' /etc/s6/services/php-fpm85/run; echo 'listen.mode = 0666' >> /etc/php/php-fpm.d/zz-docker.conf; exec /etc/init.d/rc.local"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/srv/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/privatebin-or-self-hosted-encrypted-past)
