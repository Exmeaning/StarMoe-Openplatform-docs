# Circles

**Scope:** `moenotes:circles`

Look up a circle by id or search circles by name and filters.

## Endpoints

Full paths; supply only the parameters listed for the chosen endpoint.

### `/circle`

```http
GET /api/open/v1/moenotes/{region}/circle
```

| Parameter | Location | Required |
| --- | --- | --- |
| `circleId` | `query` | Required |

### `/circle/{circleId}`

```http
GET /api/open/v1/moenotes/{region}/circle/{circleId}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `circleId` | `path` | Required |

### `/circles/search`

```http
GET /api/open/v1/moenotes/{region}/circles/search
```

| Parameter | Location | Required |
| --- | --- | --- |
| `options.name` | `query` | Optional |
| `options.memberRange` | `query` | Optional |
| `options.joinRule` | `query` | Optional |
| `options.playStyle` | `query` | Optional |

### `/circles/search/{name}`

```http
GET /api/open/v1/moenotes/{region}/circles/search/{name}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `name` | `path` | Required |
| `options.memberRange` | `query` | Optional |
| `options.joinRule` | `query` | Optional |
| `options.playStyle` | `query` | Optional |

## Parameters

| Parameter | Description |
| --- | --- |
| `circleId` | Target circle ID. |
| `name` | Search query for the circle name in path form. |
| `options.name` | Optional circle name query filter in query form. |
| `options.memberRange` | Optional member count range filter. |
| `options.joinRule` | Optional join rule filter. |
| `options.playStyle` | Optional play style filter. |

## Region differences

Circles are per region and do not cross servers. Search results and filters reflect only the requested region's membership.

## Notes

Search filters are query parameters prefixed with options. — for example ?options.name=… — and the path form carries only the name. Names match as the game stores them; search is not fuzzy and results are not cached.

Returns 400 invalid_request for malformed query parameters, 401 invalid_api_key for missing or invalid authentication, 403 insufficient_scope when the key lacks moenotes:circles, and 404 not_found when no circle matches the identifier or criteria.

## Example

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/circles/search?options.name=$QUERY" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
