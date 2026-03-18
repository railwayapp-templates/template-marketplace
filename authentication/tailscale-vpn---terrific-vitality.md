# Deploy tailscale-vpn on Railway

VPN Tailscale Userspace ligera. Incluye Exit Node y Proxy SOCKS5.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/terrific-vitality)

## About

Esta plantilla despliega una instancia de Tailscale en un contenedor Docker ultraligero basado en Alpine Linux. Está específicamente optimizada para entornos como Railway, utilizando **userspace networking** para funcionar sin necesidad de acceso al dispositivo `/dev/net/tun` del host.

Hospedar esta solución te permite integrar tu proyecto de Railway en tu red privada de Tailscale (Tailnet) en cuestión de segundos. El contenedor maneja automáticamente la conexión, la reconexión y el enrutamiento.

Al desplegarlo, este servicio actúa como un nodo completo que puede servir como **Exit Node** (para enrutar tu tráfico de internet a través de Railway) y exponer un **Proxy SOCKS5**. Incluye scripts de gestión de procesos robustos para evitar caídas y asegurar que el túnel se mantenga estable.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tailscale-vpn-Docker | [Kennethguerra3/tailscale-vpn-Docker](https://github.com/Kennethguerra3/tailscale-vpn-Docker) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TAILSCALE_AUTHKEY` | tskey-auth- |
| `TAILSCALE_VERSION` | latest |
| `TAILSCALE_HOSTNAME` | railway-vpn |

## Configuration

- **Volume:** `/var/lib/tailscale`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/terrific-vitality)
