# Deploy Apache Age on Railway

Apache AGE™ a PostgreSQL graph database functionality with Cypher

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/apache-age)

## About

[Apache AGE](https://age.apache.org/#) is an extension for PostgreSQL that enables users to leverage a graph database on top of the existing relational databases. AGE is an acronym for A Graph Extension and is inspired by Bitnine's AgensGraph, a multi-model database fork of PostgreSQL. The basic principle of the project is to create a single storage that handles both the relational and graph data model so that the users can use the standard ANSI SQL along with openCypher, one of the most popular graph query languages today. There is a strong need for cohesive, easy-to-implement multi-model databases. As an extension of PostgreSQL, AGE supports all the functionalities and features of PostgreSQL while also offering a graph model to boot.

<p align="center">
<img height="80%" width="80%" src="https://github.com/apache/age/raw/55476ad2875f37f5b65919b6eeab7d81fd65aa7c/img/age-01.png">
</p>

Hosting Apache AGE provides a graph database layer built on top of PostgreSQL Global Development Group’s PostgreSQL, enabling you to run Cypher queries alongside standard SQL in a single database engine. Deploying Apache AGE involves provisioning a compatible PostgreSQL server, installing and enabling the AGE extension, and configuring graph schemas within your database. AGE leverages PostgreSQL’s core strengths, including connection handling, transaction management, indexing, and query optimization, while adding graph traversal and pattern-matching capabilities.

Production deployments benefit from scalable CPU, RAM, and storage resources to support complex graph workloads. Secure hosting includes SSL encryption, role-based authentication, and controlled network access. Railway provides operational best practices such as automated backups, monitoring, logging, and high availability configurations ensure reliability and performance for graph-enabled applications running on Apache AGE.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apache-age | `apache/age` | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `URL` | PostgreSQL public URL |
| `PRIVATE_URL` | PostgreSQL private URL for internal services |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/apache-age)
