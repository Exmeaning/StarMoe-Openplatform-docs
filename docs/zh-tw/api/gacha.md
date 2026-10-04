# 卡池機率

**Scope:** `moenotes:gacha`

卡池及其 UP 卡牌的公開機率。

## 介面

以下為該功能支援的完整端點路徑，呼叫時僅需填寫對應端點所列出的參數。

### `/gacha/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/rates
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `gachaId` | `query` | 必填 |
| `productId` | `query` | 選填 |
| `selectedPickUp` | `query` | 選填 |

### `/gacha/{gachaId}/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `gachaId` | `path` | 必填 |
| `productId` | `query` | 選填 |
| `selectedPickUp` | `query` | 選填 |

### `/gacha/{gachaId}/rates/{selectedPickUp}`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates/{selectedPickUp}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `gachaId` | `path` | 必填 |
| `productId` | `query` | 選填 |
| `selectedPickUp` | `path` | 必填 |

## 參數

| 參數 | 說明 |
| --- | --- |
| `gachaId` | 必填，卡池 id，不存在「省略即目前 UP」的行為。 |
| `selectedPickUp` | 卡池精選索引。查詢形式可省略；路徑形式必填。 |
| `productId` | 選填，用於限定卡池機率表的商品 id。 |

## 地區差異

卡池依區服排程開放，各服活動排程與 UP 內容均不相同，呼叫時傳入的 gachaId 必須與目標區服一致。抽卡機率與 UP 卡牌配置同樣因區服而異。

## 注意事項

呼叫時請務必傳入明確的 gachaId；介面不會預設回退到目前正在開放的卡池。

若請求參數缺失或未知將回傳 400 invalid_request；金鑰無效回傳 401；缺少 moenotes:gacha 權限回傳 403；目標卡池不存在回傳 404。

## 範例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/gacha/rates?gachaId=$GACHA_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
