# Deploy Teleproxy [Updated Sep '26] on Railway

Teleproxy — Self-Hosted MTProto Proxy for Telegram, Fake-TLS DPI Resistant

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/teleproxy-mtproxy)

## About

Teleproxy is an open-source MTProto proxy for Telegram — a small, high-performance relay that disguises your proxy traffic as ordinary HTTPS to a domain of your choosing, so network-level censorship that blocks Telegram directly has a much harder time blocking this. This template deploys it as a single container, verified live against the app's own startup script rather than guessed from documentation.

Teleproxy's fake-TLS camouflage means connections to your proxy look, at a glance, like a normal HTTPS handshake to whatever domain you set as `EE_DOMAIN`. Combined with DPI resistance built into the proxy engine itself, this makes Teleproxy a meaningfully harder target to block than a plain, unobfuscated proxy. Self-hosting it on Railway means you control the secret, the camouflage domain, and the underlying server — nothing routes through a third party.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| teleproxy | `ghcr.io/teleproxy/teleproxy:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET` | (secret) | Hex-encoded proxy secret clients use to connect. Auto-generated. |
| `WORKERS` | 4 | Number of worker processes handling connections. |
| `EE_DOMAIN` | www.cloudfare.com | The domain your proxy's fake-TLS handshake camouflages as. Any real HTTPS domain works. |
| `PROXY_TAG` | - | Optional MTProto promotion tag (advertises a channel via the proxy link). Leave blank unless you have one. |
| `DIRECT_MODE` | false | If true, connects directly to Telegram DCs without the ME relay. Incompatible with PROXY_TAG. |

## Configuration

- **TCP Proxies:** 443
- **Volume:** `/opt/teleproxy/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/teleproxy-mtproxy)
