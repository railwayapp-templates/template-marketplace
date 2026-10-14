# Deploy Mailcheap on Railway

Self-hosted newsletters on Amazon SES with image uploads on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/mailcheap)

## About

Mailcheap is Marc Lou's open-source newsletter app on Amazon SES. Write an issue in a rich editor, send it to your list, and publish it on a public archive with a signup form. You pay SES for the emails you send, about $0.10 per 1,000, instead of a monthly fee per subscriber.

This template builds Mailcheap from source and runs it next to a private MongoDB database. The admin password and session secret are generated, so the dashboard is locked from the first boot.

After deploying, open `/login` on your Railway domain and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from the Mailcheap service's Variables tab. Create a newsletter and turn on its archive to start collecting subscribers. To send, add your Amazon SES keys and Upstash QStash keys, then set `SENDING_ENABLED` to `true`.

The template is pinned to a tested Mailcheap commit. A daily GitHub Action checks upstream, builds the new commit and runs a smoke test before it is published. You get an update notice in Railway and can apply it when you want.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Mailcheap | [aimranov27/mailcheap-railway](https://github.com/aimranov27/mailcheap-railway) | Web service |
| MongoDB | `mongo:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `APP_URL` | Mailcheap | - | Public URL used in email links and image URLs. Update it before your first send if you add your own domain. |
| `ALERT_FROM` | Mailcheap | - | Optional. From address for alert emails on your verified domain, like Mailcheap alerts@mail.example.com. Empty means alerts only go to the logs. |
| `SES_REGION` | Mailcheap | us-east-1 | AWS region of your SES account. |
| `ADMIN_EMAIL` | Mailcheap | - | Your email address. It is the dashboard login, and test emails and alerts are sent to it. |
| `MONGODB_URI` | Mailcheap | - | Connection string for the MongoDB service, with the mailcheap database. |
| `QSTASH_TOKEN` | Mailcheap | (secret) | Optional. Upstash QStash token from console.upstash.com/qstash. Needed to send campaigns and schedule them. |
| `ADMIN_PASSWORD` | Mailcheap | (secret) | Dashboard password, generated for you. At least 12 characters. Changing it signs out every session. |
| `SESSION_SECRET` | Mailcheap | (secret) | Signs logins and every link in your emails. Generated for you. Changing it after your first send breaks unsubscribe links in emails already sent. |
| `SENDING_ENABLED` | Mailcheap | false | Nothing is sent until this is true. Set it to true after the SES and QStash variables are filled in. |
| `SES_ACCESS_KEY_ID` | Mailcheap | - | Optional. Access key of the IAM user for SES. Needed to send. Setup steps: github.com/marclou/mailcheap#3-amazon-ses |
| `SES_SNS_TOPIC_ARN` | Mailcheap | - | Optional. ARN of the SNS topic for SES events. Subscribe https://your-domain/api/webhooks/ses to it. |
| `SES_CONFIGURATION_SET` | Mailcheap | - | Optional. SES configuration set that publishes bounces and complaints to SNS. Needed to send. |
| `SES_SECRET_ACCESS_KEY` | Mailcheap | (secret) | Optional. Secret key of the IAM user for SES. Needed to send. |
| `QSTASH_NEXT_SIGNING_KEY` | Mailcheap | - | Optional. QStash next signing key. |
| `QSTASH_CURRENT_SIGNING_KEY` | Mailcheap | - | Optional. QStash current signing key. Mailcheap checks it on every background job. |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`

**Category:** Other · **Languages:** Shell, JavaScript, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/mailcheap)
