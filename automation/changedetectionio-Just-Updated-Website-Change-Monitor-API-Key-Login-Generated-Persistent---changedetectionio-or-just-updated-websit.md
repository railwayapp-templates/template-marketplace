# Deploy changedetection.io | (Just Updated) Website Change Monitor, API Key + Login Generated, Persistent on Railway

Website change monitor, agent-ready REST API, generated login and key

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/changedetectionio-or-just-updated-websit)

## About

**Built for an AI agent to deploy and use.** There is no manual step: deploy it, read the credential variables, and call the REST API. Login password and API key are generated for you, the contract below lists every URL and variable name, and one `curl` adds a watch.

changedetection.io watches web pages and tells you when they change. It supports CSS/XPath/JSON filters, text diffs, price and restock tracking, and notifications through more than 90 services. This template runs the official image with a persistent volume, a generated UI password, a generated REST API key, and a public HTTPS endpoint.

This template runs the official `ghcr.io/dgtlmoon/changedetection.io` image (pinned by digest). Out of the box the stock app has no login and a random API key you have to dig out of the UI; here both are set at boot from variables Railway generates for you:

- The web UI is locked behind a login using `CHANGEDETECTION_PASSWORD`. Anonymous requests are redirected to `/login`.
- The REST API accepts only the key in `CHANGEDETECTION_API_KEY` (header `x-api-key`). Requests with no key or a wrong key get `403`.
- Watches, snapshots and settings live on a volume mounted at `/datastore`, so they survive redeploys. The API key and password stay stable across redeploys.
- The sample watches the upstream app seeds on first start are removed, so the instance starts empty.

Agent contract:

- Base URL variable: `CHANGEDETECTION_URL` (`https://`)
- UI login: password only, in `CHANGEDETECTION_PASSWORD` (the login form has no username)
- API key variable: `CHANGEDETECTION_API_KEY`, sent as header `x-api-key`
- Health path: `/login` (open, returns 200)
- API base: `/api/v1` (`GET|POST /watch`, `GET|PUT|DELETE /watch/{uuid}`, `GET /systeminfo`, `/tags`, `/notifications`, `/import`, `/search`)
- Full OpenAPI spec: 

Add a watch with one call:

