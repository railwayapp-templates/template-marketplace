# Deploy Oracle Cloud ARM Catcher — Beat "Out of Capacity" on Railway

Auto-catch a free Oracle ARM VM past "out of capacity"

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/oracle-arm-instance-catcher)

## About

Oracle Cloud's Always Free tier includes one of the best deals in cloud computing — a 4-OCPU, 24 GB RAM Ampere A1 ARM instance, free forever. The catch: in popular regions the console almost always returns **"Out of host capacity"**, because demand outstrips the free pool. This template runs a patient retry worker that calls Oracle's official instance-launch API on a sensible interval and grabs a slot the moment one opens — so you don't sit clicking the console for days.

It does exactly what you'd do by hand, just patiently and on a timer. No exploit, no bypass.

---

The whole trick with Oracle's free ARM tier is persistence: capacity frees up unpredictably, so the answer is to keep asking, politely, until a slot appears. Running that from your laptop means leaving it on for days; running it on Railway means it works while your machine is off.

**The interval matters — this is automation, not hammering.** The worker retries on a sensible cadence (default every 5 minutes), not in a tight loop. That distinction is the whole difference between reasonable use of Oracle's API and abuse: a tight `while true` loop hammers Oracle's endpoint, risks rate-limit blocks, and is the kind of thing that gets a free-tier account flagged. This template retries on a timer and, critically, **stops on hard errors** — an authentication failure, a bad subnet OCID, a wrong image, or a `TooManyRequests` response means the worker halts and notifies you rather than retrying a broken request forever. Only "out of capacity" triggers a retry.

**Delete the service once you've caught an instance.** There's no reason to keep the worker running after success — tearing it down stops further API calls and removes your credentials from Railway. The notifications prompt this.

**Your OCI credentials are sensitive.** The worker needs your tenancy OCID, user OCID, key fingerprint, and API private key to call Oracle on your behalf — your own credentials on your own instance, but set them as Railway variables, never commit them, and remove the service when done.

Typical cost: **~$5/month or less** on Railway while the catcher runs — usually just days until it succeeds. The instance it catches is free forever on Oracle's side.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Oracle Cloud Instances | [sarakmacbook/Oracle_Cloud_Instances](https://github.com/sarakmacbook/Oracle_Cloud_Instances) | Worker |

**Category:** Other · **Languages:** HTML, Python, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/oracle-arm-instance-catcher)
