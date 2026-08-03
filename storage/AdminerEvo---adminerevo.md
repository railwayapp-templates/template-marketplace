# Deploy AdminerEvo on Railway

A web-based database management interface.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/adminerevo)

## About

AdminerEvo is a lightweight, web-based database management tool designed as a modern replacement for phpMyAdmin. It provides a full-featured interface to manage databases including MySQL, MariaDB, PostgreSQL, SQLite, MS SQL, Oracle, Elasticsearch, and MongoDB. It is built for developers and database administrators seeking a fast, single-file or containerized database management UI with a strong emphasis on security and performance.

Hosting AdminerEvo on Railway provides an isolated, web-accessible interface to manage external or Railway-hosted databases. Railway deploys the prebuilt container image directly to its cloud infrastructure, handling routing, container lifecycle, and automatic HTTPS endpoint generation through Railway's HTTP Proxy.

Because AdminerEvo operates as a stateless web client connecting to database engines over network protocols, it requires no persistent volume or local storage. Networking is configured to expose the application through port 8080. When deployed into a Railway project containing existing database services (such as PostgreSQL or MySQL), AdminerEvo can directly communicate with them using Railway's private networking endpoints or reference variables, eliminating the need to expose database ports publicly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| AdminerEvo | `ghcr.io/shyim/adminerevo` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Storage

[View on Railway →](https://railway.com/deploy/adminerevo)
