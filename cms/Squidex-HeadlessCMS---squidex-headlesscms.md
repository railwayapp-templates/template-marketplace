# Deploy Squidex HeadlessCMS on Railway

Deploy a headless cms with ease

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/squidex-headlesscms)

## About

Hosting Squidex HeadlessCMS on Railway is straightforward and efficient. The deployment includes Squidex itself, a MongoDB database to persist data, and the Squidex Resizer service to handle asset transformations (e.g., image resizing). Once deployed, you can manage content via the Squidex UI, serve APIs for your frontend applications, and scale horizontally as your application grows. Railway manages environment variables, networking, and scaling so you can focus on building your product rather than infrastructure.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| squidex | `squidex/squidex:7` | Web service |
| resizer | `squidex/resizer` | Worker |
| mongo | `mongo:8.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PLUGINS__0` | squidex | Squidex.Extensions.dll | Define optional paths to plugins. |
| `STORE__TYPE` | squidex | MongoDb | Define the type of the read store. SUPPORTED: MongoDb, Sql |
| `UI__DISABLE` | squidex | false | Admin UI disable |
| `ROBOTS__TEXT` | squidex | User-agent: *\nAllow: /api/assets/* | The text for the robots.txt file |
| `UI__HIDENEWS` | squidex | false | Hide the news dialog. |
| `UI__SHOWINFO` | squidex | true | Show the exposed values as information on the apps overview page. |
| `LOGGING__NAME` | squidex | Squidex | The name that is used for monitoring. |
| `NEWS__APPNAME` | squidex | squidex-website | The app name where the news are stored. |
| `NOTIFO__APPID` | squidex | - | The ID of the app in notifo. Configure notifo if you want to have support for custom notifications. |
| `REBUILD__APPS` | squidex | false | Set to true to rebuild apps. |
| `UI__MAP__TYPE` | squidex | OSM | Define the type of the geolocation service. SUPPORTED: GoogleMaps, OSM |
| `URLS__BASEURL` | squidex | - | The base URL under which Squidex is running. It is used to generate hyperlinks and to make redirects with the correct host name. In some environments, Squidex is running behind several proxies, e.g. cloudflare, google load balancer and so on. In these cases the original host name might get lost. Therefore we introduced this configuration value. |
| `FULLTEXT__TYPE` | squidex | default | Define the type of the full text store. SUPPORTED: elastic (ElasticSearch), azure (Azure Cognitive Search), default. Default: default |
| `LOGGING__HUMAN` | squidex | true | Setting the flag to true, enables well formatteds json logs. |
| `LOGGING__LEVEL` | squidex | Information | The log level of the implementation adapter. Trace, Debug, Information, Warning, Error, Fatal |
| `NEWS__CLIENTID` | squidex | squidex-website:default | The credentials to the app (Readonly). |
| `NOTIFO__APIKEY` | squidex | - | The API key for your app in notifo. |
| `NOTIFO__APIURL` | squidex | https://app.notifo.io | The API URL. |
| `REBUILD__RULES` | squidex | false | Set to true to rebuild rules. |
| `REBUILD__TEAMS` | squidex | false | Set to true to rebuild teams. |
| `URLS__BASEPATH` | squidex | - | The base path when running Squidex behind a reverse proxy like nginx under a subfolder / subpath. |
| `ASSETS__MAXSIZE` | squidex | 5242880 | The maximum file size in bytes. Default: 5MB |
| `DEEPDETECT__URL` | squidex | - | Deepdetect configuration |
| `LOGGING__COLORS` | squidex | true | Set to true, to use colors. |
| `MESSAGING__TYPE` | squidex | MongoDb | - |
| `REBUILD__ASSETS` | squidex | false | Set to true to rebuild assets. |
| `UI__HIDEINDEXES` | squidex | false | Hide the indexes UI. |
| `ASSETSTORE__TYPE` | squidex | Folder | Define the type of the read store. SUPPORTED: Folder (local folder), MongoDb (GridFS), GoogleCloud (hosted in Google Cloud only), AzureBlob, AmazonS3, FTP (not recommended). |
| `ASSETS__CANCACHE` | squidex | true | True to enable memory caching. This is only supported in GraphQL with the @cache(duration: 1000) directive. |
| `CLUSTERING__MODE` | squidex | - | Until version 7, Squidex uses Microsoft Orleans for clustering. It is technology, which was written for online games, such as Halo. With Orleans you develop small classes that are deployed automatically to a cluster of nodes. To enable clustering you have to set this setting to Mongo, which means that a MongoDB table is used to store the state of the cluster. |
| `EVENTSTORE__TYPE` | squidex | MongoDB | - |
| `MODE__ISREADONLY` | squidex | false | Use this flag to set Squidex to readonly, e.g. when you deploy a second instance for migration. |
| `REBUILD__SCHEMAS` | squidex | false | Set to true to rebuild schemas. |
| `EMAIL__SMTP__PORT` | squidex | 587 | The port to your email server. |
| `IDENTITY__SHOWPII` | squidex | true | Set to true to show PII (Personally Identifiable Information) in the logs. |
| `LANGUAGES__CUSTOM` | squidex | - | Use custom languages where the key is the language code and the value is the english name. |
| `REBUILD__CONTENTS` | squidex | false | Set to true to rebuild contents. |
| `TWITTER__CLIENTID` | squidex | QZhb3HQcGCvE6G8yNNP9ksNet | The client information for twitter. |
| `URLS__ENFORCEHOST` | squidex | false | Set it to true to return a 400 if the host does not match. |
| `ASSETS__MAXRESULTS` | squidex | 200 | The maximum number of items to return for each query. Warning: Use pagination and not large number of items. |
| `CLUSTERING__WORKER` | squidex | true | Defines whether the current instance is a worker. You should have only one worker in your deployment. |
| `CONTENTS__CANCACHE` | squidex | true | True to enable memory caching. This is only supported in GraphQL with the @cache(duration: 1000) directive. |
| `IDENTITY__OIDCNAME` | squidex | OIDC | Settings for your custom oidc server. |
| `NEWS__CLIENTSECRET` | squidex | (secret) | The credentials to the app (Readonly). |
| `UI__HIDEONBOARDING` | squidex | false | Hide all onboarding tooltips and dialogs. |
| `URLS__ENFORCEHTTPS` | squidex | false | Set it to true to redirect the user from http to https permanently. |
| `URLS__KNOWNPROXIES` | squidex | [] | A list of known proxies to make forward headers safer. |
| `ASSETS__TIMEOUTFIND` | squidex | 00:00:01 | The timeout when searching for single items in the database. |
| `CACHING__STRONGETAG` | squidex | false | Set to true, to use strong etags. |
| `EMAIL__SMTP__SENDER` | squidex | hello@squidex.io | The sender email address. |
| `EMAIL__SMTP__SERVER` | squidex | - | The host name to your email server. |
| `IDENTITY__ADMINAPPS` | squidex | [] | The apps which should be visible on the dashboard for the admin. |
| `REBUILD__ASSETFILES` | squidex | false | Set to true to create dummy asset files if they do not exist. Useful when a backup fail. |
| `STORE__SQL__VERSION` | squidex | 9.2.0-mysql | The version of the MySQL server. For MySQL - Ensure that: Version is set correctly, Server is initialized with --log-bin-trust-function-creators=1, Server is initialized with --local-infile=1 (for bulk inserts), Connection String has: AllowLoadLocalInfile=true |
| `UI__HIDEDATEBUTTONS` | squidex | false | Hide the today and now button. |
| `UI__REDIRECTTOLOGIN` | squidex | (secret) | Redirect to login automatically. |
| `URLS__TRUSTEDHOSTED` | squidex | [] | A list of trusted hosts for redirects. |
| `ASSETS__FOLDERPERAPP` | squidex | false | Create one folder per app. WARNING: If you change this parameter, previous assets are not available anymore. |
| `ASSETS__TIMEOUTQUERY` | squidex | 00:00:05 | The timeout when searching for multiple items in the database. |
| `COMPRESSION__ENABLED` | squidex | false | Enables compression. |
| `CONTENTS__MAXRESULTS` | squidex | 200 | The maximum number of items to return for each query. Warning: Use pagination and not large number of items. |
| `IDENTITY__ADMINEMAIL` | squidex | - | The email address of the admin user. You can also set the admin email with the initial setup screen. |
| `IDENTITY__OIDCCLIENT` | squidex | - | Settings for your custom oidc server. |
| `IDENTITY__OIDCPROMPT` | squidex | null | - |
| `IDENTITY__OIDCSECRET` | squidex | (secret) | Settings for your custom oidc server. |
| `IDENTITY__PRIVACYURL` | squidex | https://squidex.io/privacy | The url to you privacy statements, if you host squidex by yourself. |
| `LOGGING__LOGREQUESTS` | squidex | true | Set to false to disable logging of http requests. |
| `SQUIDEX_GITHUBCLIENT` | squidex | - | Set to empty to disable authentication with third party providers. |
| `SQUIDEX_GITHUBSECRET` | squidex | (secret) | - |
| `SQUIDEX_GOOGLECLIENT` | squidex | - | Set to empty to disable authentication with third party providers. |
| `SQUIDEX_GOOGLESECRET` | squidex | (secret) | - |
| `STORE__SQL__PROVIDER` | squidex | Postgres | The database provider. SUPPORTED: MySql, Postgres, SqlServer |
| `APPS__DELETEPERMANENT` | squidex | false | True to delete apps permanently. This process can take a while and is executed in the background. |
| `ASSETSTORE__FTP__PATH` | squidex | Assets | The relative or absolute path to the folder to store the assets. |
| `ASSETS__ALLOWAVIFAUTO` | squidex | false | Deliver the assets in AVIG format automatically if the browser supports that. WARNING: If you change this feature from false to true, you might experience a performance spike the images are getting prepared. |
| `ASSETS__ALLOWWEBPAUTO` | squidex | true | Deliver the assets in WEBP format automatically if the browser supports that. WARNING: If you change this feature from false to true, you might experience a performance spike the images are getting prepared. |
| `CONTENTS__TIMEOUTFIND` | squidex | 00:00:01 | The timeout when searching for single items in the database. |
| `DIAGNOSTICS__DUMPTOOL` | squidex | - | The path to the dotnet-dump tool binary. REMARKS: Will be set automatically in the official Docker image. |
| `EMAIL__SMTP__PASSWORD` | squidex | (secret) | The password to authenticate to your email server. |
| `EMAIL__SMTP__USERNAME` | squidex | (secret) | The username to authenticate to your email server |
| `LOGGING__STOREENABLED` | squidex | true | False to disable the log store. |
| `TWITTER__CLIENTSECRET` | squidex | (secret) | The client information for twitter. |
| `CHATBOT__OPENAI__MODEL` | squidex | gpt-3.5-turbo-0125 | The chat model. |
| `COMPRESSION__LEVELGZIP` | squidex | Fastest | The compression level for gzip. SUPPORTED: Fastest (default), OptimOptimal, SmallestSize, NoCompression |
| `CONTENTS__TIMEOUTQUERY` | squidex | 00:00:05 | The timeout when searching for multiple items in the database. |
| `EMAIL__SMTP__ENABLESSL` | squidex | true | Always use SSL if possible. |
| `GRAPHQL__CACHEDURATION` | squidex | 00:10:00 | Defines how long the graphl schema is cached. Default: 10 min. |
| `IDENTITY__OIDCERRORMAP` | squidex | null | - |
| `LOGGING__OTLP__ENABLED` | squidex | false | True, to enable OpenTelemetry Protocol integration. |
| `ASSETS__DEFAULTPAGESIZE` | squidex | 200 | The default page size if not specified by a query. Warning: Can slow down queries if increased. |
| `ASSETS__DELETEPERMANENT` | squidex | false | True to delete assets files permanently. |
| `ASSETS__DELETERECURSIVE` | squidex | true | True to delete assets recursively. |
| `CHATBOT__OPENAI__APIKEY` | squidex | - | The OpenAI API Key. |
| `DIAGNOSTICS__GCDUMPTOOL` | squidex | - | The path to the dotnet-gcdump tool binary. REMARKS: Will be set automatically in the official Docker image. |
| `FULLTEXT__AZURE__APIKEY` | squidex | - | The api key. See link https://docs.microsoft.com/en-us/azure/search/search-create-service-portal#get-a-key-and-url-endpoint. |
| `IDENTITY__ADMINCLIENTID` | squidex | - | Client with all admin permissions. |
| `IDENTITY__ADMINPASSWORD` | squidex | (secret) | The password of the admin user (Must contain lowercase, uppercase letter, number and special character). You can also set the admin password with the initial setup screen. |
| `IDENTITY__ADMINRECREATE` | squidex | true | Recreate the admin if it does not exist or the password does not match. |
| `IDENTITY__OIDCAUTHORITY` | squidex | - | Settings for your custom oidc server. |
| `IDENTITY__OIDCSCOPES__0` | squidex | email | Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions by default contains scopes "openid" and "profile". |
| `KAFKA__BOOTSTRAPSERVERS` | squidex | - | Kafka producer configuration |
| `LOGGING__OTLP__ENDPOINT` | squidex | - | The endpoint to the agent. |
| `LOGGING__OTLP__SAMPLING` | squidex | 1.0 | The sample rate as double. 0.5 writes every second trace. |
| `RULES__JOBQUERYINTERVAL` | squidex | 00:00:10 | How often the rule jobs are queried for updated. Must be greater than zero. |
| `SQUIDEX_MICROSOFTCLIENT` | squidex | - | Set to empty to disable authentication with third party providers. |
| `SQUIDEX_MICROSOFTSECRET` | squidex | (secret) | - |
| `ASSETSTORE__FOLDER__PATH` | squidex | Assets | The relative or absolute path to the folder to store the assets. |
| `COMPRESSION__LEVELBROTLI` | squidex | Fastest | The compression level for brotli. SUPPORTED: Fastest (default), OptimOptimal, SmallestSize, NoCompression |
| `LOGGING__ZIPKIN__ENABLED` | squidex | false | True, to enable Zipkin integration. |
| `SCHEMAS__DELETEPERMANENT` | squidex | false | True to delete schemas and the content permanently. This process can take a while and is executed in the background. |
| `SCRIPTING__TIMEOUTSCRIPT` | squidex | 00:00:00.200 | The timeout for the synchronous part of the script. |
| `STORE__MONGODB__DATABASE` | squidex | Squidex | The database for all your other read collections. |
| `STORE__SQL__RUNMIGRATION` | squidex | true | Run the migration. |
| `UI__MAP__GOOGLEMAPS__KEY` | squidex | AIzaSyB_Z8l3nwUxZhMJykiDUJy6bSHXXlwcYMg | The optional google maps API key. CREATE YOUR OWN PLEASE. |
| `ASSETSTORE__FTP__PASSWORD` | squidex | (secret) | Credentials. |
| `ASSETSTORE__FTP__USERNAME` | squidex | (secret) | Credentials. |
| `CONTENTS__DEFAULTPAGESIZE` | squidex | 200 | The default page size if not specified by a query. Warning: Can slow down queries if increased. |
| `CONTENTS__USETRANSACTIONS` | squidex | false | False to not use transactions. Improves performance. Warning: Can cause consistency issues. |
| `LOGGING__ZIPKIN__ENDPOINT` | squidex | http://localhost:9411/api/v2/spans | Application Insights Configuration |
| `RULES__RULESCACHEDURATION` | squidex | 00:00:10 | The cache duration for rules. |
| `SCRIPTING__TIMEOUTPROMISE` | squidex | 00:00:04 | The timeout for the asynchronous promise of the script. |
| `UI__REGEXSUGGESTIONS__URL` | squidex | ^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:\\/? | %[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$ # Regex for urls. |
| `DIAGNOSTICS__GC__THRESHOLD` | squidex | 8192 | The maximum number of megabyte that the process can consume until it is marked as not healthy. |
| `FULLTEXT__AZURE__INDEXNAME` | squidex | squidex | The name of the index. |
| `IDENTITY__OIDCRESPONSETYPE` | squidex | id_token | or "code" |
| `LOGGING__LOGLEVEL__DEFAULT` | squidex | Information | The log level of the default log adapter. |
| `LOGGING__LOGLEVEL__RUNTIME` | squidex | Warning | - |
| `UI__HIDEDATETIMEMODEBUTTON` | squidex | false | Hide the Local/UTC button |
| `UI__REGEXSUGGESTIONS__SLUG` | squidex | ^[a-z0-9]+(\\-[a-z0-9]+)*$ | Regex for slugs (e.g. hello-world). |
| `URLS__ENABLEFORWARDHEADERS` | squidex | true | Set it to true to use the X-Forwarded- headers for host name and scheme. |
| `ASSETSTORE__EXPOSESOURCEURL` | squidex | false | Allow to expose the url in GraphQL URL. |
| `ASSETSTORE__FTP__SERVERHOST` | squidex | - | The host of the ftp service |
| `ASSETSTORE__FTP__SERVERPORT` | squidex | 21 | The host of the ftp service |
| `ASSETSTORE__MONGODB__BUCKET` | squidex | fs | The name of the Mongo Grid FS bucket. |
| `CACHING__REPLICATED__ENABLE` | squidex | true | OBSOLETE - Set to true to enable a replicated cache for app, schemas and rules. Increases performance but reduces consistency. This setting is obsolete and has been replaced with caching:apps:cacheDuration and caching:schemas:cacheDuration |
| `COMPRESSION__ENABLEFORHTTPS` | squidex | true | Indicates if responses over HTTPS connections should be compressed. |
| `IDENTITY__ADMINCLIENTSECRET` | squidex | (secret) | Client with all admin permissions. |
| `IDENTITY__ALLOWPASSWORDAUTH` | squidex | (secret) | Enable password auth. Set this to false if you want to disable local login, leaving only 3rd party login options. |
| `IDENTITY__LOCKAUTOMATICALLY` | squidex | false | Lock new users automatically, the administrator must unlock them. |
| `SCRIPTING__TIMEOUTEXECUTION` | squidex | 00:00:04 | The timeout for the whole script execution. |
| `UI__ONLYADMINSCANCREATEAPPS` | squidex | true | With your setup, only admins can create new apps. If you want to change this set false |
| `UI__REGEXSUGGESTIONS__EMAIL` | squidex | ^[a-zA-Z0-9.!#$%&’*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$ | $%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$ # Regex for emails. |
| `UI__REGEXSUGGESTIONS__PHONE` | squidex | ^\\(*\\+*[1-9]{0,3}\\)*-*[1-9]{0,3}[-. /]*\\(*[2-9]\\d{2}\\)*[-. /]*\\d{3}[-. /]*\\d{4} *e*x*t*\\.* *\\d{0,4}$ | Regex for phone numbers. |
| `ASSETSTORE__AMAZONS3__BUCKET` | squidex | squidex-test | The name of your bucket. |
| `CACHING__APPS__CACHEDURATION` | squidex | 00:00:00 | The cache duration for apps. |
| `DIAGNOSTICS__DUMPTRIGGERINMB` | squidex | 0 | When more memory is allocated that the defined value (in MB) a dump will be created once automatically and written to the asset store. |
| `FULLTEXT__ELASTIC__INDEXNAME` | squidex | squidex | The name of the index. |
| `GRAPHQL__DATALOADERBATCHSIZE` | squidex | 1000 | The batch size of the data loader. HINT: Can be overriden with the X-BatchSize header up to a maximum of 5000. |
| `GRAPHQL__ENABLESUBSCRIPTIONS` | squidex | true | Enables subscriptions. |
| `IDENTITY__ALLOWCUSTOMDOMAINS` | squidex | true | Enable custom domains and oidc settings for teams. |
| `STORE__SQL__CONNECTIONSTRING` | squidex | - | The connection string to your database. |
| `TRANSLATIONS__DEEPL__AUTHKEY` | squidex | - | The deepl api key if you want to support automated translations. |
| `UI__ONLYADMINSCANCREATETEAMS` | squidex | true | With your setup, only admins can create new teams. If you want to change this set false |
| `ASSETSTORE__FTP__CREATEFOLDER` | squidex | true | To create the subfolder if it does not exist. Set it to false it the Squidex process has limited permissions. |
| `ASSETSTORE__MONGODB__DATABASE` | squidex | SquidexAssets | The name of the event store database. |
| `CACHING__MAXSURROGATEKEYSSIZE` | squidex | 0 | Restrict the surrogate keys to the number of characters. |
| `DIAGNOSTICS__GCUMPTRIGGERINMB` | squidex | 0 | When more memory is allocated than the defined value (in MB) a gcdump will be created once automatically and written to the asset store. |
| `EVENTSTORE__MONGODB__DATABASE` | squidex | Squidex | The name of the event store database. |
| `EXPOSEDCONFIGURATION__VERSION` | squidex | squidex:version | A list of configuration values that should be exposed from the info endpoint and in the UI. |
| `FULLTEXT__ELASTIC__OPENSEARCH` | squidex | false | True, to use the Open Search client. |
| `LOGGING__LOGLEVEL__OPENIDDICT` | squidex | Warning | Only logs issued tokens and general request information. |
| `LOGGING__STACKDRIVER__ENABLED` | squidex | false | True, to enable stackdriver integration. |
| `LOGGING__STORERETENTIONINDAYS` | squidex | 90 | The number of days request log items will be stored. |
| `STORE__MONGODB__ATLAS__GROUPID` | squidex | - | The organization id. |
| `STORE__MONGODB__TEXTSHARDCOUNT` | squidex | 0 | Defines the number of collections for texts. |
| `ASSETSTORE__AMAZONS3__ACCESSKEY` | squidex | <MY_KEY> | The access key for your user. Read More: https://supsystic.com/documentation/id-secret-access-key-amazon-s3/ |
| `ASSETSTORE__AMAZONS3__SECRETKEY` | squidex | (secret) | The secret key for your user. Read More: https://supsystic.com/documentation/id-secret-access-key-amazon-s3/ |
| `ASSETSTORE__GOOGLECLOUD__BUCKET` | squidex | squidex-assets | The name of the bucket in google cloud store. |
| `CACHING__SCHEMAS__CACHEDURATION` | squidex | 00:00:00 | The cache duration for schemas. |
| `EMAIL__NOTIFICATIONS__USAGEBODY` | squidex | Dear User,\r\n\r\nYou are about to reach your usage limit for App $APP_NAME at Squidex Headless CMS.\r\n\r\nYou have already used $API_CALLS of your monthly limit of $API_CALLS_LIMIT API calls.\r\n\r\nPlease check your clients or upgrade your plan!\r\n\r\n<<Go to Squidex!>> [$UI_URL] | The email body when app usage reached |
| `LOGGING__STACKDRIVER__PROJECTID` | squidex | - | The ID of your Google Cloud project. |
| `STORE__MONGODB__ASSETSHARDCOUNT` | squidex | 0 | Defines the number of collections for assets. |
| `STORE__MONGODB__CONTENTDATABASE` | squidex | SquidexContent | The database for all your content collections (one collection per app). |
| `UI__REFERENCESDROPDOWNITEMCOUNT` | squidex | 100 | The number of content items for dropdown selector. |
| `ASSETSTORE__AMAZONS3__REGIONNAME` | squidex | eu-central-1 | The region name of your bucket. |
| `ASSETSTORE__AMAZONS3__SERVICEURL` | squidex | - | The url of the S3 API service. Leave it empty if using the one provided by Amazon |
| `ASSETSTORE__FOLDER__CREATEFOLDER` | squidex | true | To create the subfolder if it does not exist. Set it to false it the Squidex process has limited permissions. |
| `CONTENTS__OPTIMIZEFORSELFHOSTING` | squidex | false | True to enable an optimization for self hosting. Creates one database per app and one collection per schema. Slows down inserts, but you can create custom indexes. |
| `FULLTEXT__AZURE__SERVICEENDPOINT` | squidex | https://<name>.search.windows.net | The URL to your azure search instance. Read More: https://docs.microsoft.com/en-us/azure/search/search-create-service-portal#get-a-key-and-url-endpoint |
| `FULLTEXT__ELASTIC__CONFIGURATION` | squidex | http://localhost:9200 | The configuration to your elastic search cluster. Read More: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/client-configuration.html |
| `RULES__EXECUTIONTIMEOUTINSECONDS` | squidex | 10 | The timeout to execute rule actions. |
| `STORE__MONGODB__ATLAS__PUBLICKEY` | squidex | - | Credentials to your account. |
| `EMAIL__NOTIFICATIONS__NEWUSERBODY` | squidex | Welcome to Squidex\r\nDear User,\r\n\r\n$ASSIGNER_NAME ($ASSIGNER_EMAIL) has invited you to join Project (also called an App) $APP_NAME at Squidex Headless CMS. Login with your GitHub, Google or Microsoft credentials to create a new user account and start editing content now.\r\n\r\nThank you very much,\r\nThe Squidex Team\r\n\r\n<<Start now!>> [$UI_URL] | The email body when a new user is added as contributor to an app. |
| `IDENTITY__OIDCDISABLEPROFILESCOPE` | squidex | false | When oidcDisableProfileScope is set to true scope "profile" will be removed. |
| `STORE__MONGODB__ATLAS__PRIVATEKEY` | squidex | - | Credentials to your account. |
| `STORE__MONGODB__CONTENTSHARDCOUNT` | squidex | 0 | Defines the number of collections for contents. |
| `ASSETSTORE__AMAZONS3__BUCKETFOLDER` | squidex | squidex-assets | The optional folder within the bucket. |
| `ASSETSTORE__MONGODB__CONFIGURATION` | squidex | mongodb://localhost | The connection string to your Mongo Server. Read More: https://docs.mongodb.com/manual/reference/connection-string/ |
| `EMAIL__NOTIFICATIONS__USAGESUBJECT` | squidex | [Squidex CMS] You are about to reach your usage limit for App $APP_NAME | The email subject when app usage reached |
| `EVENTSTORE__MONGODB__CONFIGURATION` | squidex | - | Squidex Configuration - Environment Variables |
| `STORE__MONGODB__ATLAS__CLUSTERNAME` | squidex | - | The name of the cluster. |
| `TEMPLATES__REPOSITORIES__0__GITURL` | squidex | https://github.com/Squidex/templates.git | The url to the git repository. |
| `ASSETSTORE__AZUREBLOB__CREATEFOLDER` | squidex | true | To create the subfolder if it does not exist. Set it to false it the Squidex process has limited permissions. |
| `STORE__MONGODB__VALUEREPRESENTATION` | squidex | Undefined | Defines how key-value-store values are represented in MongoDB (e.g. app, rule, schema). SUPPORTED: Document, String, Binary (from slow to fast). |
| `TRANSLATIONS__DEEPL__MAPPING__ZH-CN` | squidex | zh-CN | Google Cloud Configuration |
| `TRANSLATIONS__DEEPL__MAPPING__ZH-TW` | squidex | zh-TW | - |
| `ASSETSTORE__AMAZONS3__FORCEPATHSTYLE` | squidex | false | Force path style property for AmazonS3Config |
| `ASSETSTORE__AZUREBLOB__CONTAINERNAME` | squidex | squidex-assets | The name of the container in the Azure Blob Storage |
| `CHATBOT__DEFAULTS__SYSTEMMESSAGES__0` | squidex | You are a bot to help with all support requests related to Squidex. | - |
| `CHATBOT__DEFAULTS__SYSTEMMESSAGES__1` | squidex | Say hello to the user and explain him about your capabilities in a single, short sentence. | Image Configuration |
| `EMAIL__NOTIFICATIONS__NEWUSERSUBJECT` | squidex | You have been invited to join Project $APP_NAME at Squidex CMS | The email subject when a new user is added as contributor to an app. |
| `TRANSLATIONS__GOOGLECLOUD__PROJECTID` | squidex | - | The google cloud project id if you want to support automated translations. |
| `CACHING__DOMAINOBJECTS__CACHEDURATION` | squidex | 00:10:00 | The cache duration for domain objects. |
| `EMAIL__NOTIFICATIONS__NEWUSERTEAMBODY` | squidex | Welcome to Squidex\r\nDear User,\r\n\r\n$ASSIGNER_NAME ($ASSIGNER_EMAIL) has invited you to join Team $TEAM_NAME at Squidex Headless CMS. Login with your GitHub, Google or Microsoft credentials to create a new user account and start managing the Team now.\r\n\r\nThank you very much,\r\nThe Squidex Team\r\n\r\n<<Start now!>> [$UI_URL] | The email body when a new user is added as contributor to a team. |
| `IDENTITY__SUPPRESSXFRAMEOPTIONSHEADER` | squidex | false | Specifies whether to suppress the generation of X-Frame-Options header which is used to prevent ClickJacking. |
| `LOGGING__APPLICATIONINSIGHTS__ENABLED` | squidex | false | True, to enable application insights integraon. |
| `LOGGING__LOGLEVEL__MICROSOFT.IDENTITY` | squidex | Warning | - |
| `EMAIL__NOTIFICATIONS__EXISTINGUSERBODY` | squidex | Dear User,\r\n\r\n$ASSIGNER_NAME ($ASSIGNER_EMAIL) has invited you to join App $APP_NAME at Squidex Headless CMS.\r\n\r\nLogin or reload the Management UI to see the App.\r\n\r\nThank you very much,\r\nThe Squidex Team\r\n\r\n<<Start now!>> [$UI_URL] | The email body when an existing user is added as contributor to an app. |
| `STORE__MONGODB__ATLAS__FULLTEXTENABLED` | squidex | false | True, if you want to enable mongo atlas for full text search instead of MongoDB. |
| `TEMPLATES__REPOSITORIES__0__CONTENTURL` | squidex | https://raw.githubusercontent.com/Squidex/templates/main | The url to download readme files. |
| `ASSETSTORE__AZUREBLOB__CONNECTIONSTRING` | squidex | UseDevelopmentStorage=true | The connection string to the azure storage service. |
| `LOGGING__LOGLEVEL__MICROSOFT.ASPNETCORE` | squidex | Warning | - |
| `CHATBOT__CONFIGURATIONS__IMAGE__TOOLS__0` | squidex | dall-e | Text Configuration |
| `EMAIL__NOTIFICATIONS__NEWUSERTEAMSUBJECT` | squidex | You have been invited to join Team $TEAM_NAME at Squidex CMS | The email subject when a new user is added as contributor to a team. |
| `EMAIL__NOTIFICATIONS__EXISTINGUSERSUBJECT` | squidex | [Squidex CMS] You have been invited to join App $APP_NAME | The email subject when an existing user is added as contributor to an app. |
| `EMAIL__NOTIFICATIONS__EXISTINGTEAMUSERBODY` | squidex | Dear User,\r\n\r\n$ASSIGNER_NAME ($ASSIGNER_EMAIL) has invited you to join Team $TEAM_NAME at Squidex Headless CMS.\r\n\r\nLogin or reload the Management UI to see the Team.\r\n\r\nThank you very much,\r\nThe Squidex Team\r\n\r\n<<Start now!>> [$UI_URL] | The email body when an existing user is added as contributor to a team. |
| `ASSETSTORE__AMAZONS3__DISABLEPAYLOADSIGNING` | squidex | false | True, to disable the SigV4 payload signing. This might be needed for some S3-compatible storage solutions, for example Cloudflare R2. |
| `IDENTITY__OIDCGETCLAIMSFROMUSERINFOENDPOINT` | squidex | false | - |
| `EMAIL__NOTIFICATIONS__EXISTINGTEAMUSERSUBJECT` | squidex | [Squidex CMS] You have been invited to join Team $TEAM_NAME | The email subject when an existing user is added as contributor to a team. |
| `LOGGING__APPLICATIONINSIGHTS__CONNECTIONSTRING` | squidex | InstrumentationKey=[key];IngestionEndpoint=https://[datacenter].in.applicationinsights.azure.com/ | ============================================ |
| `CHATBOT__CONFIGURATIONS__TEXT__SYSTEMMESSAGES__0` | squidex | You are a bot to generate text content. | - |
| `CHATBOT__CONFIGURATIONS__TEXT__SYSTEMMESSAGES__1` | squidex | Say hello to the user and explain him about your capabilities in a single, short sentence. | - |
| `CHATBOT__CONFIGURATIONS__TEXT__SYSTEMMESSAGES__2` | squidex | When you are asked to generate content such as articles, add placeholders for image, describe and use the following pattern: <IMG>{description}</IMG>. {description} is the generated image description. | - |
| `CHATBOT__CONFIGURATIONS__IMAGE__SYSTEMMESSAGES__0` | squidex | You are a bot to generate images. | - |
| `CHATBOT__CONFIGURATIONS__IMAGE__SYSTEMMESSAGES__1` | squidex | Say hello to the user and explain him the user about your capabilities in a single, short sentence. | - |
| `IDENTITY__OIDCOVERRIDEPERMISSIONSWITHCUSTOMCLAIMSONLOGIN` | squidex | (secret) | - |
| `MONGOHOST` | mongo | - | Railway Private Domain Name. |
| `MONGOPORT` | mongo | 27017 | MongoDB Port. |
| `MONGOUSER` | mongo | - | Mongodb user. |
| `MONGO_URL` | mongo | - | Private URL to connect to MongoDB. |
| `MONGOPASSWORD` | mongo | (secret) | Root password. |
| `MONGO_PUBLIC_URL` | mongo | - | Public URL to connect to MongoDB, used for Data panel. |
| `MONGO_INITDB_ROOT_PASSWORD` | mongo | (secret) | Root user password, set during initialization. |
| `MONGO_INITDB_ROOT_USERNAME` | mongo | (secret) | User created during initialization, given the root role. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/Assets`
- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **TCP Proxies:** 27017
- **Volume:** `/data/db`

**Category:** CMS

[View on Railway →](https://railway.com/template/squidex-headlesscms)
