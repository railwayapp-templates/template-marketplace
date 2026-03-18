# Deploy Typst Compiler API on Railway

compile typst markup remotely by a simple API call

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fFq3fV)

## About

Typst HTTP API
Typst is a new markup-based typesetting system that is designed to be as powerful as LaTeX while being much easier to learn and use. I recommend that you check it out if you don't know it yet.

This project is a web server that allows users to compile typst markup remotely by a simple API call. This webserver is provided in the form of a docker container. For now there is no official image on any registry.

I want to bring some elements to your attention:

Please be aware that while the container runs, I do not consider this project production-ready, more work is needed.
All contributions are welcome of course welcome.
Currently, there is no way to compile a file that loads external resources (images or other .typ files for example).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| typst-http-api | [chinpeerapat/typst-http-api-CJKy](https://github.com/chinpeerapat/typst-http-api-CJKy) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Python, Dockerfile, Shell

[View on Railway →](https://railway.com/template/fFq3fV)
