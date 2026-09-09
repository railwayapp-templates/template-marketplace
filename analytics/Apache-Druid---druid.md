# Deploy Apache Druid on Railway

Real-time analytics database for fast queries over large event data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/druid)

## About

Apache Druid is a distributed, column-oriented analytics database built for sub-second queries over event data that keeps arriving. Netflix, Confluent and Reddit run it behind dashboards their engineers refresh all day. The obvious alternatives fall down at that job — a row store like Postgres reads far too many bytes per aggregate, and a batch warehouse answers in minutes when the person staring at the chart wants an answer now. Druid gets there with time-partitioned segments, per-column compression, bitmap indexes on every dimension, and optional roll-up at ingestion time.

Deploy Apache Druid on Railway and you get the real multi-process cluster, not a single-box demo. `druid-router` is the only public service: it serves the web console and proxies queries. `druid-broker` fans a query out to the data tier and merges results. `druid-coordinator` runs as both Coordinator and Overlord, balancing segments and scheduling ingestion. `druid-historical` holds published segments in a volume-backed cache, and `druid-middlemanager` forks a task process per ingestion job. `zookeeper` handles discovery, `Postgres` is the metadata store, and a Railway bucket is deep storage for segments and task logs.

![Druid router, coordinator, broker, historical and middlemanager beside ZooKeeper and Postgres](https://res.cloudinary.com/rroe4rtk/image/upload/v1788858608/druid-architecture.png)

Druid splits into three server groups, and this template gives each process its own Railway service so they scale independently: the **query** group (router, broker) receives requests, the **data** group (historical, middlemanager) stores segments and runs ingestion, and the **master** group (coordinator/overlord) decides what goes where. Every process is stateless with respect to your data — the authoritative copy of a segment is the ZIP in deep storage — so a node can be recreated without losing anything.

- Sub-second aggregations over billions of rows, via columnar storage and bitmap indexes
- Streaming ingestion from Apache Kafka or Amazon Kinesis, exactly once
- Ingestion-time roll-up that collapses raw events into pre-aggregated rows
- A full SQL layer, a native JSON query API, and a built-in web console

Self-host Apache Druid when your event volume has outgrown a general-purpose database, when dashboards must be interactive rather than scheduled, or when you want a query layer over a Kafka topic with no ETL job in between.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| druid-historical | `apache/druid:37.0.0` | Database |
| druid-broker | `apache/druid:37.0.0` | Worker |
| zookeeper | `zookeeper:3.9` | Database |
| druid-middlemanager | `apache/druid:37.0.0` | Database |
| druid-router | `apache/druid:37.0.0` | Web service |
| druid-coordinator | `apache/druid:37.0.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | druid-historical | 8083 | Port Railway health-checks |
| `DRUID_XMS` | druid-historical | 2g | JVM initial heap |
| `DRUID_XMX` | druid-historical | 2g | JVM maximum heap |
| `JAVA_OPTS` | druid-historical | -Djava.net.preferIPv6Addresses=true | Prefer IPv6 for private peers |
| `druid_host` | druid-historical | druid-historical.railway.internal | Private hostname this node advertises |
| `DRUID_LOG4J` | druid-historical | <?xml version=\"1.0\" encoding=\"UTF-8\" ?><Configuration status=\"WARN\"><Appenders><Console name=\"Console\" target=\"SYSTEM_OUT\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></Console><Routing name=\"RoutingAppender\"><Routes pattern=\"$${ctx:task.log.id}\"><Route><File name=\"task-${ctx:task.log.id}\" fileName=\"${ctx:task.log.file}\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></File></Route><Route key=\"$${ctx:task.log.id}\" ref=\"Console\"/></Routes></Routing></Appenders><Loggers><Root level=\"info\"><AppenderRef ref=\"RoutingAppender\"/></Root><Logger name=\"com.sun.jersey.guice\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger><Logger name=\"org.apache.kafka.clients.consumer.internals\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger></Loggers></Configuration> | Log to stdout, keep task-log routing |
| `druid_emitter` | druid-historical | noop | Metrics emitter |
| `druid_sql_enable` | druid-historical | true | Enable Druid SQL |
| `DRUID_SET_HOST_IP` | druid-historical | 0 | Do not advertise the container IPv4 |
| `druid_s3_accessKey` | druid-historical | {\"type\":\"environment\",\"variable\":\"DRUID_S3_ACCESS_KEY\"} | Access key read from the environment |
| `druid_s3_secretKey` | druid-historical | (secret) | Secret key read from the environment |
| `druid_storage_type` | druid-historical | s3 | Deep storage backend |
| `DRUID_S3_ACCESS_KEY` | druid-historical | - | Deep storage access key |
| `DRUID_S3_SECRET_KEY` | druid-historical | (secret) | Deep storage secret key |
| `druid_plaintextPort` | druid-historical | 8083 | HTTP port the historical serves |
| `druid_zk_paths_base` | druid-historical | /druid | ZooKeeper namespace root |
| `DRUID_ADMIN_PASSWORD` | druid-historical | (secret) | Console admin password |
| `druid_escalator_type` | druid-historical | basic | Internal request authentication |
| `druid_storage_bucket` | druid-historical | - | Deep storage bucket name |
| `druid_s3_endpoint_url` | druid-historical | - | Object storage endpoint |
| `druid_storage_baseKey` | druid-historical | druid/segments | Segment key prefix |
| `druid_zk_service_host` | druid-historical | - | ZooKeeper connect string |
| `druid_auth_authorizers` | druid-historical | [\"basic\"] | Authorizers in order |
| `DRUID_INTERNAL_PASSWORD` | druid-historical | (secret) | Internal service account password |
| `DRUID_METADATA_PASSWORD` | druid-historical | (secret) | Metadata store password |
| `druid_cache_sizeInBytes` | druid-historical | 128MiB | Per-segment result cache |
| `druid_indexer_logs_type` | druid-historical | s3 | Task logs go to object storage |
| `druid_storage_disableAcl` | druid-historical | true | Object ownership mode, no ACLs |
| `DRUID_MAXDIRECTMEMORYSIZE` | druid-historical | 3g | JVM direct memory ceiling |
| `druid_auth_unsecuredPaths` | druid-historical | [\"/status/health\"] | Anonymous health-check path |
| `druid_extensions_loadList` | druid-historical | [\"druid-basic-security\",\"druid-s3-extensions\",\"postgresql-metadata-storage\",\"druid-datasketches\",\"druid-histogram\",\"druid-lookups-cached-global\",\"druid-kafka-indexing-service\",\"druid-parquet-extensions\"] | Extensions loaded at boot |
| `druid_indexer_logs_s3Bucket` | druid-historical | - | Task log bucket name |
| `druid_indexer_logs_s3Prefix` | druid-historical | druid/indexing-logs | Task log key prefix |
| `druid_metadata_storage_type` | druid-historical | postgresql | Metadata store engine |
| `druid_processing_numThreads` | druid-historical | 4 | Query processing threads |
| `druid_segmentCache_locations` | druid-historical | [{\"path\":\"var/druid/segment-cache\",\"maxSize\":\"3g\"}] | Local segment cache on the volume |
| `druid_server_http_numThreads` | druid-historical | 30 | Jetty request threads |
| `druid_auth_authenticatorChain` | druid-historical | [\"basic\"] | Authenticators in order |
| `druid_indexer_logs_disableAcl` | druid-historical | true | Object ownership mode, no ACLs |
| `druid_escalator_authorizerName` | druid-historical | basic | Authorizer for internal requests |
| `druid_s3_enablePathStyleAccess` | druid-historical | true | Path-style bucket addressing |
| `druid_s3_endpoint_signingRegion` | druid-historical | - | SigV4 signing region |
| `druid_auth_authorizer_basic_type` | druid-historical | basic | Role-based authorizer |
| `druid_processing_numMergeBuffers` | druid-historical | 2 | Merge buffers for group-by queries |
| `druid_processing_buffer_sizeBytes` | druid-historical | 128MiB | Off-heap processing buffer size |
| `druid_auth_authenticator_basic_type` | druid-historical | basic | HTTP basic authenticator |
| `druid_startup_logging_logProperties` | druid-historical | true | Print resolved properties at boot |
| `druid_metadata_storage_connector_user` | druid-historical | (secret) | Metadata store user |
| `druid_escalator_internalClientPassword` | druid-historical | (secret) | Password read from the environment |
| `druid_escalator_internalClientUsername` | druid-historical | (secret) | Internal service account |
| `druid_metadata_storage_connector_password` | druid-historical | (secret) | Password read from the environment |
| `druid_storage_transfer_useTransferManager` | druid-historical | false | Plain PutObject writes |
| `druid_metadata_storage_connector_connectURI` | druid-historical | - | Metadata JDBC URL |
| `druid_auth_authenticator_basic_skipOnFailure` | druid-historical | false | Reject unknown credentials |
| `druid_auth_authenticator_basic_authorizerName` | druid-historical | basic | Authorizer for this authenticator |
| `druid_auth_authenticator_basic_initialAdminPassword` | druid-historical | (secret) | Seeds the admin user once |
| `druid_auth_authenticator_basic_credentialsValidator_type` | druid-historical | (secret) | Users stored in the metadata store |
| `druid_auth_authenticator_basic_initialInternalClientPassword` | druid-historical | (secret) | Seeds druid_system once |
| `PORT` | druid-broker | 8082 | Port Railway health-checks |
| `DRUID_XMS` | druid-broker | 2g | JVM initial heap |
| `DRUID_XMX` | druid-broker | 2g | JVM maximum heap |
| `JAVA_OPTS` | druid-broker | -Djava.net.preferIPv6Addresses=true | Prefer IPv6 for private peers |
| `druid_host` | druid-broker | druid-broker.railway.internal | Private hostname this node advertises |
| `DRUID_LOG4J` | druid-broker | <?xml version=\"1.0\" encoding=\"UTF-8\" ?><Configuration status=\"WARN\"><Appenders><Console name=\"Console\" target=\"SYSTEM_OUT\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></Console><Routing name=\"RoutingAppender\"><Routes pattern=\"$${ctx:task.log.id}\"><Route><File name=\"task-${ctx:task.log.id}\" fileName=\"${ctx:task.log.file}\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></File></Route><Route key=\"$${ctx:task.log.id}\" ref=\"Console\"/></Routes></Routing></Appenders><Loggers><Root level=\"info\"><AppenderRef ref=\"RoutingAppender\"/></Root><Logger name=\"com.sun.jersey.guice\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger><Logger name=\"org.apache.kafka.clients.consumer.internals\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger></Loggers></Configuration> | Log to stdout, keep task-log routing |
| `druid_emitter` | druid-broker | noop | Metrics emitter |
| `druid_sql_enable` | druid-broker | true | Enable Druid SQL |
| `DRUID_SET_HOST_IP` | druid-broker | 0 | Do not advertise the container IPv4 |
| `druid_s3_accessKey` | druid-broker | {\"type\":\"environment\",\"variable\":\"DRUID_S3_ACCESS_KEY\"} | Access key read from the environment |
| `druid_s3_secretKey` | druid-broker | (secret) | Secret key read from the environment |
| `druid_storage_type` | druid-broker | s3 | Deep storage backend |
| `DRUID_S3_ACCESS_KEY` | druid-broker | - | Deep storage access key |
| `DRUID_S3_SECRET_KEY` | druid-broker | (secret) | Deep storage secret key |
| `druid_plaintextPort` | druid-broker | 8082 | HTTP port the broker serves |
| `druid_zk_paths_base` | druid-broker | /druid | ZooKeeper namespace root |
| `DRUID_ADMIN_PASSWORD` | druid-broker | (secret) | Console admin password |
| `druid_escalator_type` | druid-broker | basic | Internal request authentication |
| `druid_storage_bucket` | druid-broker | - | Deep storage bucket name |
| `druid_s3_endpoint_url` | druid-broker | - | Object storage endpoint |
| `druid_storage_baseKey` | druid-broker | druid/segments | Segment key prefix |
| `druid_zk_service_host` | druid-broker | - | ZooKeeper connect string |
| `druid_auth_authorizers` | druid-broker | [\"basic\"] | Authorizers in order |
| `DRUID_INTERNAL_PASSWORD` | druid-broker | (secret) | Internal service account password |
| `DRUID_METADATA_PASSWORD` | druid-broker | (secret) | Metadata store password |
| `druid_indexer_logs_type` | druid-broker | s3 | Task logs go to object storage |
| `druid_storage_disableAcl` | druid-broker | true | Object ownership mode, no ACLs |
| `DRUID_MAXDIRECTMEMORYSIZE` | druid-broker | 2g | JVM direct memory ceiling |
| `druid_auth_unsecuredPaths` | druid-broker | [\"/status/health\"] | Anonymous health-check path |
| `druid_extensions_loadList` | druid-broker | [\"druid-basic-security\",\"druid-s3-extensions\",\"postgresql-metadata-storage\",\"druid-datasketches\",\"druid-histogram\",\"druid-lookups-cached-global\",\"druid-kafka-indexing-service\",\"druid-parquet-extensions\"] | Extensions loaded at boot |
| `druid_indexer_logs_s3Bucket` | druid-broker | - | Task log bucket name |
| `druid_indexer_logs_s3Prefix` | druid-broker | druid/indexing-logs | Task log key prefix |
| `druid_metadata_storage_type` | druid-broker | postgresql | Metadata store engine |
| `druid_processing_numThreads` | druid-broker | 2 | Query processing threads |
| `druid_server_http_numThreads` | druid-broker | 30 | Jetty request threads |
| `druid_auth_authenticatorChain` | druid-broker | [\"basic\"] | Authenticators in order |
| `druid_indexer_logs_disableAcl` | druid-broker | true | Object ownership mode, no ACLs |
| `druid_escalator_authorizerName` | druid-broker | basic | Authorizer for internal requests |
| `druid_s3_enablePathStyleAccess` | druid-broker | true | Path-style bucket addressing |
| `druid_s3_endpoint_signingRegion` | druid-broker | - | SigV4 signing region |
| `druid_auth_authorizer_basic_type` | druid-broker | basic | Role-based authorizer |
| `druid_broker_http_numConnections` | druid-broker | 20 | Connections per data server |
| `druid_processing_numMergeBuffers` | druid-broker | 2 | Merge buffers for group-by queries |
| `druid_processing_buffer_sizeBytes` | druid-broker | 128MiB | Off-heap processing buffer size |
| `druid_auth_authenticator_basic_type` | druid-broker | basic | HTTP basic authenticator |
| `druid_startup_logging_logProperties` | druid-broker | true | Print resolved properties at boot |
| `druid_metadata_storage_connector_user` | druid-broker | (secret) | Metadata store user |
| `druid_escalator_internalClientPassword` | druid-broker | (secret) | Password read from the environment |
| `druid_escalator_internalClientUsername` | druid-broker | (secret) | Internal service account |
| `druid_metadata_storage_connector_password` | druid-broker | (secret) | Password read from the environment |
| `druid_storage_transfer_useTransferManager` | druid-broker | false | Plain PutObject writes |
| `druid_metadata_storage_connector_connectURI` | druid-broker | - | Metadata JDBC URL |
| `druid_auth_authenticator_basic_skipOnFailure` | druid-broker | false | Reject unknown credentials |
| `druid_auth_authenticator_basic_authorizerName` | druid-broker | basic | Authorizer for this authenticator |
| `druid_auth_authenticator_basic_initialAdminPassword` | druid-broker | (secret) | Seeds the admin user once |
| `druid_auth_authenticator_basic_credentialsValidator_type` | druid-broker | (secret) | Users stored in the metadata store |
| `druid_auth_authenticator_basic_initialInternalClientPassword` | druid-broker | (secret) | Seeds druid_system once |
| `PORT` | zookeeper | 8080 | Admin server port Railway health-checks |
| `JVMFLAGS` | zookeeper | -Xms256m -Xmx512m | ZooKeeper JVM heap |
| `ZOO_MY_ID` | zookeeper | 1 | Node id written to the data directory |
| `ZK_PRIVATE_HOST` | zookeeper | zookeeper.railway.internal:2181 | Connect string Druid services reference |
| `ZOO_DATA_LOG_DIR` | zookeeper | /data | Transaction logs share the one volume |
| `ZOO_MAX_CLIENT_CNXNS` | zookeeper | 200 | Connection cap per client host |
| `ZOO_STANDALONE_ENABLED` | zookeeper | true | Single-node ensemble |
| `ZOO_ADMINSERVER_ENABLED` | zookeeper | true | Serves the /commands health endpoint |
| `ZOO_4LW_COMMANDS_WHITELIST` | zookeeper | srvr,ruok,mntr,conf,stat | Allowed four-letter commands |
| `ZOO_AUTOPURGE_PURGEINTERVAL` | zookeeper | 1 | Snapshot purge interval in hours |
| `ZOO_AUTOPURGE_SNAPRETAINCOUNT` | zookeeper | 5 | Snapshots kept per purge |
| `PORT` | druid-middlemanager | 8091 | Port Railway health-checks |
| `DRUID_XMS` | druid-middlemanager | 256m | JVM initial heap |
| `DRUID_XMX` | druid-middlemanager | 256m | JVM maximum heap |
| `JAVA_OPTS` | druid-middlemanager | -Djava.net.preferIPv6Addresses=true | Prefer IPv6 for private peers |
| `druid_host` | druid-middlemanager | druid-middlemanager.railway.internal | Private hostname this node advertises |
| `DRUID_LOG4J` | druid-middlemanager | <?xml version=\"1.0\" encoding=\"UTF-8\" ?><Configuration status=\"WARN\"><Appenders><Console name=\"Console\" target=\"SYSTEM_OUT\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></Console><Routing name=\"RoutingAppender\"><Routes pattern=\"$${ctx:task.log.id}\"><Route><File name=\"task-${ctx:task.log.id}\" fileName=\"${ctx:task.log.file}\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></File></Route><Route key=\"$${ctx:task.log.id}\" ref=\"Console\"/></Routes></Routing></Appenders><Loggers><Root level=\"info\"><AppenderRef ref=\"RoutingAppender\"/></Root><Logger name=\"com.sun.jersey.guice\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger><Logger name=\"org.apache.kafka.clients.consumer.internals\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger></Loggers></Configuration> | Log to stdout, keep task-log routing |
| `druid_emitter` | druid-middlemanager | noop | Metrics emitter |
| `druid_sql_enable` | druid-middlemanager | true | Enable Druid SQL |
| `DRUID_SET_HOST_IP` | druid-middlemanager | 0 | Do not advertise the container IPv4 |
| `druid_s3_accessKey` | druid-middlemanager | {\"type\":\"environment\",\"variable\":\"DRUID_S3_ACCESS_KEY\"} | Access key read from the environment |
| `druid_s3_secretKey` | druid-middlemanager | (secret) | Secret key read from the environment |
| `druid_storage_type` | druid-middlemanager | s3 | Deep storage backend |
| `DRUID_S3_ACCESS_KEY` | druid-middlemanager | - | Deep storage access key |
| `DRUID_S3_SECRET_KEY` | druid-middlemanager | (secret) | Deep storage secret key |
| `druid_plaintextPort` | druid-middlemanager | 8091 | HTTP port the middlemanager serves |
| `druid_zk_paths_base` | druid-middlemanager | /druid | ZooKeeper namespace root |
| `DRUID_ADMIN_PASSWORD` | druid-middlemanager | (secret) | Console admin password |
| `druid_escalator_type` | druid-middlemanager | basic | Internal request authentication |
| `druid_storage_bucket` | druid-middlemanager | - | Deep storage bucket name |
| `druid_s3_endpoint_url` | druid-middlemanager | - | Object storage endpoint |
| `druid_storage_baseKey` | druid-middlemanager | druid/segments | Segment key prefix |
| `druid_worker_capacity` | druid-middlemanager | 2 | Concurrent ingestion tasks |
| `druid_zk_service_host` | druid-middlemanager | - | ZooKeeper connect string |
| `druid_auth_authorizers` | druid-middlemanager | [\"basic\"] | Authorizers in order |
| `DRUID_INTERNAL_PASSWORD` | druid-middlemanager | (secret) | Internal service account password |
| `DRUID_METADATA_PASSWORD` | druid-middlemanager | (secret) | Metadata store password |
| `druid_indexer_logs_type` | druid-middlemanager | s3 | Task logs go to object storage |
| `druid_storage_disableAcl` | druid-middlemanager | true | Object ownership mode, no ACLs |
| `druid_auth_unsecuredPaths` | druid-middlemanager | [\"/status/health\"] | Anonymous health-check path |
| `druid_extensions_loadList` | druid-middlemanager | [\"druid-basic-security\",\"druid-s3-extensions\",\"postgresql-metadata-storage\",\"druid-datasketches\",\"druid-histogram\",\"druid-lookups-cached-global\",\"druid-kafka-indexing-service\",\"druid-parquet-extensions\"] | Extensions loaded at boot |
| `druid_worker_baseTaskDirs` | druid-middlemanager | [\"var/druid/task\"] | Task working directories on the volume |
| `druid_indexer_logs_s3Bucket` | druid-middlemanager | - | Task log bucket name |
| `druid_indexer_logs_s3Prefix` | druid-middlemanager | druid/indexing-logs | Task log key prefix |
| `druid_metadata_storage_type` | druid-middlemanager | postgresql | Metadata store engine |
| `druid_server_http_numThreads` | druid-middlemanager | 30 | Jetty request threads |
| `druid_auth_authenticatorChain` | druid-middlemanager | [\"basic\"] | Authenticators in order |
| `druid_indexer_logs_disableAcl` | druid-middlemanager | true | Object ownership mode, no ACLs |
| `druid_escalator_authorizerName` | druid-middlemanager | basic | Authorizer for internal requests |
| `druid_s3_enablePathStyleAccess` | druid-middlemanager | true | Path-style bucket addressing |
| `druid_s3_endpoint_signingRegion` | druid-middlemanager | - | SigV4 signing region |
| `druid_auth_authorizer_basic_type` | druid-middlemanager | basic | Role-based authorizer |
| `druid_indexer_runner_javaOptsArray` | druid-middlemanager | [\"-server\",\"-Xms1g\",\"-Xmx1g\",\"-XX:MaxDirectMemorySize=1g\",\"-Duser.timezone=UTC\",\"-Dfile.encoding=UTF-8\",\"-XX:+ExitOnOutOfMemoryError\",\"-Djava.net.preferIPv6Addresses=true\",\"-Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager\"] | JVM flags for each task process |
| `druid_auth_authenticator_basic_type` | druid-middlemanager | basic | HTTP basic authenticator |
| `druid_startup_logging_logProperties` | druid-middlemanager | true | Print resolved properties at boot |
| `druid_metadata_storage_connector_user` | druid-middlemanager | (secret) | Metadata store user |
| `druid_escalator_internalClientPassword` | druid-middlemanager | (secret) | Password read from the environment |
| `druid_escalator_internalClientUsername` | druid-middlemanager | (secret) | Internal service account |
| `druid_metadata_storage_connector_password` | druid-middlemanager | (secret) | Password read from the environment |
| `druid_storage_transfer_useTransferManager` | druid-middlemanager | false | Plain PutObject writes |
| `druid_metadata_storage_connector_connectURI` | druid-middlemanager | - | Metadata JDBC URL |
| `druid_auth_authenticator_basic_skipOnFailure` | druid-middlemanager | false | Reject unknown credentials |
| `druid_auth_authenticator_basic_authorizerName` | druid-middlemanager | basic | Authorizer for this authenticator |
| `druid_auth_authenticator_basic_initialAdminPassword` | druid-middlemanager | (secret) | Seeds the admin user once |
| `druid_indexer_fork_property_druid_processing_numThreads` | druid-middlemanager | 1 | Processing threads per task |
| `druid_auth_authenticator_basic_credentialsValidator_type` | druid-middlemanager | (secret) | Users stored in the metadata store |
| `druid_auth_authenticator_basic_initialInternalClientPassword` | druid-middlemanager | (secret) | Seeds druid_system once |
| `druid_indexer_fork_property_druid_processing_numMergeBuffers` | druid-middlemanager | 2 | Merge buffers per task |
| `druid_indexer_fork_property_druid_processing_buffer_sizeBytes` | druid-middlemanager | 64MiB | Processing buffer per task |
| `PORT` | druid-router | 8888 | Port Railway health-checks |
| `DRUID_XMS` | druid-router | 512m | JVM initial heap |
| `DRUID_XMX` | druid-router | 512m | JVM maximum heap |
| `JAVA_OPTS` | druid-router | -Djava.net.preferIPv6Addresses=true | Prefer IPv6 for private peers |
| `druid_host` | druid-router | druid-router.railway.internal | Private hostname this node advertises |
| `DRUID_LOG4J` | druid-router | <?xml version=\"1.0\" encoding=\"UTF-8\" ?><Configuration status=\"WARN\"><Appenders><Console name=\"Console\" target=\"SYSTEM_OUT\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></Console><Routing name=\"RoutingAppender\"><Routes pattern=\"$${ctx:task.log.id}\"><Route><File name=\"task-${ctx:task.log.id}\" fileName=\"${ctx:task.log.file}\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></File></Route><Route key=\"$${ctx:task.log.id}\" ref=\"Console\"/></Routes></Routing></Appenders><Loggers><Root level=\"info\"><AppenderRef ref=\"RoutingAppender\"/></Root><Logger name=\"com.sun.jersey.guice\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger><Logger name=\"org.apache.kafka.clients.consumer.internals\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger></Loggers></Configuration> | Log to stdout, keep task-log routing |
| `druid_emitter` | druid-router | noop | Metrics emitter |
| `druid_sql_enable` | druid-router | true | Enable Druid SQL |
| `DRUID_SET_HOST_IP` | druid-router | 0 | Do not advertise the container IPv4 |
| `druid_s3_accessKey` | druid-router | {\"type\":\"environment\",\"variable\":\"DRUID_S3_ACCESS_KEY\"} | Access key read from the environment |
| `druid_s3_secretKey` | druid-router | (secret) | Secret key read from the environment |
| `druid_storage_type` | druid-router | s3 | Deep storage backend |
| `DRUID_S3_ACCESS_KEY` | druid-router | - | Deep storage access key |
| `DRUID_S3_SECRET_KEY` | druid-router | (secret) | Deep storage secret key |
| `druid_plaintextPort` | druid-router | 8888 | HTTP port the router serves |
| `druid_zk_paths_base` | druid-router | /druid | ZooKeeper namespace root |
| `DRUID_ADMIN_PASSWORD` | druid-router | (secret) | Console admin password |
| `druid_escalator_type` | druid-router | basic | Internal request authentication |
| `druid_storage_bucket` | druid-router | - | Deep storage bucket name |
| `druid_s3_endpoint_url` | druid-router | - | Object storage endpoint |
| `druid_storage_baseKey` | druid-router | druid/segments | Segment key prefix |
| `druid_zk_service_host` | druid-router | - | ZooKeeper connect string |
| `druid_auth_authorizers` | druid-router | [\"basic\"] | Authorizers in order |
| `DRUID_INTERNAL_PASSWORD` | druid-router | (secret) | Internal service account password |
| `DRUID_METADATA_PASSWORD` | druid-router | (secret) | Metadata store password |
| `druid_indexer_logs_type` | druid-router | s3 | Task logs go to object storage |
| `druid_storage_disableAcl` | druid-router | true | Object ownership mode, no ACLs |
| `DRUID_MAXDIRECTMEMORYSIZE` | druid-router | 128m | JVM direct memory ceiling |
| `druid_auth_unsecuredPaths` | druid-router | [\"/status/health\"] | Anonymous health-check path |
| `druid_extensions_loadList` | druid-router | [\"druid-basic-security\",\"druid-s3-extensions\",\"postgresql-metadata-storage\",\"druid-datasketches\",\"druid-histogram\",\"druid-lookups-cached-global\",\"druid-kafka-indexing-service\",\"druid-parquet-extensions\"] | Extensions loaded at boot |
| `druid_indexer_logs_s3Bucket` | druid-router | - | Task log bucket name |
| `druid_indexer_logs_s3Prefix` | druid-router | druid/indexing-logs | Task log key prefix |
| `druid_metadata_storage_type` | druid-router | postgresql | Metadata store engine |
| `druid_auth_authenticatorChain` | druid-router | [\"basic\"] | Authenticators in order |
| `druid_indexer_logs_disableAcl` | druid-router | true | Object ownership mode, no ACLs |
| `druid_escalator_authorizerName` | druid-router | basic | Authorizer for internal requests |
| `druid_s3_enablePathStyleAccess` | druid-router | true | Path-style bucket addressing |
| `druid_s3_endpoint_signingRegion` | druid-router | - | SigV4 signing region |
| `druid_auth_authorizer_basic_type` | druid-router | basic | Role-based authorizer |
| `druid_auth_authenticator_basic_type` | druid-router | basic | HTTP basic authenticator |
| `druid_startup_logging_logProperties` | druid-router | true | Print resolved properties at boot |
| `druid_router_managementProxy_enabled` | druid-router | true | Console reaches coordinator and overlord |
| `druid_metadata_storage_connector_user` | druid-router | (secret) | Metadata store user |
| `druid_escalator_internalClientPassword` | druid-router | (secret) | Password read from the environment |
| `druid_escalator_internalClientUsername` | druid-router | (secret) | Internal service account |
| `druid_metadata_storage_connector_password` | druid-router | (secret) | Password read from the environment |
| `druid_storage_transfer_useTransferManager` | druid-router | false | Plain PutObject writes |
| `druid_metadata_storage_connector_connectURI` | druid-router | - | Metadata JDBC URL |
| `druid_auth_authenticator_basic_skipOnFailure` | druid-router | false | Reject unknown credentials |
| `druid_auth_authenticator_basic_authorizerName` | druid-router | basic | Authorizer for this authenticator |
| `druid_auth_authenticator_basic_initialAdminPassword` | druid-router | (secret) | Seeds the admin user once |
| `druid_auth_authenticator_basic_credentialsValidator_type` | druid-router | (secret) | Users stored in the metadata store |
| `druid_auth_authenticator_basic_initialInternalClientPassword` | druid-router | (secret) | Seeds druid_system once |
| `PORT` | druid-coordinator | 8081 | Port Railway health-checks |
| `DRUID_XMS` | druid-coordinator | 1g | JVM initial heap |
| `DRUID_XMX` | druid-coordinator | 1g | JVM maximum heap |
| `JAVA_OPTS` | druid-coordinator | -Djava.net.preferIPv6Addresses=true | Prefer IPv6 for private peers |
| `druid_host` | druid-coordinator | druid-coordinator.railway.internal | Private hostname this node advertises |
| `DRUID_LOG4J` | druid-coordinator | <?xml version=\"1.0\" encoding=\"UTF-8\" ?><Configuration status=\"WARN\"><Appenders><Console name=\"Console\" target=\"SYSTEM_OUT\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></Console><Routing name=\"RoutingAppender\"><Routes pattern=\"$${ctx:task.log.id}\"><Route><File name=\"task-${ctx:task.log.id}\" fileName=\"${ctx:task.log.file}\"><PatternLayout pattern=\"%d{ISO8601} %p [%t] %c -%notEmpty{ [%markerSimpleName]} %m%n\"/></File></Route><Route key=\"$${ctx:task.log.id}\" ref=\"Console\"/></Routes></Routing></Appenders><Loggers><Root level=\"info\"><AppenderRef ref=\"RoutingAppender\"/></Root><Logger name=\"com.sun.jersey.guice\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger><Logger name=\"org.apache.kafka.clients.consumer.internals\" level=\"warn\" additivity=\"false\"><AppenderRef ref=\"RoutingAppender\"/></Logger></Loggers></Configuration> | Log to stdout, keep task-log routing |
| `druid_emitter` | druid-coordinator | noop | Metrics emitter |
| `druid_sql_enable` | druid-coordinator | true | Enable Druid SQL |
| `DRUID_SET_HOST_IP` | druid-coordinator | 0 | Do not advertise the container IPv4 |
| `druid_s3_accessKey` | druid-coordinator | {\"type\":\"environment\",\"variable\":\"DRUID_S3_ACCESS_KEY\"} | Access key read from the environment |
| `druid_s3_secretKey` | druid-coordinator | (secret) | Secret key read from the environment |
| `druid_storage_type` | druid-coordinator | s3 | Deep storage backend |
| `DRUID_S3_ACCESS_KEY` | druid-coordinator | - | Deep storage access key |
| `DRUID_S3_SECRET_KEY` | druid-coordinator | (secret) | Deep storage secret key |
| `druid_plaintextPort` | druid-coordinator | 8081 | HTTP port the coordinator serves |
| `druid_zk_paths_base` | druid-coordinator | /druid | ZooKeeper namespace root |
| `DRUID_ADMIN_PASSWORD` | druid-coordinator | (secret) | Console admin password, seeded once |
| `druid_escalator_type` | druid-coordinator | basic | Internal request authentication |
| `druid_storage_bucket` | druid-coordinator | - | Deep storage bucket name |
| `druid_s3_endpoint_url` | druid-coordinator | - | Object storage endpoint |
| `druid_storage_baseKey` | druid-coordinator | druid/segments | Segment key prefix |
| `druid_zk_service_host` | druid-coordinator | - | ZooKeeper connect string |
| `druid_auth_authorizers` | druid-coordinator | [\"basic\"] | Authorizers in order |
| `DRUID_INTERNAL_PASSWORD` | druid-coordinator | (secret) | Internal service account password |
| `DRUID_METADATA_PASSWORD` | druid-coordinator | (secret) | Metadata store password |
| `druid_indexer_logs_type` | druid-coordinator | s3 | Task logs go to object storage |
| `druid_storage_disableAcl` | druid-coordinator | true | Object ownership mode, no ACLs |
| `DRUID_MAXDIRECTMEMORYSIZE` | druid-coordinator | 512m | JVM direct memory ceiling |
| `druid_auth_unsecuredPaths` | druid-coordinator | [\"/status/health\"] | Anonymous health-check path |
| `druid_extensions_loadList` | druid-coordinator | [\"druid-basic-security\",\"druid-s3-extensions\",\"postgresql-metadata-storage\",\"druid-datasketches\",\"druid-histogram\",\"druid-lookups-cached-global\",\"druid-kafka-indexing-service\",\"druid-parquet-extensions\"] | Extensions loaded at boot |
| `druid_indexer_logs_s3Bucket` | druid-coordinator | - | Task log bucket name |
| `druid_indexer_logs_s3Prefix` | druid-coordinator | druid/indexing-logs | Task log key prefix |
| `druid_metadata_storage_type` | druid-coordinator | postgresql | Metadata store engine |
| `druid_auth_authenticatorChain` | druid-coordinator | [\"basic\"] | Authenticators in order |
| `druid_indexer_logs_disableAcl` | druid-coordinator | true | Object ownership mode, no ACLs |
| `druid_escalator_authorizerName` | druid-coordinator | basic | Authorizer for internal requests |
| `druid_s3_enablePathStyleAccess` | druid-coordinator | true | Path-style bucket addressing |
| `druid_s3_endpoint_signingRegion` | druid-coordinator | - | SigV4 signing region |
| `druid_auth_authorizer_basic_type` | druid-coordinator | basic | Role-based authorizer |
| `druid_auth_authenticator_basic_type` | druid-coordinator | basic | HTTP basic authenticator |
| `druid_startup_logging_logProperties` | druid-coordinator | true | Print resolved properties at boot |
| `druid_metadata_storage_connector_user` | druid-coordinator | (secret) | Metadata store user |
| `druid_escalator_internalClientPassword` | druid-coordinator | (secret) | Password read from the environment |
| `druid_escalator_internalClientUsername` | druid-coordinator | (secret) | Internal service account |
| `druid_metadata_storage_connector_password` | druid-coordinator | (secret) | Password read from the environment |
| `druid_storage_transfer_useTransferManager` | druid-coordinator | false | Plain PutObject writes |
| `druid_metadata_storage_connector_connectURI` | druid-coordinator | - | Metadata JDBC URL |
| `druid_auth_authenticator_basic_skipOnFailure` | druid-coordinator | false | Reject unknown credentials |
| `druid_auth_authenticator_basic_authorizerName` | druid-coordinator | basic | Authorizer for this authenticator |
| `druid_auth_authenticator_basic_initialAdminPassword` | druid-coordinator | (secret) | Seeds the admin user once |
| `druid_auth_authenticator_basic_credentialsValidator_type` | druid-coordinator | (secret) | Users stored in the metadata store |
| `druid_auth_authenticator_basic_initialInternalClientPassword` | druid-coordinator | (secret) | Seeds druid_system once |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |

## Configuration

- **Start command:** `/druid.sh historical`
- **Healthcheck:** `/status/health`
- **Volume:** `/opt/druid/var`
- **Start command:** `/druid.sh broker`
- **Healthcheck:** `/commands/ruok`
- **Volume:** `/data`
- **Start command:** `/druid.sh middleManager`
- **Start command:** `/druid.sh router`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/druid.sh coordinator`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/druid)
