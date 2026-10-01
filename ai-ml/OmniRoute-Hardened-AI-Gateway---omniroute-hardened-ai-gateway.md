# Deploy OmniRoute Hardened AI Gateway on Railway

OmniRoute AI gateway pinned past CVE-2026-88062, login + API keys enforced

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-hardened-ai-gateway)

## About

OmniRoute is an open-source (MIT) AI gateway: one OpenAI-compatible endpoint in front of hundreds of LLM providers, with combos, quota-aware fallback, prompt compression, per-app API keys and a web dashboard. It works with Claude Code, Codex, Cursor, Cline and any OpenAI SDK.

This template runs the official OmniRoute v3.8.51 image, pinned by digest to the tag build that fixes CVE-2026-88062 (a critical remote code execution in the ACP custom-agent endpoint). The plain `3.8.51` and `latest` tags currently resolve to an older pre-release on amd64, which is why the digest pin matters. A Railway volume at `/app/data` holds the SQLite database, so providers, keys and settings survive redeploys, and Railway health checks `/healthz` on port 20128.

Security is on from the first request. The admin password is generated and seeded at boot, so there is no open setup window. Every `/v1` call needs an API key, and one is generated for you. On first boot the template also blocks every keyless provider OmniRoute would otherwise route with zero setup (several of them scrape consumer web apps) and keeps `auto` combos away from providers upstream flags as terms-of-service risks. Nothing routes until you add a provider with your own key.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OmniRoute | `diegosouzapw/omniroute@sha256:77b38c546e1c74add83d73cd2c752342c364c0565fb0cc21eb4792e9c0a5cb79` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 20128 | OmniRoute listen port (dashboard, management API and /v1 share it). Railway's healthcheck and edge proxy probe $PORT, so keep it equal to the domain target port 20128. |
| `DATA_DIR` | /app/data | Where OmniRoute keeps storage.sqlite, server.env and its SQLite backups. Must match the volume mount path. |
| `JWT_SECRET` | (secret) | Signs dashboard session cookies. Rotating it signs every admin out. |
| `API_KEY_SECRET` | (secret) | Secret for API key checksums (openssl rand -hex 32 format). Set once; changing it invalidates dashboard-created API keys. |
| `MACHINE_ID_SALT` | - | Per-deployment salt for the machine id embedded in API keys (upstream default is a shared constant). |
| `REQUIRE_API_KEY` | (secret) | Every /v1 call needs an API key. Keep true on a public domain, otherwise anyone who finds the URL can spend your provider quota. A dashboard override (Settings, Feature Flags) takes precedence over this variable. |
| `INITIAL_PASSWORD` | (secret) | Dashboard and management API password, generated at deploy. Seeded on first boot only: it is bcrypt-hashed into the database, turns requireLogin on and closes the setup wizard, so there is no anonymous bootstrap window. Change it later in Settings, Security; editing this variable afterwards does not change the stored password. |
| `OMNIROUTE_API_KEY` | (secret) | Gateway API key accepted on /v1 from the first boot (Authorization: Bearer ...). Rotate by changing the variable. For per-app keys with model limits, create keys in the dashboard under API Keys. |
| `AUTH_COOKIE_SECURE` | true | Marks the session cookie Secure. Railway serves the domain over HTTPS. |
| `OMNIROUTE_HOSTNAME` | :: | Bind address handed to the Next.js server. '::' is dual stack: Railway's IPv4 healthcheck and other services calling http://omniroute.railway.internal:20128 over IPv6 both connect. Do not set HOSTNAME; the launcher overwrites it from this variable. |
| `OMNIROUTE_MEMORY_MB` | 2048 | V8 heap ceiling in MB. Upstream's self-host default for a single user running coding agents; raise it (and the service memory) if you see 'Reached heap limit'. Needs the Hobby plan or higher. |
| `NEXT_PUBLIC_BASE_URL` | - | Canonical public URL used for OAuth redirect URIs and dashboard links. Update it if you add a custom domain. |
| `STORAGE_ENCRYPTION_KEY` | - | Encrypts provider credentials stored in SQLite. Set once and never rotate or delete: OmniRoute refuses to boot if it no longer matches the stored credentials. |
| `LIVE_WS_ALLOWED_ORIGINS` | - | Origin allowed to open the live dashboard WebSocket, which OmniRoute proxies at /live-ws on the main port. It still requires a signed-in session. |
| `OMNIROUTE_PUBLIC_BASE_URL` | - | Public origin. OmniRoute only accepts browser writes (dashboard saves) whose Origin matches a configured public origin, and uses it for generated links. Update it if you add a custom domain. |

