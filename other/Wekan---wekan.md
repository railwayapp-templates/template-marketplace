# Deploy Wekan on Railway

Trello alternative. Open-source kanban board

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wekan)

## About

WeKan is an open source kanban board — boards, lists, cards, swimlanes, checklists and drag-and-drop — built with Meteor on MongoDB and released under the MIT license. It is the closest self-hosted match to Trello's interface, so a migrating team keeps the workflow it already knows without per-seat billing. Agencies, universities and engineering teams use it for sprint boards, content calendars and support triage. Because every card stays in a database you control, WeKan also answers the GDPR and data-residency rules that rule out hosted SaaS.

Self-host WeKan on Railway and you get the production topology upstream recommends, not the lightweight demo one. Two services deploy together: `wekan`, the Meteor application from the official `ghcr.io/wekan/wekan:v10.95` image, public on port 8080 with a volume at `/data` for attachments; and `mongodb`, a private MongoDB 7.0 service on port 27017 with a volume at `/data/db`, built from the `gridalpha/wekan-mongodb-railway` repository as a single-node replica set with keyfile authentication. Traffic terminates TLS at Railway's edge and reaches WeKan on 8080; WeKan reaches MongoDB only over the private network, so the database is never public. Connection strings, the oplog URL and volume permissions are pre-set.

![WeKan Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786897895/239a4804-a5e9-401e-a1fc-46ef3638841e.png)

Teams self-host WeKan when project data must stay in a given jurisdiction, when headcount makes per-user pricing painful, or when boards need scripting rather than clicking.

- Boards, lists, cards, swimlanes, labels, due dates, checklists and attachments
- WIP limits, custom fields, subtasks, card voting, board templates and a no-code Rules automation engine
- REST API, outgoing webhooks (Slack, Mattermost, Rocket.Chat, n8n), Trello JSON import, JSON/CSV export
- LDAP, SAML, CAS and OAuth2/OIDC sign-on (Keycloak, Google, Azure AD, GitLab)

The two services split cleanly. `wekan` is a single Node.js process serving the UI, the REST API and the websocket that pushes live board updates; it holds Meteor sessions in memory and runs its own schedulers, so keep it at one replica. `mongodb` stores every board, card and user, and is a replica set on purpose: Meteor's reactive drivers — change streams first, OpLog tailing second — both need a replica-set member. A standalone MongoDB silently demotes WeKan to poll-and-diff, which upstream measures at 3-5x the CPU and 2000 ms latency instead of 50 ms.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| mongodb | [gridalpha/wekan-mongodb-railway](https://github.com/gridalpha/wekan-mongodb-railway) | Database |
| wekan | `ghcr.io/wekan/wekan:v10.95` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MONGODB_DATABASE` | mongodb | wekan | Application database name |
| `MONGODB_PORT_NUMBER` | mongodb | 27017 | MongoDB listening port |
| `MONGODB_APP_PASSWORD` | mongodb | (secret) | WeKan application user password |
| `MONGODB_APP_USERNAME` | mongodb | (secret) | Least-privilege application user |
| `MONGODB_ROOT_PASSWORD` | mongodb | (secret) | MongoDB root user password |
| `MONGODB_REPLICA_SET_NAME` | mongodb | rs0 | Replica set name |
| `PORT` | wekan | 8080 | HTTP listening port |
| `ROOT_URL` | wekan | - | Public app URL |
| `WEKAN_DB` | wekan | mongodb | Use external MongoDB, not bundled |
| `WITH_API` | wekan | true | Enable the REST API |
| `MONGO_URL` | wekan | - | Application database connection |
| `NODE_OPTIONS` | wekan | --max-old-space-size=4096 | Cap the Node heap size |
| `WRITABLE_PATH` | wekan | /data | Attachment and avatar directory |
| `MONGO_OPLOG_URL` | wekan | - | OpLog tailing connection |
| `WEKAN_DB_WAIT_PAGE` | wekan | true | Serve wait page until database ready |
| `HTTP_FORWARDED_COUNT` | wekan | 2 | Proxy hops for real client IPs |
| `METEOR_REACTIVITY_ORDER` | wekan | changeStreams,oplog,polling | Realtime driver preference order |

## Configuration

- **Volume:** `/data/db`
- **Start command:** `/bin/sh -c 'mkdir -p /data && chown -R wekan:wekan /data && export HOME=/home/wekan && setpriv --reuid=wekan --regid=wekan --init-groups id && exec setpriv --reuid=wekan --regid=wekan --init-groups bash /build/wekan-entrypoint.sh'`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/wekan)
