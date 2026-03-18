# Deploy Cloudflared (local managed) + Prometheus on Railway

Cloudflare Tunnel Local Config Managed + Prometheus Metrics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/cIsLIC)

## About

This template will create a Cloudflare Tunnel that you can manage with a `config.yml` file in github, and creates a Prometheus metrics server that is listening to the metrics emitted from the Tunnel.

In order to use this template you must have your domain managed by Cloudflare.

Why use Cloudflare Tunnels?
One of the biggest reasons to use a Cloudflare Tunnel is so that you do not expose any of your services to the internet directly. Rather than exposing your services through the railway proxy you will only expose them through Cloudflare where you can configure rules for when traffic should be allowed through the firewall.
You can also very easily configure Cloudflare Access rules with a Tunnel which will limit access of any service you want to people who are authenticated inside of your own organization, you can for example expose Grafana through the Tunnel and require authentication through Access and now only your employees can access the grafana instance.

How do I use this template?

Because this template is using a local config instead of a managed tunnel it does require a bit more setup to use. If you want something a bit easier to deploy I would recommend the following: [Cloudflare Tunnel Template](https://railway.app/template/cf-tunnel)

The first thing you will want to do is install `cloudflared` and login. You can find out how to install and login from the [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-local-tunnel/).

After you have installed and logged into `cloudflared` you will want to create a tunnel with the following command:
`cloudflared tunnel create [TunnelName]`

Once you create a tunnel it will create a credentials file in the default `cloudflared` directory. You can find out where that is from the [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/tunnel-useful-terms/#default-cloudflared-directory)
(For windows it will be in `%USERPROFILE%\.cloudflared`)

The files name will be `.json`. Assuming this is the first time you have created a tunnel it should be the only json file in the directory.

Using this file you will want to extract the 3 values and insert them into a JSON string of the following format:
```
{
  "a": "AccountTag",
  "t": "TunnelID",
  "s": "TunnelSecret"
}
```

Then you will want to base64 encode the string value. The result of this should be put into the `TUNNEL_TOKEN` env variable.

As a helper heres a javascript command you can run to get the token:
```
btoa(JSON.stringify({
    a: "AccountTag",
    t: "TunnelID",
    s: "TunnelSecret"
}))
```

Once you enter in the tunnel token you can now deploy and the tunnel should startup for you and the git repo to manage the tunnel config and prometheus will be created for you.

The first thing you will want to do after deploying is modify your tunnel config. You can see all of the options for configuration here: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/configuration-file/

A very basic config is already provided in the initial repo, assuming you already have a service called `server` running on port 3000 and the promethues server created from this template running on port 9090.
All you would need to do in the config is modify the hostname to be your own domain that you want those services accessible at.

Once you have the config updated to your own domain you will want to update your domains DNS to actually route to the tunnel.
The DNS record you will want to create is a CNAME record pointing to `TunnelID.cfargotunnel.com`

Once the DNS records are created you should now be able to go to your domain and be served with your service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-prometheus | [garretcharp/cloudflared-promethus](https://github.com/garretcharp/cloudflared-promethus) | Database |
| cloudflared-tunnel | [garretcharp/cloudflared-tunnel](https://github.com/garretcharp/cloudflared-tunnel) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | railway-prometheus | 9090 | - |
| `PORT` | cloudflared-tunnel | 60123 | The port for the metrics server (keep at 60123) |
| `TUNNEL_TOKEN` | cloudflared-tunnel | (secret) | [Read guide for how to get this value]. Authenticates the tunnel instance |

## Configuration

- **Volume:** `/prometheus`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/cIsLIC)
