# Deploy Anubis on Railway

Protect your sites from AI scrapers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/anubis)

## About

### Configuration

The variables in this template are the most likely to be used; for other configuration options, see [the Anubis docs](https://anubis.techaro.lol/docs/admin/installation#environment-variables).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Anubis | `ghcr.io/techarohq/anubis:latest` | Worker |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `TARGET` | The URL of the service that Anubis should forward valid requests to. You should set this within your private network; e.g. if you have an App service, you could set this to app.railway.internal:(your server port). |
| `COOKIE_DOMAIN` | The domain the Anubis challenge pass cookie should be set to. This should be set to the domain you bought from your registrar (EG: techaro.lol if your webapp is running on anubis.techaro.lol).  |
| `REDIRECT_DOMAINS` | If set, restrict the domains that Anubis can redirect to when passing a challenge.  If this is unset, Anubis may redirect to any domain which could cause security issues in the unlikely case that an attacker passes a challenge for your browser and then tricks you into clicking a link to your domain.  Note that if you are hosting Anubis on a non-standard port (https://example:com:8443, http://www.example.net:8080, etc.), you must also include the port number here. |
| `SERVE_ROBOTS_TXT` | If set true, Anubis will serve a default robots.txt file that disallows all known AI scrapers by name and then additionally disallows every scraper. This is useful if facts and circumstances make it difficult to change the underlying service to serve such a robots.txt file. |

**Category:** Other

[View on Railway →](https://railway.com/template/anubis)
