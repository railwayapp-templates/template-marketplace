# Deploy ElasticMQ on Railway

ElasticMQ 1.7: Amazon SQS-compatible message queue on your private network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/elasticmq-1)

## About

ElasticMQ is a message queue server that speaks the Amazon SQS API. Any AWS SDK or the AWS CLI can create queues, send and receive messages, and use visibility timeouts and dead-letter queues against it. It suits services that are written for SQS but should run without an AWS account.

This template runs the official native build `softwaremill/elasticmq-native:1.7.1` as one private service. ElasticMQ has no authentication, so the template gives it no public domain: other services in the same Railway project reach it at `http://elasticmq.railway.internal:9324` over IPv4 or IPv6. Queue definitions and messages are stored on a Railway volume, so they survive restarts and redeploys. Queue URLs returned by the API use the private hostname, which is what your SDK needs. Any access key and secret are accepted. The whole server uses very little memory and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| elasticmq | `softwaremill/elasticmq-native:1.7.1` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `AWS_REGION` | us-east-1 |
| `ELASTICMQ_ACCOUNT_ID` | 000000000000 |

## Configuration

- **Start command:** `sh -c 'exec /sbin/tini -- /opt/elasticmq/bin/elasticmq-native-server -Dconfig.file=/opt/elasticmq.conf -Dlogback.configurationFile=/opt/logback.xml -Drest-sqs.bind-hostname=:: -Drest-sqs.bind-port=9324 -Dgenerate-node-address=false -Dnode-address.host=$ELASTICMQ_HOST -Dnode-address.port=9324 -Daws.region=$AWS_REGION -Daws.accountId=$ELASTICMQ_ACCOUNT_ID -Dqueues-storage.enabled=true -Dqueues-storage.path=/data/queues.conf -Dmessages-storage.enabled=true -Dmessages-storage.uri=jdbc:h2:/data/elasticmq'`
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/elasticmq-1)
