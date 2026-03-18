# Deploy Livebook on Railway

Automate code & data workflows with interactive notebooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/4uLt1s)

## About

# Livebook

[![Website](https://img.shields.io/badge/-Website-%23ff87a7)](https://livebook.dev/)

Livebook is a web application for writing interactive and collaborative code notebooks. It features:

  * Code notebooks with Markdown support and Code cells where Elixir code is evaluated on demand.

  * Rich code editor through [CodeMirror](https://codemirror.net/): with support for autocompletion, inline documentation, code formatting, etc.

  * Interactive results via [Kino](https://github.com/elixir-nx/kino): display [Vega-Lite charts](https://vega.github.io/vega-lite/), tables, maps, and more.

  * Automation: use Smart cells to perform high-level tasks and write notebooks faster than ever. Query databases, plot charts, build maps, and more directly from Livebook's UI.

  * Reproducible: Livebook ensures your code runs in a predictable order, all the way down to package management. It also tracks your notebook state, annotating which parts are stale.

  * Collaboration: multiple users can work on the same notebook at once, no additional setup required.

  * Decentralized: Livebook is open-source and you can run it anywhere. The ["Run in Livebook" badge](https://livebook.dev/badge) makes it easy to import any Livebook into your own Livebook.

  * Versionable: notebooks are stored in the `.livemd` format, which is a subset of Markdown with support for diagrams via [Mermaid](https://mermaid-js.github.io/mermaid) and for mathematical formulas via [KaTex](https://katex.org/). `.livemd` files can be shared and play well with version control.

  * Custom runtimes: when executing Elixir code, you can either start a fresh Elixir instance, connect to an existing node, or run it inside an existing Elixir project, with access to all of its modules and dependencies. This means Livebook can be a great tool to introspect and document existing projects too.

## Getting started

Default password can be found in the environment variables.

## Security considerations

Livebook is built to document and execute code. Anyone with access to a Livebook instance
will be able to access any file and execute any code in the machine Livebook is running.

## Environment variables
* `LIVEBOOK_PASSWORD` - sets a password that must be used to access Livebook. Must be at least 12 characters. Defaults to token authentication.
* `LIVEBOOK_PORT` - sets the port Livebook runs on. Defaults to 8080.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Livebook | `ghcr.io/livebook-dev/livebook:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Port that Livebook listens on |
| `LIVEBOOK_PASSWORD` | (secret) | Default user password |

## Configuration

- **Healthcheck:** `/public/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/4uLt1s)
