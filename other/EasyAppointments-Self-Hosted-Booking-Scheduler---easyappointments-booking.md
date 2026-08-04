# Deploy Easy!Appointments — Self-Hosted Booking Scheduler on Railway

Self-host a booking page — appointments for clinics, salons & more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/easyappointments-booking)

## About

Easy!Appointments is a free, open-source appointment scheduling platform — a self-hosted alternative to Calendly and Acuity that gives you a public booking page where customers self-serve, plus an admin backend to manage providers, services, working hours, and appointments. It's built for any business that runs on bookings: clinics, salons, tutors, consultants, and therapists. This template runs it with MySQL and the Railway-specific Apache fix already handled, so you go from deploy to a working booking site in minutes.

---

Easy!Appointments is straightforward, but two Railway-specific things determine a smooth start — both handled here.

**The Apache configuration gotcha is already solved.** Easy!Appointments runs on a PHP/Apache image, and those images have an Apache MPM issue that breaks them on Railway out of the box. This template's startup script works around it, templates your environment variables into `config.php` and `email.php` at boot, and wires HTTPS through Railway's edge so URLs are correct from the first request — the setup work a raw Docker deploy makes you do by hand.

**Setup happens in a web wizard, not environment variables.** The key thing to expect: after deploying, open your Railway URL and Easy!Appointments detects the empty database and redirects you to a one-page installation wizard, where you enter your admin account and company details. There's no env-var path for creating the admin — the wizard is the official flow. So "deploy, open the URL, complete the wizard" is the whole first-run process.

**`BASE_URL` must match your Railway domain.** Easy!Appointments builds booking links and email URLs from `BASE_URL`, so it must be your Railway public domain, or customer-facing links break. This template sets it for you.

**It uses MySQL, not PostgreSQL.** Unlike many self-hosted apps, Easy!Appointments runs on MySQL 8, which this template provisions and wires automatically — no database setup on your part.

**Configure email for notifications.** Appointment confirmations and reminders rely on email, so set the `MAIL_*` variables with your SMTP provider. Bookings work without it, but customers won't get confirmation emails until SMTP is configured.

The app itself is light on resources; RAM usage rises mainly with concurrent customers and Google Calendar sync activity, so most deployments run comfortably on modest settings.

