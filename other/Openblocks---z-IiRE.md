# Deploy Openblocks on Railway

The Open Source Retool Alternative

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/z-IiRE)

## About

## What is Openblocks?
Openblocks is a developer-friendly open-source low code platform to build internal apps within minutes.
Traditionally, building an internal app requires complex frontend and backend interactions with hundreds and thousands lines of code, not to mention work on packaging, integration and deployment. Openblocks significantly reduces the work you need to do to build an app.
In Openblocks, all you need to do is drag and drop pre-built or self-customized components onto the What-You-See-Is-What-You-Get (WYSIWYG) canvas, along with ready-to-connect databases and APIs, Openblocks helps you build an app quickly and focus on business logic.

## ✨ Services

- Openblocks (Frontend, Node Backend and API)
- MongoDB (Database)
- Redis (Cache)

## Why choose Openblocks?
Open source: Makes your ideas more feasible.
All-in-one platform: Connection to all kinds of data sources and APIs such as MySQL, PostgreSQL, SQL Server, MongoDB, Redis, and Elasticsearch, and ensures your data security.
High scalability: Allows to execute JavaScript almost anywhere you would like to customize your business processes and UI components.
Clean design: Follows the principles of Ant Design and supports display on screens of different sizes. We have a number of templates and UI components, based on which you can freely build dashboard, admin panel, and content management system (CMS).
Built-in features: Provide cloud and self-hosted deployment, multi-tenant management, fine-grained access control, and audit logs.

## How to build an app in Openblocks?
Building an internal app basically takes 5 steps:
1. Quickly connect to your data sources, including PostgreSQL, MongoDB and online APIs.
2. Write a few lines of SQL or set up request parameters to build queries.
3. Use pre-built or user-customized UI components to build your app UI, bind and display queries' data with UI components.
4. Set up event handlers to trigger queries, control components or other actions in reaction to user interactions.
5. Preview and share your app with others.

## 💁‍♀️ How to use

- Click the Railway button 👆
- Update only required environment variables. Most of them are already set and doesn't need to be changed. If you want to configure or add more environment variables, follow this [guide](https://github.com/openblocks-dev/openblocks/tree/develop/deploy/docker)
- Deploy
![Deploy](https://raw.githubusercontent.com/railwayapp-templates/openblocks/main/img/setup.png)
- Visit the URL Railway provides
- Follow the instructions to set up your admin account
![Login Page](https://raw.githubusercontent.com/railwayapp-templates/openblocks/main/img/login.png)
- Login with your admin account
- To Create a new App, Click on `New` and then `App`
![Create Page](https://raw.githubusercontent.com/railwayapp-templates/openblocks/main/img/Newapp.png)
- Adding a New component is simple and easy by dragging and dropping the components from the left panel to the canvas
![Drag and Drop](https://raw.githubusercontent.com/railwayapp-templates/openblocks/main/img/Components.png)
- Center canvas is the canvas where you can drag and drop the components and build your app
![Flow](https://raw.githubusercontent.com/railwayapp-templates/openblocks/main/img/flow.png)
- Right panel is the properties panel where you can set the properties of the components
- Bottom panel is the data panel where you can set the data source for the components and query the data
![Data](https://raw.githubusercontent.com/railwayapp-templates/openblocks/main/img/query.png)
- Once you are done with the app, you can click on the `Preview` button on the top right corner to preview the app
- You can also share the app with others by clicking on the `Share` button on the top right corner
- You can export the app by clicking on the `Export` button on the top right corner and import it later 
- You can also deploy the app by clicking on the `Publish` button on the top right corner
- Enjoy 🎉

## 📝 Notes

- Source repo: https://github.com/openblocks-dev/openblocks
- Docs: https://docs.openblocks.dev/self-hosting

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Openblocks Node | [railwayapp-templates/openblocks](https://github.com/railwayapp-templates/openblocks) (root: /node-service) | Web service |
| Openblocks API | [railwayapp-templates/openblocks](https://github.com/railwayapp-templates/openblocks) (root: /api-service) | Web service |
| MongoDB | `mongo` | Database |
| Redis | `bitnami/redis` | Database |
| Openblocks Frontend | [railwayapp-templates/openblocks](https://github.com/railwayapp-templates/openblocks) (root: /frontend) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Openblocks Node | 6060 | DEFAULT PORT |
| `OPENBLOCKS_API_SERVICE_URL` | Openblocks Node | - | Openblocks API service URL	 |
| `PORT` | Openblocks API | 8080 | DEFAULT PORT |
| `REDIS_URL` | Openblocks API | - | Redis server URL |
| `MONGODB_URI` | Openblocks API | - | Mongo database connection string	 |
| `JS_EXECUTOR_URI` | Openblocks API | - | Node service URL |
| `ENABLE_USER_SIGN_UP` | Openblocks API | true | Enable registration of new users |
| `CORS_ALLOWED_DOMAINS` | Openblocks API | * | CORS allowed domains	 |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `PORT` | Openblocks Frontend | 3000 | DEFAULT PORT |
| `OPENBLOCKS_API_SERVICE_URL` | Openblocks Frontend | - | Openblocks API service URL |
| `OPENBLOCKS_NODE_SERVICE_URL` | Openblocks Frontend | - | Openblocks Node service (js executor) URL	 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/z-IiRE)
