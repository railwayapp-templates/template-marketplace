# Deploy Healthchecks | (Just Updated) Cron Job Monitoring, API Key Generated, Persistent on Railway

Cron job monitoring. API key and login generated, data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/healthchecks-or-just-updated-cron-job-mo)

## About

**Built for an LLM agent to deploy and use.** There is no manual deploy step and nothing to fill in: the login, the Django secret and a read-write API key are generated at deploy time, the contract below lists every URL and variable name, and one working call creates a check and pings it. An agent reads its variables, runs the curl, and is monitoring cron jobs.

Healthchecks is an open-source cron job and background task monitor. Your jobs ping a URL when they run; if a ping is late or never arrives, Healthchecks raises the alarm. This template runs the official image with a persistent SQLite volume, registration closed, and a ready superuser and project API key.

This template runs the official `healthchecks/healthchecks` image (pinned by digest) as one service. SQLite lives on a volume at `/data`, so checks and ping history survive redeploys. At every boot a small wrapper prepares the root-owned volume, runs migrations, then creates the superuser if it does not exist and sets the project API key from the generated `HEALTHCHECKS_API_KEY` variable (so it is the same after every redeploy). `DEBUG` is off, `REGISTRATION_OPEN` is off, `ALLOWED_HOSTS` and `SITE_ROOT` are wired from the public domain, and uWSGI binds Railway's `$PORT`.

Agent contract:

- Site URL variable: `SITE_ROOT` (`https://`)
- Admin login: `HEALTHCHECKS_ADMIN_EMAIL` and `HEALTHCHECKS_ADMIN_PASSWORD` (sign in at `/accounts/login/`)
- Project API key variable: `HEALTHCHECKS_API_KEY` (read-write, send as the `X-Api-Key` header)
- Django secret variable: `SECRET_KEY` (generated, keep it stable: API keys are hashed with it)
- Health path: `/accounts/login/` (open, returns 200); `/api/v3/status/` also answers `OK` after a database query
- Create a check: `POST /api/v3/checks/`; ping it at the returned `ping_url` (`GET`, `POST`, `/start`, `/fail`)

