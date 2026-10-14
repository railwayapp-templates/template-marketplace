# Deploy EMQX | (Just Updated) MQTT Broker for IoT, Dashboard Included, Data Survives Redeploys on Railway

MQTT broker for IoT. Dashboard on, data on a volume, public MQTT port

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/emqx-or-just-updated-mqtt-broker-for-iot)

## About

EMQX is an open-source MQTT broker built for IoT fleets, telemetry pipelines and messaging between devices and
backends. It speaks MQTT 3.1.1 and 5.0, scales to millions of connections, and ships a web dashboard for clients,
subscriptions, topics and rule-engine data flows.

This template runs EMQX 6.1.5 as a single service from a digest-pinned official image: the broker on a TCP proxy for
MQTT clients, the dashboard on an HTTPS domain, and the node's data on a Railway volume.

EMQX needs a few things handled before it runs well on Railway:

- **The dashboard is locked behind a generated password.** The admin password is random per deploy, so the well-known
  default login is never live on a public URL.
- **The volume is writable.** Railway mounts volumes owned by root while the stock image runs as an unprivileged user,
  which makes the broker crash-loop on its data directory. The start command fixes ownership on every boot and logs the
  owner and writability it found.
- **The Erlang VM is sized to your container.** EMQX schedules work across as many threads as the host reports, not
  as many as your plan has. The start command reads the container's CPU limit and caps the schedulers to it.
- **MQTT is reachable from outside Railway.** A TCP proxy exposes port 1883, and a ready-made connection URL is
  provided for it, plus a private URL for services in the same project.
- **Data survives redeploys.** Configuration, users and retained data live on the attached volume, and the node keeps a
  stable name so its data directory is found again on every boot.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| emqx | `emqx/emqx:6.1.5@sha256:f76170a0782697ab582c62ba2869a12253e53a744614e6cd13f09795ef225ae8` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `EMQX_DASHBOARD__DEFAULT_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); C=$(cut -d" " -f1 /sys/fs/cgroup/cpu.max 2>/dev/null || echo max); P=$(cut -d" " -f2 /sys/fs/cgroup/cpu.max 2>/dev/null || echo 100000); case "$C" in ""|max) N=$(nproc);; *) N=$(( (C + P - 1) / P ));; esac; [ "$N" -ge 1 ] || N=1; export ERL_FLAGS="+S $N:$N"; echo "[railway] cgroup memory.max=$M cpu.max=$C/$P schedulers=$N"; chown -R emqx:emqx /opt/emqx/data /opt/emqx/log; echo "[railway] data owner=$(stat -c %u:%g /opt/emqx/data) writable=$(runuser -u emqx -- test -w /opt/emqx/data && echo yes || echo no)"; export EMQX_NODE__NAME=emqx@127.0.0.1 EMQX_DASHBOARD__DEFAULT_USERNAME=admin; exec runuser -u emqx -- docker-entrypoint.sh /opt/emqx/bin/emqx foreground'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 1883
- **Volume:** `/opt/emqx/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/emqx-or-just-updated-mqtt-broker-for-iot)