Typical cost: **~$5–10/month** on Railway for the app and MySQL. Easy!Appointments is GPL-licensed and free — versus Calendly and Acuity, which bill per user or seat every month.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| EasyAppointments | `alextselegidis/easyappointments:1.5.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `PORT` | EasyAppointments | 80 | - |
| `LANGUAGE` | EasyAppointments | english | - |
| `DEBUG_MODE` | EasyAppointments | FALSE | - |
| `DB_PASSWORD` | EasyAppointments | (secret) | - |
| `DB_USERNAME` | EasyAppointments | (secret) | - |
| `STARTUP_B64` | EasyAppointments | IyEvYmluL2Jhc2gKIyBFYXN5IUFwcG9pbnRtZW50cyBzdGFydHVwIHNjcmlwdCBmb3IgUmFpbHdheS4KIyBSZXBsaWNhdGVzIHRoZSB1cHN0cmVhbSBkb2NrZXItZW50cnlwb2ludC5zaCB0ZW1wbGF0aW5nLCBmaXhlcyB0aGUgQXBhY2hlIE1QTQojIGNvbmZsaWN0LCBwcmVwYXJlcyB0aGUgcGVyc2lzdGVudCBzdG9yYWdlIHRyZWUgb24gYSBmcmVzaCBSYWlsd2F5IHZvbHVtZSwKIyB0aGVuIGV4ZWNzIGFwYWNoZTItZm9yZWdyb3VuZC4KCnNldCAtZQoKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KIyAxLiBSZW5kZXIgL3Zhci93d3cvaHRtbC9jb25maWcucGhwIGZyb20gZW52aXJvbm1lbnQgdmFyaWFibGVzCiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCmNhdCA+IC92YXIvd3d3L2h0bWwvY29uZmlnLnBocCA8PEVPRgo8P3BocApjbGFzcyBDb25maWcgewogICAgY29uc3QgQkFTRV9VUkwgICAgICAgICAgICAgID0gJyR7QkFTRV9VUkx9JzsKICAgIGNvbnN0IExBTkdVQUdFICAgICAgICAgICAgICA9ICcke0xBTkdVQUdFfSc7CiAgICBjb25zdCBERUJVR19NT0RFICAgICAgICAgICAgPSAke0RFQlVHX01PREV9OwogICAgY29uc3QgREJfSE9TVCAgICAgICAgICAgICAgID0gJyR7REJfSE9TVH0nOwogICAgY29uc3QgREJfTkFNRSAgICAgICAgICAgICAgID0gJyR7REJfTkFNRX0nOwogICAgY29uc3QgREJfVVNFUk5BTUUgICAgICAgICAgID0gJyR7REJfVVNFUk5BTUV9JzsKICAgIGNvbnN0IERCX1BBU1NXT1JEICAgICAgICAgICA9ICcke0RCX1BBU1NXT1JEfSc7CiAgICBjb25zdCBHT09HTEVfU1lOQ19GRUFUVVJFICAgPSAke0dPT0dMRV9TWU5DX0ZFQVRVUkV9OwogICAgY29uc3QgR09PR0xFX0NMSUVOVF9JRCAgICAgID0gJyR7R09PR0xFX0NMSUVOVF9JRH0nOwogICAgY29uc3QgR09PR0xFX0NMSUVOVF9TRUNSRVQgID0gJyR7R09PR0xFX0NMSUVOVF9TRUNSRVR9JzsKfQpFT0YKCiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCiMgMi4gUmVuZGVyIC92YXIvd3d3L2h0bWwvYXBwbGljYXRpb24vY29uZmlnL2VtYWlsLnBocAojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpjYXQgPiAvdmFyL3d3dy9odG1sL2FwcGxpY2F0aW9uL2NvbmZpZy9lbWFpbC5waHAgPDxFT0YKPD9waHAgZGVmaW5lZCgnQkFTRVBBVEgnKSBvciBleGl0KCdObyBkaXJlY3Qgc2NyaXB0IGFjY2VzcyBhbGxvd2VkJyk7CgpcJGNvbmZpZ1sndXNlcmFnZW50J10gPSAnRWFzeSFBcHBvaW50bWVudHMnOwpcJGNvbmZpZ1sncHJvdG9jb2wnXSA9ICcke01BSUxfUFJPVE9DT0x9JzsKXCRjb25maWdbJ21haWx0eXBlJ10gPSAnaHRtbCc7ClwkY29uZmlnWydzbXRwX2RlYnVnJ10gPSAnJHtNQUlMX1NNVFBfREVCVUd9JzsKXCRjb25maWdbJ3NtdHBfYXV0aCddID0gJHtNQUlMX1NNVFBfQVVUSH07ClwkY29uZmlnWydzbXRwX2hvc3QnXSA9ICcke01BSUxfU01UUF9IT1NUfSc7ClwkY29uZmlnWydzbXRwX3VzZXInXSA9ICcke01BSUxfU01UUF9VU0VSfSc7ClwkY29uZmlnWydzbXRwX3Bhc3MnXSA9ICcke01BSUxfU01UUF9QQVNTfSc7ClwkY29uZmlnWydzbXRwX2NyeXB0byddID0gJyR7TUFJTF9TTVRQX0NSWVBUT30nOwpcJGNvbmZpZ1snc210cF9wb3J0J10gPSAke01BSUxfU01UUF9QT1JUfTsKXCRjb25maWdbJ2Zyb21fbmFtZSddID0gJyR7TUFJTF9GUk9NX05BTUV9JzsKXCRjb25maWdbJ2Zyb21fYWRkcmVzcyddID0gJyR7TUFJTF9GUk9NX0FERFJFU1N9JzsKXCRjb25maWdbJ3JlcGx5X3RvJ10gPSAnJHtNQUlMX1JFUExZX1RPX0FERFJFU1N9JzsKXCRjb25maWdbJ2NybGYnXSA9ICJcclxuIjsKXCRjb25maWdbJ25ld2xpbmUnXSA9ICJcclxuIjsKRU9GCgojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQojIDMuIEFwcGVuZCBiYXNlX3VybCBvdmVycmlkZSB0byBhcHBsaWNhdGlvbi9jb25maWcvY29uZmlnLnBocCAoaWRlbXBvdGVudCkKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KRklMRT0vdmFyL3d3dy9odG1sL2FwcGxpY2F0aW9uL2NvbmZpZy9jb25maWcucGhwClNUUklORz0iXCRjb25maWdbJ2Jhc2VfdXJsJ10gPSAnJHtCQVNFX1VSTH0nOyIKaWYgWyAiJCh0YWlsIC1uIDEgIiRGSUxFIikiICE9ICIkU1RSSU5HIiBdOyB0aGVuCiAgICBlY2hvICIkU1RSSU5HIiA+PiAiJEZJTEUiCmZpCgojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQojIDQuIEVuc3VyZSBzdG9yYWdlIHRyZWUgZXhpc3RzIChSYWlsd2F5IHZvbHVtZXMgc3RhcnQgZW1wdHkgd2l0aCBsb3N0K2ZvdW5kKQojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQpta2RpciAtcCBcCiAgICAvdmFyL3d3dy9odG1sL3N0b3JhZ2UvYmFja3VwcyBcCiAgICAvdmFyL3d3dy9odG1sL3N0b3JhZ2UvY2FjaGUgXAogICAgL3Zhci93d3cvaHRtbC9zdG9yYWdlL2xvZ3MgXAogICAgL3Zhci93d3cvaHRtbC9zdG9yYWdlL3Nlc3Npb25zIFwKICAgIC92YXIvd3d3L2h0bWwvc3RvcmFnZS91cGxvYWRzCmNob3duIC1SIHd3dy1kYXRhOnd3dy1kYXRhIC92YXIvd3d3L2h0bWwvc3RvcmFnZQoKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KIyA1LiBBcGFjaGUgTVBNIGZpeCDigJQgUmFpbHdheSByZS1lbmFibGVzIG1wbV9ldmVudCBhdCBydW50aW1lLCBicmVha2luZyB0aGUKIyAgICBpbWFnZSdzIG1wbV9wcmVmb3JrLiBEaXNhYmxlIG1wbV9ldmVudCBiZWZvcmUgbGF1bmNoaW5nIEFwYWNoZS4KIyAgICAoU2VlIGxlYXJuaW5ncy9sZWFybmluZ3MubWQg4oaSICJwaHA6Ki1hcGFjaGUgaW1hZ2VzIOKAlCBNb3JlIHRoYW4gb25lIE1QTSBsb2FkZWQiLikKIyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0KYTJkaXNtb2QgbXBtX2V2ZW50IDI+L2Rldi9udWxsIHx8IHRydWUKYTJlbm1vZCBtcG1fcHJlZm9yayAyPi9kZXYvbnVsbCB8fCB0cnVlCgojIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLQojIDYuIFN0YXJ0IEFwYWNoZSBpbiB0aGUgZm9yZWdyb3VuZCAoUElEIDEgdmlhIGV4ZWMgZm9yIGNsZWFuIFNJR1RFUk0pCiMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tCmV4ZWMgYXBhY2hlMi1mb3JlZ3JvdW5kCg== | - |
| `MAIL_PROTOCOL` | EasyAppointments | mail | - |
| `GOOGLE_API_KEY` | EasyAppointments | (secret) | Google API key |
| `MAIL_FROM_NAME` | EasyAppointments | - | Sender display name |
| `MAIL_SMTP_AUTH` | EasyAppointments | 0 | - |
| `MAIL_SMTP_HOST` | EasyAppointments | - | SMTP host |
| `MAIL_SMTP_PASS` | EasyAppointments | - | SMTP password |
| `MAIL_SMTP_PORT` | EasyAppointments | 587 | - |
| `MAIL_SMTP_USER` | EasyAppointments | (secret) | SMTP username |
| `MAIL_SMTP_DEBUG` | EasyAppointments | 0 | - |
| `GOOGLE_CLIENT_ID` | EasyAppointments | - | Google OAuth client ID |
| `MAIL_SMTP_CRYPTO` | EasyAppointments | tls | - |
| `MAIL_FROM_ADDRESS` | EasyAppointments | - | Sender email |
| `GOOGLE_PRODUCT_NAME` | EasyAppointments | - | Google product name |
| `GOOGLE_SYNC_FEATURE` | EasyAppointments | FALSE | - |
| `GOOGLE_CLIENT_SECRET` | EasyAppointments | (secret) | Google OAuth client secret |
| `MAIL_REPLY_TO_ADDRESS` | EasyAppointments | - | Reply-to address |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/easyappointments-booking)
