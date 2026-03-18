# Deploy MySql backups to Cloudinary on Railway

Node app to backup MySQL database and upload it to Cloudinary.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/mT6Hiw)

## About

# MySql Backup - Cloudinary

Node.js application that performs scheduled backups of your MySQL database and uploads them to Cloudinary for secure storage. It utilizes a cron job to automate the backup process based on your desired frequency. The backups are saved in SQL format and can be easily restored if needed.

## Prerequisites

- Node.js and npm installed in the runtime environment.
- Valid Cloudinary credentials and access to a MySQL database.

## Steps

- Create a .env file in the project root(based on .env.example) and replace the values with your production keys(for production deployment, just create the keys on your server).
- Configure the cron job in index.ts according to your preferences(take a look at the config.ts file ). For example, if you want to perform daily backups at 12:00 PM, use the following value:
  <pre><code>  const job = new CronJob(env.CRON_SCHEDULE.DAILY, async () =&gt; {
  // ...
  });
</code></pre>

## Usage

The application will automatically perform scheduled backups of your database and upload them to Cloudinary. You can adjust the backup frequency by modifying the configuration in index.ts. If you want to run an immediate backup, you can uncomment the line void backup(); in index.ts before starting the cron job.

## Screenshots

### Cloudinary

![Database](https://res.cloudinary.com/dy8ukvwe2/image/upload/v1688259734/cloudinaryPreview_ravysj.png)
The folder for backups will be automatically created with the following name: <b>databaseBackups/{currentYear}/Month-{currentMonth}</b>

### Sql backup script

![Screenshot 2](https://res.cloudinary.com/dy8ukvwe2/image/upload/v1688259735/sqlPreview_mfrbhr.png)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mysqlCloudinaryBackups | [danielthames360/mysqlCloudinaryBackups](https://github.com/danielthames360/mysqlCloudinaryBackups) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Get it from "Product Environment Credentials" on Cloudinary Dashboard |
| `API_SECRET` | (secret) | Get it from "Product Environment Credentials" on Cloudinary Dashboard |
| `CLOUD_NAME` | - | Get it from "Product Environment Credentials" on Cloudinary Dashboard |
| `MYSQL_HOST` | - | Mysql -> host |
| `MYSQL_PORT` | - | Mysql -> port |
| `MYSQL_DATABASE` | - | Mysql -> database |
| `MYSQL_PASSWORD` | (secret) | Mysql -> password |
| `MYSQL_USERNAME` | (secret) | Mysql -> username |
| `BACKUP_CRON_SCHEDULE` | 0 1 * * * | DAILY: '0 1 * * *', //daily at 01 AM  -- WEEKLY: '0 3 * * 1', //weekly on mondays at 3 AM  -- MONTHLY: '0 6 1 * *', //first day of month at 6 AM  -- EVERY_TWO_DAYS: '0 23 */2 * *' //every two days at 11 PM |

**Category:** Automation · **Languages:** TypeScript

[View on Railway →](https://railway.com/template/mT6Hiw)
