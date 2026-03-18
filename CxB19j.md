# Deploy crabdis on Railway

It's like Redis but a bit rusty...

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/CxB19j)

## About

# crabdis

> It's like Redis but a bit rusty...

# What?

This is a simple in-memory key-value store written in Rust. It's somewhat compatible with Redis via the [RESP](https://redis.io/docs/reference/protocol-spec/) protocol, but it's not a drop-in replacement. A lot of commands are missing and stuff might not work as expected.

Please don't use this in production. Or do, I'm not your mom. But don't blame me if it eats your data.

# Why?

I wanted to write Redis but multi-threaded and in Rust. This is the result.
Works? Kinda. Is it good? Maybe. Is it fast? Yes.

# Installation

You can find binaries on the [releases page](https://github.com/pxseu/crabdis/releases). Or you can build it yourself with `cargo build --release`.

If you want to install it with cargo, you can do so with `cargo install crabdis`.

There is also a Docker image available on [Docker Hub](https://hub.docker.com/r/pxseu/crabdis).

# Usage

```sh
crabdis
```

# TODO / Missing Features

- [x] Basic RESP protocol implementation
- [x] GET, SET, DEL, EXISTS, KEYS, FLUSHDB
- [ ] COMMAND / COMMAND DOCS (so ioredis works)
- [ ] SET arguments (EX, PX, NX, XX) + SETEX, PSETEX
- [ ] Persistence
- [ ] Hash Command family

This will start the server on `127.0.0.1:6379`. You can change the address and port with the `--address` and `--port` flags.

# License

This project is licensed under the [MIT License](https://github.com/pxseu/crabdis/blob/senpai/LICENSE).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| crabdis | `pxseu/crabdis` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | DNS hostname to use in railway private networking |
| `REDISPORT` | 6379 | Port on which to listen |
| `REDISUSER` | default | Username for auth |
| `REDIS_URL` | - | Internal url for to connect to `crabdis` |
| `REDISPASSWORD` | (secret) | Auto generated password for `crabdis`. |
| `REDIS_PUBLIC_URL` | - | Public url for the instance, if created with a TCP Proxy |

## Configuration

- **Start command:** `/bin/sh -c "/usr/local/bin/crabdis --address :: --save \"60 1\" --requirepass $REDISPASSWORD --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/CxB19j)
