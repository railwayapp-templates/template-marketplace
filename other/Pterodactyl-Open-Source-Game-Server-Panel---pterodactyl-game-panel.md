# Deploy Pterodactyl | Open Source Game Server Panel on Railway

Game server panel, pinned, with your admin account made on first boot.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pterodactyl-game-panel)

## About

Pterodactyl is the open-source game server panel: a web control panel and API for running Minecraft, Rust, Source-engine and hundreds of other game servers, with per-user permissions, file management, backups and a live console. This template deploys the panel, its database and its cache, already wired together, with an administrator account waiting for you.

Three services, all from official upstream images:

- **Panel** — the web interface and API, on a public domain with TLS. Runs nginx, PHP-FPM, the queue worker and the scheduler, exactly as upstream's image intends.
- **MariaDB** — accounts, servers, nodes, schedules and the egg catalogue, on a volume.
- **Redis** — sessions, cache and the job queue, on a volume.

Everything is filled in on the deploy screen; there is nothing you have to type. When the deploy finishes, open the domain and sign in with the `ADMIN_USERNAME` and `ADMIN_PASSWORD` shown in the Panel service's variables.

**Read this before you deploy: the panel is not the game server.** Pterodactyl is two halves. This half is the control panel. The other half is Wings, a daemon that runs each game server in its own Docker container and needs root and its own Docker socket on a machine you control — which is not something Railway, or any container platform, can host. So this template gives you the panel; you point it at one or more Wings nodes on your own hardware or VPS. That is the normal split for Pterodactyl, and the panel is the fiddly half: PHP, nginx, a database, a queue worker, a cron, and TLS. The template generates the exact `wings configure` command for each node you add, on the node's Configuration tab.

Four things this template does that are worth knowing about:

**Someone made you an account.** The official image migrates the database on boot and then hands over to supervisord; creating the first user is `php artisan p:user:make`, an interactive command that assumes you have a shell on the container. On Railway you do not. This template runs that command for you on first boot, as an administrator, with a generated password — and it checks first, so a redeploy never creates a second account and never overwrites a password you have since changed.

**The panel's errors reach your logs.** As shipped, supervisord captures each child process's output into files inside the container, and PHP-FPM discards its workers' output outright. The result is a log that shows the migrations and then falls silent, no matter how many requests the panel serves or exceptions it throws — the first thing you need when something breaks is the one thing you cannot get. Two lines of configuration at boot put PHP-FPM, the queue worker and nginx back on the container's stdout.

**Redis can actually write its snapshot.** A Redis container on a Railway volume cannot write to it unless it is told to start as root and fix the ownership itself. Left alone, the first background save fails, and Redis's own default then makes it refuse *every write* — which surfaces in the panel as a 500 on any page that touches a session, minutes after a deployment that looked perfectly healthy. It is a five-character fix and it is easy to not know about.

