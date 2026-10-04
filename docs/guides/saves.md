# 下载原始存档 {#archiveTitle}

返回原始 gzip 字节，而非 JSON。请将响应保存为 .gz 文件并自行解压。

[开发者控制台](https://bdon.moe/open-platform) · [账号与存档授权](https://bdon.moe/account)

发送带有 ?invite=clientID 的邀请链接。用户登录后选择具体已上传存档并明确确认授权；仅打开链接不会授权。

[账号与存档授权](https://bdon.moe/account?invite=CLIENT_ID)

仅可下载已经授权的 saveServer/accountID 组合。用户随时可以撤销访问。

`GET /api/open/v1/saves/{saveServer}/{accountID}`

`saves:read`

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## 地区差异 {#saveServer}

存档接口不使用游戏 API 的 region。saveServer 只有 intl（国际服，覆盖台服、国际/英文服与韩服）与 jp（日服）两个值，没有 tw、en 或 kr。在任一国际服上传的存档都归属 intl，因此请按账号实际所在服务器选择，而不是按调用游戏 API 时使用的 region。

- `intl`: 国际服：台服、国际/英文服与韩服。
- `jp`: 日服。

## 响应 {#gzip}

响应标头包含 Content-Type: application/gzip 与 Cache-Control: no-store，响应中没有 Content-Encoding: gzip；返回数据本身即为 gzip 二进制文件，而非 HTTP 传输层的内容编码压缩，因此请求中的 Accept-Encoding 不会改变返回格式。开发者在服务端仅凭自己的 Secret 以及路径中的 saveServer 与 accountID 即可发起请求，不需要获取用户访问令牌、配置 OAuth 回调或使用 Passport 用户 ID。

## 错误处理 {#errors}

调用存档接口时，若密钥缺少 saves:read 权限将返回 403 insufficient_scope；若未获得用户明确授权、存档不存在或数据所有权已失效，将返回 404 not_found（而非 403）。存档文件体积存在严格限制：gzip 文件最大 8 MiB，解压后 JSON 最大 32 MiB，超出上限将返回 413 错误。若用户撤销了存档授权，仅会拦截后续的新请求；已准入并在传输中的下载可能会继续完成，已下载到本地的数据无法召回。

## 服务端保存密钥，不使用 OAuth {#securityTitle}

Secret 只保存在服务端，不得放入浏览器代码、URL 或公开仓库。这不是 OAuth 流程，不发放授权码、回调或用户访问令牌。轮换时先部署新密钥，再撤销旧密钥。

