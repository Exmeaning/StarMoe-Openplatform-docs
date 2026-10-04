# Archive download {#archiveTitle}

Returns the original gzip bytes, not JSON. Save the response as a .gz file and decompress it yourself.

[Developer console](https://bdon.moe/en/open-platform) · [Account and save consent](https://bdon.moe/en/account)

Send the invitation link containing ?invite=clientID. Users sign in, select specific uploaded archives and explicitly authorize access. A link alone grants nothing.

[Account and save consent](https://bdon.moe/en/account?invite=CLIENT_ID)

Download only the authorized saveServer/accountID pairs. Users may revoke access at any time.

`GET /api/open/v1/saves/{saveServer}/{accountID}`

`saves:read`

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## Region differences {#saveServer}

Archives do not use the game API region. saveServer is only intl (the international servers, covering Taiwan, international/English and Korea) or jp (the Japanese server) — there is no tw, en or kr value here. A save uploaded from any of the international servers lives under intl, so pick the server axis from where the account actually plays, not from the region you use for the game API.

- `intl`: The international servers: Taiwan, international/English and Korea.
- `jp`: The Japanese server.

## Response {#gzip}

The response headers include Content-Type: application/gzip and Cache-Control: no-store, without Content-Encoding: gzip; the response body is directly a gzip binary archive rather than HTTP transport-layer compression, so the Accept-Encoding header in your request will not alter the response format. On your server, you only need your client secret and the saveServer and accountID parameters in the URL path; no user access token, OAuth redirect callback, or Passport user ID is needed.

## Error handling {#errors}

When requesting archives, missing the saves:read scope returns 403 insufficient_scope; missing user authorization, non-existent archives, or changes in archive ownership return 404 not_found (rather than 403). Archive file size limits are strictly enforced: up to 8 MiB for compressed gzip archives and 32 MiB for uncompressed JSON; exceeding these limits returns HTTP 413. Revoking user authorization only blocks future requests; ongoing in-flight transfers that have already passed admission may complete, and previously downloaded data cannot be recalled.

## Server-side secrets, not OAuth {#securityTitle}

Keep the Secret only on your server, never in browser bundles, URLs or public repositories. This is not an OAuth flow: no authorization code, redirect callback or user access token is issued. Rotate keys by deploying the new secret before revoking the old one.

