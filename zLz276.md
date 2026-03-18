# Deploy Piping server on Railway

Infinitely transfer between devices over pure HTTP with pipes or browsers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/zLz276)

## About

# Piping Server

Infinitely transfer between every device over HTTP/HTTPS

Example usage can be found [here](https://github.com/nwtgck/piping-server#transfer).

Piping Server transfers data to `POST /hello` or `PUT /hello` into `GET /hello`. The path `/hello` can be anything such as `/mypath` or `/mypath/123/`. A sender and receivers who specify the same path can transfer. Both the sender and the recipient can start the transfer first. The first one waits for the other. 

### Stream
The most important thing is that the data are streamed. This means that you can **transfer any data infinitely**. 

## Ideas
Piping Server is designed based on the ideas as follows.

- **Infinite transfer**: You can transfer any kind of data infinitely on a stream. Streams are very efficient in terms of both time and space.
- **Zero installation**: All you need is to have either a Web browser or `curl`, which are widely pre-installed. You do not need to install any extra software.
- **Simpleness**: Making simple makes it more secure.
- **Storageless**: The server makes transfer more secure since the server never stores your data.
- **Purity**: The server streams over pure HTTP, which makes integration easier with other softwares.
- **Engineer friendly**: Also designed for Unix/Linux users, who use pipes, not only for Web browser users.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Piping server | `nwtgck/piping-server` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/zLz276)
