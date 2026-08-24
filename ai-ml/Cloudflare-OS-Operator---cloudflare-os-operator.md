# Deploy Cloudflare OS Operator on Railway

Deploy and upgrade Cloudflare OS from a secure Railway operator console.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudflare-os-operator)

## About

Cloudflare OS Operator is a community deployment console for a pinned, self-hosted Cloudflare OS release. Railway hosts the authenticated operator; the Cloudflare OS runtime stays in your Cloudflare account, where its Workers, Durable Objects, Dynamic Workers, KV, R2, Browser Rendering, AI Gateway, and Gatekeepers are supported.

This distinction matters: Cloudflare currently labels production deployment on a standalone `workerd` server as “COMING SOON” and says `pnpm run-local` is not a production server. This template does not rebrand that development command as production hosting.

This project is not affiliated with or endorsed by Cloudflare or Railway. Cloudflare OS is Apache-2.0 licensed; review its license and early-access warning before offering it to users.

The template deploys one small Railway service with an authenticated web console. It generates the official starter configuration from Railway variables and offers two explicit operations:

- **Validate release** runs the official tests, builds, and Wrangler dry runs without deploying Workers.
- **Deploy to Cloudflare** creates or updates the pinned Cloudflare OS Workers and automatically provisioned storage bindings in your account.

No Cloudflare deployment runs automatically. Operations are serialized, subprocess output is bounded, known secrets are redacted, browser actions are same-origin only, and the operator is protected with generated HTTP Basic credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cloudflare OS Operator | [IoVagabondo/cloudflare-os](https://github.com/IoVagabondo/cloudflare-os) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OPERATOR_PASSWORD` | (secret) | Generated password for the Railway operator console. Username is admin. |
| `CLOUDFLARE_API_TOKEN` | (secret) | User API token scoped to the target Cloudflare account; leave no default. |
| `CLOUDFLARE_OS_PREFIX` | - | Permanent lowercase prefix for all deployed Cloudflare OS Worker names. |
| `CLOUDFLARE_ACCOUNT_ID` | - | 32-character ID of the Cloudflare account that will host Cloudflare OS. |
| `CLOUDFLARE_ACCESS_ISSUER` | - | Cloudflare Access team issuer, for example https://team.cloudflareaccess.com. |
| `CLOUDFLARE_OS_PUBLIC_URL` | - | Final HTTPS origin protected by the Cloudflare Access application. |
| `CLOUDFLARE_OS_ADMIN_EMAIL` | - | Comma-separated Access-verified email addresses allowed to administer Cloudflare OS. |
| `CLOUDFLARE_ACCESS_AUDIENCE` | - | Audience tag from the exact Cloudflare Access self-hosted application. |
| `CLOUDFLARE_AI_GATEWAY_NAME` | default | Optional in-account AI Gateway name. |
| `CLOUDFLARE_AI_GATEWAY_PROVIDERS` | cloudflare | Comma-separated providers; cloudflare by default, with anthropic/openai supported when configured on the gateway. |
| `CLOUDFLARE_OS_ORGANIZATION_NAME` | My Organization | Display name returned by the example organization Gatekeeper. |
| `CLOUDFLARE_OS_ORGANIZATION_GUIDANCE` | Use your organization policies and context when assisting users. | Guidance returned by the example organization Gatekeeper. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, JavaScript, CSS, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/cloudflare-os-operator)
