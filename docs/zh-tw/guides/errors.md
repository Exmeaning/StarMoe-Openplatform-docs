# 錯誤處理 {#errorsTitle}

處理 API 回應時，建議先檢查 HTTP 狀態碼，再讀取回應主體中的錯誤詳情：400 說明請求參數有誤請修正參數，401 請檢查金鑰有效性或應用程式狀態，403 請檢查是否缺少對應的 scope，404 請確認目標資源是否存在或是否已獲授權，413 表示請求主體超出大小限制，429 表示觸發限流請依 Retry-After 標頭退避重試，503 表示服務暫時無法使用請稍後重試。回應格式方面，遊戲 API 為 {error:{kind}}，存檔與管理介面為 {error:string}。遇到憑證類錯誤請勿盲目重試；建議在日誌中記錄回應標頭中的 X-Request-Id 以便排查問題。

| HTTP | error.kind / error |
|---|---|
| 400 | invalid_request |
| 401 | invalid_api_key |
| 403 | insufficient_scope |
| 404 | not_found |
| 413 | too_large |
| 429 | rate_limited / daily_quota_exceeded / concurrency_limited |
| 503 | open_platform_disabled / admission_unavailable |

## 下載原始存檔 {#saves}

呼叫存檔介面時，若金鑰缺少 saves:read 權限將回傳 403 insufficient_scope；若未獲得使用者授權、存檔不存在或所有權生命週期發生變化，將回傳 404 not_found（而非 403）。檔案大小限制：gzip 檔案最大 8 MiB，解壓縮後 JSON 最大 32 MiB，超出限制將回傳 413 狀態碼。使用者撤銷授權只會攔截後續的新請求，已准入的下載仍可能正常傳輸完成，已下載的資料亦無法召回。

## 公開榜線與歌曲榜 {#public-data}

使用 ETag 與 If-None-Match 取得 304，並遵守 Cache-Control。X-Fetched-At 是實際採集時間，快取命中不會更新；X-Stale: 1 表示舊快照，X-Refreshing: 1 表示已排隊或正在更新。503 pending/upstream 時遵守 Retry-After 並採用指數退避，不要固定高頻重試。

## 錯誤與限流 {#limits}

呼叫公開 profile 介面時，請求的 region 參數支援 tw/jp/en/kr，ID 一律採用十進位字串。請求標頭需攜帶 Authorization: Bearer &lt;Secret&gt;，無需傳入 clientID 標頭。若呼叫存檔介面，saveServer 支援 intl/jp，accountID 對應已上傳存檔頂層的 _profileId，且必須擁有 saves:read 權限及使用者對該指定存檔的明確授權。公開 API 預設依 Passport 使用者維度（跨所有應用程式與金鑰共用）限制呼叫頻率：每分鐘最多 100 次、每日最多 10000 次，並行上限為單一使用者 4、全域 32（實際設定可根據部署進行調整）。遇到 503 狀態碼表示服務或准入閘道目前無法使用。遊戲介面的錯誤回傳格式為 {error:{kind}}，存檔與管理介面回傳格式為 {error:string}。

