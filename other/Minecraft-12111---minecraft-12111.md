# Deploy Minecraft 1.21.11 on Railway

Deploy and Host Minecraft 1.21.11 with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minecraft-12111)

## About

MineChamp es un servidor de Minecraft 1.21.11 con auto-hibernación inteligente que se despliega en Railway con un solo click. Incluye un proxy para wake-on-connect y ahorra hasta 70% en costos de hosting.

Hosting MineChamp en Railway despliega automáticamente dos servicios containerizados: un proxy ligero Node.js (~50MB) que detecta conexiones de jugadores y enciende el servidor automáticamente mediante la Railway API, y el servidor Minecraft 1.21.11 con auto-hibernación que se apaga tras 10 minutos sin jugadores. El servidor incluye Java 21 con optimizaciones JVM (Aikar's Flags), variables de entorno configurables, y compatibilidad con todos los launchers. Railway proporciona TCP Proxy automático, métricas en tiempo real, y facturación por uso real - solo pagas cuando el servidor está activo.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MineChamp | [Dubbxd/minechamp](https://github.com/Dubbxd/minechamp) | Worker |
| Proxy Conect | [Dubbxd/minechamp](https://github.com/Dubbxd/minechamp) (root: /proxy) | TCP service |

## Configuration

- **TCP Proxies:** 25565

**Category:** Other · **Languages:** JavaScript, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/minecraft-12111)
