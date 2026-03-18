# Deploy Cloudflare Tunnel on Railway

Sets up Cloudflare Tunnel within your Railway project

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cf-tunnel)

## About

# Cloudflare Tunnel

This template deploys a Cloudflare Tunnel within your Railway project.

### What is a Cloudflare Tunnel?

> Cloudflare Tunnel provides you with a secure way to connect your resources to Cloudflare without a publicly routable IP address.

*Source: [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)*

### ​Prerequisites Before you start -

### In Railway -

- Ensure that there are no domains on the desired service, whether custom or Railway-generated.

- Have the service you want to route traffic to listening on IPv6 -

    Since Railway's internal network is IPv6 only the [service](https://docs.railway.app/overview/the-basics#services) will need to listen on `::`

    **Start commands for some popular frameworks -**

    Gunicorn - `gunicorn main:app -b [::]:${PORT:-3000}`

    Uvicorn - `uvicorn main:app --host :: --port ${PORT:-3000}`

    Hypercorn - `hypercorn main:app --bind [::]:${PORT:-3000}`

    Next - `next start -H :: --port ${PORT:-3000}`

    Express / Nest - `app.listen(process.env.PORT || 3000, "::");`

### In Cloudflare -

- Have your desired domain setup with Cloudflare's nameservers, they have a general guide for that [here](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).

- Have **SSL/TLS** mode set to **Full**.

    **SSL/TLS → Overview → Full**

## 1. Creating the tunnel

- Goto your Cloudflare accounts home page → Zero Trust → Networks → Tunnels.

- Click **Add a tunnel**.

- Leave the **Cloudflared** option selected.

- Click **Next**.

- **Name your tunnel**
    
    We recommend naming it in accordance with the Railway project that contains the service(s) you want to route traffic to.

- Click **Save tunnel**.

## 2. Getting the tunnel token

- Choose the **Docker** environment.

- Click the copy icon.

- Paste the command into a note for later use.

    Strip out `docker run cloudflare/cloudflared:latest tunnel --no-autoupdate run --token ` to leave only the token.

**Leave this page open**

## 3. Deploying the tunnel

- Open the [project](https://docs.railway.app/overview/the-basics#project--project-canvas) that contains the [service](https://docs.railway.app/overview/the-basics#services) you want to route traffic to.

- Click **Create** → Template → Search for **Cloudflare Tunnel**.

- When prompted, enter your tunnel token.

    Make sure there is no leading or trailing whitespace.

- Click **Deploy Template**

## 4. Setting up the tunnel

- Go back to the **Configure** Cloudflare page.

You should now see a connector appear!

- Click **Next**.

- Choose a subdomain or leave it blank if you want to use the root domain.

- Choose a domain.

- Choose a path, or leave it blank.

- For type choose **HTTP**.

- For the URl use your services' private domain and the port your app listens on.

    E.g. `api.railway.internal:8080`
 
- Click **Save tunnel**.

## 5. Add another domain (Optional)

This is useful if you want to have a www subdomain or simply point different domains to the same Railway service.

This can even be used to point a subdomain or different domain to another service in the same Railway project.

- Click on the tunnel name → Click **Edit** on the slide-out menu.

- Click **Public Hostname** → Click **Add a public hostname**.

- Follow the same steps as outlined in step **#4**.

## Conclusion

We are done, you can now open the public domain and you will be routed to your Railway service!

**Additional Resources**

- [How it works](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)
- [Set up a tunnel through the dashboard](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
- [Tunnel logs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/monitor-tunnels/logs/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cloudflared | `cloudflare/cloudflared` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TUNNEL_TOKEN` | (secret) | Your Cloudflare Tunnel Token! |

## Configuration

- **Start command:** `cloudflared tunnel --no-autoupdate run`

**Category:** Other

[View on Railway →](https://railway.com/deploy/cf-tunnel)
