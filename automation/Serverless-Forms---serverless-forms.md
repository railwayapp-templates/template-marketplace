# Deploy Serverless Forms on Railway

NodeJS app to send HTML form submissions by email

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/serverless-forms)

## About

It is a simple nodejs server which forwards all POST submission by email, inspired by [formspree](http://formspree.io/).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| serverless-forms | [lexoyo/serverless-forms](https://github.com/lexoyo/serverless-forms) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TO` | - | Email address to send the form to (your email), or a list of email addresses separated by commas, or an array of token / email addresses |
| `FROM` | - | Email address to use as sender address |
| `HOOK` | - | URL to send the form data to as a POST request, or a json object with tokens as keys and { "url": "string", "headers": { "name": "value" } } as values. The form can have an optional hidden field with the name token and the value of the token. If the token is found in the object, the form data will be sent to the corresponding URL. |
| `MESSAGE` | Thank you for your submission | Message to displayed after the form submission. May contain HTML. |
| `REDIRECT` | false | If set to true, the server will redirect to the URL provided in the thanks hidden field of the form |
| `DISCLAIMER` | A form has been submited on your website. This is an automated email. Please do not reply to this email | Disclaimer to add at the end of the email. May contain HTML. |
| `EMAIL_HOST` | - | SMTP config: hostname or IP address to connect to (defaults to ‘localhost’) |
| `EMAIL_PASS` | - | SMTP config: your email password |
| `EMAIL_PORT` | - | SMTP config: port to connect to (defaults to 587 if "is secure" is false or 465 if true) |
| `EMAIL_USER` | (secret) | SMTP config: your email logi |
| `SITE_FIELD` | - | Name of the field in the form which contains the site name (used in the email subject) |
| `HONEY_FIELD` | - | Name of the field in the form which is a honeypot (if filled, the form will be considered as spam) |
| `TOKEN_FIELD` | (secret) | Name of the field in the form which contains the token |
| `THANKS_FIELD` | - | Name of the field in the form which contains the URL to redirect to after the form submission |
| `REDIRECT_DOMAINS` | [] | Comma separated list of domains for which the server will redirect to the URL provided in the thanks hidden field of the form |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation · **Languages:** JavaScript, HTML, Dockerfile

[View on Railway →](https://railway.com/template/serverless-forms)
