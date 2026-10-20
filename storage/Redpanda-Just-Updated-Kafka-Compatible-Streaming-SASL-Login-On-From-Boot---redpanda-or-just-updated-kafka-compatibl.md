# Deploy Redpanda | (Just Updated) Kafka-Compatible Streaming, SASL Login On From Boot on Railway

Kafka-compatible streaming. SASL login on from boot, data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redpanda-or-just-updated-kafka-compatibl)

## About

Redpanda is a Kafka-compatible streaming platform written in C++. It speaks the Kafka wire protocol, so existing Kafka clients, producers and consumers work unchanged, without ZooKeeper or a JVM. This template runs a single Redpanda v26.2.5 broker with a persistent volume, SASL/SCRAM authentication switched on from the first boot, and a public TCP endpoint for Kafka clients.

This template runs the official `redpandadata/redpanda` image (pinned by digest). Data lives on a volume mounted at `/var/lib/redpanda`, so topics and messages survive redeploys. SASL is enabled at boot and an `admin` superuser is created with the generated `REDPANDA_PASSWORD` (SCRAM-SHA-256), so unauthenticated clients are rejected. The broker is capped to 2 cores and about 75% of the container's memory limit (`--smp 2 --memory`, read from the cgroup) so it does not size itself from the host. Two Kafka listeners are advertised: one on the private network (`REDPANDA_PRIVATE_HOST:9092`) for services in the same project, and one through the public TCP proxy (`REDPANDA_PUBLIC_HOST:REDPANDA_PUBLIC_PORT`). Topics are auto-created on first produce. Allow a minute on first boot before clients connect. Redpanda is licensed under the Business Source License (BSL); single-broker self-hosted use is permitted, see the upstream licence for limits.

Agent contract:

- Kafka bootstrap (public): `REDPANDA_PUBLIC_HOST:REDPANDA_PUBLIC_PORT` (TCP proxy)
- Kafka bootstrap (private network): `REDPANDA_PRIVATE_HOST:9092`
- Security: `SASL_PLAINTEXT`, mechanism `SCRAM-SHA-256`
- Username: `admin`
- Password variable: `REDPANDA_PASSWORD`
- No HTTP health path; check readiness by an authenticated `rpk cluster info`

```bash
RPK="docker run --rm -i --entrypoint rpk redpandadata/redpanda:v26.2.5 \
  -X user=admin -X pass=$REDPANDA_PASSWORD -X sasl.mechanism=SCRAM-SHA-256 \
  -X brokers=$REDPANDA_PUBLIC_HOST:$REDPANDA_PUBLIC_PORT"
$RPK cluster info
echo hello | $RPK topic produce demo
$RPK topic consume demo -n 1 --offset start
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redpanda | `redpandadata/redpanda:v26.2.5@sha256:badca2d958f81da675c3055a9ecb6ebb590325582bcf16936148ffd65e96e920` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `REDPANDA_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'echo "[railway] redpanda uid=$(id -u) data_owner=$(stat -c %u:%g /var/lib/redpanda) pids.max=$(cat /sys/fs/cgroup/pids.max 2>/dev/null) mem.max=$(cat /sys/fs/cgroup/memory.max 2>/dev/null)"; MAX=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); case "$MAX" in ""|max) MB=2048;; *) MB=$((MAX/1048576));; esac; RM=$((MB*75/100)); [ "$RM" -lt 768 ] && RM=768; SMP=2; mkdir -p /var/lib/redpanda/data; chown -R 101:101 /var/lib/redpanda; export RP_BOOTSTRAP_USER="admin:$REDPANDA_PASSWORD:SCRAM-SHA-256"; echo "[railway] smp=$SMP memory=${RM}M advertised internal=$REDPANDA_PRIVATE_HOST:9092 external=$REDPANDA_PUBLIC_HOST:$REDPANDA_PUBLIC_PORT"; exec setpriv --reuid=101 --regid=101 --clear-groups env HOME=/var/lib/redpanda rpk redpanda start --check=false --smp $SMP --memory ${RM}M --reserve-memory 0M --overprovisioned --node-id 0 --kafka-addr internal://0.0.0.0:9092,external://0.0.0.0:19092 --advertise-kafka-addr internal://$REDPANDA_PRIVATE_HOST:9092,external://$REDPANDA_PUBLIC_HOST:$REDPANDA_PUBLIC_PORT --set redpanda.enable_sasl=true --set redpanda.superusers=[\"admin\"] --set redpanda.auto_create_topics_enabled=true'`
- **TCP Proxies:** 19092
- **Volume:** `/var/lib/redpanda`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redpanda-or-just-updated-kafka-compatibl)
