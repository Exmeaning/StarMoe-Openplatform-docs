# 圈子

**Scope:** `moenotes:circles`

按 id 查询圈子，或按名称与条件搜索圈子。

## 接口

以下为该功能支持的完整端点路径，调用时仅需填写对应端点所列出的参数。

### `/circle`

```http
GET /api/open/v1/moenotes/{region}/circle
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `circleId` | `query` | 必填 |

### `/circle/{circleId}`

```http
GET /api/open/v1/moenotes/{region}/circle/{circleId}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `circleId` | `path` | 必填 |

### `/circles/search`

```http
GET /api/open/v1/moenotes/{region}/circles/search
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `options.name` | `query` | 可选 |
| `options.memberRange` | `query` | 可选 |
| `options.joinRule` | `query` | 可选 |
| `options.playStyle` | `query` | 可选 |

### `/circles/search/{name}`

```http
GET /api/open/v1/moenotes/{region}/circles/search/{name}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `name` | `path` | 必填 |
| `options.memberRange` | `query` | 可选 |
| `options.joinRule` | `query` | 可选 |
| `options.playStyle` | `query` | 可选 |

## 参数

| 参数 | 说明 |
| --- | --- |
| `circleId` | 必填，圈子 id。 |
| `name` | 必填，搜索接口路径写法中的关键词。 |
| `options.name` | 可选，搜索接口 query 写法的名称筛选。 |
| `options.memberRange` | 可选，成员人数范围筛选。 |
| `options.joinRule` | 可选，加入条件筛选。 |
| `options.playStyle` | 可选，游玩风格筛选。 |

## 地区差异

圈子数据按各个游戏区服独立划分且不跨服，搜索结果与筛选条件仅反映所请求区服内的圈子及成员信息。

## 注意事项

高级搜索筛选项均为带有 options. 前缀的 query 参数（例如 ?options.name=…）；路径写法仅支持直接传入名称。圈子名称需与游戏内完全一致，当前不支持模糊匹配搜索，搜索结果不会在服务端缓存。

若请求参数非法将返回 400 invalid_request；密钥无效返回 401；缺少 moenotes:circles 权限返回 403；未找到匹配的圈子返回 404。

## 示例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/circles/search?options.name=$QUERY" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
