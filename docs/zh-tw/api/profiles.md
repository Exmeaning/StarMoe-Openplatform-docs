# 玩家資料與收藏

**Scope:** `moenotes:profiles`

讀取單一玩家的公開資料、批次取得多個資料，或列出某玩家的收藏。

## 介面

以下為該功能支援的完整端點路徑，呼叫時僅需填寫對應端點所列出的參數。

### `/player/{playerId}/favorites`

```http
GET /api/open/v1/moenotes/{region}/player/{playerId}/favorites
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `path` | 必填 |

### `/profile`

```http
GET /api/open/v1/moenotes/{region}/profile
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `playerProfileId` | `query` | 必填 |

### `/profile/favorites`

```http
GET /api/open/v1/moenotes/{region}/profile/favorites
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `query` | 必填 |

### `/profile/{profileId}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `profileId` | `path` | 必填 |

### `/profiles`

```http
GET /api/open/v1/moenotes/{region}/profiles
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `accountIds` | `query` | 必填 |

### `/profiles/{accountIds}`

```http
GET /api/open/v1/moenotes/{region}/profiles/{accountIds}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `accountIds` | `path` | 必填 |

## 參數

| 參數 | 說明 |
| --- | --- |
| `profileId` | 公開 profile id：日本以外為 11 位且以 2、3 或 4 開頭；日本為正 int64。一律以十進位字串傳遞。 |
| `playerProfileId` | 單一資料介面的 profileId query 寫法，與 playerId 不可混用。 |
| `accountIds` | 批次請求的帳號 id，以逗號分隔，最多 100 個。 |
| `playerId` | 要查詢收藏的帳號 id，與 profileId 不可混用。 |

## 地區差異

四個區服都可用，但 profileId 規則不同：jp 為正 int64，tw/en/kr 為 11 位且分別以 2、3、4 開頭。同一帳號在不同區服有不同 ID，收藏也依區服區分。

## 注意事項

profileId、playerId、accountId 是不同識別，不能互換。路徑寫法與 query 寫法回傳相同資料。

若請求參數缺失、格式錯誤或傳入未知參數將回傳 400 invalid_request；金鑰無效回傳 401 invalid_api_key；缺少 moenotes:profiles 權限回傳 403 insufficient_scope；玩家不存在或未公開資料回傳 404 not_found。

## 範例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
