# Deploy Pushpin on Railway

Pushpin 1.42: reverse proxy for real-time HTTP streaming and WebSockets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pushpin)

## About

Pushpin is a reverse proxy for real-time APIs. It sits in front of your backend and holds long-lived HTTP streams, long-polls and WebSocket connections open, while your backend stays stateless. To send data, the backend publishes to a channel over HTTP. Pushpin is maintained by Fastly, which acquired its creator, Fanout.

This template runs the official `fanout/pushpin:1.42.0` image as one service. Clients connect to the public domain, and Pushpin forwards each request to the backend named in `PUSHPIN_TARGET`, for example your app's private address. Your backend answers with GRIP instructions such as `Grip-Hold: stream` and later publishes messages to Pushpin's control API on the private network. Until you set a target, Pushpin's built-in test handler answers, so `/stream` works as a demo channel called `test`. Requests to your backend are signed with `PUSHPIN_SIG_KEY`. Pushpin needs no storage and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pushpin | `fanout/pushpin:1.42.0` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 7999 |

## Configuration

- **Start command:** `sh -c 'sed -i -e "s/^push_in_http_addr=.*/push_in_http_addr=::/" -e "s/^sig_key=.*/sig_key=$PUSHPIN_SIG_KEY/" -e "s/^accept_x_forwarded_protocol=.*/accept_x_forwarded_protocol=true/" /etc/pushpin/pushpin.conf; if [ -n "$PUSHPIN_TARGET" ]; then echo "* $PUSHPIN_TARGET,over_http" > /etc/pushpin/routes; fi; exec pushpin --merge-output'`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/pushpin)
