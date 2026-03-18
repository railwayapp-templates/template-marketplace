# Deploy HeyForm on Railway

HeyForm is an open-source form builder

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/qmXJnq)

## About

HeyForm is an open-source form builder that allows anyone to create engaging conversational forms for surveys, questionnaires, quizzes, and polls. No coding skills required.

## Features

HeyForm simplifies the creation of conversational forms, making it accessible for anyone to gather information or feedback through engaging surveys, quizzes, and polls. We are committed to enhancing HeyForm with regular updates, including bug fixes, new features, and performance improvements.

### Build Forms with Ease

- 📝 **Versatile Inputs**: From basic text, email, and phone number fields to advanced options like picture choices, date pickers, and file uploads, HeyForm supports a wide array of input types.
- 🧠 **Smart Logic**: Conditional logic and URL redirections for dynamic, adaptable forms.
- 🔗 **Powerful Integrations**: Connect with webhooks, analytics, marketing platforms, and tools like Zapier and Make.com.

### Customize to Your Brand

- 🎨 **Visual Themes**: Tailor the look and feel of your forms to match your brand identity with customizable fonts, colors, backgrounds, and more.
- ✨ **Advanced Theming**: Gain greater control with extensive customization options, including custom CSS for deeper personalization.

### Analyze and Act on Data

- 📊 **Insightful Analytics**: Gain insights with detailed analytics, including drop-off rates and completion rates.
- 📤 **Data Export**: Easily export your form results to CSV for further analysis or integration into your systems.

## License

HeyForm is open-source under the GNU Affero General Public License v3.0 (AGPL-3.0), you will find more information about the license and how to comply with it [here](https://docs.heyform.net/open-source/license).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| HeyForm | `heyform/community-edition` | Web service |
| MongoDB | `mongo:7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `PORT` | HeyForm | 8000 | Just exists |
| `MONGO_URI` | HeyForm | - | Mongo URI |
| `REDIS_HOST` | HeyForm | - | Redis host |
| `REDIS_PORT` | HeyForm | - | Redis port |
| `SESSION_KEY` | HeyForm | - | Session encryption key |
| `REDIS_PASSWORD` | HeyForm | (secret) | Redis password |
| `APP_HOMEPAGE_URL` | HeyForm | - | Website homepage URL |
| `FORM_ENCRYPTION_KEY` | HeyForm | - | Form encryption key |
| `MONGOHOST` | MongoDB | - | Railway Private Domain Name. |
| `MONGOPORT` | MongoDB | 27017 | MongoDB Port. |
| `MONGOUSER` | MongoDB | - | Mongodb user. |
| `MONGO_URL` | MongoDB | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | MongoDB | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | MongoDB | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | MongoDB | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | MongoDB | (secret) | User created during initialization, given the root role. |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Start command:** `npm run start`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** Other

[View on Railway →](https://railway.com/deploy/qmXJnq)
