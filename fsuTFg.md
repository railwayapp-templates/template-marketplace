# Deploy Vitess on Railway

Vitess is a database clustering system for horizontal scaling of MySQL.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fsuTFg)

## About

## Vitess

You can find all the information for the environment variables in the [docs](https://vitess.io/docs/19.0/get-started/vttestserver-docker-image/#environment-variables).

Link: https://vitess.io/docs/19.0/get-started/vttestserver-docker-image

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vitess/lite | `vitess/lite` | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3306 | The starting of the port addresses that vitess will use to register its components like vtgate, etc. |
| `CHARSET` | utf8mb4 | Default charset to use. If unspecified, it defaults to `utf8mb4`. |
| `KEYSPACES` | - | Specifies the names of the keyspaces to be created as a comma separated value. |
| `NUM_SHARDS` | - | Specifies the number of shards in each keyspace. It is a comma separated value as well, read in conjunction with the KEYSPACES. |
| `MYSQL_BIND_HOST` | - | Which host to bind the MySQL listener to. If unspecified, it defaults to `127.0.0.1`. |
| `PLANNER_VERSION` | - | Sets the default planner to use when the session has not changed it. Valid values are: Gen4, Gen4Greedy, Gen4Left2Right. |
| `FOREIGN_KEY_MODE` | allow | This is to provide how to handle foreign key constraint in create/alter table. Valid values are: `allow` (default), `disallow`. |
| `ENABLE_ONLINE_DDL` | true | Allow users to submit, review and control Online DDL. Valid values are: `true` (default), `false`. |
| `VTCOMBO_BIND_HOST` | - | Which host to bind the vtcombo servenv listener to. If unspecified, it defaults to `127.0.0.1`. |
| `MYSQL_SERVER_VERSION` | - | MySQL server version to advertise. If unspecified, it defaults to `8.0.31-vitess` or `5.7.9-vitess` according to the version of vttestserver run. |
| `MYSQL_MAX_CONNECTIONS` | 1000 | Maximum number of connections that the MySQL instance will support. If unspecified, it defaults to 1000. |
| `TABLET_REFRESH_INTERVAL` | - | Interval at which vtgate refreshes tablet information from topology server. |

**Category:** Storage

[View on Railway →](https://railway.com/template/fsuTFg)
