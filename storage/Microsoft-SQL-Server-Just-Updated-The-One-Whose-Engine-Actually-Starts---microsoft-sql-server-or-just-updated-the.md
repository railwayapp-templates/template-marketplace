# Deploy Microsoft SQL Server | (Just Updated) The One Whose Engine Actually Starts on Railway

SQL Server 2022 that actually starts, with backups that survive redeploys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/microsoft-sql-server-or-just-updated-the)

## About

Microsoft SQL Server is Microsoft's relational database engine: T-SQL, stored procedures,
transactions, full-text search and the tooling ecosystem around SSMS, Azure Data Studio and
the .NET / JDBC / ODBC drivers.

This template runs SQL Server 2022 on Railway with an engine that actually starts, a
generated `sa` password, a public TCP proxy, and a persistence design built around the one
platform limit that stops every other SQL Server listing from working.

SQL Server is unusually hostile to a container platform, and the reason is the filesystem.

**A Railway volume reports a 16384-byte sector size, and SQL Server accepts at most 4096.**
Any data file placed on the volume is rejected outright:

```
Cannot use file '/var/opt/mssql/data/x.mdf', because it is on a volume with sector size 16384.
SQL Server supports a maximum sector size of 4096 bytes.
```

No configuration reaches that check — write-through, trace flag 3979 and trace flag 1800 were
each verified applied on a live deploy and the rejection is unchanged, because the check reads
the filesystem's reported sector size rather than the IO path.

The consequence is that mounting a volume at `/var/opt/mssql`, which is the layout every other
listing in this category uses, does not give you persistence. It gives you an engine that never
starts. On a live control deploy of a competing template, `sqlservr` crash-loops about once a
second with:

```
/opt/mssql/bin/sqlservr: Error: The system directory [/.system] could not be created.
File: LinuxDirectory.cpp:420 [Status: 0xC0000022 Access Denied errno = 0xD(13) Permission denied]
```

with zero occurrences of "ready for client connections" in the whole deploy log — while Railway
reports the deployment **SUCCESS**, because no listing in this category publishes a healthcheck.
A greenly-deployed database server whose engine died during startup is the normal state of this
category.

**This template takes the other route.** The data files stay on the container's own filesystem,
where the sector size is correct and the engine starts normally, and durability is provided by
a backup and restore cycle onto the volume:

- The engine first starts on a private port Railway does not route, restores the most recent
  backup of every user database, and replays the recorded SQL logins with their original SIDs
  and password hashes, so applications keep working without re-granting anything.
- Only then does it shut down and re-start on 1433, so the first connection the deploy ever
  accepts is against restored state.
- `BACKUP DATABASE ... TO DISK` runs on a schedule (`MSSQL_BACKUP_INTERVAL_MINUTES`, default 15)
  and once more on shutdown, so an ordinary redeploy loses nothing.

Measured on a live Railway redeploy: a seeded table row and a created login were both present
after the container was replaced.

The container also repairs the volume's root ownership, sizes the engine's CPU affinity from the
cgroup quota rather than the host's core count, and refuses to boot on an empty `sa` password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mssql | `ghcr.io/bon5co/mssql-railway@sha256:ac88c6f742983825495515ae098cead6977d5fd4cff05f98ea55bc24e264e3fe` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `SQLSERVER_USER` | (secret) |
| `MSSQL_SA_PASSWORD` | (secret) |
| `SQLSERVER_PASSWORD` | (secret) |

## Configuration

- **TCP Proxies:** 1433
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/microsoft-sql-server-or-just-updated-the)
