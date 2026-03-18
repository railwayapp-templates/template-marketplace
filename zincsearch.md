# Deploy ZincSearch on Railway

ZincSearch a lightweight alternative to elasticsearch written in Go.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zincsearch)

## About

ZincSearch is a lightweight, full-text search engine written in Go, designed as an alternative to Elasticsearch. It’s optimized for speed, simplicity, and low resource consumption, making it ideal for developers who need a self-hosted search solution without the overhead of managing complex systems.

Hosting ZincSearch on Railway provides an effortless way to deploy and manage your search infrastructure. With a single click, you can spin up a ZincSearch instance that automatically handles indexing, querying, and API operations. Railway abstracts away the need for manual configuration, networking setup, or container orchestration. This enables developers to focus on application logic while maintaining a scalable and performant search backend. Environment variables, persistent storage, and automated builds simplify the deployment lifecycle.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| zincsearch | `public.ecr.aws/zinclabs/zincsearch:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `GIN_MODE` | - | if the value is release then gin will run in production mode. |
| `ZINC_SENTRY` | true | Send anonymous error reports for debugging |
| `ZINC_PROFILER` | false | Default is false, ZinCsearch uses pyroscope server to profiling |
| `ZINC_DATA_PATH` | /data | Defaults to "data" folder in current working directory if not provided. |
| `ZINC_SHARD_NUM` | 3 | We use shards to improve performance |
| `ZINC_TELEMETRY` | true | Send anonymous telemetry info for improving ZincSearch. enabled or disabled. |
| `ZINC_BATCH_SIZE` | 1024 | Internal batch size for batching records when bulk indexing is done. |
| `ZINC_SENTRY_DSN` | - | Entry DNS, default is: https://15b6d9b8be824b44896f32b0234c32b7@o1218932.ingest.sentry.io/6360942 |
| `ZINC_MAX_RESULTS` | 100 | Maximum results to be returned from server. Defaults to 100 |
| `ZINC_SERVER_PORT` | 4080 | ZincSearch server listen http port |
| `ZINC_ICE_COMPRESSOR` | zstd | Algorithm of compress segment file, default is: zstd, supports: snappy, s2, zstd |
| `ZINC_SERVER_ADDRESS` | 0.0.0.0 | ZincSearch server IP address to bind to |
| `ZINC_SHARD_MAX_SIZE` | 1073741824 | We use multiple backend indexes for one big index, limit one shard size default is 1GB |
| `ZINC_SWAGGER_ENABLE` | true | Default is true, Enable swagger api document |
| `ZINC_PROFILER_SERVER` | - | default pyroscope server is: https://pyroscope.dev.zincsearch.com |
| `ZINC_FIRST_ADMIN_USER` | (secret) | - |
| `ZINC_PROFILER_API_KEY` | (secret) | pyroscope server api key |
| `ZINC_PLUGIN_ES_VERSION` | - | es version, for compatible elasticsearch |
| `ZINC_PLUGIN_GSE_ENABLE` | false | plugin, GSE support Chinese analysis |
| `ZINC_PROMETHEUS_ENABLE` | false | Enables prometheus metrics on /metrics endpoint |
| `ZINC_READ_GORUTINE_NUM` | 10 | control parallelsim thread num for shard reads |
| `ZINC_WAL_SYNC_INTERVAL` | 1s | ZinCsearch uses WAL to ensure no loss data, and asynchorous write to backend index. defaults every 1s sync to storage |
| `ZINC_WAL_REDOLOG_NO_SYNC` | false | ZinCsearch uses REDO log to ensure asynchorous is correct, but redo log do a sync to disk every time, we can disable SYNC to have better performance, but it has a risk duplicated documents with a ZINC_BATCH_SIZE |
| `ZINC_FIRST_ADMIN_PASSWORD` | (secret) | - |
| `ZINC_PLUGIN_GSE_DICT_EMBED` | small | plugin, GSE which size dict need to load, small or big |
| `ZINC_PLUGIN_GSE_DICT_PATH	` | ./plugins/gse/dict | plugin, GSE where to load user custom dictionary |
| `ZINC_PLUGIN_GSE_ENABLE_HMM` | true | plugin, GSE analyzer default enable HMM for search, you can disable it. |
| `ZINC_AGGREGATION_TERMS_SIZE` | 1000 | terms aggregation returns max bucket size |
| `ZINC_PLUGIN_GSE_ENABLE_STOP` | true | plugin, GSE analyzer default load stop dictionary, you can disable it. |
| `ZINC_ENABLE_TEXT_KEYWORD_MAPPING` | false | create a keyword field for text field. named field.keyword |
| `ZINC_PROFILER_FRIENDLY_PROFILE_ID` | - | pyroscope identifier id, example: zinc-alex |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/zincsearch)
