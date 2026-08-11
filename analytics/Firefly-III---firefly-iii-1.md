# Deploy Firefly III on Railway

One-click Firefly III personal finance manager with managed MySQL

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/firefly-iii-1)

## About

Firefly III is an open-source, self-hosted personal finance manager. Track income and expenses, build budgets, and get a clear picture of your money without sending your financial data to a commercial service. This template deploys Firefly III with a managed MySQL database and persistent storage in one click.

Firefly III is a PHP (Laravel) application backed by a relational database. This template bundles the official `fireflyiii/core` image (pinned, never `latest`) with Railway's managed MySQL and a 512 MB persistent volume for uploads and attachments. Database credentials and the public URL are wired automatically via references, so there is nothing to configure. On first boot the app runs its database migrations — expect the healthcheck to restart for 5–10 minutes while it initializes. The admin account is created automatically from the variables you fill in during deploy; log in and you are ready to add your accounts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:9.4` | Database |
| Firefly | `fireflyiii/core:version-6.6.6` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MYSQLPORT` | MySQL | 3306 |
| `MYSQLUSER` | MySQL | root |
| `MYSQLPASSWORD` | MySQL | (secret) |
| `MYSQL_DATABASE` | MySQL | railway |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) |
| `DB_PASSWORD` | Firefly | (secret) |
| `DB_USERNAME` | Firefly | (secret) |
| `TRUSTED_PROXIES` | Firefly | ** |
| `FF_ADMIN_PASSWORD` | Firefly | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Start command:** `cat > /tmp/create_user.php <<'EOF'
<?php
require "/var/www/html/vendor/autoload.php";
$app = require "/var/www/html/bootstrap/app.php";
$app->make("Illuminate\Contracts\Console\Kernel")->bootstrap();
$email = getenv("FF_ADMIN_EMAIL");
$pass  = getenv("FF_ADMIN_PASSWORD");
if (!$email || !$pass) { exit(0); }
$repo = app(FireflyIII\Repositories\User\UserRepositoryInterface::class);
if ($repo->count() === 0) {
  $user = $repo->store(["blocked" => false, "blocked_code" => null, "email" => $email, "role" => "owner"]);
  $user->password = Illuminate\Support\Facades\Hash::make($pass);
  $user->save();
  echo "USER_CREATED\n";
}
EOF
for i in $(seq 1 30); do php /tmp/create_user.php >/dev/null 2>&1 && break; sleep 4; done
exec /package/admin/s6/command/s6-svscan -d4 -- /run/service`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/www/html/storage/upload`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/firefly-iii-1)
