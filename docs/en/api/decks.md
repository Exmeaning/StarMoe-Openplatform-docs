# Top decks

**Scope:** `moenotes:decks`

Deck composition used in event rankings and arena deck trends.

## Endpoints

Full paths; supply only the parameters listed for the chosen endpoint.

### `/arena/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/deck-trend
```

| Parameter | Location | Required |
| --- | --- | --- |
| `musicId` | `query` | Required |
| `arenaSeasonId` | `query` | Required |

### `/arena/{arenaSeasonId}/music/{musicId}/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/music/{musicId}/deck-trend
```

| Parameter | Location | Required |
| --- | --- | --- |
| `musicId` | `path` | Required |
| `arenaSeasonId` | `path` | Required |

### `/event/deck`

```http
GET /api/open/v1/moenotes/{region}/event/deck
```

| Parameter | Location | Required |
| --- | --- | --- |
| `playerId` | `query` | Required |
| `eventId` | `query` | Required |

### `/event/{eventId}/deck/{playerId}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/deck/{playerId}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `playerId` | `path` | Required |
| `eventId` | `path` | Required |

## Parameters

| Parameter | Description |
| --- | --- |
| `eventId` | Target event ID. |
| `playerId` | Target player account ID whose deck composition to fetch. |
| `arenaSeasonId` | Arena season ID. |
| `musicId` | Target song ID for arena deck trends. |

## Region differences

Deck data is per region, and a playerId valid on one region does not identify the same player on another. Arena seasons and their song lists differ by region.

## Notes

Deck trends aggregate the decks used for one song in an arena season; individual decks come from the event routes.

Returns 400 invalid_request for missing or unrecognized parameters, 401 invalid_api_key for invalid credentials, 403 insufficient_scope when the key lacks moenotes:decks, and 404 not_found when the event, arena season, or player cannot be found.

## Example

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/$EVENT_ID/deck/$PLAYER_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
