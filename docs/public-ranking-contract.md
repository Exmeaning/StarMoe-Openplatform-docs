# 公开服务响应与缓存

该服务返回的均为服务端缓存快照，而非与游戏服实时直连。server 参数支持 tw、jp、en、kr（以服务端配置为准），传入未知区服将返回 404。eventId、profileId 等 64 位整数 ID 请统一使用十进制字符串传递。除公告接口中的部分上游字段外，时间戳通常采用 Unix 毫秒表示。

## latest {#latest}

latest 是最新合并快照。rows 中缺失名次不能补为零；parts 各有 fetchedAt，重复名次可能多行且标记 dup。stale 表示采集中断后保留旧结果，frozen 表示集计冻结。以 X-Server-Time 与 updatedAt 判断年龄，按 nextUpdateAt 加随机抖动轮询。

## music / challenges {#rankings}

歌曲榜响应保留 players 顺序，行没有 rank；展示顺位可用 index + 1，并标明来源是响应顺序。不要按分数重新排序或推导并列规则，数量也不保证固定 100 行。空对象按 players ?? [] 处理。musicId 必须属于所选区服歌曲目录。

先查询活动的 challenges 目录，再用 challengeMusicId 请求，不能以普通 musicId 替代。挑战榜不使用 ranks、分页或难度参数；积分榜 disabled 不代表挑战歌曲榜禁用。每首歌单独维护状态和采集时间。X-Final-Quality: lastSeen 只是最后成功观测，不是确认过的官方最终名次；三首歌曲也不构成同一时刻的快照。

## ETag / Retry-After {#cache}

使用 ETag 与 If-None-Match 支持 304，并遵循 Cache-Control。X-Fetched-At 是实际采集时间，缓存命中不刷新它；X-Stale: 1 表示旧快照，X-Refreshing: 1 表示刷新已排队或进行中。503 pending/upstream 时遵守 Retry-After，指数退避；不要用固定高频重试绕过服务调度。

## 公告版本 {#announcements}

公告列表由前端按 category 筛选；startAt、endAt、lastUpdatedAt 是 Unix 秒的十进制字符串，和榜线的毫秒不同。详情可用 rev 指定已缓存版本，省略时返回最新版本。X-Revision 标识版本，X-Listed: 0 表示已从列表撤下。正文是完整未过滤 HTML，必须放入不带 allow-scripts 或 allow-same-origin 的 sandbox iframe，不可插入主页面 DOM。

## tiers / bundle {#curves}

tiers 接口支持 tiers、res、from、to、since 等查询参数。res 分辨率可选 auto、raw、10m、1h，其中 raw 原始粒度最长支持查询 6 小时；时间戳 t 为相对于 base 时间点的毫秒偏移。若某一时间桶无观测数据，请保留缺失状态，不能填零。归档路径 /bundle/{server}/event/{eventId}/v{n}/ 为带有明确版本号的不可变静态资源包。

```json
{"error":{"kind":"pending","message":"..."}}
```

使用 ETag 与 If-None-Match 支持 304，并遵循 Cache-Control。X-Fetched-At 是实际采集时间，缓存命中不刷新它；X-Stale: 1 表示旧快照，X-Refreshing: 1 表示刷新已排队或进行中。503 pending/upstream 时遵守 Retry-After，指数退避；不要用固定高频重试绕过服务调度。

[公开榜线与歌曲榜](/public-data)
