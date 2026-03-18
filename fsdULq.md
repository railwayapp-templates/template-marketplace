# Deploy Gate on Railway

The Lightweight Minecraft Proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fsdULq)

## About

Gate

The Lightweight Minecraft Proxy

Replacing Bungee Cord/Velocity • Optimized for efficiency, low memory usage 10MB • Developed in Go • Embrace the cloud native era!

It replaces legacy proxies but also runs alongside them. Gate is entirely written in Go and heavily inspired by the Velocity project. 

Why do we need a Minecraft proxy?
Use-cases

    You want to keep players connected to the proxy to move them between your different game servers like they would change the world.
    You want to enable cross game server plugins that e.g. handle player chat events or register proxy-wide commands broadcast messages and more.
    You want to intercept and log packets on the network traffic between players and servers

How does a Minecraft proxy work?

Gate presents itself as a normal Minecraft server in the player's server list, but once the player connects Gate forwards the connection to one of the actual game servers (e.g. Minecraft vanilla, paper, spigot, sponge, etc.) to play the game.

The player can be moved around the network of Minecraft servers without fully disconnecting, since we want the player to stay connected (and not want them to re-login via the server-list every time).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gate | [joshysnek/gate](https://github.com/joshysnek/gate) | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MC_MOTD` | §bA Gate Proxy
§bVisit ➞ §fgithub.com/minekube/gate |
| `SERVER1_PORT` | 25566 |
| `SERVER2_PORT` | 25567 |
| `SERVER3_PORT` | 25568 |
| `SERVER4_PORT` | 25569 |
| `SERVER1_ADDRESS` | localhost |
| `SERVER2_ADDRESS` | localhost |
| `SERVER3_ADDRESS` | localhost |
| `SERVER4_ADDRESS` | localhost |

## Configuration

- **TCP Proxies:** 25565

**Category:** Other · **Languages:** Go, TypeScript, Vue, CSS, Makefile, Dockerfile, JavaScript

[View on Railway →](https://railway.com/template/fsdULq)
