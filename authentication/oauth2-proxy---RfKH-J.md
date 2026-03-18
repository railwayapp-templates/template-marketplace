# Deploy oauth2-proxy on Railway

Reverse proxy that provides auth with Google and more identity providers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/RfKH-J)

## About

# OAuth2 Proxy Template for Railway

## Overview
This template deploys OAuth2 Proxy, a reverse proxy and static file server that provides authentication using Providers (Google, GitHub, and others) to validate accounts by email, domain or group. It's particularly useful for adding authentication to legacy applications or implementing single sign-on (SSO) across multiple services.

## Features
- Acts as a reverse proxy for your internal services
- Provides authentication via Google OAuth2
- Restricts access to specific email domains
- Easy to configure and deploy

## Deployment Instructions
1. Click the "Deploy on Railway" button
2. Configure the required environment variables (see below)
3. Deploy the service
4. Set up your Google OAuth2 credentials in the Google Cloud Console
5. Configure your internal service to work with the proxy

## Environment Variables
Configure the following environment variables:

- `OAUTH2_PROXY_PROVIDER`: Set to "google" for Google OAuth
- `OAUTH2_PROXY_EMAIL_DOMAINS`: Set to your company's email domain (e.g., "yourcompany.com")
- `OAUTH2_PROXY_COOKIE_SECRET`: A secret string to encrypt cookies (generate a random string)
- `OAUTH2_PROXY_CLIENT_ID`: Your Provider OAuth Client ID
- `OAUTH2_PROXY_CLIENT_SECRET`: Your Provider OAuth Client Secret
- `OAUTH2_PROXY_REDIRECT_URL`: The callback URL for OAuth (e.g., "https://your-proxy-domain/oauth2/callback")
- `OAUTH2_PROXY_UPSTREAMS`: The internal service URL to proxy (e.g., "http://internal-service:8080")

## Getting Started
1. After deployment, access your OAuth2 Proxy URL provided by Railway
2. Attempt to access your service; you'll be redirected to Google for authentication
3. Sign in with your company Google account
4. Upon successful authentication, you'll be proxied to your internal service

## Security Considerations
- Ensure your Google OAuth credentials are kept secret
- Regularly rotate your `OAUTH2_PROXY_COOKIE_SECRET`
- Limit the `OAUTH2_PROXY_EMAIL_DOMAINS` to your company's domain

## Customization
- Adjust the `OAUTH2_PROXY_HTTP_ADDRESS` if you need to change the listening port
- Add additional OAuth2 Proxy flags as environment variables if needed

## Support
For issues with the template itself, please each out to me at youssef@reflectfy.com. For OAuth2 Proxy specific questions, refer to the [official documentation](https://oauth2-proxy.github.io/oauth2-proxy/).

Enjoy secure access to your internal services with OAuth2 Proxy!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| oauth2-proxy | `quay.io/oauth2-proxy/oauth2-proxy:v7.7.0` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `OAUTH2_PROXY_PROVIDER` | - | Set to "google" for Google OAuth |
| `OAUTH2_PROXY_CLIENT_ID` | - | Your Provider OAuth Client ID |
| `OAUTH2_PROXY_UPSTREAMS` | - | The internal service URL to proxy (e.g., "http://internal-service:8080"), note that if you used the RAILWAY_PRIVATE_DOMAIN ref you will need to add the port and the url scheme (e.g., "http://${{backend.RAILWAY_PRIVATE_DOMAIN}}:8080") |
| `OAUTH2_PROXY_HTTP_ADDRESS` | :4180 | - |
| `OAUTH2_PROXY_REDIRECT_URL` | - | The callback URL for OAuth (e.g., "https://your-proxy-domain/oauth2/callback") |
| `OAUTH2_PROXY_CLIENT_SECRET` | (secret) | Your Provider OAuth Client Secret |
| `OAUTH2_PROXY_COOKIE_SECRET` | (secret) | A secret string to encrypt cookies (generate a random string) |
| `OAUTH2_PROXY_EMAIL_DOMAINS` | - | The Email Domain to be whitelisted |

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/RfKH-J)
