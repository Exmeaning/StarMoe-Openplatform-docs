# 热门编队

**Scope:** `moenotes:decks`

活动排行榜中的编队构成，以及竞技场编队趋势。

## 接口

以下为该功能支持的完整端点路径，调用时仅需填写对应端点所列出的参数。

### `/arena/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/deck-trend
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `query` | 必填 |
| `arenaSeasonId` | `query` | 必填 |

### `/arena/{arenaSeasonId}/music/{musicId}/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/music/{musicId}/deck-trend
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `musicId` | `path` | 必填 |
| `arenaSeasonId` | `path` | 必填 |

### `/event/deck`

```http
GET /api/open/v1/moenotes/{region}/event/deck
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `query` | 必填 |
| `eventId` | `query` | 必填 |

### `/event/{eventId}/deck/{playerId}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/deck/{playerId}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `path` | 必填 |
| `eventId` | `path` | 必填 |

## 参数

| 参数 | 说明 |
| --- | --- |
| `eventId` | 必填，活动 id。 |
| `playerId` | 必填，要查询编队的玩家账号 id。 |
| `arenaSeasonId` | 必填，竞技场赛季 id。 |
| `musicId` | 必填，竞技场编队趋势对应的歌曲 id。 |

## 地区差异

编队数据按区服分别存储，不同区服之间的 playerId 互不相通，并不代表同一位玩家。竞技场赛季及其可选曲目列表同样因区服而异。

## 注意事项

编队趋势接口用于聚合特定赛季中某首曲目的热门阵容搭配；若需查询玩家个人的编队详情，请使用活动编队相关接口。

若请求参数非法将返回 400 invalid_request；密钥无效返回 401；缺少 moenotes:decks 权限返回 403；活动、赛季或玩家资料不存在返回 404。

## 示例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/$EVENT_ID/deck/$PLAYER_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
