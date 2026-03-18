# Deploy Redis HA (w/ Cluster Mode, Sharded 3+3) on Railway

One‑click Redis Cluster (3 nodes + 3 replicas) with automatic failover

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redis-ha-w-cluster-mode-sharded-33)

## About

Redis Cluster HA (Sharded 3+3) deploys a six‑node Redis Cluster: three masters sharding the 16,384 hash slots, each with a dedicated replica for high availability. It delivers horizontal write scaling, automatic failover, and slot‑based routing. Clients connect with a cluster‑aware driver (e.g., ioredis Cluster) over Railway’s private network or through the exposed TCP proxies on each node.

This template provisions six Redis services in cluster mode (3 masters + 3 replicas) and a one‑shot init job that forms the cluster and exits once healthy (can be deleted after reaching the "Completed" status). Masters split all 16,384 slots; replicas continuously sync and are auto‑promoted if a master fails (majority of masters required). All nodes advertise internal hostnames and run on Railway’s private network for reliable cluster‑bus communication. Connect using a cluster‑aware client like ioredis Cluster class.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis A | `redis:8.4.0` | Database |
| Redis B | `redis:8.4.0` | Database |
| Redis F | `redis:8.4.0` | Database |
| Redis E | `redis:8.4.0` | Database |
| Initiator | `redis:8.4.0` | Database |
| Redis D | `redis:8.4.0` | Database |
| Redis C | `redis:8.4.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis A | 6379 |
| `REDISUSER` | Redis A | default |
| `REDISPASSWORD` | Redis A | (secret) |
| `REDIS_PASSWORD` | Redis A | (secret) |
| `REDISPORT` | Redis B | 6379 |
| `REDISPASSWORD` | Redis B | (secret) |
| `REDIS_PASSWORD` | Redis B | (secret) |
| `REDISPORT` | Redis F | 6379 |
| `REDISPASSWORD` | Redis F | (secret) |
| `REDIS_PASSWORD` | Redis F | (secret) |
| `REDISPORT` | Redis E | 6379 |
| `REDISPASSWORD` | Redis E | (secret) |
| `REDIS_PASSWORD` | Redis E | (secret) |
| `REDISPORT` | Initiator | 6379 |
| `REDISPASSWORD` | Initiator | (secret) |
| `REDIS_PASSWORD` | Initiator | (secret) |
| `REDISPORT` | Redis D | 6379 |
| `REDISPASSWORD` | Redis D | (secret) |
| `REDIS_PASSWORD` | Redis D | (secret) |
| `REDISPORT` | Redis C | 6379 |
| `REDISPASSWORD` | Redis C | (secret) |
| `REDIS_PASSWORD` | Redis C | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ >/dev/null 2>&1 || true; echo 'Starting redis node...'; exec docker-entrypoint.sh redis-server --port 6379 --bind 0.0.0.0 :: --cluster-enabled yes --cluster-config-file nodes.conf --cluster-node-timeout 5000 --appendonly yes --requirepass $REDIS_PASSWORD --masterauth $REDIS_PASSWORD --dir $RAILWAY_VOLUME_MOUNT_PATH --protected-mode no --cluster-announce-hostname $RAILWAY_PRIVATE_DOMAIN --cluster-announce-port 6379 --cluster-announce-bus-port 16379"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "echo '--- Redis Cluster Init ---'; ALL_NODES=\"$REDIS_A_HOST:6379 $REDIS_B_HOST:6379 $REDIS_C_HOST:6379 $REDIS_D_HOST:6379 $REDIS_E_HOST:6379 $REDIS_F_HOST:6379\"; echo \"Nodes: $ALL_NODES\"; for node in $ALL_NODES; do host=\${node%%:*}; port=\${node##*:}; echo \"--> Waiting for $host:$port\"; i=0; until redis-cli -h \"$host\" -p \"$port\" -a \"$REDIS_PASSWORD\" ping >/dev/null 2>&1; do i=\$((i+1)); if [ \"\$i\" -gt 60 ]; then echo \"ERROR: $host:$port not ready after timeout\"; exit 1; fi; sleep 2; done; echo \" $host:$port ready\"; done; if redis-cli -h \"$REDIS_A_HOST\" -a \"$REDIS_PASSWORD\" cluster info 2>/dev/null | grep -q 'cluster_state:ok'; then echo 'Cluster already healthy (cluster_state:ok). Exiting.'; exit 0; fi; echo '--- Creating cluster ---'; redis-cli -a \"$REDIS_PASSWORD\" --cluster create $ALL_NODES --cluster-replicas 1 --cluster-yes; echo '--- Waiting for cluster_state:ok and all slots assigned ---'; i=0; while :; do info=\$(redis-cli -h \"$REDIS_A_HOST\" -a \"$REDIS_PASSWORD\" cluster info 2>/dev/null || true); echo \"\$info\" | grep -q 'cluster_state:ok' && echo \"\$info\" | grep -q 'cluster_slots_assigned:16384' && { echo 'Cluster is OK and all slots assigned. Done.'; exit 0; }; i=\$((i+1)); [ \"\$i\" -gt 90 ] && { echo 'ERROR: Cluster did not reach healthy state in time.'; exit 1; }; sleep 2; done"`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/redis-ha-w-cluster-mode-sharded-33)
