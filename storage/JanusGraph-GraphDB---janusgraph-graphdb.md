# Deploy JanusGraph GraphDB on Railway

JanusGraph: an open-source, distributed graph database

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/janusgraph-graphdb)

## About

JanusGraph is a powerful, distributed, open-source graph database designed for storing and querying massive graphs with billions of vertices and edges. It requires external storage and indexing backends, offering horizontal scalability for complex data modeling and leveraging the industry-standard Apache TinkerPop Gremlin graph traversal language.

This template deploys JanusGraph using a robust three-tier architecture: the JanusGraph server, **Cassandra** for highly scalable storage persistence, and **Elasticsearch** for comprehensive indexing and search capabilities. All services are securely linked using Railway's private network domains. The configuration utilizes the `cassandra-es` properties template with tuned cache settings. An included **JanusGraph Visualizer** service provides a graphical interface, pre-configured to connect to the main graph instance for immediate interaction and testing.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| visualizer | `janusgraph/janusgraph-visualizer:1.0.4` | Web service |
| elasticsearch | [railwayapp-templates/elasticsearch](https://github.com/railwayapp-templates/elasticsearch) | Database |
| janusgraph | `janusgraph/janusgraph:latest` | TCP service |
| cassandra | `cassandra:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | elasticsearch | 9200 |
| `http.host` | elasticsearch | 0.0.0.0 |
| `ES_JAVA_OPTS` | elasticsearch | -Xms500m -Xmx4g |
| `cluster.name` | elasticsearch | docker-cluster |
| `network.host` | elasticsearch | 0.0.0.0 |
| `discovery.type` | elasticsearch | single-node |
| `transport.host` | elasticsearch | 127.0.0.1 |
| `ELASTIC_PASSWORD` | elasticsearch | (secret) |
| `ELASTIC_USERNAME` | elasticsearch | (secret) |
| `xpack.security.enabled` | elasticsearch | false |
| `JANUS_PROPS_TEMPLATE` | janusgraph | cassandra-es |
| `janusgraph.gremlin.graph` | janusgraph | org.janusgraph.core.JanusGraphFactory |
| `janusgraph.cache.db-cache` | janusgraph | true |
| `janusgraph.storage.backend` | janusgraph | cql |
| `janusgraph.cache.db-cache-size` | janusgraph | 0.25 |
| `janusgraph.cache.db-cache-time` | janusgraph | 180000 |
| `janusgraph.index.search.backend` | janusgraph | elasticsearch |
| `janusgraph.storage.cql.keyspace` | janusgraph | janusgraph |
| `janusgraph.cache.db-cache-clean-wait` | janusgraph | 20 |
| `janusgraph.graph.replace-instance-if-exists` | janusgraph | true |
| `MAX_HEAP_SIZE` | cassandra | 4G |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/esdata`
- **TCP Proxies:** 8182
- **Volume:** `/var/lib/cassandra`

**Category:** Storage · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/janusgraph-graphdb)
