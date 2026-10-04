# 公開榜線與歌曲榜

若需查詢榜線、歌曲榜與挑戰榜資料，建議優先使用主站同款公開服務介面 https://api.bdon.moe/api/v1。該服務獨立於 Passport 驗證體系，所有公開端點均支援免驗證直接發送 GET 請求，無需攜帶 clientSecret，且不佔用 Passport 的每分鐘 100 次 / 每日 10000 次配額。請注意：公開服務不保證固定更新週期或任意第三方瀏覽器跨域（CORS）支援，亦非無限制呼叫介面，請合理規劃請求頻率並做好本地快取。

該服務回傳的均為伺服器端快取快照，而非與遊戲服即時直連。server 參數支援 tw、jp、en、kr（以伺服器端設定為準），傳入未知區服將回傳 404。eventId、profileId 等 64 位元整數 ID 請統一使用十進位字串傳遞。除公告介面中的部分上游欄位外，時間戳通常採用 Unix 毫秒表示。

`https://api.bdon.moe/api/v1`

## 介面 {#routes}

```http
GET /api/v1/{server}/music/{musicId}/ranking
GET /api/v1/{server}/events
GET /api/v1/{server}/events/current
GET /api/v1/{server}/events/{eventId}
GET /api/v1/{server}/events/{eventId}/latest
GET /api/v1/{server}/events/{eventId}/challenges
GET /api/v1/{server}/events/{eventId}/challenges/{challengeMusicId}/ranking
GET /api/v1/{server}/announcements
GET /api/v1/{server}/announcements/{id}?rev={lastUpdatedAt}
GET /api/v1/{server}/announcements/{id}/revisions
GET /api/v1/{server}/ranking/profile/{profileId}/card/{page}
```

```sh
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/current"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/latest"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/challenges/$CHALLENGE_MUSIC_ID/ranking"
```

## latest {#latest}

latest 是最新合併快照。rows 缺少的名次不可填零；parts 各有 fetchedAt，重複名次可有多列並標示 dup。stale 表示中斷後保留舊結果，frozen 表示集計凍結。使用 X-Server-Time 與 updatedAt 計算資料年齡，依 nextUpdateAt 加隨機延遲輪詢。

## music {#music}

歌曲榜保留 players 順序，資料列沒有 rank；顯示順位可用 index + 1，並註明來自回應順序。不要依分數重新排序或推論同名次規則，也不保證固定 100 列。空物件以 players ?? [] 處理。musicId 必須屬於所選區服歌曲目錄。

## challenges {#challenges}

先查詢活動的 challenges 目錄，再用 challengeMusicId 請求，不能以普通 musicId 代替。挑戰榜沒有 ranks、分頁或難度參數；積分榜 disabled 不代表歌曲榜停用。每首歌獨立維護狀態及採集時間。X-Final-Quality: lastSeen 只是最後成功觀測，不是已確認的官方最終名次；三首歌也不是同時快照。

## 公告版本 {#announcements}

公告列表由前端依 category 篩選；startAt、endAt、lastUpdatedAt 是 Unix 秒的十進位字串，與榜線毫秒不同。詳情可用 rev 指定已快取版本，省略則回傳最新版。X-Revision 標示版本，X-Listed: 0 表示公告已撤下。正文為完整未過濾 HTML，必須使用不加 allow-scripts 或 allow-same-origin 的 sandbox iframe，不可插入主頁 DOM。

## 公開服務回應與快取 {#cache}

使用 ETag 與 If-None-Match 取得 304，並遵守 Cache-Control。X-Fetched-At 是實際採集時間，快取命中不會更新；X-Stale: 1 表示舊快照，X-Refreshing: 1 表示已排隊或正在更新。503 pending/upstream 時遵守 Retry-After 並採用指數退避，不要固定高頻重試。

[公開服務回應與快取](/zh-tw/public-ranking-contract)

