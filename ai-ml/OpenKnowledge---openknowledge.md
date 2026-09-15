# Deploy OpenKnowledge on Railway

Self-hosted knowledge base for AI agents, with MCP and Google sign-in

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openknowledge)

## About

[OpenKnowledge](https://openknowledge.ai) is an open-source, AI-native Markdown knowledge base. It
gives you a live collaborative editor in the browser and an MCP endpoint that Claude, Cursor and
other agents connect to directly, over a knowledge base that is a real git repository with full
version history.

The server has no login of its own, so a public domain would give anyone who finds it full read and
write access. This template follows the authentication recipe from OpenKnowledge's own
documentation: three services, where only the gateway is reachable from the internet. It gives
browsers a Google sign-in and agents a generated bearer token, and the two paths are kept separate
so the agent stream is never interrupted by a login redirect. The knowledge base lives on a volume
and survives redeploys.

What you supply is a Google OAuth client, because the editor is protected by a Google sign-in.
In the Google Cloud console, under APIs and Services then Credentials, create an OAuth client ID
of type **Web application** — configuring the consent screen first if that project has none. Give
it any placeholder redirect URI for now; you correct it once Railway has generated your domain.
The client ID and secret it shows you are the `OAUTH2_PROXY_CLIENT_ID` and
`OAUTH2_PROXY_CLIENT_SECRET` the deploy form asks for. Everything else, including the agent token
and the cookie secret, is generated for you.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ok | [RockinPaul/openknowledge_railway_template](https://github.com/RockinPaul/openknowledge_railway_template) (root: /ok) | Database |
| oauth2-proxy | [RockinPaul/openknowledge_railway_template](https://github.com/RockinPaul/openknowledge_railway_template) (root: /oauth2-proxy) | Worker |
| caddy | [RockinPaul/openknowledge_railway_template](https://github.com/RockinPaul/openknowledge_railway_template) (root: /caddy) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `OAUTH2_PROXY_CLIENT_SECRET` | oauth2-proxy | (secret) |
| `OAUTH2_PROXY_COOKIE_SECRET` | oauth2-proxy | (secret) |
| `MCP_TOKEN` | caddy | (secret) |

## Configuration

- **Healthcheck:** `/readyz`
- **Volume:** `/data`
- **Healthcheck:** `/ping`
- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/openknowledge)
