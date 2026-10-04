# 玩家资料与收藏

**Scope:** `moenotes:profiles`

读取单个玩家的公开资料、批量获取多个资料，或列出某玩家的收藏。

## 接口

以下为该功能支持的完整端点路径，调用时仅需填写对应端点所列出的参数。

### `/player/{playerId}/favorites`

```http
GET /api/open/v1/moenotes/{region}/player/{playerId}/favorites
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `path` | 必填 |

### `/profile`

```http
GET /api/open/v1/moenotes/{region}/profile
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `playerProfileId` | `query` | 必填 |

### `/profile/favorites`

```http
GET /api/open/v1/moenotes/{region}/profile/favorites
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `playerId` | `query` | 必填 |

### `/profile/{profileId}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `profileId` | `path` | 必填 |

### `/profiles`

```http
GET /api/open/v1/moenotes/{region}/profiles
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `accountIds` | `query` | 必填 |

### `/profiles/{accountIds}`

```http
GET /api/open/v1/moenotes/{region}/profiles/{accountIds}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `accountIds` | `path` | 必填 |

## 参数

| 参数 | 说明 |
| --- | --- |
| `profileId` | 公开 profile id：日本以外为 11 位且以 2、3 或 4 开头；日本为正 int64。始终以十进制字符串传递。 |
| `playerProfileId` | 单资料接口的 profileId query 写法，与 playerId 不可混用。 |
| `accountIds` | 批量请求的账号 id，逗号分隔，最多 100 个。 |
| `playerId` | 要查询收藏的账号 id，与 profileId 不可混用。 |

## 地区差异

四个区服都可用，但 profileId 规则不同：jp 为正 int64，tw/en/kr 为 11 位且分别以 2、3、4 开头。同一账号在不同区服有不同 ID，收藏也按区服区分。

## 注意事项

profileId、playerId、accountId 是不同标识，不能互换。路径写法与 query 写法返回相同数据。

若请求参数缺失、格式错误或传入未知参数将返回 400 invalid_request；密钥无效返回 401 invalid_api_key；缺少 moenotes:profiles 权限返回 403 insufficient_scope；玩家不存在或未公开资料返回 404 not_found。

## 示例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
