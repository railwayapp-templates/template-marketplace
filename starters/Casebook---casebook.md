# Deploy Casebook on Railway

A digital crime investigation board developed in three.js

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/casebook)

## About

A digital crime investigation board developed in Three.js using Fable 5. It allows users to visually organize, map, and analyze evidence, notes, and connections within an interactive 3D workspace. Designed for researchers, storytellers, cyber investigators, and enthusiasts who need an intuitive, visual approach to organizing complex case details.

Deploying Casebook on Railway provides a streamlined, containerized hosting environment for serving your digital investigation board. Railway automatically handles the continuous deployment, static asset serving, and container runtime required by the application. Network exposure is configured seamlessly through Railway's edge proxy, delivering an SSL/HTTPS endpoint automatically upon generating a domain.

Since Casebook runs as a web frontend utilizing Three.js and Fable-compiled assets, hosting on Railway ensures minimal infrastructure maintenance, high availability, and easy vertical or horizontal scaling. Storage and runtime depend on your custom repository configuration or static hosting setup, while Railway's global network delivers low-latency access to the interactive 3D board.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| casebook | [bilalnawaz072/casebook](https://github.com/bilalnawaz072/casebook) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** HTML, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/casebook)
