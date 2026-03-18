# Deploy Hoppscotch on Railway

Open Source API Development Ecosystem

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/2RQWQj)

## About

<p align="center">
    <a href="https://hoppscotch.io">
        <img alt="hoppscotch logo" src="https://avatars.githubusercontent.com/u/56705483" style="width: 200px;">
    </a>
</p>

<b><h3 align="center">Hoppscotch</h3></b>

<b><p align="center">Open Source API Development Ecosystem</p></b>

### Hoppscotch is a lightweight, web-based API development suite.

It was built from the ground up with ease of use and accessibility in mind providing all the functionality needed for API developers with minimalist, unobtrusive UI.

**Notes:**

- This template comes with Email based authentication by default, the first user to log in will be created as an admin. If you wish to change login methods please do that via the admin interface.

- Communication to Postgres is done exclusively over the private network and the database is not exposed externally in any way by default, if you want to enable access from outside of the private network you can go to the databases settings to enable TCP proxying and enter the internal port (5432) the TCP proxy can be again removed at any point to close off external access.

<div align="center">
    <a href="https://hoppscotch.io">
      <picture>
        <source srcset="https://github.com/hoppscotch/hoppscotch/raw/main/packages/hoppscotch-common/public/images/banner-dark.png" media="(prefers-color-scheme: dark)">
        <source srcset="https://github.com/hoppscotch/hoppscotch/raw/main/packages/hoppscotch-common/public/images/banner-light.png" media="(prefers-color-scheme: light)">
        <img src="https://github.com/hoppscotch/hoppscotch/raw/main/packages/hoppscotch-common/public/images/banner-dark.png" alt="Hoppscotch">
      </picture>
    </a>
</div>

