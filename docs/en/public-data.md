# Public event and music rankings

For event, music, and challenge rankings, we recommend using the public service consumed by the main site at https://api.bdon.moe/api/v1. This service is independent of the Passport authentication system: all public endpoints accept unauthenticated GET requests without a clientSecret, and do not consume Passport's 100 requests/minute or 10000 requests/day quota. Please note that public endpoints do not guarantee a fixed refresh interval or arbitrary third-party browser CORS support, nor do they allow unlimited high-frequency polling. Please cache responses locally where appropriate.

Endpoints return cached snapshots maintained by the service rather than direct real-time connections to game servers. The server parameter accepts tw, jp, en, or kr depending on deployment configuration; unknown regions return 404. 64-bit integer identifiers such as eventId and profileId must be passed as decimal strings. Except for certain upstream announcement timestamps, time values are expressed as Unix timestamps in milliseconds.

`https://api.bdon.moe/api/v1`

## Endpoints {#routes}

```http
GET /api/v1/{server}/music/{musicId}/ranking
GET /api/v1/{server}/events
GET /api/v1/{server}/events/current
GET /api/v1/{server}/events/{eventId}
GET /api/v1/{server}/events/{eventId}/latest
GET /api/v1/{server}/events/{eventId}/challenges
GET /api/v1/{server}/events/{eventId}/challenges/{challengeMusicId}/ranking
GET /api/v1/{server}/announcements
GET /api/v1/{server}/announcements/{id}?rev={lastUpdatedAt}
GET /api/v1/{server}/announcements/{id}/revisions
GET /api/v1/{server}/ranking/profile/{profileId}/card/{page}
```

```sh
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/current"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/latest"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/challenges/$CHALLENGE_MUSIC_ID/ranking"
```

## latest {#latest}

latest is a merged snapshot. Do not replace missing rows with zero. Each part has its own fetchedAt; duplicate ranks can have multiple rows marked dup. stale means an old successful result survived a collection interruption; frozen marks score freezing during aggregation. Measure age using X-Server-Time and updatedAt, and poll around nextUpdateAt with random jitter.

## music {#music}

Music rankings preserve players in response order and have no rank field. Display index + 1 with an explicit response-order label. Do not sort by score again or infer tie rules, and do not assume exactly 100 entries. Treat an empty object as players ?? []. musicId must belong to the selected regional music catalog.

## challenges {#challenges}

Read the event challenges catalog first, then request challengeMusicId, not the ordinary musicId. Challenge rankings have no ranks, pagination or difficulty parameters. A disabled point ranking does not disable the challenge songs. Each song has independent collection status and fetch time. X-Final-Quality: lastSeen is only the last successful observation, not a verified official final ranking; separate songs are not a simultaneous snapshot.

## Announcement revisions {#announcements}

Filter announcement lists by category on the client. startAt, endAt and lastUpdatedAt are Unix seconds represented as decimal strings, unlike ranking milliseconds. rev selects a stored revision; omission returns the latest. X-Revision identifies the version; X-Listed: 0 marks an announcement removed from the list. The body is a complete unfiltered HTML document: render only inside a sandbox iframe without allow-scripts or allow-same-origin, never directly in the main DOM.

## Public responses and caching {#cache}

Use ETag and If-None-Match for 304 responses and respect Cache-Control. X-Fetched-At is the actual collection time and does not change on a cache hit. X-Stale: 1 marks an old snapshot; X-Refreshing: 1 means a refresh is queued or running. For 503 pending/upstream, honor Retry-After and exponential backoff rather than fixed high-frequency retries.

[Public responses and caching](/en/public-ranking-contract)