**It pins released versions.** Panel `v1.15.0`, the current release, rather than the `latest` tag that moves under you; MariaDB `11.8.8`, the LTS branch that upstream's own compose file targets; Redis `8.10.0`. Nothing is built from a fork or a third-party starter repository, so what you deploy is what Pterodactyl published.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Panel | `ghcr.io/pterodactyl/panel:v1.15.0` | Web service |
| MariaDB | `mariadb:11.8.8` | Database |
| Redis | `redis:8.10.0-alpine` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Panel | 80 | Порт, на котором слушает nginx внутри образа. Он зашит в конфигурацию сайта и переменной не читается, поэтому 80 — не настройка, а факт. |
| `APP_ENV` | Panel | production | Окружение Laravel. production отключает отладочные подсказки. |
| `APP_KEY` | Panel | - | Ключ шифрования Laravel. Им зашифрованы секреты двухфакторной аутентификации и токены узлов. Смена ключа делает их нечитаемыми, и приложение об этом не предупредит. |
| `APP_URL` | Panel | - | Публичный адрес панели. Отсюда берутся ссылки в письмах и адрес, который панель выдаёт демону Wings в конфигурации узла. Значение с https:// заодно заставляет Laravel строить https-ссылки за прокси Railway. |
| `DB_HOST` | Panel | - | Адрес MariaDB в приватной сети проекта. |
| `DB_PORT` | Panel | 3306 | Порт MariaDB. |
| `APP_DEBUG` | Panel | false | Показывать ли трассировку ошибок в браузере. Оставьте false: панель смотрит в интернет, а стектрейс раскрывает пути и переменные. |
| `LOG_LEVEL` | Panel | info | Порог журналирования. debug у апстрима шумит на каждом запросе. |
| `APP_LOCALE` | Panel | en | Язык интерфейса панели. |
| `REDIS_HOST` | Panel | - | Адрес Redis в приватной сети проекта. |
| `REDIS_PORT` | Panel | 6379 | Порт Redis. |
| `ADMIN_EMAIL` | Panel | admin@example.com | Почта администратора. Заменить на свою стоит до первого деплоя: восстановление пароля пойдёт именно на этот адрес. |
| `CACHE_STORE` | Panel | redis | Где панель держит кэш. Redis, а не файлы: файловый кэш пережил бы деплой только на томе. |
| `DB_DATABASE` | Panel | - | Имя базы. Ссылается на сервис MariaDB, менять не нужно. |
| `DB_PASSWORD` | Panel | (secret) | Пароль базы. Ссылается на сервис MariaDB — оба значения всегда совпадают. |
| `DB_USERNAME` | Panel | (secret) | Пользователь базы. Ссылается на сервис MariaDB. |
| `LOG_CHANNEL` | Panel | stderr | Канал журнала Laravel. stderr — единственный, который виден в логах Railway; значение апстрима (daily) пишет в файл внутри контейнера, куда никто не заглянет. |
| `MAIL_MAILER` | Panel | array | array принимает письма и выбрасывает. Так сделано осознанно: апстримовский smtp без настроенного сервера роняет в лог полный стектрейс при каждом создании учётной записи. Поставьте smtp — и в админке появится страница «Mail», где задаются сервер, порт и пароль. |
| `APP_TIMEZONE` | Panel | UTC | Часовой пояс расписаний и журналов активности. |
| `HASHIDS_SALT` | Panel | - | Соль, из которой строятся короткие идентификаторы серверов в адресах. Смена соли меняет адрес каждого сервера — старые ссылки перестанут открываться. |
| `DB_CONNECTION` | Panel | mysql | Драйвер базы. У Laravel есть отдельный драйвер mariadb, но связку «образ MariaDB + драйвер mysql» использует и тестирует сам Pterodactyl. |
| `ADMIN_PASSWORD` | Panel | (secret) | Пароль администратора. Сгенерирован для вас — откройте панель и войдите с ним. Смените его внутри панели: шаблон создаёт учётную запись один раз и больше её не трогает. |
| `ADMIN_USERNAME` | Panel | (secret) | Имя администратора, которого шаблон создаёт при первом запуске. Только строчные буквы, цифры, точка, дефис и подчёркивание. |
| `HASHIDS_LENGTH` | Panel | 8 | Длина этих идентификаторов. |
| `MAIL_FROM_NAME` | Panel | Pterodactyl Panel | Имя отправителя писем панели. |
| `SESSION_DRIVER` | Panel | redis | Где живут сессии. В Redis — поэтому вход не слетает при обычной работе. |
| `ADMIN_LAST_NAME` | Panel | Administrator | Фамилия администратора в профиле. |
| `TRUSTED_PROXIES` | Panel | * | Панель работает за прокси Railway. Без этого Laravel видит адрес прокси вместо адреса посетителя и считает соединение незашифрованным: ломаются и ограничение частоты попыток входа, и проверка капчи. |
| `ADMIN_FIRST_NAME` | Panel | Panel | Имя администратора в профиле. |
| `QUEUE_CONNECTION` | Panel | redis | Очередь фоновых задач: письма, расписания, действия над серверами. Обработчик очереди запущен внутри контейнера панели. |
| `MAIL_FROM_ADDRESS` | Panel | noreply@example.com | Адрес отправителя писем панели. |
| `RECAPTCHA_ENABLED` | Panel | true | Капча на форме входа. Pterodactyl поставляет собственную пару публичных ключей, она рабочая — это значение по умолчанию у апстрима. Если капча мешает, поставьте false: страницу настроек, где её можно выключить, вы иначе не откроете, потому что она за входом. |
| `APP_SERVICE_AUTHOR` | Panel | noreply@example.com | Адрес, которым подписываются созданные вами яйца (egg) при экспорте. На работу панели не влияет. |
| `APP_ENVIRONMENT_ONLY` | Panel | false | false оставляет включённой страницу настроек в админке: название панели, почту и капчу можно менять в браузере, а не переменными. Это же значение стоит в compose-файле самого Pterodactyl. |
| `PORT` | MariaDB | 3306 | Порт MariaDB внутри приватной сети проекта. |
| `MARIADB_USER` | MariaDB | (secret) | Пользователь, под которым панель ходит в базу. Создаётся при первом запуске. |
| `MARIADB_DATABASE` | MariaDB | panel | База данных панели. Создаётся при первом запуске; менять после первого деплоя нельзя. |
| `MARIADB_PASSWORD` | MariaDB | (secret) | Пароль этого пользователя. Панель берёт его по ссылке, менять вручную не нужно. |
| `MARIADB_ROOT_PASSWORD` | MariaDB | (secret) | Пароль root в MariaDB. Панель им не пользуется; нужен только для ручного обслуживания базы. |
| `PORT` | Redis | 6379 | Порт Redis. Менять незачем — сервис доступен только из приватной сети этого проекта. |

## Configuration

- **Start command:** `sh -c 'sed -i "s|^autorestart=true$|autorestart=true\nstdout_logfile=/dev/stdout\nstdout_logfile_maxbytes=0\nstderr_logfile=/dev/stderr\nstderr_logfile_maxbytes=0|" /etc/supervisord.conf; printf "\ncatch_workers_output = yes\ndecorate_workers_output = no\n" >> /usr/local/etc/php-fpm.conf; ( for i in $(seq 1 60); do n=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USERNAME" -p"$DB_PASSWORD" -N -B -e "select count(*) from users" "$DB_DATABASE" 2>/dev/null) || { sleep 5; continue; }; if [ "$n" != "0" ]; then echo "admin bootstrap: $n user(s) already exist, nothing to do"; break; fi; php /app/artisan p:user:make --admin=1 --email="$ADMIN_EMAIL" --username="$ADMIN_USERNAME" --name-first="$ADMIN_FIRST_NAME" --name-last="$ADMIN_LAST_NAME" --password="$ADMIN_PASSWORD" --no-interaction && break; sleep 5; done ) & exec /bin/ash .github/docker/entrypoint.sh supervisord -n -c /etc/supervisord.conf'`
- **Healthcheck:** `/auth/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/var`
- **Volume:** `/var/lib/mysql`

**Category:** Other

[View on Railway →](https://railway.com/deploy/pterodactyl-game-panel)
