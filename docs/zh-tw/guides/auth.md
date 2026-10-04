# 驗證、scope 與 region

## Bearer {#authentication}

呼叫公開 profile 介面時，請求的 region 參數支援 tw/jp/en/kr，ID 一律採用十進位字串。請求標頭需攜帶 Authorization: Bearer &lt;Secret&gt;，無需傳入 clientID 標頭。若呼叫存檔介面，saveServer 支援 intl/jp，accountID 對應已上傳存檔頂層的 _profileId，且必須擁有 saves:read 權限及使用者對該指定存檔的明確授權。公開 API 預設依 Passport 使用者維度（跨所有應用程式與金鑰共用）限制呼叫頻率：每分鐘最多 100 次、每日最多 10000 次，並行上限為單一使用者 4、全域 32（實際設定可根據部署進行調整）。遇到 503 狀態碼表示服務或准入閘道目前無法使用。遊戲介面的錯誤回傳格式為 {error:{kind}}，存檔與管理介面回傳格式為 {error:string}。

## 依 scope 分類的遊戲 API {#scopesTitle}

主站建立應用程式時會自動開通全部可用 scope 與地區，不需額外選擇。金鑰仍受應用程式權限約束，超出其 scope 的請求會回傳 403；存檔讀取仍須使用者明確授權。

- [玩家資料與收藏](/zh-tw/api/profiles) — `moenotes:profiles`: 讀取單一玩家的公開資料、批次取得多個資料，或列出某玩家的收藏。
- [資料卡圖片](/zh-tw/api/profile-images) — `moenotes:profile-images`: 將玩家資料卡的某一頁渲染為 PNG 圖片。
- [排行榜](/zh-tw/api/rankings) — `moenotes:rankings`: 歌曲、活動、挑戰與競技場排行榜。
- [熱門編隊](/zh-tw/api/decks) — `moenotes:decks`: 活動排行榜中的編隊組成，以及競技場編隊趨勢。
- [圈圈](/zh-tw/api/circles) — `moenotes:circles`: 依 id 查詢圈圈，或依名稱與條件搜尋圈圈。
- [卡池機率](/zh-tw/api/gacha) — `moenotes:gacha`: 卡池及其 UP 卡牌的公開機率。
- [公告](/zh-tw/api/announcements) — `moenotes:announcements`: 遊戲內公告列表與公告詳情。

`saves:read` — [下載原始存檔](/zh-tw/guides/saves)

## 地區差異 {#regions}

所有遊戲 API 路徑都以 /api/open/v1/moenotes/{region} 開頭，region 必填：tw、jp、en 或 kr。query 寫法與路徑寫法等價，例如 /profile?playerProfileId=… 或 /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100。OpenAPI 文件位於 /api/open/openapi.json，機器可讀目錄位於 /api/open/catalog。

region 決定遊戲伺服器，同一介面在不同伺服器回傳的資料並不相同：tw 為港澳台繁體中文服，jp 為日本服，en 為國際（英文）服，kr 為韓服。數字 ID 只在其所屬區服內有意義，請一律傳入帳號所屬的 region。公告、卡池、活動、排行榜與圈圈都依區服各自維護且不同步，因此某一區服取得的 ID 在另一區服通常無效。

請勿假設各區服回傳相同結構或相同資料列。請把 region 寫進請求 URL、快取鍵以及你保存的任何 ID，並將某一區服缺少資料視為正常情況。

## 伺服器端保存金鑰，不使用 OAuth {#securityTitle}

Secret 只保存在伺服器端，不得放入瀏覽器程式碼、URL 或公開儲存庫。這不是 OAuth 流程，不發放授權碼、回呼或使用者存取權杖。輪替時先部署新金鑰，再撤銷舊金鑰。


```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
