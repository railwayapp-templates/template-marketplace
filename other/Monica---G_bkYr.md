# Deploy Monica on Railway

Personal CRM. Document your life.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/G_bkYr)

## About

<p align="center">
    <a href="https://monicahq.com">
        <img style="width: 200px;" src="https://gridonyx.com/assets/img/monica-logo.svg" alt="monica logo">
    </a>
</p>

<h3 align="center">Document your life.</h3>
Monica is an open-source personal relationship management system, that lets you document your life and remember everything about your friends, family, and business relationships.


### Introduction
Monica is an open-source web application that enables you to document your life, organize, and log your interactions with your family and friends. We call it a PRM, or Personal Relationship Management. Imagine a CRM—a commonly used tool by sales teams in the corporate world—for your friends and family.

#### Features
  - Add and manage contacts
  - Define relationships between contacts
  - Reminders
  - Automatic reminders for birthdays
  - Ability to add notes to a contact
  - Ability to record how you met someone
  - Management of activities with a contact
  - Management of tasks
  - Management of addresses and all the different ways to contact someone
  - Management of contact field types
  - Management of a contact’s pets
  - Top of the art diary to keep track of what’s happening in your life
  - Ability to record how your day went
  - Upload documents and photos
  - Ability to define custom genders
  - Ability to define custom activity types
  - Ability to favorite contacts
  - Multiple vaults and users
  - Labels to organize contacts
  - Ability to define what section should appear on the contact sheet
  - Multiple currencies
  - Translated in 27 languages


#### Who is it for?
This project is for people who want to document their lives and those who have difficulty remembering details about the lives of people they care about.

We’ve also had a lot of positive reviews from people with Asperger syndrome, Alzheimer’s disease, and introverts who use our app every day.

#### What Monica isn't
  - Monica is not a social network and it never will be. It’s not meant to be social. It’s designed to be the opposite: it’s for your eyes only.
  - Monica is not a smart assistant. It won’t guess what you want to do. It’s actually pretty dumb: it will only send you emails for the things you asked to be reminded of.
  - Monica does not have built-in AI with integrations like ChatGPT.
  - Monica is not a tool that will scan your data and do nasty things with it. It’s your data, your server, do whatever you want with it. You’re in control of your data.

<a href="https://docs.monicahq.com/">Monica Documentation</a>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql` | Database |
| Monica | `monica:apache` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway TCP Proxy Domain. |
| `MYSQLPORT` | MySQL | - | MySQL TCP Proxy port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQLPRIVATEPORT` | MySQL | 3306 | - |
| `MYSQL_PRIVATE_URL` | MySQL | - | URL to connect to MySQL DB, used for Data panel. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | Monica | 80 | - |
| `APP_ENV` | Monica | production | - |
| `APP_DEBUG` | Monica | false | Set to 'true' to show debug information on errors. For production, set to 'false' |
| `MAIL_HOST` | Monica | - | Your mail provider's hostname |
| `MAIL_PORT` | Monica | - | Your mail provider's SMTP port |
| `DAV_ENABLED` | Monica | true | Enable DAV support |
| `DB_PASSWORD` | Monica | (secret) | - |
| `DB_USERNAME` | Monica | (secret) | - |
| `LOG_CHANNEL` | Monica | daily | Frequency of creation of new log files. |
| `MAIL_MAILER` | Monica | smtp | - |
| `MFA_ENABLED` | Monica | true | Allows two-factor authentication feature on your instance |
| `CACHE_DRIVER` | Monica | database | - |
| `CHECK_VERSION` | Monica | true | When set to 'true', will check Monica version daily. If a new version is available, it will display in the app UI. |
| `DB_CONNECTION` | Monica | mysql | - |
| `MAIL_PASSWORD` | Monica | (secret) | Your email account password |
| `MAIL_USERNAME` | Monica | (secret) | Email account username |
| `ENABLE_WEATHER` | Monica | false | Set to 'true' to show weather on contact profile pages. Weather can only be fetched using latitude/longitude, so ENABLE_GEOLOCATION=true is required if you want to use this feature. Set API key in WEATHERAPI_KEY variable. |
| `MAIL_FROM_NAME` | Monica | Monica | Outgoing emails will be sent with this value as the sender's name |
| `SESSION_DRIVER` | Monica | database | - |
| `WEATHERAPI_KEY` | Monica | (secret) | Darksky API key from www.weatherapi.com; needs ENABLE_WEATHER=true |
| `MAIL_ENCRYPTION` | Monica | - | Encryption level from your email provider |
| `QUEUE_CONNECTION` | Monica | sync | - |
| `SESSION_LIFETIME` | Monica | 120 | - |
| `MAIL_FROM_ADDRESS` | Monica | - | Outgoing emails will be sent from this address |
| `APP_DISABLE_SIGNUP` | Monica | true | Set to 'false' to allow users to register on your instance |
| `ENABLE_GEOLOCATION` | Monica | false | Set to 'true' to enable geolocation services, which translates addresses to GPS coordinates. *Must be set to 'true' if you want to enable Weather functionality. |
| `APP_SIGNUP_DOUBLE_OPTIN` | Monica | false | Set to 'true' to enable user email verification |
| `DEFAULT_MAX_UPLOAD_SIZE` | Monica | 10240 | Maximum allowed size for uploaded files in kilobytes |
| `DEFAULT_MAX_STORAGE_SIZE` | Monica | 4096 | Maximum allowed storage size per account, in megabytes |
| `RATE_LIMIT_PER_MINUTE_API` | Monica | 60 | - |
| `APP_EMAIL_NEW_USERS_NOTIFICATION` | Monica | null | Configure an email address to send new user registration notifications to |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "sleep 3 && /usr/local/bin/entrypoint.sh apache2-foreground"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage`

**Category:** Other

[View on Railway →](https://railway.com/deploy/G_bkYr)
