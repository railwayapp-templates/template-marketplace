# Deploy NATS | (Just Updated) JetStream Streams Survive Redeploys, Locked Behind A Password on Railway

NATS JetStream broker. Password on, streams kept on a volume, public URL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nats-or-just-updated-jetstream-streams-s)

## About

NATS is a lightweight, high-performance messaging system for microservices, IoT and edge
workloads. With JetStream switched on it also stores messages: durable streams, replay,
consumers with acknowledgements, key-value buckets and object stores, all from one small binary.

This template runs NATS 2.15 as a single service from a digest-pinned official image: the client
port on a Railway TCP proxy, the monitoring port on the private network, and a Railway volume
holding every JetStream stream.

- **JetStream is on and its data survives redeploys.** The stock `nats` image starts with
  JetStream off and no volume, so streams, key-value buckets and consumers do not exist or vanish
  with the container. Here the store lives on the volume at `/data`; a stream with messages in it
  was read back intact after a redeploy.
- **A password is required from the first connection.** A username and password are generated per
  deploy; anonymous clients and wrong passwords get `Authorization Violation`.
- **Limits follow your plan.** The start command reads the container's memory limit and the
  volume's size and sets the JetStream memory and file store limits from them (50% of memory,
  90% of the disk), instead of letting the server size itself from the host.
- **Two ways in.** Services in the same project connect with the private URL; clients elsewhere
  use the TCP proxy URL. The monitoring endpoint (`/jsz`, `/varz`) stays on the private network.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats | `nats:2.15.0-alpine@sha256:ac8f88a6494bffc2c2a5289a0ca61cb28a9145c11ba5677cf24265d07f46d8d4` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `NATS_USER` | (secret) |
| `NATS_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; if [ -z "$NATS_USER" ] || [ -z "$NATS_PASSWORD" ]; then echo "FATAL: NATS_USER and NATS_PASSWORD must be set before NATS will start"; exit 1; fi; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); if [ "$M" != max ]; then MM=$((M / 100 * 50)); else MM=1073741824; fi; set -- $(df -Pk /data | tail -n 1); FS=$(($2 / 100 * 90 * 1024)); echo "[railway] jetstream max_memory_store=$MM max_file_store=$FS owner=$(stat -c %u:%g /data) writable=$(test -w /data && echo yes || echo NO)"; { echo "host: \"::\""; echo "port: 4222"; echo "http_port: 8222"; echo "server_name: \"nats-railway\""; echo "jetstream { store_dir: \"/data\", max_memory_store: $MM, max_file_store: $FS }"; echo "authorization { user: \"$NATS_USER\", password: \"$NATS_PASSWORD\" }"; } > /etc/nats-railway.conf; exec nats-server -c /etc/nats-railway.conf'`
- **TCP Proxies:** 4222
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/nats-or-just-updated-jetstream-streams-s)
