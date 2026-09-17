# Deploy Trivy Server on Railway

Shared Trivy vulnerability database for CI, so clients skip the download

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/trivy-server)

## About

[Trivy](https://github.com/aquasecurity/trivy) is Aqua Security's vulnerability scanner for
containers, filesystems, repositories and more. This template runs it in **client/server mode**: one
hosted server holds the vulnerability database, and your scanners become thin clients that send
package lists and get results back.

**This is an API endpoint, not a web application.** There is no browser interface, and opening the
domain returns 404 by design. If you were looking for a dashboard, this is not it. What it gives you
is a shared database so every continuous-integration job stops downloading 1.3 GB of vulnerability
data.

After deploying, point any Trivy client at the domain:

```
trivy image --server https://YOUR-DOMAIN.up.railway.app --token "$TRIVY_TOKEN" alpine:3.20
```

The same flags work for `trivy fs` and `trivy repo`, and both can be supplied as `TRIVY_SERVER` and
`TRIVY_TOKEN` environment variables instead. To check the server and how fresh its database is, open
`/version` in a browser.

The division of labour is deliberate. Vulnerability and license scanning run on the server;
misconfiguration and secret scanning stay on the client. Clients analyse artifacts locally and
upload only the analysis results, such as package lists, so the contents of your files never reach
the server.

Everything the server owns lives in one cache directory on the volume: the vulnerability database
and the scan cache, about 1.3 GB once populated. The first boot downloads that database before the
port opens, which takes seconds rather than minutes but explains the generous health check timeout.
Later boots reuse it and start in a few seconds. The database refreshes itself hourly in the
background.

One deployment serves one trust domain. The token grants access to the scanning and cache APIs
together, with no per-client permissions, so run one of these per team rather than one for an entire
company.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| trivy | [RockinPaul/trivy_railway_template](https://github.com/RockinPaul/trivy_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | The port Railway's healthcheck probes and the public domain targets. Leave as is. |
| `TRIVY_TOKEN` | (secret) | The only access control on this endpoint. Clients send it as the Trivy-Token header, or set TRIVY_TOKEN in their environment. The server refuses to start without it. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/trivy-server)