## Configuration

- **Start command:** `sh -c 'cd /app; echo Y29uc3QgZnMgPSByZXF1aXJlKCJmcyIpOwpjb25zdCBEQVRBID0gcHJvY2Vzcy5lbnYuREFUQV9ESVIgfHwgIi9hcHAvZGF0YSI7CmNvbnN0IE1BUksgPSBEQVRBICsgIi8ucmFpbHdheS10ZW1wbGF0ZS1wcm92aWRlci1sb2NrZG93biI7CmNvbnN0IEJBU0UgPSAiaHR0cDovLzEyNy4wLjAuMToiICsgKHByb2Nlc3MuZW52LlBPUlQgfHwgIjIwMTI4Iik7CmNvbnN0IEJMT0NLID0gWwogICJvcGVuY29kZSIsICJkdWNrZHVja2dvLXdlYiIsICJjbG91ZGZsYXJlLXBsYXlncm91bmQiLCAidmVvYWlmcmVlLXdlYiIsICJ1bmNsb3NlYWkiLCAiYWlob3JkZSIsCiAgImRldmluLWNsaS1hZ2VudGljIiwgImF1Z2dpZSIsICJ6Y29kZSIsICJjb2RleC1hcHAtc2VydmVyIiwgImR1Y2tkdWNrZ28tZnJlZSIsICJjb250ZXh0NyIsCl07CmNvbnN0IE5PX0FOT05fRkFMTEJBQ0sgPSBbImtpbG9jb2RlIiwgInBvbGxpbmF0aW9ucyIsICJvcGVuY29kZS16ZW4iLCAib3BlbmNvZGUtZ28iXTsKY29uc3QgbG9nID0gKG0pID0+IGNvbnNvbGUubG9nKCJbcmFpbHdheS10ZW1wbGF0ZV0gIiArIG0pOwpjb25zdCBzbGVlcCA9IChtcykgPT4gbmV3IFByb21pc2UoKHIpID0+IHNldFRpbWVvdXQociwgbXMpKTsKY29uc3QgbWVyZ2UgPSAoY3VyLCBhZGQpID0+IFsuLi5uZXcgU2V0KFsuLi4oQXJyYXkuaXNBcnJheShjdXIpID8gY3VyIDogW10pLCAuLi5hZGRdKV07Cgphc3luYyBmdW5jdGlvbiBsb2dpbigpIHsKICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykgewogICAgdHJ5IHsKICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKEJBU0UgKyAiL2FwaS9hdXRoL2xvZ2luIiwgewogICAgICAgIG1ldGhvZDogIlBPU1QiLAogICAgICAgIGhlYWRlcnM6IHsgImNvbnRlbnQtdHlwZSI6ICJhcHBsaWNhdGlvbi9qc29uIiB9LAogICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcGFzc3dvcmQ6IHByb2Nlc3MuZW52LklOSVRJQUxfUEFTU1dPUkQgfSksCiAgICAgIH0pOwogICAgICBpZiAoci5vaykgcmV0dXJuIHIuaGVhZGVycy5nZXRTZXRDb29raWUoKS5tYXAoKGMpID0+IGMuc3BsaXQoIjsiKVswXSkuam9pbigiOyAiKTsKICAgICAgbG9nKCJsb2dpbiByZXR1cm5lZCAiICsgci5zdGF0dXMgKyAiLCByZXRyeWluZyIpOwogICAgfSBjYXRjaCAoZSkgewogICAgICBsb2coImxvZ2luIGVycm9yICIgKyBlLm1lc3NhZ2UgKyAiLCByZXRyeWluZyIpOwogICAgfQogICAgYXdhaXQgc2xlZXAoNTAwMCk7CiAgfQogIHRocm93IG5ldyBFcnJvcigiY291bGQgbm90IHNpZ24gaW4gd2l0aCBJTklUSUFMX1BBU1NXT1JEIik7Cn0KCmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7CiAgaWYgKGZzLmV4aXN0c1N5bmMoTUFSSykpIHJldHVybiBsb2coInByb3ZpZGVyIGxvY2tkb3duIGFscmVhZHkgYXBwbGllZCBvbiBhbiBlYXJsaWVyIGJvb3QiKTsKICBpZiAoIXByb2Nlc3MuZW52LklOSVRJQUxfUEFTU1dPUkQpIHJldHVybiBsb2coIklOSVRJQUxfUEFTU1dPUkQgaXMgbm90IHNldCwgcHJvdmlkZXIgbG9ja2Rvd24gc2tpcHBlZCIpOwogIGxldCB1cCA9IGZhbHNlOwogIGZvciAobGV0IGkgPSAwOyBpIDwgMTIwICYmICF1cDsgaSsrKSB7CiAgICB0cnkgewogICAgICB1cCA9IChhd2FpdCBmZXRjaChCQVNFICsgIi9oZWFsdGh6IikpLm9rOwogICAgfSBjYXRjaCB7fQogICAgaWYgKCF1cCkgYXdhaXQgc2xlZXAoNTAwMCk7CiAgfQogIGlmICghdXApIHRocm93IG5ldyBFcnJvcigic2VydmVyIG5ldmVyIHJlcG9ydGVkIHJlYWR5IG9uIC9oZWFsdGh6Iik7CiAgY29uc3QgY29va2llID0gYXdhaXQgbG9naW4oKTsKICBjb25zdCBoZWFkZXJzID0geyAiY29udGVudC10eXBlIjogImFwcGxpY2F0aW9uL2pzb24iLCBjb29raWUgfTsKICBjb25zdCBjdXJyZW50ID0gYXdhaXQgKGF3YWl0IGZldGNoKEJBU0UgKyAiL2FwaS9zZXR0aW5ncyIsIHsgaGVhZGVycyB9KSkuanNvbigpOwogIGNvbnN0IGJvZHkgPSB7CiAgICBibG9ja2VkUHJvdmlkZXJzOiBtZXJnZShjdXJyZW50LmJsb2NrZWRQcm92aWRlcnMsIEJMT0NLKSwKICAgIG5vQXV0aEZhbGxiYWNrRGlzYWJsZWRQcm92aWRlcnM6IG1lcmdlKGN1cnJlbnQubm9BdXRoRmFsbGJhY2tEaXNhYmxlZFByb3ZpZGVycywgTk9fQU5PTl9GQUxMQkFDSyksCiAgICBleGNsdWRlVG9zQXZvaWQ6IHRydWUsCiAgfTsKICBjb25zdCByID0gYXdhaXQgZmV0Y2goQkFTRSArICIvYXBpL3NldHRpbmdzIiwgeyBtZXRob2Q6ICJQQVRDSCIsIGhlYWRlcnMsIGJvZHk6IEpTT04uc3RyaW5naWZ5KGJvZHkpIH0pOwogIGlmICghci5vaykgdGhyb3cgbmV3IEVycm9yKCJQQVRDSCAvYXBpL3NldHRpbmdzICIgKyByLnN0YXR1cyArICIgIiArIChhd2FpdCByLnRleHQoKSkuc2xpY2UoMCwgMjAwKSk7CiAgZnMud3JpdGVGaWxlU3luYyhNQVJLLCBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgKyAiXG4iKTsKICBsb2coImJsb2NrZWQgIiArIEJMT0NLLmxlbmd0aCArICIga2V5bGVzcyBwcm92aWRlcnMsIGRpc2FibGVkIGFub255bW91cyBmYWxsYmFjayBvbiAiICsKICAgIE5PX0FOT05fRkFMTEJBQ0subGVuZ3RoICsgIiBnYXRld2F5cywgZXhjbHVkZVRvc0F2b2lkPXRydWUiKTsKfQoKbWFpbigpLmNhdGNoKChlKSA9PiBsb2coInByb3ZpZGVyIGxvY2tkb3duIEZBSUxFRCAoc2VydmVyIGtlZXBzIHJ1bm5pbmcpOiAiICsgZS5tZXNzYWdlKSk7Cg== | base64 -d > /tmp/provider-lockdown.cjs; node /tmp/provider-lockdown.cjs & exec /app/check-permissions.sh node dev/run-standalone.mjs'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/omniroute-hardened-ai-gateway)
