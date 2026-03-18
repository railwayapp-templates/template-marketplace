# Deploy tailscale-vpn on Railway

Host personal VPN on Railway using Tailscale

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/uIBpGp)

## About

# Railway Tailscale VPN

## Overview

Host personal VPN on Railway using Tailscale

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/uIBpGp?referralCode=KgmRt8)

## How to setup

1. To get started, you should create an account on [tailscale](https://tailscale.com), if you already have an account skip to next step

2. Go to you tailscale admin console settings then to [keys](https://login.tailscale.com/admin/settings/keys)

3. Click on 'Generate auth key ...'

    ![admin_console_keys.png](https://github.com/Andrew-Bekhiet/railway_tailscale_vpn/raw/master/readme-screenshots/admin_console_keys.png)

4. Give you key a description then click 'Generate key' when you are finished

    ![generating_auth_key.png](https://github.com/Andrew-Bekhiet/railway_tailscale_vpn/raw/master/readme-screenshots/generating_auth_key.png)

    Remember to take a note of the key because you'll see it only once

5. Go to railway and paste in the key in TAILSCALE_AUTHKEY variable

6. Deploy!

7. Go to your tailscale machines and approve railway-app as an exit node

    ![approve_exit_node.png](https://github.com/Andrew-Bekhiet/railway_tailscale_vpn/raw/master/readme-screenshots/approve_exit_node.png)

8. Disable key expiry for the machine you just deployed

    ![disable_key_expiry.png](https://github.com/Andrew-Bekhiet/railway_tailscale_vpn/raw/master/readme-screenshots/disable_key_expiry.png)

9. Use this command to connect to your VPN

    ```sh
    tailscale up --exit-node railway-app # or replace railway-app with your hostname
    ```

## More Info

[Tailscale](https://tailscale.com/)

[Tailscale Exit nodes](https://tailscale.com/kb/1103/exit-nodes/)

[Using Tailscale Auth Keys](https://tailscale.com/kb/1085/auth-keys/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tailscale-vpn | [Andrew-Bekhiet/railway_tailscale_vpn](https://github.com/Andrew-Bekhiet/railway_tailscale_vpn) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TAILSCALE_AUTHKEY` | - | The AUTHKEY from tailscale dashboard |
| `TAILSCALE_VERSION` | latest | tailscale version or latest for the latest version |
| `TAILSCALE_HOSTNAME` | railway-app | The hostname of the machine that will display on your tailscale dashboard |
| `TAILSCALE_ADDITIONAL_ARGS` | - | Additional args to pass to `tailscale up` |

## Configuration

- **Volume:** `/var/lib/tailscale`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/template/uIBpGp)
