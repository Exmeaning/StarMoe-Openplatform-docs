# Profile card images

**Scope:** `moenotes:profile-images`

Render one page of a player's profile card as a PNG image.

## Endpoints

Full paths; supply only the parameters listed for the chosen endpoint.

### `/profile/{profileId}/card/{page}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}/card/{page}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `profileId` | `path` | Required |
| `page` | `path` | Required |

## Parameters

| Parameter | Description |
| --- | --- |
| `profileId` | Public profile ID, identical to the ID used in the player profile endpoints. |
| `page` | 1-based page number of the card to render. Returned as a PNG image stream (capped at 8 MiB). |

## Region differences

Available on all four regions, and the rendered card depends on the region's own data. The page count differs per region and per player; a page valid on one region can be out of range on another.

## Notes

Because this endpoint requires an `Authorization` header, browser `<img>` tags cannot load it directly. Fetch the image bytes through your backend service before streaming them to clients, and validate the page range in advance.

Returns 401 invalid_api_key if the secret is missing or invalid, 403 insufficient_scope if the key lacks the moenotes:profile-images scope, 404 not_found if the player does not exist or the requested page is out of range, and 429 when rate or quota limits are exceeded.

## Example

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID/card/1" \
  -H "Authorization: Bearer $CLIENT_SECRET" \
  --output card.png
```
