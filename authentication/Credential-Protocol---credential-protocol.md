# Deploy Credential Protocol on Railway

Self-hosted signed membership cards for creators.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/credential-protocol)

## About

Give your people something they can actually hold: a membership card, a ticket, a collectible, a certificate. Signed by you, living on a server you own. No platform in the middle, no platform cut, no one else deciding the rules. Your members, your keys, your money.

Credential Protocol turns "I should really build a members area" into an afternoon. Deploy it, log in, answer a few plain questions, and you have a real, working card system with your name on it.

Credential Protocol is a small, quiet app that runs your whole membership world from one place. Deploying it gives you a private copy that belongs to you alone: your own admin dashboard, your own signing key, your own member list and your own storage. Nothing is shared with other creators, and nobody can switch it off, change the fees or take your audience hostage.

You log in with the password you chose, tell it your brand and what you offer, and paste two lines of HTML into your website. That's it. Your visitors get a sign-up box, your members get a beautiful card, and you get a calm dashboard that shows who's in.

The part people love most is how little you have to figure out. Instead of forms full of settings, you pick a Recipe and answer a few everyday questions:

- A membership: for a week, a month, three months, a year, forever, or any length you like. Add a free trial if you want.
- Event tickets, with check-in at the door.
- A collectible: numbered editions ("No. 7 of 100") or unnumbered ones, as many as you like.
- A release in parts: a music EP, a photo set, a comic. A new piece opens each week, and everyone who collects them all unlocks a bonus edition.
- A collection with a reward: collect three cards, get the fourth.
- Discount and gift codes.
- Certificates for courses, workshops and achievements.

Everything you make can unlock things only your members see: downloads, links, files, a members-only page, a bulletin board. Each card type gets its own look. Members can renew, and gentle reminders go out before a card expires so nobody quietly drifts away.

Handing out cards in person? Create claim codes and print a sheet of QR codes. Hand them out at a show, tuck one into a package, or stick one on a poster.

Your emails sound like you, too. Welcome notes, receipts and reminders can all be edited and given a look that matches your brand, and you connect the email service you like straight from your dashboard. No settings files, no server variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cred | [shiver444/cred](https://github.com/shiver444/cred) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DATA_DIR` | /data | Where the app stores your members and keys on the attached storage Volume. Leave it as /data. |
| `ADMIN_SECRET` | (secret) | Your admin password for the dashboard. Choose a long one. |
| `SESSION_SECRET_KEY` | (secret) | Secret used to keep you signed in to the dashboard. Generated automatically, leave it as it is. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication · **Languages:** Python, JavaScript, Procfile

[View on Railway →](https://railway.com/deploy/credential-protocol)
