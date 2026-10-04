# 下載原始存檔 {#archiveTitle}

回傳原始 gzip 位元組，而非 JSON。請將回應儲存為 .gz 檔案並自行解壓縮。

[開發者控制台](https://bdon.moe/zh-tw/open-platform) · [帳號與存檔授權](https://bdon.moe/zh-tw/account)

傳送帶有 ?invite=clientID 的邀請連結。使用者登入後選擇指定已上傳存檔並明確確認授權；僅開啟連結不會授權。

[帳號與存檔授權](https://bdon.moe/zh-tw/account?invite=CLIENT_ID)

僅可下載已授權的 saveServer/accountID 組合。使用者隨時可以撤銷存取。

`GET /api/open/v1/saves/{saveServer}/{accountID}`

`saves:read`

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## 地區差異 {#saveServer}

存檔介面不使用遊戲 API 的 region。saveServer 只有 intl（國際服，涵蓋台服、國際／英文服與韓服）與 jp（日服）兩個值，沒有 tw、en 或 kr。在任一國際服上傳的存檔都歸屬 intl，因此請依帳號實際所在伺服器選擇，而不是依呼叫遊戲 API 時使用的 region。

- `intl`: 國際服：台服、國際／英文服與韓服。
- `jp`: 日服。

## 回應 {#gzip}

回應標頭包含 Content-Type: application/gzip 與 Cache-Control: no-store，回應中沒有 Content-Encoding: gzip；回傳資料本身即為 gzip 二進位檔案，而非 HTTP 傳輸層的內容編碼壓縮，因此請求中的 Accept-Encoding 不會改變回傳格式。開發者在伺服器端僅憑自己的 Secret 以及路徑中的 saveServer 與 accountID 即可發起請求，不需要取得使用者存取權杖、設定 OAuth 回呼或使用 Passport 使用者 ID。

## 錯誤處理 {#errors}

呼叫存檔介面時，若金鑰缺少 saves:read 權限將回傳 403 insufficient_scope；若未獲得使用者明確授權、存檔不存在或資料所有權已失效，將回傳 404 not_found（而非 403）。存檔檔案大小存在嚴格限制：gzip 檔案最大 8 MiB，解壓縮後 JSON 最大 32 MiB，超出上限將回傳 413 錯誤。若使用者撤銷了存檔授權，僅會攔截後續的新請求；已准入並在傳輸中的下載可能會繼續完成，已下載到本地的資料無法召回。

## 伺服器端保存金鑰，不使用 OAuth {#securityTitle}

Secret 只保存在伺服器端，不得放入瀏覽器程式碼、URL 或公開儲存庫。這不是 OAuth 流程，不發放授權碼、回呼或使用者存取權杖。輪替時先部署新金鑰，再撤銷舊金鑰。

