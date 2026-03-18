# Deploy SwiftOpenAIProxy on Railway

Server-side Swift OpenAI reverse proxy server

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ocPcV2)

## About

SwiftOpenAIProxy is a server-side Swift reverse proxy created for iOS and macOS GPT wrappers. SwiftOpenAIProxy secures your OpenAI API while only granting access to paying users. SwiftOpenAIProxy is written in server-side Swift so Swift developers can easily customize it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SwiftOpenAIProxy | [ronaldmannak/SwiftOpenAIProxy](https://github.com/ronaldmannak/SwiftOpenAIProxy) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `IAPKeyId` | - | IAP key Id |
| `appTeamId` | - | Apple app team Id |
| `appAppleId` | - | app Apple Id |
| `IAPIssuerId` | - | IAP Issuer Id |
| `appBundleId` | - | Your app's bundle Id |
| `IAPPrivateKey` | - | App Store Connect generated IAP key. Single line. Replace newlines with //n |
| `JWTPrivateKey` | - | For generating tokens between your client app and the proxy |
| `OpenAI-APIKey` | - | Your OpenAI API key ("sk-...") |
| `tokenExpiration` | (secret) | token expiration in hours |
| `enableRateLimiter` | 0 | Set to 1 to enable rate limiter |
| `anonPermanentBlock` | 50 | Blocked request threshold for banning all anonymous users |
| `userPermanentBlock` | 50 | Blocked request threshold for permanent user ban |
| `OpenAI-Organization` | - | Your OpenAI org identifier ("org-...") |
| `allowKeyPassthrough` | 1 | Allows end-users to use their own OpenAI API key |
| `anonHourlyRateLimit` | 200 | Combined max queries per hour for all anonymous users |
| `anonMinuteRateLimit` | 60 | Combined max queries per minute for all anonymous users |
| `userHourlyRateLimit` | 50 | Max queries per hour per registered user |
| `userMinuteRateLimit` | 15 | Max queries per minute per registered user |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Swift, Dockerfile

[View on Railway →](https://railway.com/deploy/ocPcV2)
