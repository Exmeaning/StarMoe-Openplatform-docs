# 公开榜线与歌曲榜

若需查询榜线、歌曲榜与挑战榜数据，推荐优先使用主站同款公开服务接口 https://api.bdon.moe/api/v1。该服务独立于 Passport 鉴权体系，所有公开端点均支持免鉴权直接发送 GET 请求，无需携带 clientSecret，且不占用 Passport 的每分钟 100 次 / 每日 10000 次配额。请注意：公开服务不保证固定刷新周期或任意第三方浏览器跨域（CORS）支持，亦非无限制调用接口，请合理规划请求频率并做好本地缓存。

该服务返回的均为服务端缓存快照，而非与游戏服实时直连。server 参数支持 tw、jp、en、kr（以服务端配置为准），传入未知区服将返回 404。eventId、profileId 等 64 位整数 ID 请统一使用十进制字符串传递。除公告接口中的部分上游字段外，时间戳通常采用 Unix 毫秒表示。

`https://api.bdon.moe/api/v1`

## 接口 {#routes}

```http
GET /api/v1/{server}/music/{musicId}/ranking
GET /api/v1/{server}/events
GET /api/v1/{server}/events/current
GET /api/v1/{server}/events/{eventId}
GET /api/v1/{server}/events/{eventId}/latest
GET /api/v1/{server}/events/{eventId}/challenges
GET /api/v1/{server}/events/{eventId}/challenges/{challengeMusicId}/ranking
GET /api/v1/{server}/announcements
GET /api/v1/{server}/announcements/{id}?rev={lastUpdatedAt}
GET /api/v1/{server}/announcements/{id}/revisions
GET /api/v1/{server}/ranking/profile/{profileId}/card/{page}
```

```sh
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/current"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/latest"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/challenges/$CHALLENGE_MUSIC_ID/ranking"
```

## latest {#latest}

latest 是最新合并快照。rows 中缺失名次不能补为零；parts 各有 fetchedAt，重复名次可能多行且标记 dup。stale 表示采集中断后保留旧结果，frozen 表示集计冻结。以 X-Server-Time 与 updatedAt 判断年龄，按 nextUpdateAt 加随机抖动轮询。

## music {#music}

歌曲榜响应保留 players 顺序，行没有 rank；展示顺位可用 index + 1，并标明来源是响应顺序。不要按分数重新排序或推导并列规则，数量也不保证固定 100 行。空对象按 players ?? [] 处理。musicId 必须属于所选区服歌曲目录。

## challenges {#challenges}

先查询活动的 challenges 目录，再用 challengeMusicId 请求，不能以普通 musicId 替代。挑战榜不使用 ranks、分页或难度参数；积分榜 disabled 不代表挑战歌曲榜禁用。每首歌单独维护状态和采集时间。X-Final-Quality: lastSeen 只是最后成功观测，不是确认过的官方最终名次；三首歌曲也不构成同一时刻的快照。

## 公告版本 {#announcements}

公告列表由前端按 category 筛选；startAt、endAt、lastUpdatedAt 是 Unix 秒的十进制字符串，和榜线的毫秒不同。详情可用 rev 指定已缓存版本，省略时返回最新版本。X-Revision 标识版本，X-Listed: 0 表示已从列表撤下。正文是完整未过滤 HTML，必须放入不带 allow-scripts 或 allow-same-origin 的 sandbox iframe，不可插入主页面 DOM。

## 公开服务响应与缓存 {#cache}

使用 ETag 与 If-None-Match 支持 304，并遵循 Cache-Control。X-Fetched-At 是实际采集时间，缓存命中不刷新它；X-Stale: 1 表示旧快照，X-Refreshing: 1 表示刷新已排队或进行中。503 pending/upstream 时遵守 Retry-After，指数退避；不要用固定高频重试绕过服务调度。

[公开服务响应与缓存](/public-ranking-contract)

