# Deploy Disposable Email Checker on Railway

API for detecting disposable email adresses.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tHOg9a)

## About

A simple application written in Go that creates an API endpoint that matches an email address against a list of disposable domains that is refreshed periodically once every 24 hours. You can also define your own list of disposable domains or use a predefined list that is publicly available on github.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Server | [envokersh/disposable-email-checker](https://github.com/envokersh/disposable-email-checker) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DOMAIN_LIST` | https://disposable.github.io/disposable-email-domains/domains.txt | URL to the domain list (you can remove this variable) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/tHOg9a)
