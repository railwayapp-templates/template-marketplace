# Deploy Turn ChatGPT into OpenAI API - Chat2API on Railway

Stream responses, upload files & rotate multiple accounts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/chat2api)

## About

Chat2API is a simple proxy tool that converts the ChatGPT web interface into a standard, perfectly formatted OpenAI API. It offers free, login-free access to GPT-3.5 and allows you to utilize premium models (GPT-4o, O1, O3-mini) by passing an AccessToken, all while providing a native web UI mirror.

Deploying Chat2API on Railway provides a highly available, self-healing gateway for your AI requests without relying on official API billing. By linking the GitHub repository, the platform automatically builds the Docker container. Hosting it yourself means you have full control over environment variables to route traffic through proxies (avoiding 403/429 errors), rotate multiple AccessTokens for load balancing, and spin up a private web UI mirror. Continuous deployment ensures that automated backend tasks, like the mandatory 4-day Token refreshes, run seamlessly, giving your applications a stable and consistent API endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| chat2api | [bilalnawaz072/chat2api](https://github.com/bilalnawaz072/chat2api) | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5005 |
| `AUTO_SEED` | true |
| `ENABLE_GATEWAY` | true |
| `CHATGPT_BASE_URL` | https://chatgpt.com |
| `HISTORY_DISABLED` | false |

**Category:** AI/ML · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/chat2api)
