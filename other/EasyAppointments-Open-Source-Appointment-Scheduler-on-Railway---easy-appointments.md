# Deploy Easy!Appointments | Open Source Appointment Scheduler on Railway on Railway

Self host Easy!Appointments. Booking, calendar sync, email notifications.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easy-appointments)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easy-appointments?referralCode=QXdhdr)

Easy!Appointments is a free, open-source web appointment scheduler that lets customers book time slots with service providers — perfect for clinics, salons, consultants, tutors, or any business that runs on bookings. Self-host Easy!Appointments and you keep full control of customer data without paying per-user SaaS fees forever.

This Railway template runs the official `alextselegidis/easyappointments:1.5.2` Docker image alongside a managed MySQL 8 database. The startup script handles the Apache MPM gotcha that breaks `php:*-apache` images on Railway, templates your env vars into Easy!Appointments' `config.php` and `email.php` at boot, and wires HTTPS through Railway's edge proxy so your generated URLs are correct from the first request.

Easy!Appointments is a PHP + CodeIgniter application backed by MySQL. It exposes a public booking page where your customers self-serve, plus an admin backend where you manage providers, services, working plans, customers, and appointments.

Key features:

- Customer-facing booking page (no account required to book)
- Multi-provider, multi-service scheduling with per-provider working plans
- Two-way Google Calendar sync (OAuth 2.0)
- Email notifications via SMTP or PHP `mail()`
- REST API and webhook support for integrations
- Multi-language support out of the box

