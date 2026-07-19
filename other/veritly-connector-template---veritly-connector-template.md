# Deploy veritly-connector-template on Railway

Run an outbound-only Veritly connector beside a private Railway database.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/veritly-connector-template)

## About

Deploy this directory as a service in the **same Railway project and
environment** as the database. That placement lets routes use Railway private
DNS names such as `postgres.railway.internal`; a connector in another project
or environment cannot resolve or reach them.

Configure these Railway service variables:

```text
VERITLY_GATEWAY_URL=wss://connect.veritly.co.uk/agent
VERITLY_PAIRING_CODE=
VERITLY_STATUS_ADDR=:8081
PORT=8081
```

Attach a Railway volume at `/var/lib/veritly`. The connector exchanges the
15-minute setup code once, writes its long-lived credential to that volume, and
does not need the code again after a restart. Mark `VERITLY_PAIRING_CODE` sealed.

Set the service root directory to `/deploy/connector/railway`, or copy this
directory into a small standalone repository before turning it into a Railway
template. Do not generate a public domain: the connector only needs outbound
traffic. Railway uses `PORT=8081` internally for the `/readyz` deployment health
check.

Keep one replica because Railway volumes cannot attach to multiple replicas.
The connector itself opens two independent control sessions to the Veritly
gateway. The `ALWAYS` restart policy requires a paid Railway plan;
free and trial plans cap failure restarts. Railway only calls `/readyz` during a
deployment, so continuous connector status and disconnect alerts come from the
Veritly control plane, not that deployment health check.

Railway's private network is scoped to the project and environment, which is
why this template should be added to the customer's existing project instead
of deployed as an unrelated template project.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| veritly-connector | `ghcr.io/mixindennisbarzanoffmixin/connector:latest` | Database |

## Configuration

- **Volume:** `/var/lib/veritly`

**Category:** Other

[View on Railway →](https://railway.com/deploy/veritly-connector-template)
