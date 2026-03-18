# Deploy ExpressJS API Server on Railway

ExpressJS API Starter with basic examples

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/Vp8hse)

## About

### ExpressJS API Server

This is a boilerplate/starter project for quickly building RESTful APIs using Node.js and Express, written in JavaScript. It will help you get started with a simple to follow format with some examples for routes, logging and middleware.

#### Features 

- Morgan - HTTP request logger middleware for Node.js
- CORS - Middleware to enable CORS with options.
- Example logger to create or redirect your logs to the service of your choice
-   Example middleware to further expand to use for auth
- Nodemon to help develop locally.

#### Details

The server runs a simple Express API server.

`/` returns `status: ok` 

`/hello`  returns `message: Hello World!`

Unknown endpoints are handled in a middleware file.

The `hello` route is defined  in the `helloRoute`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| expressjs | [railwayapp-templates/node-express](https://github.com/railwayapp-templates/node-express) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3003 | Port Number |

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/Vp8hse)
