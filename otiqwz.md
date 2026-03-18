# Deploy MindsDB on Railway

MindsDB is the platform for building AI from enterprise data

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/otiqwz)

## About

This supports persistent models and configurations.

This is the lightweight Docker image of MindsDB that comes with base integrations preloaded.

`-p 47334:47334` publishes port 47334 to access MindsDB GUI and HTTP API.

`-p 47335:47335` publishes port 47335 to access MindsDB MySQL API.

Note: 

If you experience any issues related to MKL or your training process does not complete, please add the MKL_SERVICE_FORCE_INTEL environment variable, as below.

`MKL_SERVICE_FORCE_INTEL=1`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mindsdb/mindsdb:latest | `mindsdb/mindsdb:latest` | Database |

## Configuration

- **TCP Proxies:** 47334
- **Volume:** `/root/mdb_storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/template/otiqwz)
