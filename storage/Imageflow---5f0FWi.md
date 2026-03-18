# Deploy Imageflow on Railway

Optimal images at incredible speeds

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/5f0FWi)

## About

Serving optimized and correctly sized images is the fastest way to a quicker, more profitable site or app. 60% of website bytes are from images.

Imageflow edits and optimizes images so quickly you can do it on-demand. No need to manually generate every size/format combination of every image.

If you’re using ImageMagick, switch to imageflow_tool and get higher-quality images with smaller file sizes — up to 17x faster.

Most people prefer on-demand image processing, as it greatly simplifies web development.

# Deploying

Imageflow can be accessed at `/u/`. Images must be signed to avoid processing for non-customers. Images can be signed using the following procedure:

1. URLSafe base64 encode the image url (remove trailing `=`s)
2. Using a `HMAC` encoder with `SHA-256`, encode the result of your base64 encoder using the following procedure:

```
public static string SignString(string data, string key, int signatureLengthInBytes) {
      if (signatureLengthInBytes &lt; 1 || signatureLengthInBytes &gt; 32) throw new ArgumentOutOfRangeException(nameof(signatureLengthInBytes));
     HMACSHA256 hmac = new HMACSHA256(Encoding.UTF8.GetBytes(key));
     byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
     byte[] shorterHash = new byte[signatureLengthInBytes];
     Array.Copy(hash, shorterHash, signatureLengthInBytes);
     return EncodingUtils.ToBase64U(shorterHash);
}
```

3. get the file extension of the original url
4. combine them: `base64url.signature.extension`

See available transforms and filtering [here](https://docs.imageflow.io/querystring/transforms.html) 

here is a complete implementation in c#:

```c#
using Imazen.Common.Helpers;
using System;
using System.Collections.Generic;
using System.IO;

public class Program
{
	public static void Main()
	{
		Console.Write(String.Join(".",EncodeAndSignUrl("image url", "key").ToArray()));
	}
	private static string SanitizeImageExtension(string extension)
	{
		extension = extension.ToLowerInvariant().TrimStart('.');
		switch (extension)
		{
			case "png":
				return "png";
			case "gif":
				return "gif";
			case "webp":
				return "webp";
			case "jpeg":
			case "jfif":
			case "jif":
			case "jfi":
			case "jpe":
				return "jpg";
			default:
				return null;
		}
	}

	public static List EncodeAndSignUrl(string url, string key)
	{
		var uri = new Uri(url);
		var path = uri.AbsolutePath;
		var extension = Path.GetExtension(path);
		var sanitizedExtension = SanitizeImageExtension(extension) ?? "jpg";
		var data = EncodingUtils.ToBase64U(url);
		var sig = Signatures.SignString(data, key, 8);
		var e = new List()
		{
			data,
			sig,
			sanitizedExtension
		};
		return e;
	}
}
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Imageflow | [ebfork/imageflow-dotnet-server](https://github.com/ebfork/imageflow-dotnet-server) (root: examples/Imageflow.Server.ExampleDockerDiskCache) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 80 |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/imageflow_cache`

**Category:** Storage · **Languages:** C#

[View on Railway →](https://railway.com/deploy/5f0FWi)
