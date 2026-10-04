# Rankings

**Scope:** `moenotes:rankings`

Music, event, challenge and arena ranking boards.

::: tip
For event cutoffs, music boards and challenge boards, prefer the [public data API](../public-data) without sending a secret. These are collected snapshots; their limits are separate from Passport quotas.
:::

## Endpoints

Full paths; supply only the parameters listed for the chosen endpoint.

### `/arena/ranking`

```http
GET /api/open/v1/moenotes/{region}/arena/ranking
```

| Parameter | Location | Required |
| --- | --- | --- |
| `arenaSeasonId` | `query` | Required |
| `bandId` | `query` | Optional |
| `rankingStart` | `query` | Required |
| `rankingEnd` | `query` | Required |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `arenaSeasonId` | `path` | Required |
| `bandId` | `query` | Optional |
| `rankingStart` | `path` | Required |
| `rankingEnd` | `path` | Required |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `arenaSeasonId` | `path` | Required |
| `bandId` | `path` | Required |
| `rankingStart` | `path` | Required |
| `rankingEnd` | `path` | Required |

### `/event/challenge-ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge-ranking
```

| Parameter | Location | Required |
| --- | --- | --- |
| `challengeMusicId` | `query` | Required |

### `/event/challenge/{challengeMusicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge/{challengeMusicId}/ranking
```

| Parameter | Location | Required |
| --- | --- | --- |
| `challengeMusicId` | `path` | Required |

### `/event/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/ranking
```

| Parameter | Location | Required |
| --- | --- | --- |
| `eventId` | `query` | Required |
| `ranks` | `query` | Required |

### `/event/{eventId}/ranking/{ranks}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/ranking/{ranks}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `eventId` | `path` | Required |
| `ranks` | `path` | Required |

### `/music/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/ranking
```

| Parameter | Location | Required |
| --- | --- | --- |
| `musicId` | `query` | Required |

### `/music/{musicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/{musicId}/ranking
```

| Parameter | Location | Required |
| --- | --- | --- |
| `musicId` | `path` | Required |

## Parameters

| Parameter | Description |
| --- | --- |
| `musicId` | Song ID used for music rankings or arena deck trends. |
| `eventId` | Event ID for event rankings and event deck compositions. |
| `ranks` | 1-based inclusive rank window. Repeat query parameters (?ranks=1&amp;ranks=100) or specify via the path form. |
| `challengeMusicId` | Challenge song ID (distinct from standard song IDs). |
| `arenaSeasonId` | Arena season ID. |
| `rankingStart` | First rank of the arena ranking window (1-based). |
| `rankingEnd` | Last rank of the arena ranking window. |
| `bandId` | Optional band filter for arena rankings; in path form, append /band/{bandId}. |

## Region differences

Boards are per region and are not comparable: event, challenge and arena periods differ, so an eventId or arenaSeasonId from one region is usually unknown in another. Song ids also differ between regions.

## Notes

Ranks are one-based and inclusive, and the window is required. Pass it explicitly so cached results stay predictable.

Returns 400 invalid_request for malformed rank intervals or unknown parameters, 401 invalid_api_key for missing or invalid keys, 403 insufficient_scope if the key lacks moenotes:rankings, 404 not_found when the ranking board does not exist, and 429 when rate or quota limits are exceeded.

## Example

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/ranking?eventId=$EVENT_ID&ranks=1&ranks=100" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
