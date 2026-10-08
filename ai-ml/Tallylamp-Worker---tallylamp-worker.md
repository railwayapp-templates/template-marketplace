# Deploy Tallylamp Worker on Railway

A worker for Tallylamp: more browsers, on a service with its own limit.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tallylamp-worker)

## About

Add another 1,000 processes to a Tallylamp you already run.

Railway gives each service 1,000 processes and threads, and will not raise that
on a normal plan. One Chrome on a few heavy pages can use 700 of them. So when
your Tallylamp answers `fleet_full` and its dashboard shows the host near 1,000,
you are not short of memory, and a bigger plan will not help. Another service
will. A worker is that service: it runs browsers for the Tallylamp you already
have, with a process limit of its own.

If one Tallylamp runs all your browsers without trouble, you do not need this.
Set `TALLYLAMP_CHROME_CPUS=4` on it first. In a ten-minute test on Railway that
took one browser from 346 threads to 203.

This template is not a Tallylamp by itself. It has no dashboard and no MCP
endpoint. Deploy [Tallylamp](https://railway.com/deploy/tallylamp) first.

One service from the same image as Tallylamp, plus a volume at `/data` for the
profiles of the browsers it runs. It has no public domain. Your Tallylamp
reaches it over the project's private network, and it answers nothing else.

You still have one Tallylamp: one dashboard, one `/mcp` URL, the same agent
tokens. Each browser's page says which host it runs on, and **Move to…** in its
menu moves it between hosts, logins included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tallylamp Worker | `ghcr.io/nxfi777/tallylamp@sha256:4429543652378d650c9018cbb981b1a77fc9595f276e9459f66d13c70250246c` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TALLYLAMP_JOIN` | - | Required. The join token from Workers, Add worker, in your Tallylamp dashboard. It works once and expires in an hour. |
| `TALLYLAMP_SANDBOX` | auto | Optional. Chrome's sandbox policy, as on Tallylamp. Leave it as auto. |
| `TALLYLAMP_CHROME_CPUS` | 4 | Optional. Runs each Chrome on this many CPUs, which cuts its threads by about 40%. Remove it to let Chrome use every CPU. |

## Configuration

- **Healthcheck:** `/healthz`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/tallylamp-worker)
