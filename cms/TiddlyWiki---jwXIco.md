# Deploy TiddlyWiki on Railway

Unique non-linear notebook for capturing and organising complex information

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jwXIco)

## About

# TiddlyWiki

Welcome to TiddlyWiki, a non-linear personal web notebook that anyone can use and keep forever, independently of any corporation.

TiddlyWiki is a complete interactive wiki in JavaScript. It is highly customisable: the entire user interface is itself implemented in hackable WikiText.

Learn more and see it in action at https://tiddlywiki.com/

## Authentication

1. `USERNAME`;
You can set your username when you deploy the template.


2. `PASSWORD`;
The password is set automatically, however you add a custom password when you deploy the template. If you choose to have it done automatically then you can find the password in your service variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tiddlywiki | `klutchell/tiddlywiki` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |
| `PASSWORD` | (secret) |
| `USERNAME` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/tiddlywiki`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/jwXIco)
