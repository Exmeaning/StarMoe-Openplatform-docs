# 公告

**Scope:** `moenotes:announcements`

遊戲內公告列表與公告詳情。

## 介面

以下為該功能支援的完整端點路徑，呼叫時僅需填寫對應端點所列出的參數。

### `/announcement`

```http
GET /api/open/v1/moenotes/{region}/announcement
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `id` | `query` | 必填 |

### `/announcement/{id}`

```http
GET /api/open/v1/moenotes/{region}/announcement/{id}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `id` | `path` | 必填 |

### `/announcements`

```http
GET /api/open/v1/moenotes/{region}/announcements
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `selectedTab` | `query` | 選填 |

### `/announcements/{selectedTab}`

```http
GET /api/open/v1/moenotes/{region}/announcements/{selectedTab}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `selectedTab` | `path` | 必填 |

## 參數

| 參數 | 說明 |
| --- | --- |
| `selectedTab` | 公告分類。查詢形式可省略；路徑形式必填。 |
| `id` | 必填，公告 id，可用路徑寫法或 ?id= query 寫法。 |

## 地區差異

公告依區服獨立發布，各區服公告並非簡單的多語言翻譯版本：其分類頁籤、公告 ID 及正文內容均獨立存在，在某一區服取得的公告 ID 無法在其他區服查詢到結果。

## 注意事項

公告正文包含完整的 HTML 富文字內容，前端在渲染展示前必須自行進行安全過濾（sanitize），嚴禁直接將未經處理的內容插入到主頁面 DOM 中。

若請求參數不合法將回傳 400 invalid_request；金鑰無效回傳 401；缺少 moenotes:announcements 權限回傳 403；目標公告不存在回傳 404。

## 範例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/announcement/$ANNOUNCEMENT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
