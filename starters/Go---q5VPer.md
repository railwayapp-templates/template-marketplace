# Deploy Go on Railway

A simple 1.25 Golang REST API using julienschmidt/httprouter for routing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/q5VPer)

## About

This is a simple Go api that has one existing endpoint: 'healthcheck'. This api uses julienschmidt/httprouter for routing since it's powerful and simple. You shouldn't need any other 3rd party libraries to get a production API up and running.

Start in the main.go file. Here the application is scaffolded. 

The routes.go file defines routes. Here you can define routes accompanying HTTP methods (GET, PUT, PATCH, etc). 

The railpack file is custom only because the defaults Railway uses assumes the file structure is flat. I prefer to have the files in cmd/api so I made updates to that.

Once you have the service live in Railway, click on it to see the url it's hosted at. It will take a few minutes on first build. Once you're at the URL, add /v1/healthcheck at the end. You should see a json response!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-go-api | [haydenlingle/railway-go-api](https://github.com/haydenlingle/railway-go-api) | Web service |

## Configuration

- **Healthcheck:** `/v1/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Go

[View on Railway →](https://railway.com/deploy/q5VPer)
