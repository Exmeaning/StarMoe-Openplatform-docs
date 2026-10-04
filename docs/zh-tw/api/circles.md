# 圈圈

**Scope:** `moenotes:circles`

依 id 查詢圈圈，或依名稱與條件搜尋圈圈。

## 介面

以下為該功能支援的完整端點路徑，呼叫時僅需填寫對應端點所列出的參數。

### `/circle`

```http
GET /api/open/v1/moenotes/{region}/circle
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `circleId` | `query` | 必填 |

### `/circle/{circleId}`

```http
GET /api/open/v1/moenotes/{region}/circle/{circleId}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `circleId` | `path` | 必填 |

### `/circles/search`

```http
GET /api/open/v1/moenotes/{region}/circles/search
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `options.name` | `query` | 選填 |
| `options.memberRange` | `query` | 選填 |
| `options.joinRule` | `query` | 選填 |
| `options.playStyle` | `query` | 選填 |

### `/circles/search/{name}`

```http
GET /api/open/v1/moenotes/{region}/circles/search/{name}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `name` | `path` | 必填 |
| `options.memberRange` | `query` | 選填 |
| `options.joinRule` | `query` | 選填 |
| `options.playStyle` | `query` | 選填 |

## 參數

| 參數 | 說明 |
| --- | --- |
| `circleId` | 必填，圈圈 id。 |
| `name` | 必填，搜尋介面路徑寫法中的關鍵字。 |
| `options.name` | 選填，搜尋介面 query 寫法的名稱篩選。 |
| `options.memberRange` | 選填，成員人數範圍篩選。 |
| `options.joinRule` | 選填，加入條件篩選。 |
| `options.playStyle` | 選填，遊玩風格篩選。 |

## 地區差異

圈圈資料依各個遊戲區服獨立劃分且不跨服，搜尋結果與篩選條件僅反映所請求區服內的圈圈及成員資訊。

## 注意事項

進階搜尋篩選項均為帶有 options. 前綴的 query 參數（例如 ?options.name=…）；路徑寫法僅支援直接傳入名稱。圈圈名稱需與遊戲內完全一致，目前不支援模糊比對搜尋，搜尋結果不會在伺服器端快取。

若請求參數不合法將回傳 400 invalid_request；金鑰無效回傳 401；缺少 moenotes:circles 權限回傳 403；未找到相符的圈圈回傳 404。

## 範例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/circles/search?options.name=$QUERY" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
