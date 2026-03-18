# Deploy Tolgee (Single Service Deployment) on Railway

An effortless open-source localization platform.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/gpEPyD)

## About

Tolgee is a developer-focused platform, so it is easy to integrate with your application. No more looking for keys in your source code, no more editing localization files, and no more manual exporting data for translators.

## Features

- **Developer-friendly** - Tolgee is designed to be easy to integrate with your application. There are number of integrations with JavaScript frameworks, such as React, Angular, Vue, and many more with the use of [Tolgee JS SDK](https://tolgee.io/js-sdk).
- **Easy to use** - Tolgee is easy to use for developers, but also for translators, so you can easily involve your translators into your localization process.
- **Open-source** - Tolgee is open-source, you can contribute to the project on our [GitHub repository](https://github.com/tolgee/tolgee-platform).
- **Free** - Our cloud version includes Business plan with 20 000 strings is free for any open-source projects. For commercial projects, you can use Tolgee for free up to 1000 strings.
- **In-context editor** - Tolgee provides in-context editor, so translators can easily translate your application without leaving your application.
- **Tolgee AI translator** - [Tolgee Translator](https://tolgee.io/platform/translation_process/tolgee_translator) can make software localization much faster and more autonomous. It provides more accurate translations than general translators as it gathers context through Tolgee's native JS SDKs, which provide in-context dialogs.

## Configuration Options

See https://tolgee.io/platform/self_hosting/configuration for full configuration options.

Set environment variables to enable the following options:

### SMTP (Password reset links or notifications)

```env
TOLGEE_SMTP_AUTH=true
TOLGEE_SMTP_FROM="Tolgee "
TOLGEE_SMTP_PORT=465
TOLGEE_SMTP_HOST="email-smtp.region-example.amazonawss.com"
TOLGEE_SMTP_SSL_ENABLED=true
TOLGEE_SMTP_USERNAME=************
TOLGEE_SMTP_PASSWORD=************
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Tolgee | `tolgee/tolgee` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | - |
| `TOLGEE_AUTHENTICATION_ENABLED` | true | - |
| `TOLGEE_AUTHENTICATION_JWT_SECRET` | (secret) | - |
| `TOLGEE_AUTHENTICATION_INITIAL_PASSWORD` | (secret) | Choose a strong password. |
| `TOLGEE_AUTHENTICATION_INITIAL_USERNAME` | (secret) | Example: admin |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/`

**Category:** Other

[View on Railway →](https://railway.com/template/gpEPyD)
