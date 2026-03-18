# Deploy (00) Double Zero - Email Service (Resend alternative) on Railway

A markdown email micro service for the people! - Free alternative to Resend

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_WfU9l)

## About

## 00 is a self hostable SES dashboard for sending and monitoring emails with AWS.

### Key features
- Run SST to configure AWS for you.
- The ability to send emails by sending a `POST` request to `/api/emails`.
- Monitor email status (with multi-recipient tracking).
- Search emails and messages (a message is created for every recipient).
- View email body.
- Log tracking for requests and queue.

SES is an incredibly affordable way to build an email heavy application.

However monitoring the emails is a bit of a nightmare, and often requires custom infrastructure. Even setting up the SES -> SNS -> SQS pipeline is a headache for developers unfamiliar with AWS. And when that is done your still left with hooking in or building custom some dashboard for viewing bounces and all the vital information you care about.

00 provides an SST configuration step to set up the SES -> SNS -> SQS pipeline,
so you can just run a command and let SST do the rest.

Then 00 provides you that dashboard for viewing the information you care about.

### Getting started

The quickest way to get started is to clone this repo and run `sst deploy` in it. Make sure to set the `EMAIL_IDENTITY` env variable first, this will be the email or domain you wish to send from.

Using SST is easy, and you can find the steps to do so [here](https://ion.sst.dev/docs/reference/cli) and learn how to configure your credentials [here](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file)

If you would like to avoid using SST you must manually configure AWS.
You need to set up a configuration set to write to an SQS queue via SNS. You can configure it however you want, but the more events you send to the queue the more 00 will be able to track (obviously).

More details: https://github.com/technomancy-dev/00/

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| (00) Double Zero - Email service | `liltechnomancer/double-zero` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SQS_URL` | - | Example: https://sqs.us-east-1.amazonaws.com/${id} |
| `PHX_HOST` | - | URL or IP of where this service is running. Ex: example.com |
| `AWS_REGION` | - | Example: us-east-1 |
| `SYSTEM_EMAIL` | - | For sending stuff like password resets. Ex: test@example.com should be able to send from SES. |
| `DATABASE_PATH` | ./00.db | Path to SQLite database Ex: 00.db |
| `SECRET_KEY_BASE` | (secret) | A long secret. at least 64 characters. Can be made with mix phx.gen.secret or however you generate safe keys. |
| `AWS_SECRET_ACCESS_KEY` | (secret) | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/_WfU9l)
