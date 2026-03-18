# Deploy ELK Stack on Railway

One-click elasticsearch/kibana/logstash/filebeat stack deployment.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/elk-stack)

## About

ELK Stack is a template for a log analysis and visualization platform based on the ELK Stack, suitable for developers and teams who need to quickly set up log collection, storage, and analysis environments on the Railway platform. This template integrates Elasticsearch, Logstash, and Kibana, supporting flexible extension and custom configuration.

Hosting ELK Stack on Railway means you can quickly obtain a highly available and scalable log analysis platform through simple configuration and one-click deployment. Railway provides automated infrastructure management, so you don't need to manually configure servers and networks, making it ideal for production environments that require elastic scaling and high reliability. With this template, you can easily achieve log collection, storage, retrieval, and visualization to support business monitoring and data analysis.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Logstash | [wangxued/elk-railway](https://github.com/wangxued/elk-railway) (root: logstash) | Database |
| Kibana | [wangxued/elk-railway](https://github.com/wangxued/elk-railway) (root: kibana) | Web service |
| Filebeat | [wangxued/elk-railway](https://github.com/wangxued/elk-railway) (root: filebeat) | Worker |
| Elasticsearch | [wangxued/elk-railway](https://github.com/wangxued/elk-railway) (root: elasticsearch) | Web service |

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

[View on Railway →](https://railway.com/template/elk-stack)
