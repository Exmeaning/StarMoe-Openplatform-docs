# 開放平台接入文件

透過 Moenotes API 接入公開玩家資料、排行榜、卡池資料與經過使用者授權的 gzip 存檔下載。

[開發者控制台](https://bdon.moe/zh-tw/open-platform) · [帳號與存檔授權](https://bdon.moe/zh-tw/account)

## 概覽 {#overview}

註冊應用程式即取得 clientID 與 Secret，無需機器人、驗證碼或審核。

本平台非遊戲官方 API。應用程式建立、金鑰簽發與撤銷等管理操作請統一至主站控制台進行（本靜態文件站僅供查閱）。建立應用程式無需人工審核；每個應用程式最多支援同時保留兩把有效金鑰，輪替金鑰時請先將呼叫端切換至新金鑰，確認生效後再明確撤銷舊金鑰。

## 公開榜線與歌曲榜 {#public-data}

若需查詢榜線、歌曲榜與挑戰榜資料，建議優先使用主站同款公開服務介面 https://api.bdon.moe/api/v1。該服務獨立於 Passport 驗證體系，所有公開端點均支援免驗證直接發送 GET 請求，無需攜帶 clientSecret，且不佔用 Passport 的每分鐘 100 次 / 每日 10000 次配額。請注意：公開服務不保證固定更新週期或任意第三方瀏覽器跨域（CORS）支援，亦非無限制呼叫介面，請合理規劃請求頻率並做好本地快取。

[公開榜線與歌曲榜](/zh-tw/public-data)

## 接入流程 {#stepsTitle}

[接入流程](/zh-tw/quickstart) · [驗證、scope 與 region](/zh-tw/guides/auth) · [下載原始存檔](/zh-tw/guides/saves) · [限流與安全](/zh-tw/guides/limits) · [錯誤處理](/zh-tw/guides/errors)

## API 參考 {#scopesTitle}

- [玩家資料與收藏](/zh-tw/api/profiles) — `moenotes:profiles`: 讀取單一玩家的公開資料、批次取得多個資料，或列出某玩家的收藏。
- [資料卡圖片](/zh-tw/api/profile-images) — `moenotes:profile-images`: 將玩家資料卡的某一頁渲染為 PNG 圖片。
- [排行榜](/zh-tw/api/rankings) — `moenotes:rankings`: 歌曲、活動、挑戰與競技場排行榜。
- [熱門編隊](/zh-tw/api/decks) — `moenotes:decks`: 活動排行榜中的編隊組成，以及競技場編隊趨勢。
- [圈圈](/zh-tw/api/circles) — `moenotes:circles`: 依 id 查詢圈圈，或依名稱與條件搜尋圈圈。
- [卡池機率](/zh-tw/api/gacha) — `moenotes:gacha`: 卡池及其 UP 卡牌的公開機率。
- [公告](/zh-tw/api/announcements) — `moenotes:announcements`: 遊戲內公告列表與公告詳情。

