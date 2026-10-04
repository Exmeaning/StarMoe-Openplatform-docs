# Error handling {#errorsTitle}

When handling API responses, inspect the HTTP status code before parsing error details from the response body: 400 invalid_request indicates malformed parameters; 401 invalid_api_key indicates invalid credentials or inactive applications; 403 insufficient_scope indicates that the required scope was not granted; 404 not_found indicates that the target resource does not exist or lacks user consent; 413 indicates that the payload exceeds allowed size limits; 429 indicates rate or concurrency throttling—back off according to the Retry-After header; 503 indicates temporary service unavailability. Game endpoints format error objects as {error:{kind}}, whereas archive and management endpoints use {error:string}. Do not blindly retry authentication failures; record the X-Request-Id header in your logs to facilitate debugging and support.

| HTTP | error.kind / error |
|---|---|
| 400 | invalid_request |
| 401 | invalid_api_key |
| 403 | insufficient_scope |
| 404 | not_found |
| 413 | too_large |
| 429 | rate_limited / daily_quota_exceeded / concurrency_limited |
| 503 | open_platform_disabled / admission_unavailable |

## Archive download {#saves}

When requesting archives, missing the saves:read scope returns 403 insufficient_scope; missing user authorization, non-existent archives, or changes in archive ownership return 404 not_found (rather than 403). Archive file size limits are strictly enforced: up to 8 MiB for compressed gzip archives and 32 MiB for uncompressed JSON; exceeding these limits returns HTTP 413. Revoking user authorization only blocks future requests; ongoing in-flight transfers that have already passed admission may complete, and previously downloaded data cannot be recalled.

## Public event and music rankings {#public-data}

Use ETag and If-None-Match for 304 responses and respect Cache-Control. X-Fetched-At is the actual collection time and does not change on a cache hit. X-Stale: 1 marks an old snapshot; X-Refreshing: 1 means a refresh is queued or running. For 503 pending/upstream, honor Retry-After and exponential backoff rather than fixed high-frequency retries.

## Errors and rate limits {#limits}

When calling public game endpoints, region must be one of tw, jp, en, or kr, and IDs are formatted as decimal strings. Requests must include the Authorization: Bearer &lt;Secret&gt; header; no clientID header is required. When accessing archives, saveServer must be intl or jp, accountID corresponds to the top-level _profileId in the uploaded save, and the request requires both the saves:read scope and explicit user authorization for that specific save. By default, public API rate limits are shared per Passport account across all applications and keys: 100 requests per minute and 10000 requests per day, with concurrency limits of 4 per user and 32 globally (actual limits may vary by deployment configuration). HTTP 503 indicates that the service or admission gateway is temporarily unavailable. Game endpoints return errors formatted as {error:{kind}}, whereas archive and management endpoints return {error:string}.