```bash
curl -s -X POST "$CHANGEDETECTION_URL/api/v1/watch" \
  -H "x-api-key: $CHANGEDETECTION_API_KEY" \
  -H 'content-type: application/json' \
  -d '{"url":"https://example.com","title":"example"}'

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| changedetection | `ghcr.io/dgtlmoon/changedetection.io@sha256:04eaae7915bad711160cb15abe160f6d3fabe98bbbd658509d4b7a654000fb2d` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `CHANGEDETECTION_API_KEY` | (secret) |
| `CHANGEDETECTION_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'exec python -c "$(echo IiIiQm9vdCB3cmFwcGVyIGZvciB0aGUgY2hhbmdlZGV0ZWN0aW9uLmlvIFJhaWx3YXkgdGVtcGxhdGUuCgpSdW5zIGFzIHRoZSBzdGFydCBjb21tYW5kIChiYXNlNjQtZW1iZWRkZWQgaW4gc2NyaXB0cy9zcGVjcy9jaGFuZ2VkZXRlY3Rpb24uanNvbiksCmJlY2F1c2UgYSBzdGFydCBjb21tYW5kIHJlcGxhY2VzIHRoZSBpbWFnZSBFTlRSWVBPSU5UIGFuZCBhIGxpdGVyYWwgdGVtcGxhdGUgdmFyaWFibGUKd291bGQgcHVibGlzaCBhcyBhIGJsYW5rIHJlcXVpcmVkIGZpZWxkLiBTb3VyY2Ugb2YgdHJ1dGggZm9yIHdoYXQgdGhhdCBjb21tYW5kIGRvZXMuCgoxLiBDcmVhdGUgdGhlIGRhdGFzdG9yZSBvbiBhIGZyZXNoIHZvbHVtZSAodXBzdHJlYW0ncyBvd24gVEVTVElOR19TSFVURE9XTl9BRlRFUl9EQVRBU1RPUkVfTE9BRAogICBleGl0KSBhbmQgcmVtb3ZlIHRoZSBzYW1wbGUgd2F0Y2hlcyBhbmQgdGFnIGl0IHNlZWRzLgoyLiBQaW4gdGhlIFJFU1QgQVBJIGtleSBpbiBjaGFuZ2VkZXRlY3Rpb24uanNvbiB0byAkQ0hBTkdFREVURUNUSU9OX0FQSV9LRVkuCjMuIERlcml2ZSBTQUxURURfUEFTUyBmcm9tICRDSEFOR0VERVRFQ1RJT05fUEFTU1dPUkQgKHVwc3RyZWFtJ3Mgb3duIGZvcm1hdDoKICAgYmFzZTY0KHNhbHQzMiArIHBia2RmMl9zaGEyNTYocGFzc3dvcmQsIHNhbHQsIDEwMDAwMCkpKSwgd2hpY2ggc3dpdGNoZXMgdGhlIFVJIGxvZ2luIG9uCiAgIGFuZCBsb2NrcyBpdCB0byB0aGF0IHZhbHVlLgo0LiBleGVjIHRoZSBhcHAuCiIiIgppbXBvcnQgYmFzZTY0LCBoYXNobGliLCBqc29uLCBvcywgc2h1dGlsLCBzdWJwcm9jZXNzLCBzeXMKCkQgPSAiL2RhdGFzdG9yZSIKQ0ZHID0gRCArICIvY2hhbmdlZGV0ZWN0aW9uLmpzb24iCnB3ID0gb3MuZW52aXJvblsiQ0hBTkdFREVURUNUSU9OX1BBU1NXT1JEIl0Ka2V5ID0gb3MuZW52aXJvblsiQ0hBTkdFREVURUNUSU9OX0FQSV9LRVkiXQpvcy5tYWtlZGlycyhELCBleGlzdF9vaz1UcnVlKQoKaWYgbm90IG9zLnBhdGguZXhpc3RzKENGRyk6CiAgICBiZWZvcmUgPSBzZXQob3MubGlzdGRpcihEKSkKICAgIGVudiA9IGRpY3Qob3MuZW52aXJvbiwgVEVTVElOR19TSFVURE9XTl9BRlRFUl9EQVRBU1RPUkVfTE9BRD0iMSIpCiAgICBzdWJwcm9jZXNzLnJ1bihbc3lzLmV4ZWN1dGFibGUsICIvYXBwL2NoYW5nZWRldGVjdGlvbi5weSIsICItZCIsIERdLCBlbnY9ZW52LCBjaGVjaz1UcnVlKQogICAgZm9yIG5hbWUgaW4gc2V0KG9zLmxpc3RkaXIoRCkpIC0gYmVmb3JlOgogICAgICAgIHAgPSBvcy5wYXRoLmpvaW4oRCwgbmFtZSkKICAgICAgICBpZiBvcy5wYXRoLmlzZGlyKHApIGFuZCAob3MucGF0aC5leGlzdHMob3MucGF0aC5qb2luKHAsICJ3YXRjaC5qc29uIikpIG9yIG9zLnBhdGguZXhpc3RzKG9zLnBhdGguam9pbihwLCAidGFnLmpzb24iKSkpOgogICAgICAgICAgICBzaHV0aWwucm10cmVlKHApCgp3aXRoIG9wZW4oQ0ZHLCBlbmNvZGluZz0idXRmLTgiKSBhcyBmOgogICAgY2ZnID0ganNvbi5sb2FkKGYpCmFwcCA9IGNmZy5zZXRkZWZhdWx0KCJzZXR0aW5ncyIsIHt9KS5zZXRkZWZhdWx0KCJhcHBsaWNhdGlvbiIsIHt9KQphcHBbImFwaV9hY2Nlc3NfdG9rZW4iXSA9IGtleQphcHBbImFwaV9hY2Nlc3NfdG9rZW5fZW5hYmxlZCJdID0gVHJ1ZQp0bXAgPSBDRkcgKyAiLnRtcCIKd2l0aCBvcGVuKHRtcCwgInciLCBlbmNvZGluZz0idXRmLTgiKSBhcyBmOgogICAganNvbi5kdW1wKGNmZywgZikKb3MucmVwbGFjZSh0bXAsIENGRykKCnNhbHQgPSBvcy51cmFuZG9tKDMyKQpvcy5lbnZpcm9uWyJTQUxURURfUEFTUyJdID0gYmFzZTY0LmI2NGVuY29kZShzYWx0ICsgaGFzaGxpYi5wYmtkZjJfaG1hYygic2hhMjU2IiwgcHcuZW5jb2RlKCksIHNhbHQsIDEwMDAwMCkpLmRlY29kZSgpCnByaW50KCJbcmFpbHdheV0gY2hhbmdlZGV0ZWN0aW9uIHVpZD0lZCBkYXRhc3RvcmVfb3duZXI9JWQ6JWQgd3JpdGFibGU9JXMiICUgKAogICAgb3MuZ2V0dWlkKCksIG9zLnN0YXQoRCkuc3RfdWlkLCBvcy5zdGF0KEQpLnN0X2dpZCwgb3MuYWNjZXNzKEQsIG9zLldfT0spKSwgZmx1c2g9VHJ1ZSkKb3MuZXhlY3Yoc3lzLmV4ZWN1dGFibGUsIFtzeXMuZXhlY3V0YWJsZSwgIi9hcHAvY2hhbmdlZGV0ZWN0aW9uLnB5IiwgIi1kIiwgRF0pCg== | base64 -d)"'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/datastore`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/changedetectionio-or-just-updated-websit)
