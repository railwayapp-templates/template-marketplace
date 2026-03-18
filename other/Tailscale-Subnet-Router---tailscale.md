# Deploy Tailscale Subnet Router on Railway

Run a Tailscale Subnet Router on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailscale)

## About

<p align="center">
    <a href="https://tailscale.com/">
        <img style="background: #F6F4F2; padding: 10px; border-radius: 5px; width: 500px;" src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Tailscale-Logo-Black.svg" alt="tailscale logo">
    </a>
</p>

<h3 align="center">Tailscale makes secure networking easy</h3>

<p align="center">Achieve point-to-point network connectivity that enforces least privilege</p>

## Full Guide [Here](https://docs.railway.app/tutorials/set-up-a-tailscale-subnet-router)

## About this Tutorial

This tutorial will help you connect to your database via the private network without you having to use public endpoints.

## 1. Getting an Auth Key

The Auth key will authenticate the Tailscale machine that we'll deploy into our Railway project in a later step.

- Head over to the [Keys](https://login.tailscale.com/admin/settings/keys) page located within the settings menu on the Tailscale dashboard.

- Click **Generate auth key**.

    Put in a description and leave all other settings as the default.

- Click **Generate key**.

    Tailscale will now show you the newly generated auth key, **be sure to copy it down**.

- Click **Done**.

## 2. Configure Split DNS

Properly configuring our nameserver in Tailscale is essential for enabling local DNS lookups for our private domains.

- Open the <a href="https://login.tailscale.com/admin/dns">DNS</a> page.

- Under the **Nameservers** Header, click **Add Nameserver** → Click **Custom**.

    This is where we'll tell Tailscale how to route the DNS lookups for our `railway.internal` domains.

- Enter `fd12::10` as the Nameserver.

    This DNS nameserver is used across all private networks in every environment and will handle our DNS queries for private domains.

- Enable the **Restrict to domain** option, AKA Split DNS.

- Enter in `railway.internal` as our domain.

    This makes sure only DNS lookups for our private domain are forwarded to the private DNS resolver.

- Click **Save**.

## 3. Deploy the Tailscale Subnet Router

This will be the gateway into our environment's private network.

- Open the project that contains the services you want to access privately.

    For this tutorial, we will deploy the Subnet Router into a project with a Postgres database service.

- In the top right of the project canvas, click **Create** → Choose **Template**.

- Search for the `Tailscale Subnet Router` template.

    Choose the result that is published by **Railway Templates**.

- A ghost service will appear, Paste in your Auth Key from earlier.

- Click **Deploy Template**

This template will start to deploy and once deployed it will register itself as a machine in your tailnet with the name automatically derived from the project's name and environment name.

## 4. Approve the Subnet

Our subnet router will advertise the private network's CIDR range but we will need to manually approve it.

- Head back over to our [Machines dashboard](https://login.tailscale.com/admin/machines).

You will see your newly deployed machine with its name that was previously derived from the project and environment.

- Click on the machine's 3-dot menu → **Edit route settings**.

- Click the radio button on the `fd12::/16` to accept it.

    This route covers the entire private networking range allowing us to access all services within the project.

- Click **Save**.

**That is it for all the configurations needed, you can now call any service via its private domain and port just as if you were another service within the private network!**

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tailscale | `tailscale/tailscale:stable` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_ROUTES` | fd12::/16,10.128.0.0/9 | The private networks' CIDR range |
| `TS_AUTHKEY` | - | Your Tailscale auth key |
| `TS_STATE_DIR` | - | Location to store the state of the tailscaled deamon |

## Configuration

- **Start command:** `/bin/sh -c "export TS_HOSTNAME=$(echo \"${RAILWAY_PROJECT_NAME}-${RAILWAY_ENVIRONMENT_NAME}\" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | sed 's/--*/-/g') && exec /usr/local/bin/containerboot"`
- **Volume:** `/var/lib`

**Category:** Other

[View on Railway →](https://railway.com/deploy/tailscale)
