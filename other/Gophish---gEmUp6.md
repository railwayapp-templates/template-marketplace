# Deploy Gophish on Railway

An open-source phishing simulation toolkit for pentesters & security teams.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gEmUp6)

## About

### Overview
This template deploys [Gophish](https://getgophish.com), an open-source phishing simulation toolkit for pentesters and security teams. You can create email templates, define user groups, launch campaigns, and track responses, to test your organization's exposure to phishing attacks.

### Configuration
The template uses the Gophish Docker image with some environment variables pre-configured to work on Railway; if you want to understand (or change) environment variables, see the source [here](https://github.com/gophish/gophish/blob/master/docker/run.sh) and the docs [here](https://docs.getgophish.com/user-guide/installation).
  
Once deployed, look for the `admin` credentials under the `View Logs` section of the `Deployments` tab - you'll find an entry similar to '*Please login with the username admin and the password 0f564d8fxd9161d25*'.

### References
* [Phishing Attack Simulation with Gophish](https://alphasec.io/phishing-attack-simulation-with-gophish)
* [Gophish GitHub repo](https://github.com/gophish/gophish)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gophish/gophish | `gophish/gophish` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3333 | Admin server port |
| `ADMIN_USE_TLS` | false | Admin server TLS configuration |
| `ADMIN_TRUSTED_ORIGINS` | - | List of trusted origins |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/gEmUp6)
