# Deploy Open Payment Host on Railway

Sell what you want without paying double commissions 

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qOF1Ut)

## About

# Open Payment Host

Sell Subscriptions, Newsletters, Digital Files without paying commissions.

## What

Open Payment Host is an easy to run self-hosted, minimalist payments host through which we can easily sell our digital items without paying double commissions while having total control over our sales and data.

## Why

Selling digital items on web as an indie requires using platforms where we have to pay double commissions(to the platform and the payment gateway) and our content is forever locked within those platforms.

## How

Open Payment Host is a minimalist yet highly performant Go web application with innovative features which helps indies self-host and sell digital items with little effort.

## Features

- Customers can buy without logging in, Increases conversion.
- Stripe support, Just add the price id for the product and rest is done automatically.
- Square support, Just add the amount for the product and rest is done automatically.
- Multi-country pricing, Price changes automatically according to the user's location resulting in better conversion.
- Light and Dark theme <sup>new</sup>
- Mailchimp support, Customers are automatically added to a mailchimp list; Useful for sending newsletters.
- WYSIWYG editor to create beautiful product pages.
- File attachment support(images) for the product posts.
- S3 support for delivering digital files via automatic pre-signed URL.
- Subscriber count for the products (With Square).
- Automatic SSL and other security features for production.

and many more.

## One Click Deployment

Click **Deploy** button to deploy Open Payment Host here on Railway.

Configuration variables can be filled in after deployment, more details are available here - https://github.com/abishekmuthian/open-payment-host/tree/main?tab=readme-ov-file#configuration .

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-payment-host | `abishekmuthian/open-payment-host:railway-prod` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `db` | ./data/db/oph.db?_journal_mode=WAL | - |
| `log` | data/log/production.log | - |
| `PORT` | 443 | - |
| `name` | Open Payment Host | - |
| `paypal` | - | Enable or Disable paypal |
| `razorpay` | - | Enable or Disable Razorpay |
| `meta_desc` | Sell Subscriptions, Newsletters, Digital Files without paying commissions. | - |
| `db_adapter` | sqlite3 | - |
| `meta_image` | /assets/images/app/oph_featured_image.png | - |
| `meta_title` | Sell what you want without paying commissions | - |
| `secret_key` | (secret) | - |
| `autocert_ssl` | no | - |
| `session_name` | open_payment_host_session | - |
| `meta_keywords` | payments,subscription,projects,products | - |
| `paypal_domain` | - | Sandbox or Production domain of paypal |
| `s3_secret_key` | (secret) | - |
| `stripe_secret` | (secret) | - |
| `assets_compiled` | no | - |
| `mailchimp_token` | (secret) | - |
| `razorpay_key_id` | - | Razorpay key id |
| `paypal_client_id` | - | Client ID of paypal |
| `paypal_api_domain` | - | API domain of paypal |
| `paypal_webhook_id` | - | Webhook ID of paypal |
| `turnstile_site_key` | 1x00000000000000000000AA | - |
| `razorpay_key_secret` | (secret) | Key secret of Razorpay |
| `square_access_token` | (secret) | - |
| `paypal_client_secret` | (secret) | Client secret of paypal |
| `turnstile_secret_key` | (secret) | - |
| `stripe_webhook_secret` | (secret) | - |
| `admin_default_password` | (secret) | - |
| `razorpay_webhook_secret` | (secret) | Razorpay webhook secret |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/default/build/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/qOF1Ut)
