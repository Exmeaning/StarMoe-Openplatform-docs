# 接入流程 {#stepsTitle}

[开发者控制台](https://bdon.moe/open-platform) · [账号与存档授权](https://bdon.moe/account)

本平台非游戏官方 API。应用创建、密钥签发及撤销等管理操作请统一在主站控制台进行（本静态文档站仅供查阅）。创建应用无需人工审核；每个应用最多支持同时保留两把有效密钥，轮换密钥时请先将调用端切换至新密钥，确认生效后再明确撤销旧密钥。

1. 登录后在控制台填写应用名称并创建应用。全部可用权限与地区会自动开通，无需选择；保存 clientID 与仅展示一次的 Secret。
2. 在服务端使用 Secret 调用公开游戏 API。公开玩家资料不需要存档授权。

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```

3. 发送带有 ?invite=clientID 的邀请链接。用户登录后选择具体已上传存档并明确确认授权；仅打开链接不会授权。

[账号与存档授权](https://bdon.moe/account?invite=CLIENT_ID)

4. 仅可下载已经授权的 saveServer/accountID 组合。用户随时可以撤销访问。

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## 服务端保存密钥，不使用 OAuth {#securityTitle}

Secret 只保存在服务端，不得放入浏览器代码、URL 或公开仓库。这不是 OAuth 流程，不发放授权码、回调或用户访问令牌。轮换时先部署新密钥，再撤销旧密钥。

## 公开榜线与歌曲榜 {#public-data}

若需查询榜线、歌曲榜与挑战榜数据，推荐优先使用主站同款公开服务接口 https://api.bdon.moe/api/v1。该服务独立于 Passport 鉴权体系，所有公开端点均支持免鉴权直接发送 GET 请求，无需携带 clientSecret，且不占用 Passport 的每分钟 100 次 / 每日 10000 次配额。请注意：公开服务不保证固定刷新周期或任意第三方浏览器跨域（CORS）支持，亦非无限制调用接口，请合理规划请求频率并做好本地缓存。

[公开榜线与歌曲榜](/public-data)

