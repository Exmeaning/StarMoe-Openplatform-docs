# 接入流程 {#stepsTitle}

[開發者控制台](https://bdon.moe/zh-tw/open-platform) · [帳號與存檔授權](https://bdon.moe/zh-tw/account)

本平台非遊戲官方 API。應用程式建立、金鑰簽發與撤銷等管理操作請統一至主站控制台進行（本靜態文件站僅供查閱）。建立應用程式無需人工審核；每個應用程式最多支援同時保留兩把有效金鑰，輪替金鑰時請先將呼叫端切換至新金鑰，確認生效後再明確撤銷舊金鑰。

1. 登入後在控制台填寫應用程式名稱並建立。全部可用權限與地區會自動開通，不需選擇；保存 clientID 與僅顯示一次的 Secret。
2. 在伺服器端使用 Secret 呼叫公開遊戲 API。公開玩家資料不需要存檔授權。

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```

3. 傳送帶有 ?invite=clientID 的邀請連結。使用者登入後選擇指定已上傳存檔並明確確認授權；僅開啟連結不會授權。

[帳號與存檔授權](https://bdon.moe/zh-tw/account?invite=CLIENT_ID)

4. 僅可下載已授權的 saveServer/accountID 組合。使用者隨時可以撤銷存取。

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## 伺服器端保存金鑰，不使用 OAuth {#securityTitle}

Secret 只保存在伺服器端，不得放入瀏覽器程式碼、URL 或公開儲存庫。這不是 OAuth 流程，不發放授權碼、回呼或使用者存取權杖。輪替時先部署新金鑰，再撤銷舊金鑰。

## 公開榜線與歌曲榜 {#public-data}

若需查詢榜線、歌曲榜與挑戰榜資料，建議優先使用主站同款公開服務介面 https://api.bdon.moe/api/v1。該服務獨立於 Passport 驗證體系，所有公開端點均支援免驗證直接發送 GET 請求，無需攜帶 clientSecret，且不佔用 Passport 的每分鐘 100 次 / 每日 10000 次配額。請注意：公開服務不保證固定更新週期或任意第三方瀏覽器跨域（CORS）支援，亦非無限制呼叫介面，請合理規劃請求頻率並做好本地快取。

[公開榜線與歌曲榜](/zh-tw/public-data)

