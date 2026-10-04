# API 參考

主站建立應用程式時會自動開通全部可用 scope 與地區，不需額外選擇。金鑰仍受應用程式權限約束，超出其 scope 的請求會回傳 403；存檔讀取仍須使用者明確授權。

所有遊戲 API 路徑都以 /api/open/v1/moenotes/{region} 開頭，region 必填：tw、jp、en 或 kr。query 寫法與路徑寫法等價，例如 /profile?playerProfileId=… 或 /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100。OpenAPI 文件位於 /api/open/openapi.json，機器可讀目錄位於 /api/open/catalog。

- [玩家資料與收藏](/zh-tw/api/profiles) — `moenotes:profiles`: 讀取單一玩家的公開資料、批次取得多個資料，或列出某玩家的收藏。
- [資料卡圖片](/zh-tw/api/profile-images) — `moenotes:profile-images`: 將玩家資料卡的某一頁渲染為 PNG 圖片。
- [排行榜](/zh-tw/api/rankings) — `moenotes:rankings`: 歌曲、活動、挑戰與競技場排行榜。
- [熱門編隊](/zh-tw/api/decks) — `moenotes:decks`: 活動排行榜中的編隊組成，以及競技場編隊趨勢。
- [圈圈](/zh-tw/api/circles) — `moenotes:circles`: 依 id 查詢圈圈，或依名稱與條件搜尋圈圈。
- [卡池機率](/zh-tw/api/gacha) — `moenotes:gacha`: 卡池及其 UP 卡牌的公開機率。
- [公告](/zh-tw/api/announcements) — `moenotes:announcements`: 遊戲內公告列表與公告詳情。

## 公開榜線與歌曲榜 {#public-data}

若需查詢榜線、歌曲榜與挑戰榜資料，建議優先使用主站同款公開服務介面 https://api.bdon.moe/api/v1。該服務獨立於 Passport 驗證體系，所有公開端點均支援免驗證直接發送 GET 請求，無需攜帶 clientSecret，且不佔用 Passport 的每分鐘 100 次 / 每日 10000 次配額。請注意：公開服務不保證固定更新週期或任意第三方瀏覽器跨域（CORS）支援，亦非無限制呼叫介面，請合理規劃請求頻率並做好本地快取。

[公開榜線與歌曲榜](/zh-tw/public-data)

## 地區差異 {#regions}

region 決定遊戲伺服器，同一介面在不同伺服器回傳的資料並不相同：tw 為港澳台繁體中文服，jp 為日本服，en 為國際（英文）服，kr 為韓服。數字 ID 只在其所屬區服內有意義，請一律傳入帳號所屬的 region。公告、卡池、活動、排行榜與圈圈都依區服各自維護且不同步，因此某一區服取得的 ID 在另一區服通常無效。

請勿假設各區服回傳相同結構或相同資料列。請把 region 寫進請求 URL、快取鍵以及你保存的任何 ID，並將某一區服缺少資料視為正常情況。


[OpenAPI](https://passport.bdon.moe/api/open/openapi.json) · [Catalog](https://passport.bdon.moe/api/open/catalog)
