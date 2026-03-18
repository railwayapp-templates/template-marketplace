# Deploy tolgee on Railway

An open-source alternative to Crowdin, Phrase or Lokalise

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/IsMFRe)

## About

## Why to use Tolgee?

Beacause it saves a lot of time you would spend on localization tasks without it. Because it enables you to provide perfectly translated software. 

![Frame 47](https://user-images.githubusercontent.com/18496315/188637819-ac4eb02d-7859-4ca8-9807-27818a52782d.png)

### In context translating & One click screenshots

Add translations in the code, and translate them directly in the app with the Tolgee i18n tool. Clicking an element while holding the ALT/option key opens a dialog where you can simply modify your strings. No need to edit large .json/.po/.whatever file. In-context translating works great also in the production environment.

Once. That's how many times you have to click to take a screenshot from your application with highlighted phrases to translate. Just ALT + click a string and hit the camera button. Boom! Screenshot generated.

![Sep-06-2022 16-38-49](https://user-images.githubusercontent.com/18496315/188672133-064d2a26-e414-4f5e-ab43-549af8cb2145.gif)

### Translating on production

In-context translating also works in the production environment of your deployed app. Using the Tolgee Tools Chrome plugin, you can simply provide your API key and start translating. This enables anybody without developer knowledge to translate your app.

### True integrations

Tolgee is not just another localization platform offering integrations that just sync your local data with the backend. Tolgee is truly integrated into your app via SDKs.

### Machine translation

We support DeepL, Google Translate, and AWS Translate. Select which services you want to use in the settings section. The machine translation features make the whole localization process significantly faster. Translators can just use translation suggestions provided by third-party machine translation services.

### Translation memory

Tolgee automatically makes suggestions from translations you already used in the project so you can translate similar phrases in a similar way.

Translation memory suggestions also show the similarity percentage, the key, and the original text of the translated string.

### Auto translation

When enabled, Tolgee automatically translates new keys using translation memory or machine translation services. Your strings are translated immediately, right after creation. Select if you would like to use translation memory and/or which machine translation service you would like to use to automatically translate new keys.

### Activity log

See who modified, reviewed or commented on the phrases in your project. Clearly.

### Comment on translations

Something look off? Tell others what you would change. You can comment every translation on Tolgee platform.

### Translation history

See the changes to specific translations of a specific key in a specific language. Something is wrong? You know where to point the finger!

For more detailed documentation about Tolgee, visit [tolgee.io](https://tolgee.io).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `tolgee/tolgee:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | app | 8080 | - |
| `TOLGEE_SMTP_AUTH` | app | true | - |
| `TOLGEE_SMTP_FROM` | app | Tolgee <no-reply@mydomain.com> | - |
| `TOLGEE_SMTP_HOST` | app | email-smtp.regional-region.amazonaws.com | - |
| `TOLGEE_SMTP_PORT` | app | 465 | - |
| `TOLGEE_SMTP_PASSWORD` | app | (secret) | - |
| `TOLGEE_SMTP_USERNAME` | app | (secret) | - |
| `TOLGEE_SMTP_SSL_ENABLED` | app | true | - |
| `SPRING_DATASOURCE_PASSWORD` | app | (secret) | - |
| `SPRING_DATASOURCE_USERNAME` | app | (secret) | - |
| `TOLGEE_AUTHENTICATION_ENABLED` | app | true | - |
| `TOLGEE_AUTHENTICATION_JWT_SECRET` | app | (secret) | - |
| `TOLGEE_AUTHENTICATION_INITIAL_PASSWORD` | app | (secret) | - |
| `TOLGEE_AUTHENTICATION_INITIAL_USERNAME` | app | (secret) | - |
| `TOLGEE_MACHINE_TRANSLATION_GOOGLE_API_KEY` | app | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database |
| `PGPRIVATEHOST` | Postgres | - | Railway Private Domain |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PRIVATE_URL` | Postgres | - | URL to connect to Postgres database |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/IsMFRe)
