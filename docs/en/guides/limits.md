# Limits and security

## Errors and rate limits {#limits}

When calling public game endpoints, region must be one of tw, jp, en, or kr, and IDs are formatted as decimal strings. Requests must include the Authorization: Bearer &lt;Secret&gt; header; no clientID header is required. When accessing archives, saveServer must be intl or jp, accountID corresponds to the top-level _profileId in the uploaded save, and the request requires both the saves:read scope and explicit user authorization for that specific save. By default, public API rate limits are shared per Passport account across all applications and keys: 100 requests per minute and 10000 requests per day, with concurrency limits of 4 per user and 32 globally (actual limits may vary by deployment configuration). HTTP 503 indicates that the service or admission gateway is temporarily unavailable. Game endpoints return errors formatted as {error:{kind}}, whereas archive and management endpoints return {error:string}.

Quotas are shared per Passport account across all applications, keys, and regions, calculated over fixed UTC minutes and UTC calendar days; creating new applications or rotating keys does not reset current quota usage. Requests count against your quota once they pass authentication, permission checks, and syntax validation; cache hits and upstream failures also count toward quota usage. Requests rejected at admission due to invalid credentials (401), insufficient permissions (403), or malformed inputs (400) do not consume quota. The X-RateLimit-* and X-Quota-* response headers provide current quota counters and reset times; exceeding limits results in an HTTP 429 status code accompanied by a Retry-After header indicating the required backoff wait in seconds. Concurrency limits for game endpoints are 4 concurrent requests per user and 32 per process globally; archive downloads are additionally restricted to 2 per application and 16 per process globally.

## Server-side secrets, not OAuth {#securityTitle}

Keep the Secret only on your server, never in browser bundles, URLs or public repositories. This is not an OAuth flow: no authorization code, redirect callback or user access token is issued. Rotate keys by deploying the new secret before revoking the old one.

This platform is not an official game publisher API. Application registration, API key issuance, and key revocation are managed in the developer console on the main site (this static documentation site is for reference only). Applications do not require manual review. Each application may maintain up to two active keys at a time: update and verify your client services with the new key before explicitly revoking the old one.

## Public event and music rankings {#public-data}

For event, music, and challenge rankings, we recommend using the public service consumed by the main site at https://api.bdon.moe/api/v1. This service is independent of the Passport authentication system: all public endpoints accept unauthenticated GET requests without a clientSecret, and do not consume Passport's 100 requests/minute or 10000 requests/day quota. Please note that public endpoints do not guarantee a fixed refresh interval or arbitrary third-party browser CORS support, nor do they allow unlimited high-frequency polling. Please cache responses locally where appropriate.

