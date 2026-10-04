# Public responses and caching

Endpoints return cached snapshots maintained by the service rather than direct real-time connections to game servers. The server parameter accepts tw, jp, en, or kr depending on deployment configuration; unknown regions return 404. 64-bit integer identifiers such as eventId and profileId must be passed as decimal strings. Except for certain upstream announcement timestamps, time values are expressed as Unix timestamps in milliseconds.

## latest {#latest}

latest is a merged snapshot. Do not replace missing rows with zero. Each part has its own fetchedAt; duplicate ranks can have multiple rows marked dup. stale means an old successful result survived a collection interruption; frozen marks score freezing during aggregation. Measure age using X-Server-Time and updatedAt, and poll around nextUpdateAt with random jitter.

## music / challenges {#rankings}

Music rankings preserve players in response order and have no rank field. Display index + 1 with an explicit response-order label. Do not sort by score again or infer tie rules, and do not assume exactly 100 entries. Treat an empty object as players ?? []. musicId must belong to the selected regional music catalog.

Read the event challenges catalog first, then request challengeMusicId, not the ordinary musicId. Challenge rankings have no ranks, pagination or difficulty parameters. A disabled point ranking does not disable the challenge songs. Each song has independent collection status and fetch time. X-Final-Quality: lastSeen is only the last successful observation, not a verified official final ranking; separate songs are not a simultaneous snapshot.

## ETag / Retry-After {#cache}

Use ETag and If-None-Match for 304 responses and respect Cache-Control. X-Fetched-At is the actual collection time and does not change on a cache hit. X-Stale: 1 marks an old snapshot; X-Refreshing: 1 means a refresh is queued or running. For 503 pending/upstream, honor Retry-After and exponential backoff rather than fixed high-frequency retries.

## Announcement revisions {#announcements}

Filter announcement lists by category on the client. startAt, endAt and lastUpdatedAt are Unix seconds represented as decimal strings, unlike ranking milliseconds. rev selects a stored revision; omission returns the latest. X-Revision identifies the version; X-Listed: 0 marks an announcement removed from the list. The body is a complete unfiltered HTML document: render only inside a sandbox iframe without allow-scripts or allow-same-origin, never directly in the main DOM.

## tiers / bundle {#curves}

The tiers endpoint supports parameters including tiers, res, from, to, and since. Resolution res options are auto, raw, 10m, and 1h, with raw granularity supported up to a maximum interval of 6 hours; timestamp t denotes millisecond offset relative to the base timestamp. Time buckets with no recorded observations must be left missing rather than filled with zero. Archived paths matching /bundle/{server}/event/{eventId}/v{n}/ are immutable, versioned static asset bundles.

```json
{"error":{"kind":"pending","message":"..."}}
```

Use ETag and If-None-Match for 304 responses and respect Cache-Control. X-Fetched-At is the actual collection time and does not change on a cache hit. X-Stale: 1 marks an old snapshot; X-Refreshing: 1 means a refresh is queued or running. For 503 pending/upstream, honor Retry-After and exponential backoff rather than fixed high-frequency retries.

[Public event and music rankings](/en/public-data)
