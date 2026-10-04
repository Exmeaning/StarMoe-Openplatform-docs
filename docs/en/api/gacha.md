# Gacha rates

**Scope:** `moenotes:gacha`

Published rates of a gacha pool and its pickup cards.

## Endpoints

Full paths; supply only the parameters listed for the chosen endpoint.

### `/gacha/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/rates
```

| Parameter | Location | Required |
| --- | --- | --- |
| `gachaId` | `query` | Required |
| `productId` | `query` | Optional |
| `selectedPickUp` | `query` | Optional |

### `/gacha/{gachaId}/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates
```

| Parameter | Location | Required |
| --- | --- | --- |
| `gachaId` | `path` | Required |
| `productId` | `query` | Optional |
| `selectedPickUp` | `query` | Optional |

### `/gacha/{gachaId}/rates/{selectedPickUp}`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates/{selectedPickUp}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `gachaId` | `path` | Required |
| `productId` | `query` | Optional |
| `selectedPickUp` | `path` | Required |

## Parameters

| Parameter | Description |
| --- | --- |
| `gachaId` | Target gacha pool ID. There is no implicit default pool. |
| `selectedPickUp` | Pickup index. Optional in query form; required in the path form. |
| `productId` | Optional product ID to narrow the pool's rate table. |

## Region differences

Gacha pools are region-specific and their schedules differ, so a gachaId must come from the same region you query. Rates and pickup sets also differ between regions.

## Notes

Always send gachaId; the API never falls back to the currently promoted pool.

Returns 400 invalid_request for missing required parameters or unknown inputs, 401 invalid_api_key for invalid credentials, 403 insufficient_scope when the key lacks moenotes:gacha, and 404 not_found when the specified gacha pool does not exist.

## Example

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/gacha/rates?gachaId=$GACHA_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
