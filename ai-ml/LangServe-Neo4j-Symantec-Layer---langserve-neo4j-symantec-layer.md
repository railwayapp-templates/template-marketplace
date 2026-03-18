# Deploy LangServe Neo4j Symantec Layer  on Railway

 A template to host a LangServe server backed by a Neo4j Symantec Layer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langserve-neo4j-symantec-layer)

## About

This template deploys two services on Railway: the LangServe app and a Neo4j database. The Neo4j service is preconfigured (e.g., APOC) and only needs `NEO4J_AUTH`. The app connects to Neo4j over Railway’s private network and requires `OPENAI_API_KEY` plus Neo4j connection variables. After both services start, run the ingestion command once to load demo data. Railway uses independent services (no docker-compose), Variables for configuration, and a persistent volume for Neo4j at `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| langServe App | [essaubaid/neo4j-semantic-layer-railway-template](https://github.com/essaubaid/neo4j-semantic-layer-railway-template) | Web service |
| neo4j db | [essaubaid/neo4j-semantic-layer-railway-template](https://github.com/essaubaid/neo4j-semantic-layer-railway-template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NEO4J_URI` | langServe App | - | Internal database URI i.e. bolt://neo4j:7687 |
| `NEO4J_PASSWORD` | langServe App | (secret) | Database password |
| `NEO4J_USERNAME` | langServe App | (secret) | Database username |
| `OPENAI_API_KEY` | langServe App | (secret) | Your Open AI API Key |
| `NEO4J_AUTH` | neo4j db | - | Auth `username/password` in exact order |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/langserve-neo4j-symantec-layer)
