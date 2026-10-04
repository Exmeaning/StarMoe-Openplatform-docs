# Profiles and favorites

**Scope:** `moenotes:profiles`

Read one player's public profile, fetch several profiles at once, or list a player's favorites.

## Endpoints

Full paths; supply only the parameters listed for the chosen endpoint.

### `/player/{playerId}/favorites`

```http
GET /api/open/v1/moenotes/{region}/player/{playerId}/favorites
```

| Parameter | Location | Required |
| --- | --- | --- |
| `playerId` | `path` | Required |

### `/profile`

```http
GET /api/open/v1/moenotes/{region}/profile
```

| Parameter | Location | Required |
| --- | --- | --- |
| `playerProfileId` | `query` | Required |

### `/profile/favorites`

```http
GET /api/open/v1/moenotes/{region}/profile/favorites
```

| Parameter | Location | Required |
| --- | --- | --- |
| `playerId` | `query` | Required |

### `/profile/{profileId}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `profileId` | `path` | Required |

### `/profiles`

```http
GET /api/open/v1/moenotes/{region}/profiles
```

| Parameter | Location | Required |
| --- | --- | --- |
| `accountIds` | `query` | Required |

### `/profiles/{accountIds}`

```http
GET /api/open/v1/moenotes/{region}/profiles/{accountIds}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `accountIds` | `path` | Required |

## Parameters

| Parameter | Description |
| --- | --- |
| `profileId` | Public profile id: 11 digits starting with 2, 3 or 4 outside Japan; a positive int64 in Japan. Always a decimal string. |
| `playerProfileId` | Query form of profileId for the single-profile endpoint. It is not interchangeable with playerId. |
| `accountIds` | Up to 100 comma-separated account ids for one batch request. |
| `playerId` | Account id whose favorites you want. It is not interchangeable with profileId. |

## Region differences

Available on all four regions. The profileId format differs: jp accepts a positive int64, while tw/en/kr use 11 digits with a regional prefix (2, 3 and 4 respectively). An account that exists on several servers has a different id on each, and favorites are per region.

## Notes

profileId, playerId and accountId are different identifiers and cannot be swapped. Path and query forms return the same data.

Returns 400 invalid_request for malformed or unknown parameters, 401 invalid_api_key for invalid credentials, 403 insufficient_scope when the key lacks moenotes:profiles, and 404 not_found when the player does not exist or has not made their profile public.

## Example

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
