# Deploy Rails on Railway

A simple Rails app

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/sibk1f)

## About

## Overview

The Rails web framework, also known as Ruby on Rails, is an open-source web application framework written in the Ruby programming language. It provides a set of tools and conventions for building web applications, making it easier and faster for developers to create high-quality web applications.

Although yes, we are named Railway, you can deploy more than just Rails. (But yes, the Rails template is good.)

## Highlights

This template deploys a Rails 7 Hello World application onto Railway with Postgres and Redis.

## Learn More

To run common Rails development flows for local development, you can prefix your Rails command with `railway run`

Note: `rails console` is not supported on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |
| Redis | `bitnami/redis` | Database |
| rails | [railwayapp-starters/ruby-rails](https://github.com/railwayapp-starters/ruby-rails) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Tags:** ruby, server · **Languages:** Ruby, HTML, CSS, JavaScript, Procfile

[View on Railway →](https://railway.com/template/sibk1f)
