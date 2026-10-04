# 公開服務回應與快取

該服務回傳的均為伺服器端快取快照，而非與遊戲服即時直連。server 參數支援 tw、jp、en、kr（以伺服器端設定為準），傳入未知區服將回傳 404。eventId、profileId 等 64 位元整數 ID 請統一使用十進位字串傳遞。除公告介面中的部分上游欄位外，時間戳通常採用 Unix 毫秒表示。

## latest {#latest}

latest 是最新合併快照。rows 缺少的名次不可填零；parts 各有 fetchedAt，重複名次可有多列並標示 dup。stale 表示中斷後保留舊結果，frozen 表示集計凍結。使用 X-Server-Time 與 updatedAt 計算資料年齡，依 nextUpdateAt 加隨機延遲輪詢。

## music / challenges {#rankings}

歌曲榜保留 players 順序，資料列沒有 rank；顯示順位可用 index + 1，並註明來自回應順序。不要依分數重新排序或推論同名次規則，也不保證固定 100 列。空物件以 players ?? [] 處理。musicId 必須屬於所選區服歌曲目錄。

先查詢活動的 challenges 目錄，再用 challengeMusicId 請求，不能以普通 musicId 代替。挑戰榜沒有 ranks、分頁或難度參數；積分榜 disabled 不代表歌曲榜停用。每首歌獨立維護狀態及採集時間。X-Final-Quality: lastSeen 只是最後成功觀測，不是已確認的官方最終名次；三首歌也不是同時快照。

## ETag / Retry-After {#cache}

使用 ETag 與 If-None-Match 取得 304，並遵守 Cache-Control。X-Fetched-At 是實際採集時間，快取命中不會更新；X-Stale: 1 表示舊快照，X-Refreshing: 1 表示已排隊或正在更新。503 pending/upstream 時遵守 Retry-After 並採用指數退避，不要固定高頻重試。

## 公告版本 {#announcements}

公告列表由前端依 category 篩選；startAt、endAt、lastUpdatedAt 是 Unix 秒的十進位字串，與榜線毫秒不同。詳情可用 rev 指定已快取版本，省略則回傳最新版。X-Revision 標示版本，X-Listed: 0 表示公告已撤下。正文為完整未過濾 HTML，必須使用不加 allow-scripts 或 allow-same-origin 的 sandbox iframe，不可插入主頁 DOM。

## tiers / bundle {#curves}

tiers 介面支援 tiers、res、from、to、since 等查詢參數。res 解析度可選 auto、raw、10m、1h，其中 raw 原始粒度最長支援查詢 6 小時；時間戳 t 為相對於 base 時間點的毫秒偏移。若某一時間桶無觀測資料，請保留缺失狀態，不可填零。歸檔路徑 /bundle/{server}/event/{eventId}/v{n}/ 為帶有明確版本號的不可變靜態資源包。

```json
{"error":{"kind":"pending","message":"..."}}
```

使用 ETag 與 If-None-Match 取得 304，並遵守 Cache-Control。X-Fetched-At 是實際採集時間，快取命中不會更新；X-Stale: 1 表示舊快照，X-Refreshing: 1 表示已排隊或正在更新。503 pending/upstream 時遵守 Retry-After 並採用指數退避，不要固定高頻重試。

[公開榜線與歌曲榜](/zh-tw/public-data)
