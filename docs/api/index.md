# API 参考

主站创建应用时会自动开通全部可用 scope 与地区，无需额外选择。密钥仍受应用权限约束，超出其 scope 的请求会返回 403；存档读取仍须用户明确授权。

所有游戏 API 路径都以 /api/open/v1/moenotes/{region} 开头，region 必填：tw、jp、en 或 kr。query 写法与路径写法等价，例如 /profile?playerProfileId=… 或 /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100。OpenAPI 文档位于 /api/open/openapi.json，机器可读目录位于 /api/open/catalog。

- [玩家资料与收藏](/api/profiles) — `moenotes:profiles`: 读取单个玩家的公开资料、批量获取多个资料，或列出某玩家的收藏。
- [资料卡图片](/api/profile-images) — `moenotes:profile-images`: 将玩家资料卡的某一页渲染为 PNG 图片。
- [排行榜](/api/rankings) — `moenotes:rankings`: 歌曲、活动、挑战与竞技场排行榜。
- [热门编队](/api/decks) — `moenotes:decks`: 活动排行榜中的编队构成，以及竞技场编队趋势。
- [圈子](/api/circles) — `moenotes:circles`: 按 id 查询圈子，或按名称与条件搜索圈子。
- [卡池概率](/api/gacha) — `moenotes:gacha`: 卡池及其 UP 卡牌的公开概率。
- [公告](/api/announcements) — `moenotes:announcements`: 游戏内公告列表与公告详情。

## 公开榜线与歌曲榜 {#public-data}

若需查询榜线、歌曲榜与挑战榜数据，推荐优先使用主站同款公开服务接口 https://api.bdon.moe/api/v1。该服务独立于 Passport 鉴权体系，所有公开端点均支持免鉴权直接发送 GET 请求，无需携带 clientSecret，且不占用 Passport 的每分钟 100 次 / 每日 10000 次配额。请注意：公开服务不保证固定刷新周期或任意第三方浏览器跨域（CORS）支持，亦非无限制调用接口，请合理规划请求频率并做好本地缓存。

[公开榜线与歌曲榜](/public-data)

## 地区差异 {#regions}

region 决定游戏服务器，同一接口在不同服务器返回的数据并不相同：tw 为港澳台繁体中文服，jp 为日本服，en 为国际（英文）服，kr 为韩服。数字 ID 只在其所属区服内有意义，请始终传入账号所属的 region。公告、卡池、活动、排行榜与圈子都按区服各自维护且不同步，因此某一区服取得的 ID 在另一区服通常无效。

不要假设各区服返回相同的结构或相同的数据行。请把 region 写进请求 URL、缓存键以及你保存的任何 ID，并把某一区服缺少数据视为正常情况。


[OpenAPI](https://passport.bdon.moe/api/open/openapi.json) · [Catalog](https://passport.bdon.moe/api/open/catalog)
