# 公告

**Scope:** `moenotes:announcements`

游戏内公告列表与公告详情。

## 接口

以下为该功能支持的完整端点路径，调用时仅需填写对应端点所列出的参数。

### `/announcement`

```http
GET /api/open/v1/moenotes/{region}/announcement
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `id` | `query` | 必填 |

### `/announcement/{id}`

```http
GET /api/open/v1/moenotes/{region}/announcement/{id}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `id` | `path` | 必填 |

### `/announcements`

```http
GET /api/open/v1/moenotes/{region}/announcements
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `selectedTab` | `query` | 可选 |

### `/announcements/{selectedTab}`

```http
GET /api/open/v1/moenotes/{region}/announcements/{selectedTab}
```

| 参数 | 位置 | 必填 |
| --- | --- | --- |
| `selectedTab` | `path` | 必填 |

## 参数

| 参数 | 说明 |
| --- | --- |
| `selectedTab` | 公告分类。查询形式可省略；路径形式必填。 |
| `id` | 必填，公告 id，可用路径写法或 ?id= query 写法。 |

## 地区差异

公告按区服独立发布，各区服公告并非简单的多语言翻译版本：其分类页签、公告 ID 及正文内容均独立存在，在某一区服取得的公告 ID 无法在其他区服查询到结果。

## 注意事项

公告正文包含完整的 HTML 富文本内容，前端在渲染展示前必须自行进行安全过滤（sanitize），严禁直接将未经处理的内容插入到主页面 DOM 中。

若请求参数非法将返回 400 invalid_request；密钥无效返回 401；缺少 moenotes:announcements 权限返回 403；目标公告不存在返回 404。

## 示例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/announcement/$ANNOUNCEMENT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