The app talks to MySQL over Railway's private network. The Easy!Appointments container is the only service with a public domain.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EasyAppointments | `alextselegidis/easyappointments:1.5.2` | Web service |
| MySQL | `mysql:9.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | EasyAppointments | 80 | Apache listen port |
| `DB_HOST` | EasyAppointments | - | MySQL private hostname |
| `DB_NAME` | EasyAppointments | - | MySQL database name |
| `BASE_URL` | EasyAppointments | - | Public app URL |
| `LANGUAGE` | EasyAppointments | english | Default UI language |
| `DEBUG_MODE` | EasyAppointments | FALSE | Disable debug in prod |
| `DB_PASSWORD` | EasyAppointments | (secret) | MySQL password |
| `DB_USERNAME` | EasyAppointments | (secret) | MySQL username |
| `STARTUP_B64` | EasyAppointments | IyEvYmluL2Jhc2gKIyBFYXN5IUFwcG9pbnRtZW50cyBzdGFydHVwIHNjcmlwdCBmb3IgUmFpbHdheS4KIyBSZXBsaWNhdGVzIHRoZSB1cHN0cmVhbSBkb2NrZXItZW50cnlwb2ludC5zaCB0ZW1wbGF0aW5nLCBmaXhlcyB0aGUgQXBhY2hlIE1QTQojIGNvbmZsaWN0LCBwcmVwYXJlcyB0aGUgcGVyc2lzdGVudCBzdG9yYWdlIHRyZWUgb24gYSBmcmVzaCBSYWlsd2F5IHZvbHVtZSwKIyB0aGVuIGV4ZWNzIGFwYWNoZTItZm9yZWdyb3VuZC4KCnNldCAtZQoKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KIyAxLiBSZW5kZXIgL3Zhci93d3cvaHRtbC9jb25maWcucGhwIGZyb20gZW52aXJvbm1lbnQgdmFyaWFibGVzCiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCmNhdCA+IC92YXIvd3d3L2h0bWwvY29uZmlnLnBocCA8PEVPRgo8P3BocApjbGFzcyBDb25maWcgewogICAgY29uc3QgQkFTRV9VUkwgICAgICAgICAgICAgID0gJyR7QkFTRV9VUkx9JzsKICAgIGNvbnN0IExBTkdVQUdFICAgICAgICAgICAgICA9ICcke0xBTkdVQUdFfSc7CiAgICBjb25zdCBERUJVR19NT0RFICAgICAgICAgICAgPSAke0RFQlVHX01PREV9OwogICAgY29uc3QgREJfSE9TVCAgICAgICAgICAgICAgID0gJyR7REJfSE9TVH0nOwogICAgY29uc3QgREJfTkFNRSAgICAgICAgICAgICAgID0gJyR7REJfTkFNRX0nOwogICAgY29uc3QgREJfVVNFUk5BTUUgICAgICAgICAgID0gJyR7REJfVVNFUk5BTUV9JzsKICAgIGNvbnN0IERCX1BBU1NXT1JEICAgICAgICAgICA9ICcke0RCX1BBU1NXT1JEfSc7CiAgICBjb25zdCBHT09HTEVfU1lOQ19GRUFUVVJFICAgPSAke0dPT0dMRV9TWU5DX0ZFQVRVUkV9OwogICAgY29uc3QgR09PR0xFX0NMSUVOVF9JRCAgICAgID0gJyR7R09PR0xFX0NMSUVOVF9JRH0nOwogICAgY29uc3QgR09PR0xFX0NMSUVOVF9TRUNSRVQgID0gJyR7R09PR0xFX0NMSUVOVF9TRUNSRVR9JzsKfQpFT0YKCiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCiMgMi4gUmVuZGVyIC92YXIvd3d3L2h0bWwvYXBwbGljYXRpb24vY29uZmlnL2VtYWlsLnBocAojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpjYXQgPiAvdmFyL3d3dy9odG1sL2FwcGxpY2F0aW9uL2NvbmZpZy9lbWFpbC5waHAgPDxFT0YKPD9waHAgZGVmaW5lZCgnQkFTRVBBVEgnKSBvciBleGl0KCdObyBkaXJlY3Qgc2NyaXB0IGFjY2VzcyBhbGxvd2VkJyk7CgpcJGNvbmZpZ1sndXNlcmFnZW50J10gPSAnRWFzeSFBcHBvaW50bWVudHMnOwpcJGNvbmZpZ1sncHJvdG9jb2wnXSA9ICcke01BSUxfUFJPVE9DT0x9JzsKXCRjb25maWdbJ21haWx0eXBlJ10gPSAnaHRtbCc7ClwkY29uZmlnWydzbXRwX2RlYnVnJ10gPSAnJHtNQUlMX1NNVFBfREVCVUd9JzsKXCRjb25maWdbJ3NtdHBfYXV0aCddID0gJHtNQUlMX1NNVFBfQVVUSH07ClwkY29uZmlnWydzbXRwX2hvc3QnXSA9ICcke01BSUxfU01UUF9IT1NUfSc7ClwkY29uZmlnWydzbXRwX3VzZXInXSA9ICcke01BSUxfU01UUF9VU0VSfSc7ClwkY29uZmlnWydzbXRwX3Bhc3MnXSA9ICcke01BSUxfU01UUF9QQVNTfSc7ClwkY29uZmlnWydzbXRwX2NyeXB0byddID0gJyR7TUFJTF9TTVRQX0NSWVBUT30nOwpcJGNvbmZpZ1snc210cF9wb3J0J10gPSAke01BSUxfU01UUF9QT1JUfTsKXCRjb25maWdbJ2Zyb21fbmFtZSddID0gJyR7TUFJTF9GUk9NX05BTUV9JzsKXCRjb25maWdbJ2Zyb21fYWRkcmVzcyddID0gJyR7TUFJTF9GUk9NX0FERFJFU1N9JzsKXCRjb25maWdbJ3JlcGx5X3RvJ10gPSAnJHtNQUlMX1JFUExZX1RPX0FERFJFU1N9JzsKXCRjb25maWdbJ2NybGYnXSA9ICJcclxuIjsKXCRjb25maWdbJ25ld2xpbmUnXSA9ICJcclxuIjsKRU9GCgojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQojIDMuIEFwcGVuZCBiYXNlX3VybCBvdmVycmlkZSB0byBhcHBsaWNhdGlvbi9jb25maWcvY29uZmlnLnBocCAoaWRlbXBvdGVudCkKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KRklMRT0vdmFyL3d3dy9odG1sL2FwcGxpY2F0aW9uL2NvbmZpZy9jb25maWcucGhwClNUUklORz0iXCRjb25maWdbJ2Jhc2VfdXJsJ10gPSAnJHtCQVNFX1VSTH0nOyIKaWYgWyAiJCh0YWlsIC1uIDEgIiRGSUxFIikiICE9ICIkU1RSSU5HIiBdOyB0aGVuCiAgICBlY2hvICIkU1RSSU5HIiA+PiAiJEZJTEUiCmZpCgojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQojIDQuIEVuc3VyZSBzdG9yYWdlIHRyZWUgZXhpc3RzIChSYWlsd2F5IHZvbHVtZXMgc3RhcnQgZW1wdHkgd2l0aCBsb3N0K2ZvdW5kKQojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpta2RpciAtcCBcCiAgICAvdmFyL3d3dy9odG1sL3N0b3JhZ2UvYmFja3VwcyBcCiAgICAvdmFyL3d3dy9odG1sL3N0b3JhZ2UvY2FjaGUgXAogICAgL3Zhci93d3cvaHRtbC9zdG9yYWdlL2xvZ3MgXAogICAgL3Zhci93d3cvaHRtbC9zdG9yYWdlL3Nlc3Npb25zIFwKICAgIC92YXIvd3d3L2h0bWwvc3RvcmFnZS91cGxvYWRzCmNob3duIC1SIHd3dy1kYXRhOnd3dy1kYXRhIC92YXIvd3d3L2h0bWwvc3RvcmFnZQoKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KIyA1LiBBcGFjaGUgTVBNIGZpeCDigJQgUmFpbHdheSByZS1lbmFibGVzIG1wbV9ldmVudCBhdCBydW50aW1lLCBicmVha2luZyB0aGUKIyAgICBpbWFnZSdzIG1wbV9wcmVmb3JrLiBEaXNhYmxlIG1wbV9ldmVudCBiZWZvcmUgbGF1bmNoaW5nIEFwYWNoZS4KIyAgICAoU2VlIGxlYXJuaW5ncy9sZWFybmluZ3MubWQg4oaSICJwaHA6Ki1hcGFjaGUgaW1hZ2VzIOKAlCBNb3JlIHRoYW4gb25lIE1QTSBsb2FkZWQiLikKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KYTJkaXNtb2QgbXBtX2V2ZW50IDI+L2Rldi9udWxsIHx8IHRydWUKYTJlbm1vZCBtcG1fcHJlZm9yayAyPi9kZXYvbnVsbCB8fCB0cnVlCgojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQojIDYuIFN0YXJ0IEFwYWNoZSBpbiB0aGUgZm9yZWdyb3VuZCAoUElEIDEgdmlhIGV4ZWMgZm9yIGNsZWFuIFNJR1RFUk0pCiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCmV4ZWMgYXBhY2hlMi1mb3JlZ3JvdW5kCg== | Base64 startup.sh. |
| `MAIL_PROTOCOL` | EasyAppointments | mail | mail or smtp |
| `GOOGLE_API_KEY` | EasyAppointments | (secret) | Google API key |
| `MAIL_FROM_NAME` | EasyAppointments | - | Sender display name |
| `MAIL_SMTP_AUTH` | EasyAppointments | 0 | SMTP auth required |
| `MAIL_SMTP_HOST` | EasyAppointments | - | SMTP host |
| `MAIL_SMTP_PASS` | EasyAppointments | - | SMTP password |
| `MAIL_SMTP_PORT` | EasyAppointments | 587 | SMTP port |
| `MAIL_SMTP_USER` | EasyAppointments | (secret) | SMTP username |
| `MAIL_SMTP_DEBUG` | EasyAppointments | 0 | SMTP debug level |
| `GOOGLE_CLIENT_ID` | EasyAppointments | - | Google OAuth client ID |
| `MAIL_SMTP_CRYPTO` | EasyAppointments | tls | tls or ssl |
| `MAIL_FROM_ADDRESS` | EasyAppointments | - | Sender email |
| `GOOGLE_PRODUCT_NAME` | EasyAppointments | - | Google product name |
| `GOOGLE_SYNC_FEATURE` | EasyAppointments | FALSE | Toggle Google Calendar sync |
| `GOOGLE_CLIENT_SECRET` | EasyAppointments | (secret) | Google OAuth client secret |
| `MAIL_REPLY_TO_ADDRESS` | EasyAppointments | - | Reply-to address |
| `MYSQLHOST` | MySQL | - | MySQL internal hostname |
| `MYSQLPORT` | MySQL | 3306 | MySQL service port |
| `MYSQLUSER` | MySQL | root | Default MySQL root username |
| `MYSQL_URL` | MySQL | - | Internal MySQL connection string |
| `MYSQLDATABASE` | MySQL | - | Database name reference variable |
| `MYSQLPASSWORD` | MySQL | (secret) | MySQL password reference |
| `MYSQL_DATABASE` | MySQL | railway | Default database name created |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public MySQL connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root user password credential |

## Configuration

- **Start command:** `/bin/sh -c 'echo "$STARTUP_B64" | base64 -d > /tmp/start.sh && bash /tmp/start.sh'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/easy-appointments)
