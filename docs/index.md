# 开放平台接入文档

通过 Moenotes API 接入公开玩家资料、排行榜、卡池数据与经过用户授权的 gzip 存档下载。

[开发者控制台](https://bdon.moe/open-platform) · [账号与存档授权](https://bdon.moe/account)

## 概览 {#overview}

注册应用即获得 clientID 与 Secret，无需机器人、验证码或审核。

本平台非游戏官方 API。应用创建、密钥签发及撤销等管理操作请统一在主站控制台进行（本静态文档站仅供查阅）。创建应用无需人工审核；每个应用最多支持同时保留两把有效密钥，轮换密钥时请先将调用端切换至新密钥，确认生效后再明确撤销旧密钥。

## 公开榜线与歌曲榜 {#public-data}

若需查询榜线、歌曲榜与挑战榜数据，推荐优先使用主站同款公开服务接口 https://api.bdon.moe/api/v1。该服务独立于 Passport 鉴权体系，所有公开端点均支持免鉴权直接发送 GET 请求，无需携带 clientSecret，且不占用 Passport 的每分钟 100 次 / 每日 10000 次配额。请注意：公开服务不保证固定刷新周期或任意第三方浏览器跨域（CORS）支持，亦非无限制调用接口，请合理规划请求频率并做好本地缓存。

[公开榜线与歌曲榜](/public-data)

## 接入流程 {#stepsTitle}

[接入流程](/quickstart) · [认证、scope 与 region](/guides/auth) · [下载原始存档](/guides/saves) · [限流与安全](/guides/limits) · [错误处理](/guides/errors)

## API 参考 {#scopesTitle}

- [玩家资料与收藏](/api/profiles) — `moenotes:profiles`: 读取单个玩家的公开资料、批量获取多个资料，或列出某玩家的收藏。
- [资料卡图片](/api/profile-images) — `moenotes:profile-images`: 将玩家资料卡的某一页渲染为 PNG 图片。
- [排行榜](/api/rankings) — `moenotes:rankings`: 歌曲、活动、挑战与竞技场排行榜。
- [热门编队](/api/decks) — `moenotes:decks`: 活动排行榜中的编队构成，以及竞技场编队趋势。
- [圈子](/api/circles) — `moenotes:circles`: 按 id 查询圈子，或按名称与条件搜索圈子。
- [卡池概率](/api/gacha) — `moenotes:gacha`: 卡池及其 UP 卡牌的公开概率。
- [公告](/api/announcements) — `moenotes:announcements`: 游戏内公告列表与公告详情。

