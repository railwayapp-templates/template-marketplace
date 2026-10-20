# Deploy Apache Kafka | (Just Updated) KRaft Event Streaming, SASL Login On From Boot on Railway

Apache Kafka KRaft node. SASL login on from boot, data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-kafka-or-just-updated-kraft-event)

## About

Apache Kafka is the standard distributed event streaming platform: durable, replayable topics that producers and consumers share. This template runs a single Apache Kafka 4.3.1 node in KRaft mode (no ZooKeeper) with a persistent volume, SASL/SCRAM authentication switched on from the first boot, and a public TCP endpoint for Kafka clients.

This template runs the official `apache/kafka` image (pinned by digest). One process is both broker and controller. Data and the cluster metadata live on a volume mounted at `/var/lib/kafka`, so topics, messages, offsets and the login survive redeploys. SASL is enabled at boot: the `admin` superuser is created with the generated `KAFKA_PASSWORD` (SCRAM-SHA-256), ACLs are enforced, and unauthenticated clients are rejected. The JVM heap is sized from the container's memory limit (read from the cgroup, capped at 2 GB) and limited to 2 processors so it does not size itself from the host. Two client listeners are advertised: one on the private network (`KAFKA_BOOTSTRAP_INTERNAL`) for services in the same project, and one through the public TCP proxy (`KAFKA_BOOTSTRAP_PUBLIC`). Topics are auto-created on first produce with 3 partitions and replication factor 1 (single node). The password is stored in the cluster at first boot; changing `KAFKA_PASSWORD` later does not change the stored login. Allow about a minute on first boot before clients connect.

Agent contract:

- Kafka bootstrap (public): `KAFKA_BOOTSTRAP_PUBLIC` (TCP proxy, `KAFKA_PUBLIC_HOST:KAFKA_PUBLIC_PORT`)
- Kafka bootstrap (private network): `KAFKA_BOOTSTRAP_INTERNAL` (`kafka.railway.internal:9092` style)
- Security: `SASL_PLAINTEXT`, mechanism `SCRAM-SHA-256`
- Username: `admin`
- Password variable: `KAFKA_PASSWORD`
- No HTTP health path; check readiness with an authenticated `kafka-topics.sh --list`

```bash
cat &gt; client.properties &lt;

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kafka | `apache/kafka:4.3.1@sha256:77e3df9054047a88b520d0cc46e16696d3b22022e1d580aeccd2632df6532837` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `KAFKA_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'D=/var/lib/kafka; echo "[railway] kafka uid=$(id -u) data_owner=$(stat -c %u:%g $D) pids.max=$(cat /sys/fs/cgroup/pids.max 2>/dev/null) mem.max=$(cat /sys/fs/cgroup/memory.max 2>/dev/null)"; MAX=$(cat /sys/fs/cgroup/memory.max 2>/dev/null); case "$MAX" in ""|max) MB=2048;; *) MB=$((MAX/1048576));; esac; HEAP=$((MB*50/100)); [ "$HEAP" -lt 512 ] && HEAP=512; [ "$HEAP" -gt 2048 ] && HEAP=2048; PUBH=${KAFKA_PUBLIC_HOST:-$KAFKA_PRIVATE_HOST}; PUBP=${KAFKA_PUBLIC_PORT:-9092}; mkdir -p $D/data $D/config; chown 1000:1000 $D $D/data $D/config; C=$D/config/server.properties; printf "%s\n" "process.roles=broker,controller" "node.id=1" "controller.quorum.voters=1@127.0.0.1:9093" "controller.listener.names=CONTROLLER" "listeners=CONTROLLER://127.0.0.1:9093,BROKER://127.0.0.1:9094,INTERNAL://0.0.0.0:9092,EXTERNAL://0.0.0.0:19092" "advertised.listeners=BROKER://127.0.0.1:9094,INTERNAL://$KAFKA_PRIVATE_HOST:9092,EXTERNAL://$PUBH:$PUBP" "inter.broker.listener.name=BROKER" "listener.security.protocol.map=CONTROLLER:PLAINTEXT,BROKER:PLAINTEXT,INTERNAL:SASL_PLAINTEXT,EXTERNAL:SASL_PLAINTEXT" "sasl.enabled.mechanisms=SCRAM-SHA-256" "listener.name.internal.scram-sha-256.sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required;" "listener.name.external.scram-sha-256.sasl.jaas.config=org.apache.kafka.common.security.scram.ScramLoginModule required;" "authorizer.class.name=org.apache.kafka.metadata.authorizer.StandardAuthorizer" "super.users=User:admin;User:ANONYMOUS" "allow.everyone.if.no.acl.found=false" "log.dirs=$D/data" "num.partitions=3" "auto.create.topics.enable=true" "offsets.topic.replication.factor=1" "transaction.state.log.replication.factor=1" "transaction.state.log.min.isr=1" "share.coordinator.state.topic.replication.factor=1" "share.coordinator.state.topic.min.isr=1" "group.initial.rebalance.delay.ms=0" > $C; chown 1000:1000 $C; echo "[railway] heap=${HEAP}m advertised internal=$KAFKA_PRIVATE_HOST:9092 external=$PUBH:$PUBP"; export HOME=$D KAFKA_HEAP_OPTS="-Xms512m -Xmx${HEAP}m" JAVA_TOOL_OPTIONS=-XX:ActiveProcessorCount=2; if [ ! -f $D/data/meta.properties ]; then echo "[railway] formatting storage"; CID=$(/opt/kafka/bin/kafka-storage.sh random-uuid | tail -1); su -p -s /bin/sh appuser -c "/opt/kafka/bin/kafka-storage.sh format -t $CID -c $C --add-scram SCRAM-SHA-256=[name=admin,password=$KAFKA_PASSWORD]" || exit 1; fi; exec su -p -s /bin/sh appuser -c "exec /opt/kafka/bin/kafka-server-start.sh $C"'`
- **TCP Proxies:** 19092
- **Volume:** `/var/lib/kafka`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/apache-kafka-or-just-updated-kraft-event)
