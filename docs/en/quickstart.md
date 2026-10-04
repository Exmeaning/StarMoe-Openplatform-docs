# Getting started {#stepsTitle}

[Developer console](https://bdon.moe/en/open-platform) · [Account and save consent](https://bdon.moe/en/account)

This platform is not an official game publisher API. Application registration, API key issuance, and key revocation are managed in the developer console on the main site (this static documentation site is for reference only). Applications do not require manual review. Each application may maintain up to two active keys at a time: update and verify your client services with the new key before explicitly revoking the old one.

1. Sign in, enter an application name in the console and create it. All available permissions and regions are enabled automatically, with no selection step. Save the clientID and the secret shown only once.
2. Call the public game API from your server with the secret. Public profiles do not require archive authorization.

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```

3. Send the invitation link containing ?invite=clientID. Users sign in, select specific uploaded archives and explicitly authorize access. A link alone grants nothing.

[Account and save consent](https://bdon.moe/en/account?invite=CLIENT_ID)

4. Download only the authorized saveServer/accountID pairs. Users may revoke access at any time.

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## Server-side secrets, not OAuth {#securityTitle}

Keep the Secret only on your server, never in browser bundles, URLs or public repositories. This is not an OAuth flow: no authorization code, redirect callback or user access token is issued. Rotate keys by deploying the new secret before revoking the old one.

## Public event and music rankings {#public-data}

For event, music, and challenge rankings, we recommend using the public service consumed by the main site at https://api.bdon.moe/api/v1. This service is independent of the Passport authentication system: all public endpoints accept unauthenticated GET requests without a clientSecret, and do not consume Passport's 100 requests/minute or 10000 requests/day quota. Please note that public endpoints do not guarantee a fixed refresh interval or arbitrary third-party browser CORS support, nor do they allow unlimited high-frequency polling. Please cache responses locally where appropriate.

[Public event and music rankings](/en/public-data)

