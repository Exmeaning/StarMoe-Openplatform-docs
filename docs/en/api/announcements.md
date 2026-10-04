# Announcements

**Scope:** `moenotes:announcements`

In-game announcement list and single announcement details.

## Endpoints

Full paths; supply only the parameters listed for the chosen endpoint.

### `/announcement`

```http
GET /api/open/v1/moenotes/{region}/announcement
```

| Parameter | Location | Required |
| --- | --- | --- |
| `id` | `query` | Required |

### `/announcement/{id}`

```http
GET /api/open/v1/moenotes/{region}/announcement/{id}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `id` | `path` | Required |

### `/announcements`

```http
GET /api/open/v1/moenotes/{region}/announcements
```

| Parameter | Location | Required |
| --- | --- | --- |
| `selectedTab` | `query` | Optional |

### `/announcements/{selectedTab}`

```http
GET /api/open/v1/moenotes/{region}/announcements/{selectedTab}
```

| Parameter | Location | Required |
| --- | --- | --- |
| `selectedTab` | `path` | Required |

## Parameters

| Parameter | Description |
| --- | --- |
| `selectedTab` | Announcement category tab. Optional in query form; required in the path form. |
| `id` | Target announcement ID, specified in the path or as the ?id= query parameter. |

## Region differences

Announcements are region-specific and are not translated copies of each other: tabs, ids and bodies differ, and an announcement id from one region returns nothing on another.

## Notes

Announcement bodies are HTML text. Sanitize them before rendering in a browser; never inject them into the DOM raw.

Returns 400 invalid_request for invalid request parameters, 401 invalid_api_key for invalid credentials, 403 insufficient_scope when the key lacks moenotes:announcements, and 404 not_found when the specified announcement is not found.

## Example

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/announcement/$ANNOUNCEMENT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
