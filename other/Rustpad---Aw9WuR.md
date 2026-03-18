# Deploy Rustpad on Railway

Efficient and minimal collaborative code editor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/Aw9WuR)

## About

**Rustpad** is an _efficient_ and _minimal_ open-source collaborative text
editor based on the operational transformation algorithm. It lets users
collaborate in real time while writing code in their browser.

<p align="center">
<a href="https://rustpad.io/">
<img width="800" src="https://i.imgur.com/WjU5UrP.png"><br>
</a>
</p>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rustpad | `ekzhang/rustpad` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQLITE_URI` | sqlite:///data/sqlite.db | The URI to the SQLite database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/Aw9WuR)
