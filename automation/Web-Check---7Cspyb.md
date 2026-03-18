# Deploy Web Check on Railway

🕵️‍♂️ All-in-one OSINT tool for analysing any website

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/7Cspyb)

## About

<h1 align="center">Web-Check</h1>

<p align="center">
<img width="96" src="https://i.ibb.co/q1gZN2p/web-check-logo.png"><br>
<b><i>Comprehensive, on-demand open source intelligence for any website</i></b>
<br>
<b>🌐 <a href="https://web-check.xyz/">web-check.xyz</a></b><br>

</p>

#### Contents

- **[About](#about)**
  - [Screenshot](#screenshot)
  - [Live Demo](#live-demo)
  - [Mirror](#mirror)
  - [Features](#features)
- **[Usage](#usage)**
  - [Deployment](#deployment)
    - [Option#1: Netlify](#deploying---option-1-netlify)
    - [Option#2: Vercel](#deploying---option-2-vercel)
    - [Option#3: Docker](#deploying---option-3-docker)
    - [Option#4: Source](#deploying---option-4-from-source)
  - [Configuration Options](#configuring)
  - [Developer Setup](#developing)
- **[Community](#community)**
  - [Contributing](#contributing)
  - [Bugs](#reporting-bugs)
  - [Support](#supporting)
- **[License](#license)**

---

## About
Get an insight into the inner-workings of a given website: uncover potential attack vectors, analyse server architecture, view security configurations, and learn what technologies a site is using.

Currently the dashboard will show: IP info, SSL chain, DNS records, cookies, headers, domain info, search crawl rules, page map, server location, redirect ledger, open ports, traceroute, DNS security extensions, site performance, trackers, associated hostnames, carbon footprint. Stay tuned, as I'll add more soon!

The aim is to help you easily understand, optimize and secure your website.

### Screenshot

<details>
      <summary>Expand Screenshot</summary>

[![Screenshot](https://raw.githubusercontent.com/Lissy93/web-check/master/.github/screenshots/web-check-screenshot1.png)](https://web-check.as93.net/)
      
</details>

[![Screenshot](https://i.ibb.co/r0jXN6s/web-check.png)](https://github.com/Lissy93/web-check/tree/master/.github/screenshots)

### Live Demo
A hosted version can be accessed at: **[web-check.as93.net](https://web-check.as93.net)**

### Mirror
The source for this repo is mirrored to CodeBerg, available at: **[codeberg.org/alicia/web-check](https://codeberg.org/alicia/web-check)**

### Features

<details open="">
<summary><b>Click to expand / collapse section</b></summary>

<sup>**Note** _this list needs updating, many more jobs have been added since..._</sup>

The following section outlines the core features, and briefly explains why this data might be useful for you to know, as well as linking to further resources for learning more.

<details>
<summary><b>IP Info</b></summary>

###### Description
An IP address (Internet Protocol address) is a numerical label assigned to each device connected to a network / the internet. The IP associated with a given domain can be found by querying the Domain Name System (DNS) for the domain's A (address) record.

###### Use Cases
Finding the IP of a given server is the first step to conducting further investigations, as it allows us to probe the server for additional info. Including creating a detailed map of a target's network infrastructure, pinpointing the physical location of a server, identifying the hosting service, and even discovering other domains that are hosted on the same IP address.

###### Useful Links
- [Understanding IP Addresses](https://www.digitalocean.com/community/tutorials/understanding-ip-addresses-subnets-and-cidr-notation-for-networking)
- [IP Addresses - Wiki](https://en.wikipedia.org/wiki/IP_address)
- [RFC-791 Internet Protocol](https://tools.ietf.org/html/rfc791)
- [whatismyipaddress.com](https://whatismyipaddress.com/)

</details>
<details>
<summary><b>SSL Chain</b></summary>

<img align="right" src="https://i.ibb.co/kB7LsV1/wc-ssl.png" width="300">

###### Description
SSL certificates are digital certificates that authenticate the identity of a website or server, enable secure encrypted communication (HTTPS), and establish trust between clients and servers. A valid SSL certificate is required for a website to be able to use the HTTPS protocol, and encrypt user + site data in transit. SSL certificates are issued by Certificate Authorities (CAs), which are trusted third parties that verify the identity and legitimacy of the certificate holder.

###### Use Cases
SSL certificates not only provide the assurance that data transmission to and from the website is secure, but they also provide valuable OSINT data. Information from an SSL certificate can include the issuing authority, the domain name, its validity period, and sometimes even organization details. This can be useful for verifying the authenticity of a website, understanding its security setup, or even for discovering associated subdomains or other services.

###### Useful Links
- [TLS - Wiki](https://en.wikipedia.org/wiki/Transport_Layer_Security)
- [What is SSL (via Cloudflare learning)](https://www.cloudflare.com/learning/ssl/what-is-ssl/)
- [RFC-8446 - TLS](https://tools.ietf.org/html/rfc8446)
- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)

</details>
<details>
<summary><b>DNS Records</b></summary>

<img align="right" src="https://i.ibb.co/7Q1kMwM/wc-dns.png" width="300">

###### Description
This task involves looking up the DNS records associated with a specific domain. DNS is a system that translates human-readable domain names into IP addresses that computers use to communicate. Various types of DNS records exist, including A (address), MX (mail exchange), NS (name server), CNAME (canonical name), and TXT (text), among others.

###### Use Cases
Extracting DNS records can provide a wealth of information in an OSINT investigation. For example, A and AAAA records can disclose IP addresses associated with a domain, potentially revealing the location of servers. MX records can give clues about a domain's email provider. TXT records are often used for various administrative purposes and can sometimes inadvertently leak internal information. Understanding a domain's DNS setup can also be useful in understanding how its online infrastructure is built and managed.

###### Useful Links
- [What are DNS records? (via Cloudflare learning)](https://www.cloudflare.com/learning/dns/dns-records/)
- [DNS Record Types](https://en.wikipedia.org/wiki/List_of_DNS_record_types)
- [RFC-1035 - DNS](https://tools.ietf.org/html/rfc1035)
- [DNS Lookup (via MxToolbox)](https://mxtoolbox.com/DNSLookup.aspx)

</details>
<details>
<summary><b>Cookies</b></summary>

<img align="right" src="https://i.ibb.co/TTQ6DtP/wc-cookies.png" width="300">

###### Description
The Cookies task involves examining the HTTP cookies set by the target website. Cookies are small pieces of data stored on the user's computer by the web browser while browsing a website. They hold a modest amount of data specific to a particular client and website, such as site preferences, the state of the user's session, or tracking information.

###### Use Cases
Cookies can disclose information about how the website tracks and interacts with its users. For instance, session cookies can reveal how user sessions are managed, and tracking cookies can hint at what kind of tracking or analytics frameworks are being used. Additionally, examining cookie policies and practices can offer insights into the site's security settings and compliance with privacy regulations.

###### Useful Links
- [HTTP Cookie Docs (Mozilla)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [What are Cookies (via Cloudflare Learning)](https://www.cloudflare.com/learning/privacy/what-are-cookies/)
- [Testing for Cookie Attributes (OWASP)](https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes)
- [RFC-6265 - Coolies](https://tools.ietf.org/html/rfc6265)

</details>
<details>
<summary><b>Crawl Rules</b></summary>

<img align="right" src="https://i.ibb.co/KwQCjPf/wc-robots.png" width="300">

###### Description
Robots.txt is a file found (usually) at the root of a domain, and is used to implement the Robots Exclusion Protocol (REP) to indicate which pages should be ignored by which crawlers and bots. It's good practice to avoid search engine crawlers from over-loading your site, but should not be used to keep pages out of search results (use the noindex meta tag or header instead).

###### Use Cases
It's often useful to check the robots.txt file during an investigation, as it can sometimes disclose the directories and pages that the site owner doesn't want to be indexed, potentially because they contain sensitive information, or reveal the existence of otherwise hidden or unlinked directories. Additionally, understanding crawl rules may offer insights into a website's SEO strategies.

###### Useful Links
- [Google Search Docs - Robots.txt](https://developers.google.com/search/docs/advanced/robots/intro)
- [Learn about robots.txt (via Moz.com)](https://moz.com/learn/seo/robotstxt)
- [RFC-9309 -  Robots Exclusion Protocol](https://datatracker.ietf.org/doc/rfc9309/)
- [Robots.txt - wiki](https://en.wikipedia.org/wiki/Robots_exclusion_standard)

</details>

&gt; You can read more at https://github.com/Lissy93/web-check</details>

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lissy93/web-check | `lissy93/web-check` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/deploy/7Cspyb)