```bash

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| healthchecks | `healthchecks/healthchecks@sha256:aa08a61b0dcfd83f1332eab195d5cec1b595ae076eb8388cadf8a3d597114f9b` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SECRET_KEY` | (secret) |
| `HEALTHCHECKS_API_KEY` | (secret) |
| `HEALTHCHECKS_ADMIN_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'eval "$(echo IyEvYmluL3NoCiMgSGVhbHRoY2hlY2tzIGJvb3Qgd3JhcHBlciBmb3IgUmFpbHdheS4gUnVucyBhcyByb290IChSQUlMV0FZX1JVTl9VSUQ9MCkgb25seSBsb25nIGVub3VnaAojIHRvIHByZXBhcmUgdGhlIHJvb3Qtb3duZWQgdm9sdW1lLCB0aGVuIGRyb3BzIHRvIHRoZSBpbWFnZSdzIG93biB1c2VyIChoYywgdWlkIDk5OSkuCnNldCAtZXUKREFUQT0vZGF0YQpta2RpciAtcCAiJERBVEEiCmNob3duIC1SIDk5OTo5OTkgIiREQVRBIgplY2hvICJbcmFpbHdheV0gaGVhbHRoY2hlY2tzIHVpZD0kKGlkIC11KSBkYXRhX293bmVyPSQoc3RhdCAtYyAldTolZyAiJERBVEEiKSBwb3J0PSR7UE9SVDotdW5zZXR9IgoKIyBTZXR0aW5ncyB0aGUgdGVtcGxhdGUgY2Fubm90IHB1Ymxpc2ggYXMgdmFyaWFibGVzIChhIGxpdGVyYWwgdmFyaWFibGUgaXMgZHJvcHBlZCBieSB0ZW1wbGF0ZUdlbmVyYXRlKS4KZXhwb3J0IERFQlVHPUZhbHNlCmV4cG9ydCBSRUdJU1RSQVRJT05fT1BFTj1GYWxzZQpleHBvcnQgREJfTkFNRT0iJERBVEEvaGMuc3FsaXRlIgpleHBvcnQgU0VDVVJFX1BST1hZX1NTTF9IRUFERVI9IkhUVFBfWF9GT1JXQVJERURfUFJPVE8saHR0cHMiCmV4cG9ydCBTSVRFX05BTUU9IiR7U0lURV9OQU1FOi1IZWFsdGhjaGVja3N9IgpleHBvcnQgVVdTR0lfUFJPQ0VTU0VTPSIke1VXU0dJX1BST0NFU1NFUzotMn0iCmV4cG9ydCBMSVNURU5fUE9SVD0iJHtQT1JUOi04MDAwfSIKZXhwb3J0IFBZVEhPTlBBVEg9L29wdC9oZWFsdGhjaGVja3MKCiMgVGhlIGltYWdlJ3MgdXdzZ2kuaW5pIGhhcmQtY29kZXMgOjgwMDAuIEJpbmQgUmFpbHdheSdzIGluamVjdGVkICRQT1JUIGluc3RlYWQsIHNvIHRoZSBwbGF0Zm9ybQojIGhlYWx0aGNoZWNrICh3aGljaCBkaWFscyB0aGUgaW5qZWN0ZWQgcG9ydCkgYW5kIHRoZSBlZGdlIHByb3h5IGFncmVlLgpzZWQgInMvOjgwMDAvOiRMSVNURU5fUE9SVC8iIC9vcHQvaGVhbHRoY2hlY2tzL2RvY2tlci91d3NnaS5pbmkgPiAiJERBVEEvdXdzZ2kuaW5pIgoKY2F0ID4gIiREQVRBL2Jvb3RzdHJhcC5weSIgPDwnUFknCmltcG9ydCBobWFjCmltcG9ydCBvcwoKaW1wb3J0IGRqYW5nbwoKb3MuZW52aXJvbi5zZXRkZWZhdWx0KCJESkFOR09fU0VUVElOR1NfTU9EVUxFIiwgImhjLnNldHRpbmdzIikKZGphbmdvLnNldHVwKCkKCmZyb20gZGphbmdvLmNvbmYgaW1wb3J0IHNldHRpbmdzCmZyb20gZGphbmdvLmNvbnRyaWIuYXV0aC5tb2RlbHMgaW1wb3J0IFVzZXIKCmZyb20gaGMuYWNjb3VudHMubW9kZWxzIGltcG9ydCBQcm9qZWN0CmZyb20gaGMuYWNjb3VudHMudmlld3MgaW1wb3J0IF9tYWtlX3VzZXIKCmVtYWlsID0gb3MuZW52aXJvblsiSEVBTFRIQ0hFQ0tTX0FETUlOX0VNQUlMIl0uc3RyaXAoKS5sb3dlcigpCnBhc3N3b3JkID0gb3MuZW52aXJvblsiSEVBTFRIQ0hFQ0tTX0FETUlOX1BBU1NXT1JEIl0KCnVzZXIgPSBVc2VyLm9iamVjdHMuZmlsdGVyKGVtYWlsPWVtYWlsKS5maXJzdCgpCmlmIHVzZXIgaXMgTm9uZToKICAgIHVzZXIgPSBfbWFrZV91c2VyKGVtYWlsKQogICAgcHJpbnQoIltyYWlsd2F5XSBjcmVhdGVkIHN1cGVydXNlciIsIGVtYWlsKQp1c2VyLnNldF9wYXNzd29yZChwYXNzd29yZCkKdXNlci5pc19zdGFmZiA9IFRydWUKdXNlci5pc19zdXBlcnVzZXIgPSBUcnVlCnVzZXIuc2F2ZSgpCgpwcm9qZWN0ID0gUHJvamVjdC5vYmplY3RzLmZpbHRlcihvd25lcj11c2VyKS5vcmRlcl9ieSgiaWQiKS5maXJzdCgpCmlmIHByb2plY3QgaXMgTm9uZToKICAgIHByb2plY3QgPSBQcm9qZWN0KG93bmVyPXVzZXIpCiAgICBwcm9qZWN0LmJhZGdlX2tleSA9IHVzZXIudXNlcm5hbWUKcHJvamVjdC5uYW1lID0gcHJvamVjdC5uYW1lIG9yICJEZWZhdWx0IgoKIyBBIHJlYWQtd3JpdGUgQVBJIGtleSBhbiBhZ2VudCBjYW4gdXNlIHdpdGhvdXQgb3BlbmluZyBhIGJyb3dzZXIuIEhlYWx0aGNoZWNrcyB2NCBzdG9yZXMKIyBhcGlfa2V5IGFzIDxmaXJzdCA4IHNlY3JldCBjaGFycz4uPEhNQUMtU0hBMjU2KFNFQ1JFVF9LRVksIGtleSk+OyByZWNvbXB1dGVkIGV2ZXJ5IGJvb3Qgc28gaXQKIyBhbHdheXMgbWF0Y2hlcyB0aGUgSEVBTFRIQ0hFQ0tTX0FQSV9LRVkgdmFyaWFibGUgKGFuZCBTRUNSRVRfS0VZKSBvZiB0aGlzIGRlcGxveS4Ka2V5ID0gb3MuZW52aXJvbi5nZXQoIkhFQUxUSENIRUNLU19BUElfS0VZIiwgIiIpCmlmIGxlbihrZXkpID09IDMyIGFuZCBrZXkuc3RhcnRzd2l0aCgiaGN3XyIpOgogICAgZGlnZXN0ID0gaG1hYy5kaWdlc3Qoc2V0dGluZ3MuU0VDUkVUX0tFWS5lbmNvZGUoKSwga2V5LmVuY29kZSgpLCAic2hhMjU2IikKICAgIHByb2plY3QuYXBpX2tleSA9IGtleVs0OjEyXSArICIuIiArIGRpZ2VzdC5oZXgoKQogICAgcHJpbnQoIltyYWlsd2F5XSBwcm9qZWN0IEFQSSBrZXkgc2V0IGZvciIsIGVtYWlsKQplbHNlOgogICAgcHJpbnQoIltyYWlsd2F5XSBIRUFMVEhDSEVDS1NfQVBJX0tFWSBtaXNzaW5nIG9yIG5vdCBhIDMyLWNoYXIgaGN3XyBrZXk7IEFQSSBrZXkgbm90IHNldCIpCnByb2plY3Quc2F2ZSgpClBZCmNob3duIDk5OTo5OTkgIiREQVRBL2Jvb3RzdHJhcC5weSIgIiREQVRBL3V3c2dpLmluaSIKCmNkIC9vcHQvaGVhbHRoY2hlY2tzCmV4ZWMgc2V0cHJpdiAtLXJldWlkPTk5OSAtLXJlZ2lkPTk5OSAtLWNsZWFyLWdyb3VwcyBzaCAtYyBcCiAgJy4vbWFuYWdlLnB5IG1pZ3JhdGUgLS1ub2lucHV0ICYmIHB5dGhvbiAiJDAiICYmIGV4ZWMgdXdzZ2kgIiQxIicgXAogICIkREFUQS9ib290c3RyYXAucHkiICIkREFUQS91d3NnaS5pbmkiCg== | base64 -d)"'`
- **Healthcheck:** `/accounts/login/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/healthchecks-or-just-updated-cron-job-mo)
