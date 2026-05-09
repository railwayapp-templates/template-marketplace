# Deploy ELK Stack on Railway

Deploy and Host ELK Stack with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elk-stack-1)

## About

ELK Stack offers a streamlined template for building a robust log analysis and visualization suite. Tailored for developers and teams, it facilitates the rapid assembly of environments for gathering, storing, and examining data within the Railway ecosystem. This integrated solution combines Elasticsearch, Logstash, and Kibana, allowing for seamless scalability and bespoke configurations.

By hosting the ELK Stack on Railway, you gain access to a resilient and scalable analytics engine via a simplified setup process. Railway handles the heavy lifting of infrastructure management, removing the need for manual server provisioning or network tuning. This makes it a premier choice for production-grade workloads that demand high reliability and elastic growth. Utilizing this template enables you to centralize log ingestion and create insightful visualizations to drive business intelligence and monitoring.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Logstash | [iqbalexperience/elk-stack](https://github.com/iqbalexperience/elk-stack) (root: logstash) | Database |
| Kibana | [iqbalexperience/elk-stack](https://github.com/iqbalexperience/elk-stack) (root: kibana) | Web service |
| Filebeat | [iqbalexperience/elk-stack](https://github.com/iqbalexperience/elk-stack) (root: filebeat) | Worker |
| Elasticsearch | [iqbalexperience/elk-stack](https://github.com/iqbalexperience/elk-stack) (root: elasticsearch) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Logstash | 5044 | - |
| `LS_JAVA_OPTS` | Logstash | -Xms512m -Xmx512m | - |
| `ELASTICSEARCH_PASSWORD` | Logstash | (secret) | - |
| `ELASTICSEARCH_USERNAME` | Logstash | (secret) | - |
| `PORT` | Kibana | 5601 | - |
| `server.name` | Kibana | kibana | - |
| `ELASTICSEARCH_PASSWORD` | Kibana | (secret) | ELASTICSEARCH_SSL_CERTIFICATEAUTHORITIES="config/certs/ca.crt" |
| `ELASTICSEARCH_USERNAME` | Kibana | (secret) | - |
| `xpack.security.enabled` | Kibana | false | - |
| `FB_JAVA_OPTS` | Filebeat | -Xms512m -Xmx512m | - |
| `PORT` | Elasticsearch | 9200 | - |
| `http.host` | Elasticsearch | 0.0.0.0 | - |
| `node.name` | Elasticsearch | elasticsearch | - |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms512m -Xmx512m | - |
| `discovery.type` | Elasticsearch | single-node | - |
| `transport.host` | Elasticsearch | 0.0.0.0 | - |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | - |
| `ELASTIC_USERNAME` | Elasticsearch | (secret) | - |
| `xpack.security.enabled` | Elasticsearch | false | - |
| `xpack.security.http.ssl.enabled` | Elasticsearch | false | - |
| `xpack.security.transport.ssl.enabled` | Elasticsearch | false | - |

## Configuration

- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/elk-stack-1)
