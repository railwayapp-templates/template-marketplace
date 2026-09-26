# Deploy Ideafit on Railway

Self-hosted feedback boards: ideas, bugs, let users vote and get notified

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ideafit)

## About

Ideafit is a feedback board for your product. Your users suggest ideas, report bugs
  and ask questions, and vote on what they want most. You decide what to build, and
  they get an email when it's done.

  ## About Hosting Ideafit

  Click deploy, wait a minute, and open your new link. Sign in with your email, and
  you're the admin.

  Want your users to sign in too? Add your email provider's settings (the SMTP
  variables). Until then, sign-in links show up in Deploy Logs.

  ## Common Use Cases

  - Collect feature ideas from your customers
  - Let users report bugs in one place
  - Show what's planned, in progress and done

  ## Dependencies for Ideafit Hosting

  - Nothing extra. Your data is saved on a volume that comes with this template.
  - Optional: an email provider so your users can sign in and get updates.

  ### Deployment Dependencies

  - Ideafit on GitHub: https://github.com/odosui/ideafit

  ## Why Deploy Ideafit on Railway?

  
  Railway is a singular platform to deploy your infrastructure stack. Railway will
  host your infrastructure so you don't have to deal with configuration, while
  allowing you to vertically and horizontally scale it.

  By deploying Ideafit on Railway, you are one step closer to supporting a complete
  full-stack application with minimal burden. Host your servers, databases, AI agents,
  and more on Railway.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Ideafit | `hiquest/ideafit` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 80 | The application PORT (defaults to 80) |
| `APP_URL` | - | Public URL of this Ideafit instance. Used in email links and by the embed widget.  |
| `MAIL_FROM` | - | Sender of all emails, e.g. Ideafit  MAIL_FROM <feedback@yourdomain.com> |
| `SMTP_PORT` | 587 | SMTP port. Defaults to 587. |
| `ADMIN_EMAILS` | - | Comma-separated emails that become admins when they sign in. Without it, the first person to sign in becomes the admin.  |
| `SMTP_ADDRESS` | - | SMTP server for outgoing email, e.g. smtp.postmarkapp.com |
| `SMTP_PASSWORD` | (secret) | SMTP password, if your server needs one.  |
| `SMTP_USERNAME` | (secret) | SMTP username, if your server needs one.  |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/rails/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/ideafit)