_I highly recommend you take a look at the [**Hoppscotch Documentation**](https://docs.hoppscotch.io) to learn more about the app._

### **Features**

❤️ **Lightweight:** Crafted with minimalistic UI design.

⚡️ **Fast:** Send requests and get responses in real time.

🗄️ **HTTP Methods:** Request methods define the type of action you are requesting to be performed.

- `GET` － Requests retrieve resource information
- `POST` － The server creates a new entry in a database
- `PUT` － Updates an existing resource
- `PATCH` － Very similar to `PUT` but makes a partial update on a resource
- `DELETE` － Deletes resource or related component
- `HEAD` － Retrieve response headers identical to those of a GET request, but without the response body.
- `CONNECT` － Establishes a tunnel to the server identified by the target resource
- `OPTIONS` － Describe the communication options for the target resource
- `TRACE` － Performs a message loop-back test along the path to the target resource
- `custom` － Some APIs use custom request methods such as `LIST`. Type in your custom methods.

🌈 **Theming:** Customizable combinations for background, foreground, and accent colors — [customize now](https://hoppscotch.io/settings).

- Choose a theme: System preference, Light, Dark, and Black
- Choose accent colors: Green, Teal, Blue, Indigo, Purple, Yellow, Orange, Red, and Pink
- Distraction-free Zen mode

_Customized themes are synced with your cloud/local session._

🔥 **PWA:** Install as a [Progressive Web App](https://web.dev/progressive-web-apps) on your device.

- Instant loading with Service Workers
- Offline support
- Low RAM/memory and CPU usage
- Add to Home Screen
- Desktop PWA

🚀 **Request:** Retrieve response from endpoint instantly.

1. Choose `method`
2. Enter `URL`
3. Send


- Copy/share public "Share URL"
- Generate/copy request code snippets for 10+ languages and frameworks
- Import `cURL`
- Label requests

🔌 **WebSocket:** Establish full-duplex communication channels over a single TCP connection.

📡 **Server-Sent Events:** Receive a stream of updates from a server over an HTTP connection without resorting to polling.

🌩 **Socket.IO:** Send and Receive data with the SocketIO server.

🦟 **MQTT:** Subscribe and Publish to topics of an MQTT Broker.

🔮 **GraphQL:** GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.

- Set endpoint and get schema
- Multi-column docs
- Set custom request headers
- Query schema
- Get query response

🔐 **Authorization:** Allows to identify the end-user.

- None
- Basic
- Bearer Token
- OAuth 2.0
- OIDC Access Token/PKCE

📢 **Headers:** Describes the format the body of your request is being sent in.

📫 **Parameters:** Use request parameters to set varying parts in simulated requests.

📃 **Request Body:** Used to send and receive data via the REST API.

- Set `Content Type`
- FormData, JSON, and many more
- Toggle between key-value and RAW input parameter list

📮 **Response:** Contains the status line, headers, and the message/response body.

- Copy the response to the clipboard
- Download the response as a file
- View response headers
- View raw and preview HTML, image, JSON, and XML responses

⏰ **History:** Request entries are synced with your cloud/local session storage.

📁 **Collections:** Keep your API requests organized with collections and folders. Reuse them with a single click.

- Unlimited collections, folders, and requests
- Nested folders
- Export and import as a file or GitHub gist

_Collections are synced with your cloud/local session storage._

📜 **Pre-Request Scripts:** Snippets of code associated with a request that is executed before the request is sent.

- Set environment variables
- Include timestamp in the request headers
- Send a random alphanumeric string in the URL parameters
- Any JavaScript functions

👨‍👩‍👧‍👦 **Teams:** Helps you collaborate across your teams to design, develop, and test APIs faster.

- Create unlimited teams
- Create unlimited shared collections
- Create unlimited team members
- Role-based access control
- Cloud sync
- Multiple devices

👥 **Workspaces:** Organize your personal and team collections environments into workspaces. Easily switch between workspaces to manage multiple projects.

- Create unlimited workspaces
- Switch between personal and team workspaces

⌨️ **Keyboard Shortcuts:** Optimized for efficiency.

&gt; **[Read our documentation on Keyboard Shortcuts](https://docs.hoppscotch.io/documentation/features/shortcuts)**

🌐 **Proxy:** Enable Proxy Mode from Settings to access blocked APIs.

- Hide your IP address
- Fixes [`CORS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (Cross-Origin Resource Sharing) issues
- Access APIs served in non-HTTPS (`http://`) endpoints
- Use your Proxy URL

_Official proxy server is hosted by Hoppscotch - **[GitHub](https://github.com/hoppscotch/proxyscotch)** - **[Privacy Policy](https://docs.hoppscotch.io/support/privacy)**._

🌎 **i18n:** Experience the app in your language.

☁️ **Auth + Sync:** Sign in and sync your data in real-time across all your devices.

**Sign in with:**

- GitHub
- Google
- Microsoft
- Email (Default)

**🔄 Synchronize your data:** Handoff to continue tasks on your other devices.

- Workspaces
- History
- Collections
- Environments
- Settings

✅ **Post-Request Tests:** Write tests associated with a request that is executed after the request's response.

- Check the status code as an integer
- Filter response headers
- Parse the response data
- Set environment variables
- Write JavaScript code

🌱 **Environments:** Environment variables allow you to store and reuse values in your requests and scripts.

- Unlimited environments and variables
- Initialize through the pre-request script
- Export as / import from GitHub gist

<details>
  <summary><i>Use-cases</i></summary>

---

- By storing a value in a variable, you can reference it throughout your request section
- If you need to update the value, you only have to change it in one place
- Using variables increases your ability to work efficiently and minimizes the likelihood of error

---

</details>

🚚 **Bulk Edit:** Edit key-value pairs in bulk.

- Entries are separated by newline
- Keys and values are separated by `:`
- Prepend `#` to any row you want to add but keep disabled

🎛️ **Admin dashboard:** Manage your team and invite members.

- Insights
- Manage users
- Manage teams

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Backend | `hoppscotch/hoppscotch-backend` | Web service |
| Admin | `hoppscotch/hoppscotch-admin` | Web service |
| Postgres | `postgres:15` | Database |
| Frontend | `hoppscotch/hoppscotch-frontend` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SMTP_HOST` | Backend | - | The SMTP hostname to be used for Email authentication |
| `JWT_SECRET` | Backend | (secret) | Secret Keys for security purposes |
| `DATABASE_URL` | Backend | - | Private Postgres database URL |
| `GITHUB_SCOPE` | Backend | user:email | GitHub scope |
| `GOOGLE_SCOPE` | Backend | email,profile | Google scope |
| `REDIRECT_URL` | Backend | - | This is a fallback URL to debug when the actual redirects fail |
| `SMTP_PASSWORD` | Backend | (secret) | The Email accounts' password to be used for Email authentication |
| `SMTP_USERNAME` | Backend | (secret) | The Email accounts' username to be used for Email authentication |
| `VITE_BASE_URL` | Backend | - | This is the URL where your Frontend deployment will be accessible from |
| `PGHOST_PRIVATE` | Backend | - | Private Postgres host used in liveness check |
| `PGPORT_PRIVATE` | Backend | - | Private Postgres port used in liveness check |
| `RATE_LIMIT_MAX` | Backend | 100 | The maximum number of requests that Hoppscotch can handle under `RATE_LIMIT_TTL` |
| `RATE_LIMIT_TTL` | Backend | 60 | The time it takes to refresh the maximum number of requests being received |
| `SESSION_SECRET` | Backend | (secret) | Secret Keys for security purposes |
| `VITE_ADMIN_URL` | Backend | - | This is the URL where your Admin dashboard will be accessible from |
| `MAILER_SMTP_URL` | Backend | - | The SMTP URL for email delivery |
| `MICROSOFT_SCOPE` | Backend | user.read | Microsoft scope |
| `MICROSOFT_TENANT` | Backend | common | Microsoft tenant |
| `VITE_APP_TOS_LINK` | Backend | - | Terms Of Service And Privacy Policy Links |
| `GITHUB_CALLBACK_URL` | Backend | - | GitHub callback URL. |
| `GOOGLE_CALLBACK_URL` | Backend | - | Google callback URL |
| `MAILER_ADDRESS_FROM` | Backend | - | The email address that you would be using |
| `VITE_BACKEND_WS_URL` | Backend | - | This is the websocket URL and path for the GraphQL API |
| `WHITELISTED_ORIGINS` | Backend | - | URLs of Hoppscotch backend, admin dashboard, and the frontend app |
| `VITE_BACKEND_API_URL` | Backend | - | This is the URL and path for the API |
| `VITE_BACKEND_GQL_URL` | Backend | - | This is the URL and path for the GraphQL API |
| `ACCESS_TOKEN_VALIDITY` | Backend | (secret) | 7 days - Validity of the refresh token for auth (in ms) |
| `TOKEN_SALT_COMPLEXITY` | Backend | (secret) | Defines the complexity of the SALT that is used for hashing |
| `MICROSOFT_CALLBACK_URL` | Backend | - | Microsoft callback URL |
| `REFRESH_TOKEN_VALIDITY` | Backend | (secret) | 7 days - Validity of the refresh token for auth (in ms) |
| `VITE_SHORTCODE_BASE_URL` | Backend | - | A URL to generate shortcodes for sharing |
| `MAGIC_LINK_TOKEN_VALIDITY` | Backend | (secret) | Duration of the validity of the magic link being sent to sign in to Hoppscotch (in days) |
| `VITE_ALLOWED_AUTH_PROVIDERS` | Backend | GOOGLE,GITHUB,MICROSOFT,EMAIL | Allows you to specify which auth providers you want to enable |
| `VITE_APP_PRIVACY_POLICY_LINK` | Backend | - | Terms Of Service And Privacy Policy Links |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Backend | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `PORT` | Admin | 3100 | The internal port that the Admin console runs on |
| `JWT_SECRET` | Admin | (secret) | Secret Keys for security purposes |
| `DATABASE_URL` | Admin | - | Private Postgres database URL |
| `GITHUB_SCOPE` | Admin | - | GitHub scope |
| `GOOGLE_SCOPE` | Admin | - | Google Scope |
| `REDIRECT_URL` | Admin | - | This is a fallback URL to debug when the actual redirects fail |
| `VITE_BASE_URL` | Admin | - | This is the URL where your Frontend deployment will be accessible from |
| `RATE_LIMIT_MAX` | Admin | - | The maximum number of requests that Hoppscotch can handle under `RATE_LIMIT_TTL` |
| `RATE_LIMIT_TTL` | Admin | - | The time it takes to refresh the maximum number of requests being received |
| `SESSION_SECRET` | Admin | (secret) | Secret Keys for security purposes |
| `VITE_ADMIN_URL` | Admin | - | This is the URL where your Admin dashboard will be accessible from |
| `MAILER_SMTP_URL` | Admin | - | The SMTP URL for email delivery |
| `MICROSOFT_SCOPE` | Admin | - | Microsoft scope |
| `MICROSOFT_TENANT` | Admin | - | Microsoft tenant |
| `VITE_APP_TOS_LINK` | Admin | - | Terms Of Service And Privacy Policy Links |
| `GITHUB_CALLBACK_URL` | Admin | - | GitHub callback URL |
| `GOOGLE_CALLBACK_URL` | Admin | - | Google callback URL |
| `MAILER_ADDRESS_FROM` | Admin | - | The email address that you would be using |
| `VITE_BACKEND_WS_URL` | Admin | - | This is the websocket URL and path for the GraphQL API |
| `WHITELISTED_ORIGINS` | Admin | - | URLs of Hoppscotch backend, admin dashboard, and the frontend app |
| `VITE_BACKEND_API_URL` | Admin | - | This is the URL and path for the API |
| `VITE_BACKEND_GQL_URL` | Admin | - | This is the URL and path for the GraphQL API |
| `ACCESS_TOKEN_VALIDITY` | Admin | (secret) | Validity of the access token for auth (in ms) |
| `TOKEN_SALT_COMPLEXITY` | Admin | (secret) | Defines the complexity of the SALT that is used for hashing |
| `MICROSOFT_CALLBACK_URL` | Admin | - | Microsoft callback URL |
| `REFRESH_TOKEN_VALIDITY` | Admin | (secret) | Validity of the refresh token for auth (in ms) |
| `VITE_SHORTCODE_BASE_URL` | Admin | - | A URL to generate shortcodes for sharing |
| `MAGIC_LINK_TOKEN_VALIDITY` | Admin | (secret) | Duration of the validity of the magic link being sent to sign in to Hoppscotch (in days) |
| `VITE_ALLOWED_AUTH_PROVIDERS` | Admin | - | Allows you to specify which auth providers you want to enable |
| `VITE_APP_PRIVACY_POLICY_LINK` | Admin | - | Terms Of Service And Privacy Policy Links |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Admin | true | <a href="https://docs.railway.app/guides/private-networking#workaround-for-alpine-based-images">Workaround for Alpine-based images</a> |
| `POSTGRES_DB` | Postgres | railway | Default database |
| `DATABASE_URL` | Postgres | - | Public database URL |
| `POSTGRES_USER` | Postgres | (secret) | Database username |
| `PGHOST_PRIVATE` | Postgres | - | Private host |
| `PGPORT_PRIVATE` | Postgres | 5432 | Private port |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password |
| `DATABASE_PRIVATE_URL` | Postgres | - | Private URL |
| `PORT` | Frontend | 3000 | The internal port that the Frontend runs on |
| `VITE_BASE_URL` | Frontend | - | This is the URL where your deployment will be accessible from |
| `VITE_ADMIN_URL` | Frontend | - | This is the URL where your Admin dashboard will be accessible from |
| `VITE_APP_TOS_LINK` | Frontend | https://docs.hoppscotch.io/support/terms | Terms Of Service And Privacy Policy Links (Optional) |
| `VITE_BACKEND_WS_URL` | Frontend | - | This is the websocket URL and path for the GraphQL API |
| `VITE_BACKEND_API_URL` | Frontend | - | This is the URL and path for the API |
| `VITE_BACKEND_GQL_URL` | Frontend | - | This is the URL and path for the GraphQL API |
| `VITE_SHORTCODE_BASE_URL` | Frontend | - | A URL to generate shortcodes for sharing |
| `VITE_APP_PRIVACY_POLICY_LINK` | Frontend | https://docs.hoppscotch.io/support/privacy | Terms Of Service And Privacy Policy Links (Optional) |

## Configuration

- **Start command:** `/bin/sh -c "echo 'Waiting for database...'; while ! nc -z ${PGHOST_PRIVATE} ${PGPORT_PRIVATE}; do sleep 1; done;pnpx prisma migrate deploy && while true; do pnpm run start:prod; done"`
- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/2RQWQj)
