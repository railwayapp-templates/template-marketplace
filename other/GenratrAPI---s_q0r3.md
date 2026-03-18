# Deploy GenratrAPI on Railway

Strong password generator API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/s_q0r3)

## About

# GenratrAPI

GenratrAPI is a simple web service built using Node.js and Express that allows you to generate random passwords with varying degrees of complexity. You can customize the password strength by specifying the character sets you want to include (special characters, lowercase letters, uppercase letters, and numbers) and the desired password length.

## API Endpoints

### Generate a Random Password

- **URL:** `/`
- **Method:** GET

#### Query Parameters

- `special`: Include special characters in the password.
- `lowercase`: Include lowercase letters in the password.
- `uppercase`: Include uppercase letters in the password.
- `numbers`: Include numbers in the password.
- `length`: Desired length of the password (integer, default is 12).

### Invalid Request

Trying to generate a password without specifying any strength settings:

```bash
curl "http://localhost:8080/?length=10"
```

#### Response

```json
{
  "error": "Invalid request"
}
```

### Sample Request

Generate a password with specific settings (20 characters, includes special characters, lowercase and uppercase letters, and numbers):

```bash
curl "http://localhost:8080/?special&amp;lowercase&amp;uppercase&amp;numbers&amp;length=20"
```

#### Response

```json
{
  "password": "ZTd,BCsj2.$uk^4}!R%5"
}
```

## Sample Frontend

```html
<form method="get" action="/">
  <label> <input name="special" type="checkbox"> Special characters </label>
  <label>
    <input name="lowercase" type="checkbox"> Lowercase characters
  </label>
  <label>
    <input name="uppercase" type="checkbox"> Uppercase characters
  </label>
  <label> <input name="numbers" type="checkbox"> Numbers </label>
  <label>
    Length:
    <input value="12" type="number">
  </label>
  <button type="submit">Generate Password</button>
</form>
<p>Password: <span id="password"></span></p>


```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| GenratrAPI | [yavisht/GenratrAPI](https://github.com/yavisht/GenratrAPI) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/template/s_q0r3)
