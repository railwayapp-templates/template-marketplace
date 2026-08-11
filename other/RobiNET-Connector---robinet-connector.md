# Deploy RobiNET Connector on Railway

VPN forwarder for access to the internal services network.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/robinet-connector)

## About

Reach a Railway environment's internal services from your own machine, without
publishing a port. RobiNET Connector is a VPN forwarder: deployed into an
environment, it joins an encrypted mesh you control and carries that
environment's private network into it, so `*.railway.internal` names resolve
and connect from outside Railway. It dials out, opens no port, and needs no
public URL.

Source, hub setup and the manual: [github.com/rjsocha/robinet](https://github.com/rjsocha/robinet)

**This is not plug and play. It requires a self-hosted RobiNET hub** on a
public address, and an instance on it that you own. There is no service to sign
up for: the hub is the same binary run with different arguments, on any machine
with a public IP, and it is what this connector enrolls with.

Deploy this into the environment whose network you want to reach.

On start it enrolls with the hub named in `ROBINET_ENDPOINT` and waits. Nothing
is granted until the owner of that mesh approves it on their own machine, with
a key the hub has never seen. Once approved the tunnel comes up on its own and
stays up.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| robinet-connector | `wyga/robinet:1` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ROBINET_ENDPOINT` | CHANGEME |

## Configuration

- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/robinet-connector)
