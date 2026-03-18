# Deploy WBO - White Board Online on Railway

WBO is a free and open-source online collaborative whiteboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wbo)

## About

**WBO (Whiteboard Online)** is an open-source, real-time collaborative whiteboard that allows multiple users to draw, sketch, and brainstorm together directly in the browser. It is lightweight, fast to deploy, and well suited for remote collaboration, teaching, and ad-hoc visual discussions.

Hosting WBO on Railway involves running a single Node.js-based web application that handles real-time collaboration over WebSockets. WBO does not require a database by default, making it simple to deploy with minimal infrastructure. This Railway template focuses on the core WBO experience without external dependencies. Optional persistence or authentication layers can be added later, but the base deployment runs as a single service with no required datastore.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| WBO | `lovasoa/wbo` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/wbo)
