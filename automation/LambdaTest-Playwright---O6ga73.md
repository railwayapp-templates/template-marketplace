# Deploy LambdaTest Playwright on Railway

A scheduled Playwright test runner, using Lambdatest

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/O6ga73)

## About

You need to provide username and access key for a valid LambdaTest account, with a subscrtiption that allows for automated browser tests.

Optionally, set UTC_SCHEDULED_START (14:30) and the tests wil run every day at that time. If left empty, tests will run just once after successful deploy.

To write your own test, eject the github repo and clone your copy. Write test and push.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| playwright runner | [rpuls/playwright-sample](https://github.com/rpuls/playwright-sample) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LT_USERNAME` | (secret) | LambdaTest Username |
| `LT_ACCESS_KEY` | - | LambdaTest Access Key |
| `UTC_SCHEDULED_START` | - | If defined, tests will run once per day at defined time. Example: 14:30. If left Empty, tests will run immediately and only once. |

**Category:** Automation · **Languages:** HTML, JavaScript, TypeScript, C#, Python, Java, Gherkin

[View on Railway →](https://railway.com/template/O6ga73)
