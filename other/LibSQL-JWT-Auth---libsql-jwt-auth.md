# Deploy LibSQL + JWT Auth on Railway

LibSQL + JWT Generation + Example in Go

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/libsql-jwt-auth)

## About

LibSQL + JWT Auth is a minimal starter template that runs a `libsql` server with JWT authentication enabled by default. It includes a Go client, a keypair/token generator (`jwtgen.go`), and a working query demo (`main.go`).

Eject the template, read the README.md and start connecting to your database. Or checkout [https://github.com/railtools/libsql](https://github.com/railtools/libsql)

This template spins up a LibSQL server with JWT auth pre-configured via `SQLD_AUTH_JWT_KEY`. No setup needed — just deploy and connect with a signed token. Comes with Go code to generate your own keys and test the connection. 

**NOTE**: JWT authentication is enabled by default with a pre-generated keypair and example token.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| libsql | [railtools/libsql](https://github.com/railtools/libsql) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SQLD_AUTH_JWT_KEY` | sDrHAkZko9l5BvFhhAKiV0nJ0RKYhlXydKJSsPvOeAY |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Go, Dockerfile

[View on Railway →](https://railway.com/template/libsql-jwt-auth)
