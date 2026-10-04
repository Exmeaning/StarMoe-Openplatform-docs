# 排行榜

**Scope:** `moenotes:rankings`

歌曲、活动、挑战与竞技场排行榜。

::: tip
榜线、歌曲榜和挑战榜优先使用[公开数据接口](../public-data)，无需发送密钥。这些数据是采集快照；其配额不属于 Passport 配额。
:::

## 接口

以下为该功能支持的完整端点路径，调用时仅需填写对应端点所列出的参数。

### `/arena/ranking`

```http
GET /api/open/v1/moenotes/{region}/arena/ranking
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `arenaSeasonId` | `query` | 必填 |
| `bandId` | `query` | 可选 |
| `rankingStart` | `query` | 必填 |
| `rankingEnd` | `query` | 必填 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 必填 |
| `bandId` | `query` | 可选 |
| `rankingStart` | `path` | 必填 |
| `rankingEnd` | `path` | 必填 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 必填 |
| `bandId` | `path` | 必填 |
| `rankingStart` | `path` | 必填 |
| `rankingEnd` | `path` | 必填 |

### `/event/challenge-ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge-ranking
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `challengeMusicId` | `query` | 必填 |

### `/event/challenge/{challengeMusicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge/{challengeMusicId}/ranking
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `challengeMusicId` | `path` | 必填 |

### `/event/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/ranking
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `eventId` | `query` | 必填 |
| `ranks` | `query` | 必填 |

### `/event/{eventId}/ranking/{ranks}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/ranking/{ranks}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `eventId` | `path` | 必填 |
| `ranks` | `path` | 必填 |

### `/music/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/ranking
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `query` | 必填 |

### `/music/{musicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/{musicId}/ranking
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `path` | 必填 |

## 参数

| 参数 | 说明 |
| --- | --- |
| `musicId` | 歌曲排行榜或竞技场编队趋势使用的歌曲 ID。 |
| `eventId` | 活动排行榜与编队必填。 |
| `ranks` | 必填，从 1 开始且包含首尾的名次区间。可重复传参（?ranks=1&amp;ranks=100）或使用路径写法。 |
| `challengeMusicId` | 必填，挑战曲目 id。 |
| `arenaSeasonId` | 必填，竞技场赛季 id。 |
| `rankingStart` | 必填，竞技场区间起始名次。 |
| `rankingEnd` | 必填，竞技场区间结束名次。 |
| `bandId` | 可选，竞技场排行榜的乐队筛选；路径写法为追加 /band/{bandId}。 |

## 地区差异

榜单按区服独立维护，各区服数据不可直接横向比较：活动、挑战与竞技场排期周期均不相同，某一区服的 eventId 或 arenaSeasonId 在另一区服通常不存在，歌曲 ID 亦有所区别。

## 注意事项

名次从 1 开始且包含起止名次，名次区间为必填项，请显式传入具体区间以保证缓存与查询结果的稳定性。

若名次区间非法或传入未知参数将返回 400 invalid_request；密钥无效返回 401；缺少 moenotes:rankings 权限返回 403；目标榜单不存在返回 404；超出请求频次限制将返回 429。

## 示例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/ranking?eventId=$EVENT_ID&ranks=1&ranks=100" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
