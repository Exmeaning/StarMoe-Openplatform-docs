# 資料卡圖片

**Scope:** `moenotes:profile-images`

將玩家資料卡的某一頁渲染為 PNG 圖片。

## 介面

以下為該功能支援的完整端點路徑，呼叫時僅需填寫對應端點所列出的參數。

### `/profile/{profileId}/card/{page}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}/card/{page}
```

| 參數 | 位置 | 必填 |
| --- | --- | --- |
| `profileId` | `path` | 必填 |
| `page` | `path` | 必填 |

## 參數

| 參數 | 說明 |
| --- | --- |
| `profileId` | 與資料介面相同的公開 profile id。 |
| `page` | 必填，從 1 開始的頁碼。回應為 PNG，上限 8MiB。 |

## 地區差異

介面在四個區服均可使用，卡面渲染效果取決於對應區服儲存的玩家資料。玩家資料卡的總頁數因區服與個人設定而異，某一區服中有效的頁碼在另一區服可能會超出實際範圍。

## 注意事項

由於此介面必須攜帶包含金鑰的 Authorization 標頭，因此無法在前端直接透過 &lt;img src&gt; 標籤發起請求。建議由開發者伺服器端代為請求並中轉圖片二進位位元組流，請求前請先確認目標頁碼在有效範圍內。

金鑰無效回傳 401 invalid_api_key；缺少 moenotes:profile-images 權限回傳 403 insufficient_scope；玩家資料不存在或請求頁碼超出範圍回傳 404 not_found；超出請求頻率限制將回傳 429。

## 範例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID/card/1" \
  -H "Authorization: Bearer $CLIENT_SECRET" \
  --output card.png
```
