# Deploy twingate-template on Railway

Twingate zero-trust connector — private-network access in one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/twingate-template)

## About

Deploy with the button above — one service (`twingate-connector`) is provisioned from the public repo, healthcheck wired to `/healthz`, no public domain, no volumes. The first deployment comes up in the healthy **configure-me** state; the logs print the exact token setup steps.

Then connect it:

1. Sign in to your Twingate Admin Console (`https://your-tenant.twingate.com`).
2. Open **Remote Networks** and pick (or create) the network this connector will serve, then click **Deploy Connector** / **+**.
3. Choose **Docker** and copy the three values from the shown command.
4. In Railway, open the service → **Variables** and add:

   | Variable | Value |
   |---|---|
   | `TWINGATE_NETWORK` | Your network slug **only**, e.g. `acme-co` — never a URL |
   | `TWINGATE_ACCESS_TOKEN` | Access token shown for this connector |
   | `TWINGATE_REFRESH_TOKEN` | Refresh token shown for this connector |

5. The service redeploys automatically. Within a minute the connector shows **Online** in the Admin Console.

A single outbound-only service built from the official `twingate/connector:1` binaries plus:

- an entrypoint wrapper that gates the boot on the three Twingate variables (`TWINGATE_NETWORK`, `TWINGATE_ACCESS_TOKEN`, `TWINGATE_REFRESH_TOKEN`) and keeps the container healthy with setup instructions when they are missing;
- a static HTTP health shim that serves `/healthz` on the assigned `$PORT`, backed by the connector's native `connectorctl health` exec check (polled every 30 s; a `HEALTH_GRACE_SECONDS` grace window, default 300 s, separates "still starting" from "unhealthy").

Important constraints:

- **Unique token pair per connector.** Every connector instance needs its own pair, generated per connector in the Admin Console. Never reuse a pair on a second connector — Twingate disconnects the first one when the pair connects elsewhere. For high availability, deploy this template a second time and generate a fresh pair for it on the same Remote Network.
- **Time-expiring tokens.** Generate the pair right before you paste it into Railway. If a stored pair expires, reprovision the connector (new pair) and update the variables.
- **Clock skew.** Token authentication breaks with more than ~5 seconds of clock skew; Railway hosts are NTP-synced, so this mostly matters if you move the setup elsewhere.
- No volume is needed — connectors are stateless. A 512 MB / shared-vCPU service is ample (~$3–5/month on Hobby).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| twingate-connector | [lNamelessl/twingate-connector-railway-template](https://github.com/lNamelessl/twingate-connector-railway-template) (root: .) | Worker |

## Configuration

- **Healthcheck:** `/healthz`

**Category:** Authentication · **Languages:** C, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/twingate-template)
