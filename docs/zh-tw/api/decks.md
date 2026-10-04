# 熱門編隊

**Scope:** `moenotes:decks`

活動排行榜中的編隊組成，以及競技場編隊趨勢。

## 介面

以下為該功能支援的完整端點路徑，呼叫時僅需填寫對應端點所列出的參數。

### `/arena/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/deck-trend
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `query` | 必填 |
| `arenaSeasonId` | `query` | 必填 |

### `/arena/{arenaSeasonId}/music/{musicId}/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/music/{musicId}/deck-trend
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `path` | 必填 |
| `arenaSeasonId` | `path` | 必填 |

### `/event/deck`

```http
GET /api/open/v1/moenotes/{region}/event/deck
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `query` | 必填 |
| `eventId` | `query` | 必填 |

### `/event/{eventId}/deck/{playerId}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/deck/{playerId}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `path` | 必填 |
| `eventId` | `path` | 必填 |

## 參數

| 參數 | 說明 |
| --- | --- |
| `eventId` | 必填，活動 id。 |
| `playerId` | 必填，要查詢編隊的玩家帳號 id。 |
| `arenaSeasonId` | 必填，競技場賽季 id。 |
| `musicId` | 必填，競技場編隊趨勢對應的歌曲 id。 |

## 地區差異

編隊資料依區服分別儲存，不同區服之間的 playerId 互不相通，並不代表同一位玩家。競技場賽季及其可選曲目列表同樣因區服而異。

## 注意事項

編隊趨勢介面用於聚合特定賽季中某首曲目的熱門陣容搭配；若需查詢玩家個人的編隊詳情，請使用活動編隊相關介面。

若請求參數不合法將回傳 400 invalid_request；金鑰無效回傳 401；缺少 moenotes:decks 權限回傳 403；活動、賽季或玩家資料不存在回傳 404。

## 範例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/$EVENT_ID/deck/$PLAYER_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
