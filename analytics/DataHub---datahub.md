# Deploy DataHub on Railway

DataHub: Searchable catalog of your tables, dashboards & pipelines

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/datahub)

## About

DataHub is the open-source metadata platform LinkedIn built to make a very large data estate searchable, now maintained by Acryl Data. It gives engineers, analysts and governance teams one place to find every table, topic, dashboard, ML feature and pipeline in a stack, with column-level lineage, ownership and access policies attached. Teams reach for it when "which table feeds this dashboard, and who owns it?" stops being answerable from memory.

Deploy DataHub on Railway and you get the full production topology, not a single-container demo. It runs nine services: the React frontend, the GMS metadata service, standalone MCE and MAE consumers, the actions runner that executes ingestion, a system-update service that migrates the schema and builds search indices, plus Kafka in KRaft mode, OpenSearch 2 and managed MySQL. Writes enter GMS, travel through Kafka to the MCE consumer, land in MySQL, and are re-published as change logs the MAE consumer indexes into OpenSearch — the event-driven path DataHub runs at LinkedIn scale.

![Railway topology of nine DataHub services with Kafka, OpenSearch and MySQL](https://res.cloudinary.com/rroe4rtk/image/upload/v1788245139/datahub-architecture.png)

DataHub is a metadata *platform*, not just a catalog UI. Every fact about an asset is modelled as an aspect on an entity URN and delivered as an event, which suits teams who want to build on the metadata rather than only browse it. Self-hosting makes sense when the catalog must reach systems inside a VPC, when the metadata is sensitive, or when internal tooling needs the GraphQL and OpenAPI surfaces.

Key capabilities:

- Search across datasets, dashboards, charts, pipelines and ML models
- Column-level lineage and impact analysis before schema changes
- Ownership, tags, glossary terms and domains
- Ingestion from ~70 sources, from the UI or the CLI
- Access policies, tokens and optional OIDC sign-on
- GraphQL API, OpenAPI endpoints and a Python emitter

The split: **datahub-frontend** serves the app and login, **datahub-gms** owns reads, writes and the GraphQL API, **datahub-mce-consumer** applies change proposals to MySQL, **datahub-mae-consumer** indexes change logs into OpenSearch, **datahub-actions** runs ingestion jobs, **datahub-system-update** applies migrations.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| datahub-mce-consumer | `acryldata/datahub-mce-consumer:v1.7.0` | Worker |
| datahub-mae-consumer | `acryldata/datahub-mae-consumer:v1.7.0` | Worker |
| datahub-gms | `acryldata/datahub-gms:v1.7.0` | Web service |
| datahub-system-update | [gridalpha/datahub-railway](https://github.com/gridalpha/datahub-railway) | Worker |
| kafka | `confluentinc/cp-kafka:8.2.2` | Database |
| MySQL | `mysql:9.4` | Database |
| datahub-frontend | [gridalpha/datahub-railway](https://github.com/gridalpha/datahub-railway) | Web service |
| opensearch | [gridalpha/datahub-railway](https://github.com/gridalpha/datahub-railway) | Database |
| datahub-actions | `acryldata/datahub-actions:v1.7.0-slim` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | datahub-mce-consumer | 4319 | Management port Railway health-checks |
| `JAVA_OPTS` | datahub-mce-consumer | -XX:MaxRAMPercentage=70 | Heap sized from the container limit |
| `DATAHUB_GMS_HOST` | datahub-mce-consumer | - | Metadata service host |
| `DATAHUB_GMS_PORT` | datahub-mce-consumer | 8080 | Metadata service port |
| `ELASTICSEARCH_HOST` | datahub-mce-consumer | - | Search cluster host |
| `ELASTICSEARCH_PORT` | datahub-mce-consumer | 9200 | Search cluster port |
| `GRAPH_SERVICE_IMPL` | datahub-mce-consumer | elasticsearch | Lineage graph backend |
| `EBEAN_DATASOURCE_URL` | datahub-mce-consumer | - | JDBC connection string |
| `MCE_CONSUMER_ENABLED` | datahub-mce-consumer | true | Run the proposal consumer |
| `SCHEMA_REGISTRY_TYPE` | datahub-mce-consumer | INTERNAL | Use the built-in registry |
| `EBEAN_DATASOURCE_HOST` | datahub-mce-consumer | - | Database host and port |
| `ELASTICSEARCH_USE_SSL` | datahub-mce-consumer | false | No TLS on the private network |
| `ELASTICSEARCH_PROTOCOL` | datahub-mce-consumer | http | Private traffic is plain HTTP |
| `KAFKA_BOOTSTRAP_SERVER` | datahub-mce-consumer | - | Kafka broker address |
| `EBEAN_DATASOURCE_DRIVER` | datahub-mce-consumer | com.mysql.jdbc.Driver | JDBC driver class |
| `ALTERNATE_MCP_VALIDATION` | datahub-mce-consumer | true | Faster proposal validation |
| `KAFKA_SCHEMAREGISTRY_URL` | datahub-mce-consumer | - | GMS internal registry |
| `DATAHUB_TELEMETRY_ENABLED` | datahub-mce-consumer | false | Upstream telemetry off |
| `EBEAN_DATASOURCE_PASSWORD` | datahub-mce-consumer | (secret) | Database password |
| `EBEAN_DATASOURCE_USERNAME` | datahub-mce-consumer | (secret) | Database user |
| `ENTITY_VERSIONING_ENABLED` | datahub-mce-consumer | true | Keep aspect version history |
| `DATAHUB_TOKEN_SERVICE_SALT` | datahub-mce-consumer | (secret) | Same source as GMS |
| `MCP_CONSUMER_BATCH_ENABLED` | datahub-mce-consumer | true | Batch proposal consumption |
| `ENTITY_REGISTRY_CONFIG_PATH` | datahub-mce-consumer | /datahub/datahub-mce-consumer/resources/entity-registry.yml | Entity model file |
| `DATAHUB_WAIT_TIMEOUT_SECONDS` | datahub-mce-consumer | 900 | Dependency wait budget |
| `ELASTICSEARCH_IMPLEMENTATION` | datahub-mce-consumer | opensearch | Cluster flavour |
| `STRICT_URN_VALIDATION_ENABLED` | datahub-mce-consumer | true | Reject malformed URNs |
| `ELASTICSEARCH_SHIM_AUTO_DETECT` | datahub-mce-consumer | false | Do not detect engine at boot |
| `ELASTICSEARCH_SHIM_ENGINE_TYPE` | datahub-mce-consumer | OPENSEARCH_2 | Pin the client, skip probing |
| `DATAHUB_TOKEN_SERVICE_SIGNING_KEY` | datahub-mce-consumer | (secret) | Same source as GMS |
| `PORT` | datahub-mae-consumer | 4319 | Management port Railway health-checks |
| `JAVA_OPTS` | datahub-mae-consumer | -XX:MaxRAMPercentage=70 | Heap sized from the container limit |
| `DATAHUB_GMS_HOST` | datahub-mae-consumer | - | Metadata service host |
| `DATAHUB_GMS_PORT` | datahub-mae-consumer | 8080 | Metadata service port |
| `ELASTICSEARCH_HOST` | datahub-mae-consumer | - | Search cluster host |
| `ELASTICSEARCH_PORT` | datahub-mae-consumer | 9200 | Search cluster port |
| `GRAPH_SERVICE_IMPL` | datahub-mae-consumer | elasticsearch | Lineage graph backend |
| `PE_CONSUMER_ENABLED` | datahub-mae-consumer | true | Run the platform event consumer |
| `EBEAN_DATASOURCE_URL` | datahub-mae-consumer | - | JDBC connection string |
| `MAE_CONSUMER_ENABLED` | datahub-mae-consumer | true | Run the change-log consumer |
| `SCHEMA_REGISTRY_TYPE` | datahub-mae-consumer | INTERNAL | Use the built-in registry |
| `EBEAN_DATASOURCE_HOST` | datahub-mae-consumer | - | Database host and port |
| `ELASTICSEARCH_USE_SSL` | datahub-mae-consumer | false | No TLS on the private network |
| `ELASTICSEARCH_PROTOCOL` | datahub-mae-consumer | http | Private traffic is plain HTTP |
| `KAFKA_BOOTSTRAP_SERVER` | datahub-mae-consumer | - | Kafka broker address |
| `EBEAN_DATASOURCE_DRIVER` | datahub-mae-consumer | com.mysql.jdbc.Driver | JDBC driver class |
| `KAFKA_SCHEMAREGISTRY_URL` | datahub-mae-consumer | - | GMS internal registry |
| `DATAHUB_TELEMETRY_ENABLED` | datahub-mae-consumer | false | Upstream telemetry off |
| `EBEAN_DATASOURCE_PASSWORD` | datahub-mae-consumer | (secret) | Database password |
| `EBEAN_DATASOURCE_USERNAME` | datahub-mae-consumer | (secret) | Database user |
| `ENTITY_VERSIONING_ENABLED` | datahub-mae-consumer | true | Keep aspect version history |
| `ENTITY_GRAPH_CACHE_ENABLED` | datahub-mae-consumer | false | Disable the graph cache |
| `MCL_CONSUMER_BATCH_ENABLED` | datahub-mae-consumer | true | Batch change-log consumption |
| `ENTITY_REGISTRY_CONFIG_PATH` | datahub-mae-consumer | /datahub/datahub-mae-consumer/resources/entity-registry.yml | Entity model file |
| `DATAHUB_WAIT_TIMEOUT_SECONDS` | datahub-mae-consumer | 900 | Dependency wait budget |
| `ELASTICSEARCH_IMPLEMENTATION` | datahub-mae-consumer | opensearch | Cluster flavour |
| `ELASTICSEARCH_SHIM_AUTO_DETECT` | datahub-mae-consumer | false | Do not detect engine at boot |
| `ELASTICSEARCH_SHIM_ENGINE_TYPE` | datahub-mae-consumer | OPENSEARCH_2 | Pin the client, skip probing |
| `PORT` | datahub-gms | 8080 | Port Railway health-checks |
| `JAVA_OPTS` | datahub-gms | -XX:MaxRAMPercentage=70 | Heap sized from the container limit |
| `SERVER_ADDRESS` | datahub-gms | :: | Dual-stack bind for private callers |
| `THEME_V2_DEFAULT` | datahub-gms | true | Use the redesigned theme |
| `ELASTICSEARCH_HOST` | datahub-gms | - | Search cluster host |
| `ELASTICSEARCH_PORT` | datahub-gms | 9200 | Search cluster port |
| `GRAPH_SERVICE_IMPL` | datahub-gms | elasticsearch | Lineage graph backend |
| `DATAHUB_SERVER_TYPE` | datahub-gms | railway | Deployment label |
| `PE_CONSUMER_ENABLED` | datahub-gms | false | Runs as its own service |
| `EBEAN_DATASOURCE_URL` | datahub-gms | - | JDBC connection string |
| `MAE_CONSUMER_ENABLED` | datahub-gms | false | Runs as its own service |
| `MCE_CONSUMER_ENABLED` | datahub-gms | false | Runs as its own service |
| `SCHEMA_REGISTRY_TYPE` | datahub-gms | INTERNAL | Use the built-in registry |
| `UI_INGESTION_ENABLED` | datahub-gms | true | Enable the Data Sources screen |
| `EBEAN_DATASOURCE_HOST` | datahub-gms | - | Database host and port |
| `ELASTICSEARCH_USE_SSL` | datahub-gms | false | No TLS on the private network |
| `ELASTICSEARCH_PROTOCOL` | datahub-gms | http | Private traffic is plain HTTP |
| `ES_BULK_REFRESH_POLICY` | datahub-gms | NONE | Do not force refresh per write |
| `KAFKA_BOOTSTRAP_SERVER` | datahub-gms | - | Kafka broker address |
| `SEARCH_BAR_API_VARIANT` | datahub-gms | SEARCH_ACROSS_ENTITIES | Search API used by the bar |
| `EBEAN_DATASOURCE_DRIVER` | datahub-gms | com.mysql.jdbc.Driver | JDBC driver class |
| `SHOW_HOME_PAGE_REDESIGN` | datahub-gms | true | New home page layout |
| `ALTERNATE_MCP_VALIDATION` | datahub-gms | true | Faster proposal validation |
| `DATAHUB_SYSTEM_CLIENT_ID` | datahub-gms | __datahub_system | Service account id |
| `KAFKA_SCHEMAREGISTRY_URL` | datahub-gms | http://localhost:8080/schema-registry/api/ | Own registry over loopback |
| `SHOW_HAS_SIBLINGS_FILTER` | datahub-gms | true | Sibling assets filter |
| `DATAHUB_TELEMETRY_ENABLED` | datahub-gms | false | Upstream telemetry off |
| `EBEAN_DATASOURCE_PASSWORD` | datahub-gms | (secret) | Database password |
| `EBEAN_DATASOURCE_USERNAME` | datahub-gms | (secret) | Database user |
| `ENTITY_VERSIONING_ENABLED` | datahub-gms | true | Keep aspect version history |
| `USAGE_AGGREGATION_ENABLED` | datahub-gms | true | Aggregate usage statistics |
| `DATAHUB_OBJECT_STORAGE_URI` | datahub-gms | file:///tmp/datahub-object-storage | Set to s3://bucket to persist assets |
| `DATAHUB_TOKEN_SERVICE_SALT` | datahub-gms | (secret) | Salt for token hashing |
| `MCL_CONSUMER_BATCH_ENABLED` | datahub-gms | true | Batch change-log consumption |
| `MCP_CONSUMER_BATCH_ENABLED` | datahub-gms | true | Batch proposal consumption |
| `ENTITY_REGISTRY_CONFIG_PATH` | datahub-gms | /datahub/datahub-gms/resources/entity-registry.yml | Entity model file |
| `DATAHUB_SYSTEM_CLIENT_SECRET` | datahub-gms | (secret) | Service account secret |
| `DATAHUB_WAIT_TIMEOUT_SECONDS` | datahub-gms | 900 | Dependency wait budget |
| `ELASTICSEARCH_IMPLEMENTATION` | datahub-gms | opensearch | Cluster flavour |
| `SHOW_INGESTION_PAGE_REDESIGN` | datahub-gms | true | New ingestion page layout |
| `METADATA_SERVICE_AUTH_ENABLED` | datahub-gms | true | Reject anonymous API calls |
| `STRICT_URN_VALIDATION_ENABLED` | datahub-gms | true | Reject malformed URNs |
| `ELASTICSEARCH_SHIM_AUTO_DETECT` | datahub-gms | false | Do not detect engine at boot |
| `ELASTICSEARCH_SHIM_ENGINE_TYPE` | datahub-gms | OPENSEARCH_2 | Pin the client, skip probing |
| `ENTITY_SERVICE_ENABLE_RETENTION` | datahub-gms | true | Apply aspect retention rules |
| `GRAPH_SERVICE_DIFF_MODE_ENABLED` | datahub-gms | true | Write only changed edges |
| `DATAHUB_TOKEN_SERVICE_SIGNING_KEY` | datahub-gms | (secret) | Signs access tokens; edge points at system-update |
| `ELASTICSEARCH_LIMIT_RESULTS_STRICT` | datahub-gms | true | Enforce result size limits |
| `POLICY_CACHE_REFRESH_INTERVAL_SECONDS` | datahub-gms | 120 | Access policy cache TTL |
| `SHOW_SEARCH_BAR_AUTOCOMPLETE_REDESIGN` | datahub-gms | true | New autocomplete |
| `USAGE_AGGREGATION_FLUSH_INTERVAL_SECONDS` | datahub-gms | 30 | Usage flush interval |
| `USAGE_AGGREGATION_ALIGNMENT_PERIOD_SECONDS` | datahub-gms | 3600 | Usage bucket size |
| `CONFIG_ENTITY_REGISTRY_USE_OPTIMIZED_LOADING` | datahub-gms | true | Faster registry load |
| `ELASTICSEARCH_INDEX_BUILDER_MAPPINGS_REINDEX` | datahub-gms | true | Reindex on mapping change |
| `ELASTICSEARCH_INDEX_BUILDER_SETTINGS_REINDEX` | datahub-gms | true | Reindex on settings change |
| `DATAHUB_UPGRADE_HISTORY_KAFKA_CONSUMER_GROUP_ID` | datahub-gms | generic-duhe-consumer-job-client-gms | Upgrade history group |
| `PORT` | datahub-system-update | 8080 | Reserved; the job serves no HTTP |
| `JAVA_OPTS` | datahub-system-update | -XX:MaxRAMPercentage=70 | Heap sized from the container limit |
| `PARTITIONS` | datahub-system-update | 3 | Partitions per created topic |
| `CREATE_USER` | datahub-system-update | (secret) | Do not seed an extra account |
| `ELASTICSEARCH_HOST` | datahub-system-update | - | Search cluster host |
| `ELASTICSEARCH_PORT` | datahub-system-update | 9200 | Search cluster port |
| `GRAPH_SERVICE_IMPL` | datahub-system-update | elasticsearch | Lineage graph backend |
| `DATAHUB_SERVER_TYPE` | datahub-system-update | railway | Deployment label |
| `EBEAN_DATASOURCE_URL` | datahub-system-update | - | JDBC connection string |
| `SCHEMA_REGISTRY_TYPE` | datahub-system-update | INTERNAL | Use the built-in registry |
| `EBEAN_DATASOURCE_HOST` | datahub-system-update | - | Database host and port |
| `ELASTICSEARCH_USE_SSL` | datahub-system-update | false | No TLS on the private network |
| `ELASTICSEARCH_PROTOCOL` | datahub-system-update | http | Private traffic is plain HTTP |
| `KAFKA_BOOTSTRAP_SERVER` | datahub-system-update | - | Kafka broker address |
| `EBEAN_DATASOURCE_DRIVER` | datahub-system-update | com.mysql.jdbc.Driver | JDBC driver class |
| `BACKFILL_BROWSE_PATHS_V2` | datahub-system-update | true | Backfill browse paths |
| `DATAHUB_PRECREATE_TOPICS` | datahub-system-update | true | Create Kafka topics up front |
| `KAFKA_SCHEMAREGISTRY_URL` | datahub-system-update | http://datahub-gms.railway.internal:8080/schema-registry/api/ | Literal hostname on purpose; a GMS reference here deadlocks the deploy |
| `DATAHUB_SQL_SETUP_ENABLED` | datahub-system-update | true | Create the MySQL schema |
| `DATAHUB_TELEMETRY_ENABLED` | datahub-system-update | false | Upstream telemetry off |
| `EBEAN_DATASOURCE_PASSWORD` | datahub-system-update | (secret) | Database password |
| `EBEAN_DATASOURCE_USERNAME` | datahub-system-update | (secret) | Database user |
| `ENTITY_VERSIONING_ENABLED` | datahub-system-update | true | Keep aspect version history |
| `DATAHUB_TOKEN_SERVICE_SALT` | datahub-system-update | (secret) | Defined HERE; gms and mce reference it |
| `ENTITY_REGISTRY_CONFIG_PATH` | datahub-system-update | /datahub/datahub-gms/resources/entity-registry.yml | Entity model file |
| `DATAHUB_WAIT_TIMEOUT_SECONDS` | datahub-system-update | 900 | Dependency wait budget |
| `ELASTICSEARCH_IMPLEMENTATION` | datahub-system-update | opensearch | Cluster flavour |
| `SCHEMA_REGISTRY_SYSTEM_UPDATE` | datahub-system-update | true | Register schemas during the upgrade |
| `USE_CONFLUENT_SCHEMA_REGISTRY` | datahub-system-update | false | No external registry |
| `ELASTICSEARCH_SHIM_AUTO_DETECT` | datahub-system-update | false | Do not detect engine at boot |
| `ELASTICSEARCH_SHIM_ENGINE_TYPE` | datahub-system-update | OPENSEARCH_2 | Pin the client, skip probing |
| `LOGGING_LEVEL_ORG_APACHE_KAFKA` | datahub-system-update | WARN | Quieten the Kafka client |
| `DATAHUB_TOKEN_SERVICE_SIGNING_KEY` | datahub-system-update | (secret) | Defined HERE; gms and mce reference it |
| `REPROCESS_DEFAULT_BROWSE_PATHS_V2` | datahub-system-update | false | Skip reprocessing existing paths |
| `ELASTICSEARCH_BUILD_INDICES_CLONE_INDICES` | datahub-system-update | false | Do not clone before reindex |
| `SPRING_KAFKA_PROPERTIES_USE_LATEST_VERSION` | datahub-system-update | true | Use latest schema version |
| `ELASTICSEARCH_INDEX_BUILDER_MAPPINGS_REINDEX` | datahub-system-update | true | Reindex on mapping change |
| `ELASTICSEARCH_INDEX_BUILDER_SETTINGS_REINDEX` | datahub-system-update | true | Reindex on settings change |
| `SPRING_KAFKA_PROPERTIES_AUTO_REGISTER_SCHEMAS` | datahub-system-update | true | Register Avro schemas |
| `ELASTICSEARCH_INDEX_BUILDER_REFRESH_INTERVAL_SECONDS` | datahub-system-update | 3 | Index refresh interval |
| `CLUSTER_ID` | kafka | dGF0YUh1YlJhaWx3YXlLMQ | Fixed KRaft cluster id |
| `KAFKA_NODE_ID` | kafka | 1 | Node id in the KRaft quorum |
| `KAFKA_LOG_DIRS` | kafka | /var/lib/kafka/data/logs | Below the volume root |
| `KAFKA_HEAP_OPTS` | kafka | -Xms512m -Xmx1G | Broker heap |
| `KAFKA_LISTENERS` | kafka | BROKER://[::]:29092,CONTROLLER://[::]:39092 | Dual-stack listeners |
| `KAFKA_LOG4J_LOGGERS` | kafka | org.apache.kafka.image.loader.MetadataLoader=WARN | Quieten metadata loader |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller | Combined broker and controller |
| `KAFKA_MAX_MESSAGE_BYTES` | kafka | 5242880 | 5 MB max message |
| `KAFKA_MESSAGE_MAX_BYTES` | kafka | 5242880 | 5 MB max message |
| `KAFKA_LOG4J_ROOT_LOGLEVEL` | kafka | WARN | Quieten broker logs |
| `KAFKA_ADVERTISED_LISTENERS` | kafka | BROKER://kafka.railway.internal:29092 | Address peers dial |
| `KAFKA_TOOLS_LOG4J_LOGLEVEL` | kafka | ERROR | Quieten CLI tools |
| `KAFKA_REPLICA_FETCH_MAX_BYTES` | kafka | 5242880 | 5 MB fetch size |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1@localhost:39092 | Single-node quorum |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | kafka | false | Topics are pre-created |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER | Controller listener |
| `KAFKA_DEFAULT_REPLICATION_FACTOR` | kafka | 1 | Single broker |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | BROKER | Broker-to-broker listener |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | kafka | 1 | Single broker |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | CONTROLLER:PLAINTEXT,BROKER:PLAINTEXT | Plaintext on both |
| `KAFKA_CONFLUENT_SUPPORT_METRICS_ENABLE` | kafka | false | No metrics reporting |
| `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS` | kafka | 0 | Rebalance immediately |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 | Single broker |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | kafka | 1 | Single broker |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `PORT` | datahub-frontend | 9002 | Port Railway health-checks |
| `SERVER_PORT` | datahub-frontend | 9002 | Play HTTP listener port |
| `DATAHUB_SECRET` | datahub-frontend | (secret) | Play session signing key |
| `DATAHUB_GMS_HOST` | datahub-frontend | - | Metadata service host |
| `DATAHUB_GMS_PORT` | datahub-frontend | 8080 | Metadata service port |
| `JAVA_MEMORY_OPTS` | datahub-frontend | -XX:MaxRAMPercentage=60 | Heap sized from the container limit |
| `THEME_V2_DEFAULT` | datahub-frontend | true | Use the redesigned theme |
| `AUTH_JAAS_ENABLED` | datahub-frontend | true | Username and password login |
| `DATAHUB_ADMIN_USER` | datahub-frontend | (secret) | Built-in account username |
| `DATAHUB_APP_VERSION` | datahub-frontend | v1.7.0 | Version shown in the UI |
| `ELASTIC_CLIENT_HOST` | datahub-frontend | - | Analytics index host |
| `ELASTIC_CLIENT_PORT` | datahub-frontend | 9200 | Analytics index port |
| `DATAHUB_GMS_PROTOCOL` | datahub-frontend | http | Private traffic is plain HTTP |
| `DATAHUB_ADMIN_PASSWORD` | datahub-frontend | (secret) | Built-in account password |
| `DATAHUB_TRACKING_TOPIC` | datahub-frontend | DataHubUsageEvent_v1 | Analytics event topic |
| `KAFKA_BOOTSTRAP_SERVER` | datahub-frontend | - | Kafka broker address |
| `DATAHUB_SYSTEM_CLIENT_ID` | datahub-frontend | __datahub_system | Service account id for GMS |
| `DATAHUB_ANALYTICS_ENABLED` | datahub-frontend | true | In-product usage analytics |
| `DATAHUB_PLAY_MEM_BUFFER_SIZE` | datahub-frontend | 10MB | Request body buffer |
| `DATAHUB_SYSTEM_CLIENT_SECRET` | datahub-frontend | (secret) | Service account secret |
| `METADATA_SERVICE_AUTH_ENABLED` | datahub-frontend | true | Authenticate calls to GMS |
| `FRONTEND_GRACEFUL_SHUTDOWN_ENABLED` | datahub-frontend | false | Exit immediately on SIGTERM |
| `PORT` | opensearch | 9200 | Port Railway health-checks |
| `OPENSEARCH_JAVA_OPTS` | opensearch | -Xms1g -Xmx1g -Dlog4j2.formatMsgNoLookups=true | Node heap |
| `OPENSEARCH_NODE_NAME` | opensearch | datahub-search | Node name |
| `DISABLE_SECURITY_PLUGIN` | opensearch | true | Private network only |
| `OPENSEARCH_CLUSTER_NAME` | opensearch | datahub | Cluster name |
| `OPENSEARCH_NETWORK_HOST` | opensearch | :: | Dual-stack bind for private callers |
| `DISABLE_INSTALL_DEMO_CONFIG` | opensearch | true | Skip demo certificates |
| `DATAHUB_GMS_HOST` | datahub-actions | - | Metadata service host |
| `DATAHUB_GMS_PORT` | datahub-actions | 8080 | Metadata service port |
| `ELASTICSEARCH_HOST` | datahub-actions | - | Search cluster host |
| `ELASTICSEARCH_PORT` | datahub-actions | 9200 | Search cluster port |
| `SCHEMA_REGISTRY_URL` | datahub-actions | - | GMS internal registry |
| `DATAHUB_GMS_PROTOCOL` | datahub-actions | http | Private traffic is plain HTTP |
| `ELASTICSEARCH_USE_SSL` | datahub-actions | false | No TLS on the private network |
| `ELASTICSEARCH_PROTOCOL` | datahub-actions | http | Private traffic is plain HTTP |
| `KAFKA_BOOTSTRAP_SERVER` | datahub-actions | - | Kafka broker address |
| `DATAHUB_SYSTEM_CLIENT_ID` | datahub-actions | __datahub_system | Service account id |
| `DATAHUB_TELEMETRY_ENABLED` | datahub-actions | false | Upstream telemetry off |
| `METADATA_AUDIT_EVENT_NAME` | datahub-actions | MetadataAuditEvent_v4 | Audit event topic |
| `DATAHUB_SYSTEM_CLIENT_SECRET` | datahub-actions | (secret) | Service account secret |
| `KAFKA_PROPERTIES_SECURITY_PROTOCOL` | datahub-actions | PLAINTEXT | No TLS on the private network |
| `METADATA_CHANGE_LOG_VERSIONED_TOPIC_NAME` | datahub-actions | MetadataChangeLog_Versioned_v1 | Change log topic |

## Configuration

- **Healthcheck:** `/actuator/health`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'mkdir -p /var/lib/kafka/data/logs && exec /etc/confluent/docker/run'`
- **Volume:** `/var/lib/kafka/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/admin`
- **Healthcheck:** `/`
- **Volume:** `/usr/share/opensearch/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/datahub)
