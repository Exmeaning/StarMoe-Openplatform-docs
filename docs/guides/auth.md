# 认证、scope 与 region

## Bearer {#authentication}

调用公开 profile 接口时，请求的 region 参数支持 tw/jp/en/kr，ID 统一采用十进制字符串。请求头需携带 Authorization: Bearer &lt;Secret&gt;，无需传入 clientID 请求头。若调用存档接口，saveServer 支持 intl/jp，accountID 对应已上传存档顶层的 _profileId，且必须拥有 saves:read 权限及用户对该特定存档的明确授权。公开 API 默认按 Passport 用户维度（跨所有应用与密钥共享）限制调用频次：每分钟最多 100 次、每日最多 10000 次，并发上限为单用户 4、全局 32（实际配置可根据部署进行调整）。遇到 503 状态码表示服务或准入网关当前不可用。游戏接口的错误返回格式为 {error:{kind}}，存档与管理接口返回格式为 {error:string}。

## 按 scope 划分的游戏 API {#scopesTitle}

主站创建应用时会自动开通全部可用 scope 与地区，无需额外选择。密钥仍受应用权限约束，超出其 scope 的请求会返回 403；存档读取仍须用户明确授权。

- [玩家资料与收藏](/api/profiles) — `moenotes:profiles`: 读取单个玩家的公开资料、批量获取多个资料，或列出某玩家的收藏。
- [资料卡图片](/api/profile-images) — `moenotes:profile-images`: 将玩家资料卡的某一页渲染为 PNG 图片。
- [排行榜](/api/rankings) — `moenotes:rankings`: 歌曲、活动、挑战与竞技场排行榜。
- [热门编队](/api/decks) — `moenotes:decks`: 活动排行榜中的编队构成，以及竞技场编队趋势。
- [圈子](/api/circles) — `moenotes:circles`: 按 id 查询圈子，或按名称与条件搜索圈子。
- [卡池概率](/api/gacha) — `moenotes:gacha`: 卡池及其 UP 卡牌的公开概率。
- [公告](/api/announcements) — `moenotes:announcements`: 游戏内公告列表与公告详情。

`saves:read` — [下载原始存档](/guides/saves)

## 地区差异 {#regions}

所有游戏 API 路径都以 /api/open/v1/moenotes/{region} 开头，region 必填：tw、jp、en 或 kr。query 写法与路径写法等价，例如 /profile?playerProfileId=… 或 /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100。OpenAPI 文档位于 /api/open/openapi.json，机器可读目录位于 /api/open/catalog。

region 决定游戏服务器，同一接口在不同服务器返回的数据并不相同：tw 为港澳台繁体中文服，jp 为日本服，en 为国际（英文）服，kr 为韩服。数字 ID 只在其所属区服内有意义，请始终传入账号所属的 region。公告、卡池、活动、排行榜与圈子都按区服各自维护且不同步，因此某一区服取得的 ID 在另一区服通常无效。

不要假设各区服返回相同的结构或相同的数据行。请把 region 写进请求 URL、缓存键以及你保存的任何 ID，并把某一区服缺少数据视为正常情况。

## 服务端保存密钥，不使用 OAuth {#securityTitle}

Secret 只保存在服务端，不得放入浏览器代码、URL 或公开仓库。这不是 OAuth 流程，不发放授权码、回调或用户访问令牌。轮换时先部署新密钥，再撤销旧密钥。


```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
