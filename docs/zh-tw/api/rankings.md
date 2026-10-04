# 排行榜

**Scope:** `moenotes:rankings`

歌曲、活動、挑戰與競技場排行榜。

::: tip
榜線、歌曲榜和挑戰榜優先使用[公開資料介面](../public-data)，不需傳送金鑰。資料是採集快照；配額不屬於 Passport 配額。
:::

## 介面

以下為該功能支援的完整端點路徑，呼叫時僅需填寫對應端點所列出的參數。

### `/arena/ranking`

```http
GET /api/open/v1/moenotes/{region}/arena/ranking
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `arenaSeasonId` | `query` | 必填 |
| `bandId` | `query` | 選填 |
| `rankingStart` | `query` | 必填 |
| `rankingEnd` | `query` | 必填 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 必填 |
| `bandId` | `query` | 選填 |
| `rankingStart` | `path` | 必填 |
| `rankingEnd` | `path` | 必填 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 必填 |
| `bandId` | `path` | 必填 |
| `rankingStart` | `path` | 必填 |
| `rankingEnd` | `path` | 必填 |

### `/event/challenge-ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge-ranking
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `challengeMusicId` | `query` | 必填 |

### `/event/challenge/{challengeMusicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge/{challengeMusicId}/ranking
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `challengeMusicId` | `path` | 必填 |

### `/event/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/ranking
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `eventId` | `query` | 必填 |
| `ranks` | `query` | 必填 |

### `/event/{eventId}/ranking/{ranks}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/ranking/{ranks}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `eventId` | `path` | 必填 |
| `ranks` | `path` | 必填 |

### `/music/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/ranking
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `query` | 必填 |

### `/music/{musicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/{musicId}/ranking
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `path` | 必填 |

## 參數

| 參數 | 說明 |
| --- | --- |
| `musicId` | 歌曲排行榜或競技場編隊趨勢使用的歌曲 ID。 |
| `eventId` | 活動排行榜與編隊必填。 |
| `ranks` | 必填，從 1 開始且包含首尾的名次區間。可重複傳參（?ranks=1&amp;ranks=100）或使用路徑寫法。 |
| `challengeMusicId` | 必填，挑戰曲目 id。 |
| `arenaSeasonId` | 必填，競技場賽季 id。 |
| `rankingStart` | 必填，競技場區間起始名次。 |
| `rankingEnd` | 必填，競技場區間結束名次。 |
| `bandId` | 選填，競技場排行榜的樂團篩選；路徑寫法為追加 /band/{bandId}。 |

## 地區差異

榜單依區服獨立維護，各區服資料不可直接橫向比較：活動、挑戰與競技場排期週期均不相同，某一區服的 eventId 或 arenaSeasonId 在另一區服通常不存在，歌曲 ID 亦有所區別。

## 注意事項

名次從 1 開始且包含起止名次，名次區間為必填項，請明確傳入具體區間以確保快取與查詢結果的穩定性。

若名次區間不合法或傳入未知參數將回傳 400 invalid_request；金鑰無效回傳 401；缺少 moenotes:rankings 權限回傳 403；目標榜單不存在回傳 404；超出請求頻率限制將回傳 429。

## 範例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/ranking?eventId=$EVENT_ID&ranks=1&ranks=100" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
